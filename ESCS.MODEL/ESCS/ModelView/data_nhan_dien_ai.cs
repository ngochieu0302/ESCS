using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.ESCS.ModelView
{
    public class data_nhan_dien_ai
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }
        public string ma_dich_vu { get; set; }

        public decimal? bt { get; set; }
        public string ai_kq { get; set; }
        public string duong_dan { get; set; }
        public List<damage_type> damage { get; set; }
    }
    public class damage_type
    {
        public string type { get; set; }
        public string parts { get; set; }
        public string box { get; set; }
        public string score { get; set; }
    }
}
