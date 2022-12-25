using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.ESCS
{
    public class bh_hd_xe_gcn_dgrr
    {
        public string ma_doi_tac { get; set; }
        public string so_id { get; set; }
        public bh_hd_xe_gcn_dgrr(string ma_doi_tac, string so_id)
        {
            this.ma_doi_tac = ma_doi_tac;
            this.so_id = so_id;
        }
    }
}
