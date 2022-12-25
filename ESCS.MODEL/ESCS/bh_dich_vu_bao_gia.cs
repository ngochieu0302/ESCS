using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.ESCS
{
    public class bh_dich_vu_bao_gia
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }

        public string ma_doi_tac { get; set; }
        public string gara { get; set; }
        public string ten_gara { get; set; }
        public string base_url { get; set; }
        public string api_access { get; set; }
        public string partner_code { get; set; }
        public string secretkey { get; set; }
        public string token { get; set; }
        public decimal? ngay_hl { get; set; }
        public decimal? ngay_kt { get; set; }
        public decimal? ap_dung { get; set; }

        public string ngay_hl_hthi { get; set; }
        public string ngay_kt_hthi { get; set; }
        public string ap_dung_hthi { get; set; }
    }
}
