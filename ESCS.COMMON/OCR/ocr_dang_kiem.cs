using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.OCR
{
    public class ocr_dang_kiem
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }
        public decimal? so_id { get; set; }
        public decimal? bt { get; set; }
        public string bien_so_xe { get; set; }
        public string kinh_doanh_van_tai { get; set; }
        public string loai_vb { get; set; }
        public string loai_xe { get; set; }
        public string nam_san_xuat { get; set; }
        public ocr_ngay_cap ngay_cap { get; set; }
        public string ngay_het_hieu_luc { get; set; }
        public string nhan_hieu { get; set; }
        public string nuoc_san_xuat { get; set; }
        public string so_cho_dung { get; set; }
        public string so_cho_nam { get; set; }
        public string so_cho_ngoi { get; set; }
        public string so_khung { get; set; }
        public string so_loai { get; set; }
        public string so_may { get; set; }
        public string so_quan_ly { get; set; }
        public string so_seri { get; set; }
        public ocr_dang_kiem_tmp GetData()
        {
            ocr_dang_kiem_tmp tmp = new ocr_dang_kiem_tmp();
            tmp.ma_doi_tac_nsd = this.ma_doi_tac_nsd;
            tmp.ma_chi_nhanh_nsd = this.ma_chi_nhanh_nsd;
            tmp.nsd = this.nsd;
            tmp.pas = this.pas;
            tmp.so_id = this.so_id;
            tmp.bt = this.bt;
            tmp.bien_so_xe = this.bien_so_xe;
            tmp.kinh_doanh_van_tai = this.kinh_doanh_van_tai;
            tmp.loai_vb = this.loai_vb;
            tmp.loai_xe = this.loai_xe;
            tmp.nam_san_xuat = this.nam_san_xuat;
            tmp.ngay_cap = this.ngay_cap != null ? this.ngay_cap.ngay + "/" + this.ngay_cap.thang + "/" + this.ngay_cap.nam : "";
            tmp.ngay_het_hieu_luc = this.ngay_het_hieu_luc;
            tmp.nhan_hieu = this.nhan_hieu;
            tmp.nuoc_san_xuat = this.nuoc_san_xuat;
            tmp.so_cho_dung = this.so_cho_dung;
            tmp.so_cho_nam = this.so_cho_nam;
            tmp.so_cho_ngoi = this.so_cho_ngoi;
            tmp.so_khung = this.so_khung;
            tmp.so_loai = this.so_loai;
            tmp.so_may = this.so_may;
            tmp.so_quan_ly = this.so_quan_ly;
            tmp.so_seri = this.so_seri;
            return tmp;
        }
    }
    public class ocr_dang_kiem_tmp
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }
        public decimal? so_id { get; set; }
        public decimal? bt { get; set; }
        public string bien_so_xe { get; set; }
        public string kinh_doanh_van_tai { get; set; }
        public string loai_vb { get; set; }
        public string loai_xe { get; set; }
        public string nam_san_xuat { get; set; }
        public string ngay_cap { get; set; }
        public string ngay_het_hieu_luc { get; set; }
        public string nhan_hieu { get; set; }
        public string nuoc_san_xuat { get; set; }
        public string so_cho_dung { get; set; }
        public string so_cho_nam { get; set; }
        public string so_cho_ngoi { get; set; }
        public string so_khung { get; set; }
        public string so_loai { get; set; }
        public string so_may { get; set; }
        public string so_quan_ly { get; set; }
        public string so_seri { get; set; }
    }
}
