using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ESCS.MODEL.ESCS.ModelView
{
    public class gara_doi_tuong
    {
        //public string token { get; set; }

        public string ma_cty_bh { get; set; }
        public string ma_gara { get; set; }
        public string nguon_api { get; set; }


        public decimal? so_id_bg { get; set; }
        public string so_bg { get; set; }
        public decimal? lan_bg { get; set; }
        public string trang_thai { get; set; }
        public string trang_thai_yc { get; set; }
        public string trang_thai_nhan { get; set; }

        public string dthoai_kh { get; set; }
        public string ten_kh { get; set; }
        public string email_kh { get; set; }

        public string ma_cnhanh_cty_bh { get; set; }
        public string bien_xe { get; set; }
        public string so_khung { get; set; }
        public string so_may { get; set; }
        public string hang_xe { get; set; }
        public string hieu_xe { get; set; }
        public decimal? nam_sx { get; set; }
        public string ten_gdv { get; set; }
        public string dien_thoai_gdv { get; set; }
        public string email_gdv { get; set; }

        public List<gara_request_hang_muc> hm { get; set; }
        public List<gara_file> file { get; set; }

        public string buoc { get; set; }
        public gara_doi_tuong()
        {
            this.nguon_api = "CTYBH";
        }
    }



    public class data_chuyen_bao_gia
    {
        public gara_doi_tuong doi_tuong { get; set; }
        public List<gara_bao_gia> bg { get; set; }
        public List<gara_bao_gia_lan> bg_lan { get; set; }
        public List<gara_bao_gia_lan_ct> bg_lan_ct { get; set; }
        public List<gara_file> file { get; set; }

        public gara_doi_tuong GetRequestChuyenBG(gara_bao_gia gara_bg)
        {
            gara_doi_tuong bg = new gara_doi_tuong();
            bg = this.doi_tuong;
            bg.file = this.file;

            bg.ma_cnhanh_cty_bh = gara_bg.ma_cnhanh_cty_bh;
            bg.ten_gdv = gara_bg.ten_gdv;
            bg.dien_thoai_gdv = gara_bg.dien_thoai_gdv;
            bg.email_gdv = gara_bg.email_gdv;
            bg.hm = new List<gara_request_hang_muc>();
            bg.hm = this.bg_lan_ct.Where(n=>n.gara == gara_bg.gara).Select(n => new gara_request_hang_muc()
            {
                ma = n.hang_muc,
                ten = n.hang_muc_ten,
                muc_do_tt = n.muc_do_tt,
                muc_do_tt_ten = n.muc_do_tt_ten,
                thay_the_sc = n.thay_the_sc,
                chinh_hang = n.chinh_hang,
                tien_dx = n.tien_dx,
                tien_duyet = n.tien_duyet,
                tien_khac = n.tien_khac,
                ghi_chu = n.ghi_chu,
                stt = n.stt
            }).ToList();
            return bg;
        }

    }
    public class data_chuyen_bao_gia_lan
    {
        public gara_doi_tuong doi_tuong { get; set; }
        public gara_bao_gia bg { get; set; }
        public List<gara_bao_gia_lan> bg_lan { get; set; }
        public List<gara_bao_gia_lan_ct> bg_lan_ct { get; set; }

        public gara_doi_tuong GetRequestChuyenBG()
        {
            gara_doi_tuong bg = new gara_doi_tuong();
            bg = this.doi_tuong;
            bg.ma_cty_bh = this.bg.ma_doi_tac;
            bg.ma_gara = this.bg.gara;
            bg.so_id_bg = this.bg.so_id_bg;
            bg.hm = new List<gara_request_hang_muc>();
            bg.hm = this.bg_lan_ct.Where(n => n.gara == this.bg.gara).Select(n => new gara_request_hang_muc()
            {
                ma = n.hang_muc,
                ten = n.hang_muc_ten,
                muc_do_tt = n.muc_do_tt,
                muc_do_tt_ten = n.muc_do_tt_ten,
                thay_the_sc = n.thay_the_sc,
                chinh_hang = n.chinh_hang,
                tien_vtu = n.tien_vtu,
                tien_nhan_cong = n.tien_nhan_cong,
                tien_khac = n.tien_khac,
                tien_dx = n.tien_dx,
                tien_duyet = n.tien_duyet,
                ghi_chu = n.ghi_chu
            }).ToList();
            return bg;
        }
    }
    public class data_chuyen_bao_gia_out
    {
        public decimal? so_id_bg { get; set; }
        public string so_bg { get; set; }
        public decimal? lan_bg { get; set; }

        public string trang_thai { get; set; }
        public string trang_thai_yc { get; set; }
        public string trang_thai_nhan { get; set; }
    }
    public class gara_bao_gia
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }


        public string ma_doi_tac { get; set; }
        public decimal? so_id { get; set; }
        public string gara { get; set; }

        public string ma_cnhanh_cty_bh { get; set; }
        public string ten_gdv { get; set; }
        public string dien_thoai_gdv { get; set; }
        public string email_gdv { get; set; }


        public decimal? tong_tien { get; set; }
        public decimal? tong_thue { get; set; }
        public string trang_thai { get; set; }
        public string ghi_chu { get; set; }
        public decimal? so_id_bg { get; set; }
        public string so_bg_gara { get; set; }
        public decimal? lan_bg { get; set; }
        public decimal? lan_bg_gara { get; set; }

        public string base_url { get; set; }
        public string api_access { get; set; }
        public string partner_code { get; set; }
        public string secretkey { get; set; }
        //public string token { get; set; }
        public string ma_cty_bh { get; set; }
        public string ma_gara { get; set; }
        public string trang_thai_api { get; set; }
        public string buoc { get; set; }
    }
    public class gara_bao_gia_lan
    {
        public string ma_doi_tac { get; set; }
        public decimal? so_id { get; set; }
        public string gara { get; set; }
        public decimal? lan_bg { get; set; }
        public decimal? tong_tien { get; set; }
        public decimal? tong_thue { get; set; }
        public decimal? tong_duyet { get; set; }
        public string trang_thai_yc { get; set; }
        public string trang_thai_bg { get; set; }
        public decimal? ngay_ht { get; set; }
        public string nsd { get; set; }
        public decimal? lan_bg_gara { get; set; }

    }
    public class gara_bao_gia_lan_ct
    {
        public string ma_doi_tac { get; set; }
        public decimal? so_id { get; set; }
        public string gara { get; set; }
        public decimal? lan_bg { get; set; }
        public string hang_muc { get; set; }
        public string hang_muc_ten { get; set; }
        public string muc_do_tt { get; set; }
        public string muc_do_tt_ten { get; set; }
        public string thay_the_sc { get; set; }
        public string chinh_hang { get; set; }

        public decimal? tien_vtu { get; set; }
        public decimal? tien_nhan_cong { get; set; }
        public decimal? tien_khac { get; set; }
        public decimal? tien_dx { get; set; }
        public decimal? tien_duyet { get; set; }
        public string ghi_chu { get; set; }

        public decimal? tien_vtu_gara { get; set; }
        public decimal? tien_nhan_cong_gara { get; set; }
        public decimal? tien_khac_gara { get; set; }
        public string ghi_chu_gara { get; set; }
        public decimal? stt { get; set; }
    }
    public class gara_request_hang_muc
    {
        public string ma { get; set; }
        public string ten { get; set; }
        public string muc_do_tt { get; set; }
        public string muc_do_tt_ten { get; set; }
        public string muc_do_tt_stt { get; set; }
        public string thay_the_sc { get; set; }
        public string chinh_hang { get; set; }

        public decimal? tien_vtu { get; set; }
        public decimal? tien_nhan_cong { get; set; }
        public decimal? tien_khac { get; set; }
        public decimal? tien_dx { get; set; }
        public decimal? tien_duyet { get; set; }
        public string ghi_chu { get; set; }
        public decimal? stt { get; set; }
    }
    public class gara_file
    {
        public decimal? bt { get; set; }
        public string ma_file { get; set; }
        public string ten_file { get; set; }
        public string duong_dan { get; set; }
        public string ext { get; set; }
    }
}
