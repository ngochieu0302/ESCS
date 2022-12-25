using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.OCR
{
    public class ocr_giay_phep_lai_xe
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }
        public decimal? so_id { get; set; }
        public decimal? bt { get; set; }
        public string hang { get; set; }
        public string loai_vb { get; set; }
        public ocr_ngay_cap ngay_cap { get; set; }
        public string ngay_het_hieu_luc { get; set; }
        public string ngay_sinh { get; set; }
        public string noi_cu_tru { get; set; }
        public string quoc_tich { get; set; }
        public string so { get; set; }
        public string ten_nguoi { get; set; }

        public ocr_giay_phep_lai_xe_tmp GetData()
        {
            ocr_giay_phep_lai_xe_tmp tmp = new ocr_giay_phep_lai_xe_tmp();
            tmp.ma_doi_tac_nsd = this.ma_doi_tac_nsd;
            tmp.ma_chi_nhanh_nsd = this.ma_chi_nhanh_nsd;
            tmp.nsd = this.nsd;
            tmp.pas = this.pas;
            tmp.so_id = this.so_id;
            tmp.bt = this.bt;
            tmp.hang = this.hang;
            tmp.loai_vb = this.loai_vb;
            tmp.ngay_cap = this.ngay_cap !=null? this.ngay_cap.ngay+"/"+ this.ngay_cap.thang+"/"+ this.ngay_cap.nam:"";
            tmp.ngay_het_hieu_luc = this.ngay_het_hieu_luc;
            tmp.ngay_sinh = this.ngay_sinh;
            tmp.noi_cu_tru = this.noi_cu_tru;
            tmp.quoc_tich = this.quoc_tich;
            tmp.so = this.so;
            tmp.ten_nguoi = this.ten_nguoi;
            return tmp;
        }
    }

    public class ocr_giay_phep_lai_xe_tmp
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }
        public decimal? so_id { get; set; }
        public decimal? bt { get; set; }

        public string hang { get; set; }
        public string loai_vb { get; set; }
        public string ngay_cap { get; set; }
        public string ngay_het_hieu_luc { get; set; }
        public string ngay_sinh { get; set; }
        public string noi_cu_tru { get; set; }
        public string quoc_tich { get; set; }
        public string so { get; set; }
        public string ten_nguoi { get; set; }
    }
}
