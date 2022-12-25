using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.ESCS
{
    public class bh_dich_vu_ocr_cvs
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }

        public string ma_doi_tac { get; set; }
        public string ma_chi_nhanh { get; set; }
        public string base_url { get; set; }
        public string api_key { get; set; }
        public string api_secret { get; set; }
        public decimal ngay_ht { get; set; }
        public decimal ap_dung { get; set; }
        public decimal? ngay_hl { get; set; }
        public decimal? ngay_kt { get; set; }
    }
}
