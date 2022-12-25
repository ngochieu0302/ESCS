using ESCS.COMMON.Common;
using ESCS.COMMON.Contants;
using ESCS.COMMON.MongoDb.LogEntities;
using ESCS.MODEL.ESCS.ModelView;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.IO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ESCS.Middlewares
{
    /// <summary>
    /// LogMiddleware
    /// </summary>
    public class LogMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;
        /// <summary>
        /// LogMiddleware
        /// </summary>
        /// <param name="next"></param>
        /// <param name="logRequestService"></param>
        public LogMiddleware(RequestDelegate next)
        {
            _next = next;
            _recyclableMemoryStreamManager = new RecyclableMemoryStreamManager();
        }
        /// <summary>
        /// Invoke
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="logRequestService"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext httpContext)
        {
            string idLog = Guid.NewGuid().ToString("N");
            await LogRequest(httpContext, idLog);
            await LogResponse(httpContext, idLog);
        }
        private escs_nguoi_dung GetUser(HttpContext context)
        {
            string session = context.Request.Cookies[ESCSConstants.ESCS_TOKEN]?.ToString();
            escs_nguoi_dung user = JsonConvert.DeserializeObject<escs_nguoi_dung>(Utilities.DecryptByKey(session, ESCS.COMMON.Http.AppSettings.KeyEryptData));
            return user;
        }
        private async Task LogRequest(HttpContext httpContext,string idLog)
        {
            try
            {
                var user = GetUser(httpContext);
                if (user!=null)
                {
                    Dictionary<string, string> headers = new Dictionary<string, string>();
                    var headerDic = httpContext.Request.Headers;
                    if (headerDic != null)
                    {
                        foreach (var item in headerDic)
                        {
                            headers.Add(item.Key, item.Value);
                        }
                    }
                    httpContext.Request.EnableBuffering();
                    await using var requestStream = _recyclableMemoryStreamManager.GetStream();
                    await httpContext.Request.Body.CopyToAsync(requestStream);
                    LogRequest rq = new LogRequest();
                    rq.id = idLog;
                    rq.headers = headers;
                    rq.schema = httpContext.Request.Scheme;
                    rq.host = httpContext.Request.Host.ToString();
                    rq.path = httpContext.Request.Path;
                    rq.query_string = httpContext.Request.QueryString.ToString();
                    if (!string.IsNullOrEmpty(rq.path))
                    {
                        if (!rq.path.Contains("/upload-file"))
                        {
                            rq.body = ReadStreamInChunks(requestStream);
                        }
                        else
                        {
                            string str = ReadStreamInChunks(requestStream);
                            rq.body = str.Length <= 1000 ? str : str.Substring(0, 1000);
                        }
                    }

                    var controllerActionDescriptor = httpContext
                                                    .GetEndpoint()
                                                    .Metadata
                                                    .GetMetadata<ControllerActionDescriptor>();

                    var controllerName = controllerActionDescriptor.ControllerName;
                    var actionName = controllerActionDescriptor.ActionName;

                    ht_nsd_hanh_dong rqHanhDong = new ht_nsd_hanh_dong();
                    rqHanhDong.id_yeu_cau = idLog;
                    rqHanhDong.ma_doi_tac_nsd = user.ma_doi_tac;
                    rqHanhDong.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
                    rqHanhDong.nsd = user.nsd;
                    rqHanhDong.pas = user.pas;
                    rqHanhDong.vung_qt = "";
                    rqHanhDong.nhom = "";
                    rqHanhDong.vung_qt = "";
                    rqHanhDong.nd_yeu_cau = JsonConvert.SerializeObject(rq);
                    rqHanhDong.nd_ket_qua = "";
                    rqHanhDong.thoi_gian = Convert.ToDecimal(DateTime.Now.ToString("yyyyMMddHHmmss"));

                    httpContext.Request.Body.Position = 0;
                }
            }
            catch
            {

            }
        }
        /// <summary>
        /// ReadStreamInChunks
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        public static string ReadStreamInChunks(Stream stream)
        {
            const int readChunkBufferLength = 4096;
            stream.Seek(0, SeekOrigin.Begin);
            using var textWriter = new StringWriter();
            using var reader = new StreamReader(stream);
            var readChunk = new char[readChunkBufferLength];
            int readChunkLength;
            do
            {
                readChunkLength = reader.ReadBlock(readChunk, 0, readChunkBufferLength);
                textWriter.Write(readChunk, 0, readChunkLength);
            } while (readChunkLength > 0);

            return textWriter.ToString();
        }
        private async Task LogResponse(HttpContext httpContext, string idLog)
        {
            var originalBodyStream = httpContext.Response.Body;
            await using var responseBody = _recyclableMemoryStreamManager.GetStream();
            httpContext.Response.Body = responseBody;
            await _next(httpContext);
            try
            {
                Dictionary<string, string> headers = new Dictionary<string, string>();
                var headerDic = httpContext.Request.Headers;
                if (headerDic != null)
                {
                    foreach (var item in headerDic)
                    {
                        headers.Add(item.Key, item.Value);
                    }
                }

                httpContext.Response.Body.Seek(0, SeekOrigin.Begin);
                var text = await new StreamReader(httpContext.Response.Body).ReadToEndAsync();
                httpContext.Response.Body.Seek(0, SeekOrigin.Begin);
                LogResponse res = new LogResponse();
                res.id = idLog;
                res.headers = headers;
                res.schema = httpContext.Request.Scheme;
                res.host = httpContext.Request.Host.ToString();
                res.path = httpContext.Request.Path;
                res.query_string = httpContext.Request.QueryString.ToString();
                res.body = text;
                if (res.path.Contains("/upload-file"))
                {
                    res.body = text.Length <= 1000 ? text : text.Substring(0, 1000);
                }

                await responseBody.CopyToAsync(originalBodyStream);
            }
            catch
            {

            }
            
        }
    }
    /// <summary>
    /// LogMiddlewareExtensions
    /// </summary>
    public static class LogMiddlewareExtensions
    {
        /// <summary>
        /// UseLog
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseLog(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LogMiddleware>();
        }
    }
}
