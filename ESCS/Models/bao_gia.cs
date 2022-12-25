using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace ESCS.Models
{
    public class bao_gia
    {
        [JsonIgnore]
        public IFormFile file_upload_bao_gia { get; set; }
        [JsonIgnore]
        public IFormFile file_upload_bao_gia_doc { get; set; }
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }

        public string ma_doi_tac { get; set; }
        public decimal? so_id { get; set; }
        public decimal? so_id_doi_tuong { get; set; }
        public decimal? bt_gara { get; set; }
        public string gara { get; set; }
        public string gio_bg { get; set; }
        public decimal? ngay_bg { get; set; }
    }
}
