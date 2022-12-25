using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Models
{
    public class file_bao_gia
    {
        public string ma_hang_muc_he_thong { get; set; }
        public string ten_hang_muc_he_thong { get; set; }

        public string ten_hang_muc { get; set; }
        public int id_khop_vtu { get; set; }
        public string ten_hang_muc_vtu { get; set; }
        public decimal? tien_vtu { get; set; }
        public double so_luong_vtu { get; set; }
        //Nhân công
        public int id_khop_nhan_cong { get; set; }
        public string ten_hang_muc_nhan_cong { get; set; }
        public decimal? tien_nhan_cong { get; set; }
        public int id_khop_son { get; set; }
        public string ten_hang_muc_son { get; set; }
        public decimal? tien_son { get; set; }
        public double tl_khop { get; set; }
        public double tl_khop_nhan_cong { get; set; }
        public double tl_khop_son { get; set; }

        public file_bao_gia()
        {
          
        }
        public file_bao_gia(int id)
        {
            
        }
    }
}
