using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Models
{
    public class bao_gia_chi_tiet
    {
        public decimal? bt { get; set; }
        public string ghi_chu { get; set; }
        public string hang_muc { get; set; }
        public string ma_doi_tac { get; set; }

        public string muc_do { get; set; }
        public string muc_do_ten { get; set; }
        public decimal? so_id { get; set; }
        public string ten_hang_muc { get; set; }

        public string thay_the_sc { get; set; }
        public string thay_the_sc_ten { get; set; }
        public string thay_the_sc_hthi { get; set; }

        public decimal? gia_giam_dinh { get; set; }
        public decimal? tien_ht_gara { get; set; }
        
        
        public decimal? so_luong { get; set; }
        public decimal? tien_khac { get; set; }
        public decimal? tien_nhan_cong { get; set; }
        public decimal? tien_vtu { get; set; }
        public decimal? tong_cong { get; set; }
        
        public decimal? tien_nhan_cong_dx { get; set; }
        public decimal? tien_vtu_dx { get; set; }
        public decimal? tien_khac_dx { get; set; }
        public decimal? tien_dx { get; set; }

        public decimal? tien_nhan_cong_duyet { get; set; }
        public decimal? tien_vtu_duyet { get; set; }
        public decimal? tien_khac_duyet { get; set; }
        public decimal? tien_duyet { get; set; }
        public string loai_hang_muc { get; set; }
        public string hang_muc_bo_sung_moi { get; set; }

    }
}
