using ClosedXML.Excel;
using ESCS.Attributes;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using System.Data;
using ESCS.COMMON.Response;
using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace FileUpload.Controllers
{
    
    public class UploadController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        /// <summary>
        /// Upload file
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [SystemAuthen]
        public async Task<ActionResult> UploadFile()
        {
            if (!Utilities.IsMultipartContentType(Request.ContentType))
                return BadRequest();
            IFormFileCollection files;
            var rq = Request.GetFormDataRequest(GetUser(), out files);
            var data = await Request.UploadFiles(StoredProcedure.PHT_BH_FILE_LUU, (object)rq, files);
            return Ok(data);
        }

        /// <summary>
        /// File đính kèm
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [SystemAuthen]
        public async Task<ActionResult> AttachFileEmail()
        {
            if (!Utilities.IsMultipartContentType(Request.ContentType))
            {
                return BadRequest();
            }
            IFormFileCollection files;
            var rq = Request.GetFormDataRequest(GetUser(), out files);
            var data = await Request.AttachFileEmail(StoredProcedure.PHT_LICH_GUI_EMAIL_FILE_DINH_KEM_NH, (object)rq, files);
            return Ok(data);
        }

        /// <summary>
        /// Upload file
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [SystemAuthen]
        public ActionResult ReadFileExcel()
        {
            if (!Utilities.IsMultipartContentType(Request.ContentType))
            {
                return BadRequest();
            }
            IFormFileCollection files;
            var rq = Request.GetFormDataRequest(GetUser(), out files);
            if (files.Count<=0)
            {
                throw new Exception("Không tìm thấy file");
            }
            DataTable data = ReadDataFile(files[0], "");
            return Ok(data);
        }
        /// <summary>
        /// Đọc data file
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="sheetName"></param>
        /// <returns></returns>
        [SystemAuthen]
        public static DataTable ReadDataFile(IFormFile filePath, string sheetName)
        {
            // Open the Excel file using ClosedXML.
            // Keep in mind the Excel file cannot be open when trying to read it
            using (XLWorkbook workBook = new XLWorkbook(filePath.OpenReadStream()))
            {
                //Read the first Sheet from Excel file.
                IXLWorksheet workSheet = workBook.Worksheet(1);

                //Create a new DataTable.
                DataTable dt = new DataTable();

                //Loop through the Worksheet rows.
                bool firstRow = true;
                foreach (IXLRow row in workSheet.Rows())
                {
                    //Use the first row to add columns to DataTable.
                    if (firstRow)
                    {
                        int i = 0;
                        dt.Rows.Add();
                        //dt.Columns.Add("stt");
                        //dt.Rows[0][0] = "STT";
                        foreach (IXLCell cell in row.Cells())
                        {
                            StringReader strReader = new StringReader(cell.Comment.Text);
                            while (true)
                            {
                                var aLine = strReader.ReadLine();
                                if (!string.IsNullOrEmpty(aLine))
                                {
                                    if (aLine.IndexOf("field") != -1)
                                    {
                                        //string column_name = cell.Value.ToString() + ":" + aLine.Split(":")[1].ToString().Trim();
                                        string column_name = aLine.Split(":")[1].ToString().Trim();
                                        dt.Columns.Add(column_name);
                                        dt.Rows[0][i] = cell.Value.ToString();
                                        i++;
                                        break;
                                    }
                                }
                                else
                                {
                                    break;
                                }
                            }
                        }
                        firstRow = false;
                    }
                    else
                    {
                        //Add rows to DataTable.
                        if (row.FirstCellUsed() != null && row.LastCellUsed() != null)
                        {
                            dt.Rows.Add();
                            dt.Rows[dt.Rows.Count - 1][0] = dt.Rows.Count - 1;
                            int i = 0;
                            foreach (IXLCell cell in row.Cells(row.FirstCellUsed().Address.ColumnNumber, row.LastCellUsed().Address.ColumnNumber))
                            {
                                dt.Rows[dt.Rows.Count - 1][i] = cell.Value.ToString();
                                i++;
                            }
                        }
                    }
                }

                return dt;
            }
        }

        /// <summary>
        /// Upload file none login
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> UploadFileNoneLogin()
        {
            if (!Utilities.IsMultipartContentType(Request.ContentType))
                return BadRequest();
            IFormFileCollection files = Request.Form.Files;
            string requestData = Utilities.FormCollectionToJson(Request.Form);
            var obj = JObject.Parse(requestData);
            var file = obj["files"].ToString();
            obj["files"] = JArray.Parse(file);
            var data = await Request.UploadFiles(StoredProcedure.PHT_BH_FILE_LUU, obj, files);
            return Ok(data);
        }
        /// <summary>
        /// Upload video
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<ActionResult> UploadVideoNoneLogin()
        {
            if (!Utilities.IsMultipartContentType(Request.ContentType))
                return BadRequest();
            IFormFileCollection files = Request.Form.Files;
            string requestData = Utilities.FormCollectionToJson(Request.Form);
            var obj = JObject.Parse(requestData);
            var data = await Request.UploadFilesVideo(StoredProcedure.PBH_FILE_VIDEO_NH, obj, files);
            return Ok(data);
        }
    }
}