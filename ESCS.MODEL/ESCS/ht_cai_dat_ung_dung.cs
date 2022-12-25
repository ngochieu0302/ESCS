using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.ESCS
{
    public class ht_cai_dat_ung_dung
    {
        [JsonIgnore]
        public IFormFile file_anh { get; set; }
        [JsonIgnore]
        public IFormFile file_anh_favicon { get; set; }
        public string url_anh_favicon { get; set; }
        [JsonIgnore]
        public IFormFile file_anh_dang_nhap { get; set; }
        public string url_anh_dang_nhap { get; set; }
        [JsonIgnore]
        public IFormFile file_anh_ud { get; set; }
        public string url_anh_ud { get; set; }

        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }

        public string ma_doi_tac { get; set; }
        public string ma_app { get; set; }
        public string url_anh { get; set; }
        public string ten { get; set; }
        public string ten_tat { get; set; }
        public string loai { get; set; }
        public int? chieu_dai { get; set; }
        public int? chieu_rong { get; set; }
        public int? toa_do_x { get; set; }
        public int? toa_do_y { get; set; }
    }
}