using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.MODEL.BAOGIA
{
    public class thong_tin_ket_noi
    {
        public api_cty_bao_hiem_ket_noi ket_noi { get; set; }
        public List<api_muc_do_tt> muc_do { get; set; }
        public List<api_hang_xe> hang_xe { get; set; }
        public List<api_hieu_xe> hieu_xe { get; set; }
        public List<api_loai_xe> loai_xe { get; set; }
        public List<api_hang_muc> hang_muc { get; set; }
        public List<api_ngan_hang> ngan_hang { get; set; }
        public thong_tin_ket_noi_chuyen GetDataChuyen()
        {
            thong_tin_ket_noi_chuyen dt = new thong_tin_ket_noi_chuyen();
            dt.muc_do = this.muc_do;
            dt.hang_xe = this.hang_xe;
            dt.hieu_xe = this.hieu_xe;
            dt.loai_xe = this.loai_xe;
            dt.hang_muc = this.hang_muc;
            dt.ngan_hang = this.ngan_hang;

            dt.ma_gara = this.ket_noi.ma_gara;
            dt.ma = this.ket_noi.ma;
            dt.ten = this.ket_noi.ten;
            dt.ten_tat = this.ket_noi.ten_tat;
            dt.ten_e = this.ket_noi.ten_e;
            dt.dia_chi = this.ket_noi.dia_chi;
            dt.mst = this.ket_noi.mst;
            dt.email = this.ket_noi.email;
            dt.base_url = this.ket_noi.base_url;
            dt.api_access = this.ket_noi.api_access;
            dt.partner_code = this.ket_noi.partner_code;
            dt.token = this.ket_noi.token;
            dt.secretkey = this.ket_noi.secretkey;

            dt.gara_ten = this.ket_noi.gara_ten;
            dt.gara_ten_tat = this.ket_noi.gara_ten_tat;
            dt.gara_dchi = this.ket_noi.gara_dchi;
            dt.gara_email = this.ket_noi.gara_email;
            dt.gara_dthoai = this.ket_noi.gara_dthoai;
            dt.gara_mst = this.ket_noi.gara_mst;
            dt.gara_tai_khoan = this.ket_noi.gara_tai_khoan;
            dt.gara_mat_khau = this.ket_noi.gara_mat_khau;
            return dt;
        }
    }
    public class thong_tin_ket_noi_chuyen
    {
        public string ma_gara { get; set; }
        public string ma { get; set; }
        public string ten { get; set; }
        public string ten_tat { get; set; }
        public string ten_e { get; set; }
        public string dia_chi { get; set; }
        public string mst { get; set; }
        public string email { get; set; }
        public string base_url { get; set; }
        public string api_access { get; set; }
        public string partner_code { get; set; }
        public string token { get; set; }
        public string secretkey { get; set; }

        public string gara_ten { get; set; }
        public string gara_ten_tat { get; set; }
        public string gara_dchi { get; set; }
        public string gara_email { get; set; }
        public string gara_dthoai { get; set; }
        public string gara_mst { get; set; }
        public string gara_tai_khoan { get; set; }
        public string gara_mat_khau { get; set; }

        public List<api_muc_do_tt> muc_do { get; set; }
        public List<api_hang_xe> hang_xe { get; set; }
        public List<api_hieu_xe> hieu_xe { get; set; }
        public List<api_loai_xe> loai_xe { get; set; }
        public List<api_hang_muc> hang_muc { get; set; }
        public List<api_ngan_hang> ngan_hang { get; set; }
    }
    public class api_cty_bao_hiem_ket_noi
    {
        public string ma_gara { get; set; }
        public string ma { get; set; }
        public string ten { get; set; }
        public string ten_tat { get; set; }
        public string ten_e { get; set; }
        public string dia_chi { get; set; }
        public string mst { get; set; }
        public string email { get; set; }
        public string base_url { get; set; }
        public string api_access { get; set; }
        public string partner_code { get; set; }
        public string token { get; set; }
        public string secretkey { get; set; }

        public string gara_ten { get; set; }
        public string gara_ten_tat { get; set; }
        public string gara_dchi { get; set; }
        public string gara_email { get; set; }
        public string gara_dthoai { get; set; }
        public string gara_mst { get; set; }
        public string gara_tai_khoan { get; set; }
        public string gara_mat_khau { get; set; }
    }
    public class api_muc_do_tt
    {
        public string ma { get; set; }
        public string ten { get; set; }
        public string ma_ct { get; set; }
        public string phuong_an { get; set; }
        public decimal? stt { get; set; }
    }
    public class api_hang_xe
    {
        public string ma { get; set; }
        public string ten { get; set; }
        public decimal? stt { get; set; }
    }
    public class api_hieu_xe
    {
        public string hang_xe { get; set; }
        public string ma { get; set; }
        public string ten { get; set; }
        public decimal? stt { get; set; }
    }
    public class api_loai_xe
    {
        public string ma { get; set; }
        public string ten { get; set; }
        public decimal? stt { get; set; }
    }
    public class api_hang_muc
    {
        public string ma { get; set; }
        public string ten { get; set; }
        public string nhom { get; set; }
    }
    public class api_ngan_hang
    {
        public string ma_nh { get; set; }
        public string ten_nh { get; set; }
        public string ma_cnhanh_nh { get; set; }
        public string ten_cnhanh_nh { get; set; }
    }
}
