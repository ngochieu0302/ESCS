using ESCS.COMMON.ExceptionHandlers;
using ESCS.COMMON.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ESCS.Middlewares
{
    public class ErrorHandler
    {
        private readonly RequestDelegate _next;
        public ErrorHandler(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
                switch (context.Response.StatusCode)
                {
                    case 404:
                        HandlePageNotFound(context);
                        break;
                    case 400:
                        HandleException(context, new Exception() { });
                        break;
                    default:
                        break;
                }
            }
            catch (Exception e)
            {
                HandleException(context, e);
            }
            finally
            {
            }
        }
        private static void HandleException(HttpContext context, Exception e)
        {
            if (context.Request.IsAjaxRequest())
            {
                context.Response.ContentType = "application/json";
                string msg = "";
                if (e is BusinessException)
                {
                    msg = e.Message;
                    context.Response.StatusCode = 427;
                }
                else if (e is SessionException)
                {
                    msg = "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.";
                    context.Response.StatusCode = 428;
                }
                else if (context.Response.StatusCode == 400)
                {
                    msg = "Thông tin request đã bị thay đổi hoặc không hợp lệ";
                    context.Response.StatusCode = 400;
                }
                else
                {
                    msg = e.Message;
                    context.Response.StatusCode = 500;
                }
                context.Response.WriteAsync(JsonConvert.SerializeObject(new{ message  = msg }), Encoding.UTF8);
                return;
            }
            context.Response.Redirect("/Error");
        }
        private static void HandlePageNotFound(HttpContext context)
        {
            if (context.Request.IsAjaxRequest())
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 404;
                context.Response.WriteAsync("Lỗi không tìm thấy trang", Encoding.UTF8);
                return;
            }
            context.Response.Redirect("/PageNotFound");
        }
    }
}
