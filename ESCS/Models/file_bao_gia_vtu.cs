using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Models
{
    public class file_bao_gia_vtu
    {
        public int id { get; set; }
        public string ten_hang_muc { get; set; }
        public double so_luong { get; set; }
        public decimal so_tien { get; set; }

        public int id_ncong { get; set; }
        public string ten_hang_muc_ncong { get; set; }
        public decimal so_tien_ncong { get; set; }
        public double tl_khop { get; set; }

        public file_bao_gia_vtu()
        {
            tl_khop = 0;
        }
        public file_bao_gia_vtu(int id)
        {
            this.id = id;
            tl_khop = 0;
        }

    }
}
