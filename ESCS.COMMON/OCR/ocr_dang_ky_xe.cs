using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.OCR
{
    public class ocr_dang_ky_xe
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }
        public decimal? so_id { get; set; }
        public decimal? bt { get; set; }
        public string bien_so_xe { get; set; }
        public string dia_chi { get; set; }
        public string dung_tich { get; set; }
        public string loai_vb { get; set; }
        public string loai_xe { get; set; }
        public string mau_son { get; set; }
        public ocr_ngay_cap ngay_cap { get; set; }
        public string nhan_hieu { get; set; }
        public string so_cho_dung { get; set; }
        public string so_cho_ngoi { get; set; }
        public string so_khung { get; set; }
        public string so_loai { get; set; }
        public string so_may { get; set; }
        public string ten_nguoi { get; set; }
        public ocr_dang_ky_xe_tmp GetData()
        {
            ocr_dang_ky_xe_tmp tmp = new ocr_dang_ky_xe_tmp();
            tmp.ma_doi_tac_nsd = this.ma_doi_tac_nsd;
            tmp.ma_chi_nhanh_nsd = this.ma_chi_nhanh_nsd;
            tmp.nsd = this.nsd;
            tmp.pas = this.pas;
            tmp.so_id = this.so_id;
            tmp.bt = this.bt;
            tmp.bien_so_xe = this.bien_so_xe;
            tmp.dia_chi = this.dia_chi;
            tmp.dung_tich = this.dung_tich;
            tmp.loai_vb = this.loai_vb;
            tmp.loai_xe = this.loai_xe;
            tmp.mau_son = this.mau_son;
            tmp.ngay_cap = this.ngay_cap!=null ? this.ngay_cap.ngay+"/"+ this.ngay_cap.thang+"/"+ this.ngay_cap.nam:"";
            tmp.nhan_hieu = this.nhan_hieu;
            tmp.so_cho_dung = this.so_cho_dung;
            tmp.so_cho_ngoi = this.so_cho_ngoi;
            tmp.so_khung = this.so_khung;
            tmp.so_loai = this.so_loai;
            tmp.so_may = this.so_may;
            tmp.ten_nguoi = this.ten_nguoi;
            return tmp;
        }
    }
    public class ocr_dang_ky_xe_tmp
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }
        public decimal? so_id { get; set; }
        public decimal? bt { get; set; }
        public string bien_so_xe { get; set; }
        public string dia_chi { get; set; }
        public string dung_tich { get; set; }
        public string loai_vb { get; set; }
        public string loai_xe { get; set; }
        public string mau_son { get; set; }
        public string ngay_cap { get; set; }
        public string nhan_hieu { get; set; }
        public string so_cho_dung { get; set; }
        public string so_cho_ngoi { get; set; }
        public string so_khung { get; set; }
        public string so_loai { get; set; }
        public string so_may { get; set; }
        public string ten_nguoi { get; set; }
    }
}
