using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using Newtonsoft.Json;
using System.IO;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class ActionLogController : BaseController
    {
        private readonly string basefolder;
        public ActionLogController()
        {
            basefolder = Path.Combine(COMMON.Http.NetworkCredentials.Items.ElementAt(0).PathLocal);
            if (!Directory.Exists(basefolder)) basefolder=Path.Combine(Directory.GetCurrentDirectory(), "FILE_CAM_XOA");
        }

        public IActionResult Index()
        {
            return View();
        }

        [AjaxOnly]
        public IActionResult GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            dynamic data = JsonConvert.DeserializeObject(json);
            long ngay_bd = data.ngay_bd;
            long ngay_kt = data.ngay_kt;
            if(ngay_kt<ngay_bd) return Ok(new ResponeFormat { data_info = new PagingResponeData { data=null, tong_so_dong=0 } });

            List<SearchOptions> list = new List<SearchOptions>();
            for (long ngay_tk = ngay_bd; ngay_tk<=ngay_kt; ngay_tk++)
            {
                list.Add(new SearchOptions
                {
                    ngay_tk = ngay_tk,
                    gio_bd = data.gio_bd,
                    gio_kt = data.gio_kt,
                    text_tk = data.text_tk,
                    trang = data.trang,
                    so_dong = data.so_dong
                });
            }

            return Ok(new ResponeFormat { data_info = ReadFolders(list) });
        }

        [AjaxOnly]
        public IActionResult GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            dynamic info = JsonConvert.DeserializeObject(json);
            string path = info.path;
            LogInfo filecontent = ReadFile(path);
            ResponeFormat responeformat = GetDetailResponeFormat(filecontent);
            return Ok(responeformat);
        }

        //Đọc Folder
        public PagingResponeData ReadFolders(IEnumerable<SearchOptions> list)
        {
            List<FileInfo> files = new List<FileInfo>();
            foreach (SearchOptions options in list)
            {
                if (!string.IsNullOrEmpty(options.gio_bd))
                {
                    options.gio_bd = "1" + options.gio_bd.Split(':')[0] + options.gio_bd.Split(':')[1]+"00";
                }
                if (!string.IsNullOrEmpty(options.gio_kt))
                {
                    options.gio_kt = "1" + options.gio_kt.Split(':')[0] + options.gio_kt.Split(':')[1]+"59";
                }

                //
                string time = options.ngay_tk.ToString();
                string path_year = time.Substring(0, 4);
                string path_month = time.Substring(4, 2);
                string path_day = time.Substring(6, 2);
                //
                string search_path = Path.Combine(basefolder, "LOG", path_year, path_month, path_day);

                if (!Directory.Exists(search_path)) continue;

                foreach (string path in Directory.GetFiles(search_path))
                {
                    var file = new FileInfo { path=path };
                    file.getName();
                    file.getDateTime();
                    file.getTime();
                    file.getArea();
                    file.getController();
                    file.getAction();
                    files.Add(file);
                }
            }
            PagingResponeData data_info = new PagingResponeData();
            if (files.Count<=0)
            {
                data_info.data = null;
                data_info.tong_so_dong = 0;
                return data_info;
            }
            data_info.data = FileInfo.Search(files, list.FirstOrDefault());
            data_info.tong_so_dong=data_info.data.Max(item => item.index);
            data_info.data=data_info.data.Where(item => item.match);
            return data_info;
        }

        //Đọc File
        public LogInfo ReadFile(string path)
        {
            return JsonConvert.DeserializeObject<LogInfo>(System.IO.File.ReadAllText(path));
        }
        public ResponeFormat GetDetailResponeFormat(LogInfo filecontent)
        {
            var respone = new ResponeFormat
            {
                data_info = new DetailResponeData
                {
                    result = JsonConvert.SerializeObject(filecontent, Formatting.Indented)
                }
            };
            return respone;
        }
    }

    public class SearchOptions
    {
        public long ngay_tk { get; set; }
        public string gio_bd { get; set; }
        public string gio_kt { get; set; }
        public string text_tk { get; set; }
        public int trang { get; set; }
        public int so_dong { get; set; }
    }
    public class FileInfo
    {
        public string path { get; set; }
        public bool match { get; set; } = true;
        public int index { get; set; }
        public string name { get; set; }
        public string datetime { get; set; }
        public long time { get; set; }
        public string area { get; set; }
        public string controller { get; set; }
        public string action { get; set; }


        public void getName() => this.name = Path.GetFileNameWithoutExtension(path);
        public IEnumerable<string> split() => this.name.Split('_');
        public bool hasArea() => this.split().Count()==5;
        public void getDateTime() => this.datetime = DateTime.ParseExact(this.split().ElementAt(0), "yyyyMMddHHmmss", null).ToString("yyyy/MM/dd HH:mm:ss");
        public long getTime() => this.time = Convert.ToInt64("1"+this.split().ElementAt(0).Substring(8));
        public void getArea() => this.area = this.hasArea() ? split().ElementAt(1) : string.Empty;
        public void getController() => this.controller = this.hasArea() ? split().ElementAt(2) : split().ElementAt(1);
        public void getAction() => this.action = this.hasArea() ? split().ElementAt(3) : split().ElementAt(2);
        public string Guid() => this.hasArea() ? split().ElementAt(4) : split().ElementAt(3);


        public static IEnumerable<FileInfo> Search(IEnumerable<FileInfo> files, SearchOptions options)
        {
            foreach(FileInfo file in files)
            {
                file.match=SearchWCondition(file, options);
            }
            int i = 1;
            foreach(FileInfo file in files.Where(item=>item.match).OrderBy(item=>item.datetime))
            {
                file.index=i++;
                if((file.index)>(options.trang*options.so_dong)) file.match=false;
                if((file.index)<((options.trang-1)*options.so_dong)+1) file.match=false;
            }
            return files.OrderBy(item => item.datetime);
        }
        public static bool SearchWCondition(FileInfo file,SearchOptions options)
        {

            if (!string.IsNullOrEmpty(options.gio_bd))
            {
                long start = Convert.ToInt64(options.gio_bd);
                if (file.time<start) return false;
            }
            if (!string.IsNullOrEmpty(options.gio_kt))
            {
                long end = Convert.ToInt64(options.gio_kt);
                if (file.time>end) return false;
            }
            if (!string.IsNullOrEmpty(options.text_tk))
            {
                if (file.Guid() == options.text_tk.ToLower()) return true;
                List<string> joinList = new List<string>();
                bool hasArea = file.hasArea();
                joinList.Add((hasArea ? file.area +"_" : string.Empty) + $"{file.controller}_{file.action}");
                joinList.Add((hasArea ? file.area +"/" : string.Empty) + $"{file.controller}/{file.action}");
                joinList.Add((hasArea ? file.area +" " : string.Empty) + $"{file.controller} {file.action}");
                joinList.Add((hasArea ? file.area +"\t" : string.Empty) + $"{file.controller}\t{file.action}");

                foreach (string join in joinList)
                {
                    if (join.ToLower().Contains(options.text_tk.ToLower())) return true;
                }
                return false;
            }
            return true;
        }
    }

    //Model respone
    public class ResponeFormat
    {
        //public Object state_info { get; set; } = new object();
        public Object data_info { get; set; }
        //public Object out_value { get; set; } = new object();
    }
    public class PagingResponeData
    {
        public int tong_so_dong { get; set; }
        public IEnumerable<FileInfo> data { get; set; }
    }
    public class DetailResponeData
    {
        public string result { get; set; }
    }

}
