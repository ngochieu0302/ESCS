using ESCS.COMMON.Common;
using ESCS.COMMON.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.ESCS
{
    public class tra_cuu_ho_so
    {
        public string ma_doi_tac { get; set; }
        public string so_id { get; set; }
        public string nv { get; set; }
        public string signature { get; set; }
        public string vesion { get; set; }
        public int valid { get; set; }
        public void isValid()
        {
            if (string.IsNullOrEmpty(ma_doi_tac) || string.IsNullOrEmpty(so_id) || string.IsNullOrEmpty(nv) || string.IsNullOrEmpty(nv))
            {
                valid = 0;
                return;
            }
            var sign = Utilities.Sha256Hash(this.ma_doi_tac + this.nv + this.so_id + AppSettings.KeyEryptData);
            if (sign == signature)
                valid = 1;
            else
                valid = 0;
        }
    }
}
