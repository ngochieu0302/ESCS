using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.ESCS
{
    public class phan_loai_tai_lieu
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }

        public string pm { get; set; }
        public string loai { get; set; }
        public string hang_muc { get; set; }
        public List<decimal?> bt { get; set; }
        public decimal? so_id { get; set; }
    }
    public class phan_loai_tai_lieu_update
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }

        public decimal? bt { get; set; }
        public string pm { get; set; }
        public string hanh_dong { get; set; }
        public string loai { get; set; }
        public string lh_nv { get; set; }
        public string hang_muc { get; set; }
        public string muc_do { get; set; }
        public string thay_the_sc { get; set; }
        public string chinh_hang { get; set; }
        public string thu_hoi { get; set; }
        public decimal? tien_tu_dong { get; set; }
        public decimal? tien_gd { get; set; }
        public decimal? vu_tt { get; set; }
        public string ghi_chu { get; set; }
        public decimal? so_id { get; set; }
    }
}
