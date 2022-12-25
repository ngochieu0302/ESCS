//Created:24/12/2022
//Author: thanhnx.escs
namespace ESCS.COMMON.ESCSStoredProcedures
{
	using System;
	using System.Collections.Generic;

	public partial class StoredProcedure
	{
		/// <summary>
		/// Gửi email xác nhận khách hàng
		/// </summary>
		public const string CAN_XOA_GAP = "ZSXFGOT5G55VKVV";
		/// <summary>
		/// Thanh test mẫu in AA
		/// </summary>
		public const string PBH_AA_IN = "FZFL1W6ACVCBNOY";
		/// <summary>
		/// Báo cáo bồi thường chưa giải quyết
		/// </summary>
		public const string PBH_BC_BH_BT_CGQ_CT = "F13K07L62P13PH9";
		/// <summary>
		/// Báo cáo bồi thường đã giải quyết
		/// </summary>
		public const string PBH_BC_BH_BT_DGQ_CT = "VKO6S5O3MKH7T8I";
		/// <summary>
		/// Báo cáo theo hạng mục tổn thất
		/// </summary>
		public const string PBH_BC_BH_BT_THEO_HANG_MUC_TT = "S747RWB6RTHXTYS";
		/// <summary>
		/// Báo cáo theo hiệu xe
		/// </summary>
		public const string PBH_BC_BH_BT_THEO_HIEU_XE = "KD92U5WUNAP35IP";
		/// <summary>
		/// Báo cáo theo tỉnh thành
		/// </summary>
		public const string PBH_BC_BH_BT_THEO_TINH_THANH = "FAJ4YC6HG0MVD6D";
		/// <summary>
		/// Báo cáo hồ sơ theo trạng thái
		/// </summary>
		public const string PBH_BC_BH_BT_THEO_TRANG_THAI = "9KYH8JF6Z50A3M6";
		/// <summary>
		/// Tìm kiếm phân trang bồi thường khác chờ đóng
		/// </summary>
		public const string PBH_BOI_THUONG_KHAC_CHO_DONG_LKE = "WDJI71JB6GMTCI5";
		/// <summary>
		/// Lấy chi tiết hồ sơ bồi thường khác (đóng hồ sơ)
		/// </summary>
		public const string PBH_BOI_THUONG_KHAC_CHO_DONG_LKE_CT = "YGF7RHDCLLRCWGA";
		/// <summary>
		/// Liệt kê + phân trang cấu hình QRCODE
		/// </summary>
		public const string PBH_BT_CAU_HINH_QRCODE_LKE = "UXC371N4URZ3AF4";
		/// <summary>
		/// Liệt kê chi tiết cấu hình QRCODE
		/// </summary>
		public const string PBH_BT_CAU_HINH_QRCODE_LKE_CT = "N8XEOVFI1VCB2R9";
		/// <summary>
		/// Nhập thông tin cấu hình QRCODE
		/// </summary>
		public const string PBH_BT_CAU_HINH_QRCODE_NH = "G0AAG2U1KD70YXH";
		/// <summary>
		/// Xóa thông tin cấu hình QRCODE
		/// </summary>
		public const string PBH_BT_CAU_HINH_QRCODE_X = "0137DYY85Z8SMY6";
		/// <summary>
		/// Liệt kê cấu hình bên tham gia giám định mặc định
		/// </summary>
		public const string PBH_BT_CH_BEN_THAM_GIA_GD_LKE = "Z0H8TSGTYWD3ENW";
		/// <summary>
		/// Thay đổi cấu hình bên tham gia giám định mặc định
		/// </summary>
		public const string PBH_BT_CH_BEN_THAM_GIA_GD_NH = "LEDJK3EIJIT00O0";
		/// <summary>
		/// Liệt kê + phân trang thông tin SMS 
		/// </summary>
		public const string PBH_BT_GUI_SMS_LKE = "RGWLIFK3Y4G1OIB";
		/// <summary>
		/// Liệt kê thông tin SMS chi tiết
		/// </summary>
		public const string PBH_BT_GUI_SMS_LKE_CT = "CVIIQNXDJBRCCT1";
		/// <summary>
		/// Danh sách tin nhắn cần gửi đi
		/// </summary>
		public const string PBH_BT_GUI_SMS_LKE_GUI = "EDWO423F1MFK3I3";
		/// <summary>
		/// Tìm kiếm phân trang hoàn quỹ hồ sơ
		/// </summary>
		public const string PBH_BT_HOAN_QUY_LKE = "IJ88EAGI97TRRSL";
		/// <summary>
		/// Lấy thông tin chi tiết hoàn quỹ hồ sơ
		/// </summary>
		public const string PBH_BT_HOAN_QUY_LKE_CT = "HFB8YLU5IO9BSCA";
		/// <summary>
		/// Tìm kiếm phân trang hồ sơ hoàn quỹ tồn
		/// </summary>
		public const string PBH_BT_HOAN_QUY_LKE_TON = "0X69BXQ0D5FCDMI";
		/// <summary>
		/// Lưu hoàn quỹ
		/// </summary>
		public const string PBH_BT_HOAN_QUY_NH = "V94QAXAVW42U905";
		/// <summary>
		/// Liệt kê danh sách hồ sơ tồn hoàn quỹ
		/// </summary>
		public const string PBH_BT_HOAN_QUY_TON_LKE = "0KBIYDMR95B8S5Y";
		/// <summary>
		/// Xác nhận đề nghị hoàn quỹ
		/// </summary>
		public const string PBH_BT_HOAN_QUY_XAC_NHAN = "D8QTDTF8Q5M2CNS";
		/// <summary>
		/// Hủy xác nhận đề nghị hoàn quỹ
		/// </summary>
		public const string PBH_BT_HOAN_QUY_XAC_NHAN_HUY = "ONF37NUKUL26KSA";
		/// <summary>
		/// Xóa đề nghị hoàn quỹ
		/// </summary>
		public const string PBH_BT_HOAN_QUY_XOA = "OY8NQSFLL18DJY8";
		/// <summary>
		/// Liệt kê cấu hình hồ sơ - chứng từ
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_CAU_HINH_LKE = "V3F4AO6B4GT1AV8";
		/// <summary>
		/// Nhập thông tin cấu hình hồ sơ giấy tờ
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_CAU_HINH_NHAP = "5QAIHINKX7L6RSQ";
		/// <summary>
		/// Xóa thông tin cấu hình hồ sơ giấy tờ
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_CAU_HINH_XOA = "N05USYBOP7PHXE7";
		/// <summary>
		/// [MOBILE] - Lưu hồ sơ giấy tờ gara thu hộ
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_GARA_THU_HO_MOBILE_NH = "OHOQE65W7VY8F3S";
		/// <summary>
		/// Lấy tài liệu theo hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_LAY_DS = "AQT5VJ8WPF3QIPC";
		/// <summary>
		/// Lấy thông tin hồ sơ giấy tờ theo short link
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_LINK_LKE_CT = "JFIRIMMM78E4SSK";
		/// <summary>
		/// Bổ sung hồ sơ giấy - link
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_LINK_NH = "S5DHVKELWRF9OFT";
		/// <summary>
		/// Lấy danh sách hồ sơ giấy tờ
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_LKE = "PHFY8TFMZHVCILV";
		/// <summary>
		/// Lưu thông tin hồ sơ giấy tờ bổ sung
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_LUU = "CYIJSBE8N467URJ";
		/// <summary>
		/// [MOBILE] - Lấy danh sách hồ sơ giấy tờ gara bổ sung
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_MOBILE_LKE = "EFLUIDUU6I0XW9U";
		/// <summary>
		/// Lưu thông tin bổ sung hồ sơ giấy tờ
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_NH = "N7OI03OGKDG6ZQR";
		/// <summary>
		/// Lịch sử yêu cầu BSHS
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_NSD_LKE = "I39IUV5M2C3U8LE";
		/// <summary>
		/// Danh sách hồ sơ giấy tờ yêu cầu bổ sung
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_NSD_YCBS = "MXEB4SWJJ7P6IF0";
		/// <summary>
		/// Xóa hồ sơ giấy tờ
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_XOA = "5OFBTDPH1WBTVEG";
		/// <summary>
		/// [MOBILE] - Danh sách hồ sơ giấy tờ yêu cầu bổ sung
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_YCBS_MOBILE_LKE = "SN3WBYCN27QV62E";
		/// <summary>
		/// [MOBILE] - Lưu hồ sơ giấy tờ yêu cầu bổ sung
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_YCBS_MOBILE_NH = "3ZHD4KN6XU4CG2W";
		/// <summary>
		/// Danh sách hồ sơ giấy tờ yêu cầu
		/// </summary>
		public const string PBH_BT_HO_SO_GIAY_TO_YEU_CAU = "WRYLWQ6T4N14S5X";
		/// <summary>
		/// MOBILE - Danh sách chờ phê duyệt
		/// </summary>
		public const string PBH_BT_HS_MOBILE_DUYET_LKE = "645W3A6ZNSA1BRR";
		/// <summary>
		/// Lấy chi tiết hồ sơ phê duyệt
		/// </summary>
		public const string PBH_BT_HS_MOBILE_DUYET_LKE_CT = "5SCICIZNNVURNH1";
		/// <summary>
		/// So sanh thong tin ocr hoa don
		/// </summary>
		public const string PBH_BT_HS_OCR_HOA_DON_SO_SANH = "W1XLUDY3LJQVJYJ";
		/// <summary>
		/// Xem file QRCode
		/// </summary>
		public const string PBH_BT_HS_QRCODE_LKE_CT = "MI07Q69ZQCVCLCK";
		/// <summary>
		/// Lưu file QRCODE
		/// </summary>
		public const string PBH_BT_HS_QRCODE_NH = "8RJBW1OZ5IAKSQF";
		/// <summary>
		/// Cập nhật trạng thái bổ sung hồ sơ gốc
		/// </summary>
		public const string PBH_BT_HS_TRANG_THAI_HS_GOC = "SU07DHXP0EFX2E1";
		/// <summary>
		/// Lấy dách LHNV theo đối tượng (WEB APP)
		/// </summary>
		public const string PBH_BT_HS_XE_GD_LHNV = "DB3QWDMG8G5YSNK";
		/// <summary>
		/// MOBILE - Bắt đầu giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_BD_GD = "V18HBLCS02D24A7";
		/// <summary>
		/// Mobile - Địa bàn giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_DIA_BAN = "5O7P5B9CRT7S42N";
		/// <summary>
		/// [MOBILE] - Lấy danh sách hồ sơ giám định theo quyền QL đơn vị
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_GDTT_LKE = "KCAA1YFVY3CBQ93";
		/// <summary>
		/// MOBILE - Yêu cầu kết thúc giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_KTGD_LAN = "IG9UHTWQ396REFP";
		/// <summary>
		/// [MOBILE] - Danh sách lần giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_LAN_GD_LKE = "WG6ATGN4BGPHMWT";
		/// <summary>
		/// [MOBILE] - Tạo yêu cầu giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_LAN_GD_NH = "SM1L1DMEQK3B6CC";
		/// <summary>
		/// [MOBILE] - Lấy ra danh sách loại hình nghiệp vụ của hồ sơ
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_LHNV = "Y8ROPB5SVXLXN73";
		/// <summary>
		/// [MOBILE] - Lấy danh sách loại hình  nghiệp vụ khác vật chất xe
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_LHNV_KHAC = "BL6NMAMYLEK0HZV";
		/// <summary>
		/// MOBILE - Lịch giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_LICH = "47YDUSD3VT0RYDV";
		/// <summary>
		/// MOBILE - Danh sách hồ sơ (đã nhận, chưa nhận)
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_LKE = "BW3PSQ66YO5RE5R";
		/// <summary>
		/// MOBILE - Xem chi tiết 1 hồ sơ
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_LKE_CT = "AL5KX3UAL62SJUR";
		/// <summary>
		/// MOBILE - Sự kiện nhận giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_NHAN_GD = "92WSN5BYIV59UR6";
		/// <summary>
		/// [MOBILE] - Lấy danh sách đối tượng tổn thất nghiệp khác
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_NV_KHAC_LKE = "2ES7ZIRXSPBM6A8";
		/// <summary>
		/// Lấy thông tin chi tiết phương án của đối tượng tổn thất
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_NV_KHAC_LKE_CT = "IFZPOR1RC56Q5HI";
		/// <summary>
		/// MOBILE - Tra cứu hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_TRA_CUU = "AUJ2OOUN32AKVOW";
		/// <summary>
		/// MOBILE - Yêu cầu cho phép giám định
		/// </summary>
		public const string PBH_BT_HS_XE_GD_MOBILE_YCGD = "08GHL248B1HZV8M";
		/// <summary>
		/// So sánh dữ liệu
		/// </summary>
		public const string PBH_BT_HS_XE_GD_SO_SANH = "RIJ63DRN1YDAU5F";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách loại hình nghiệp vụ 
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_LHNV = "M7SB98OEB9VOJWI";
		/// <summary>
		/// [XE_MAY_MOBILE]- Bắt đầu giám định xe máy
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_BD_GD = "REQIORDGC0X64KE";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lấy danh sách hồ sơ giám định theo quyền QL đơn vị
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_GDTT_LKE = "JZABIUJ9SQTJPHK";
		/// <summary>
		/// [XE_MAY_MOBILE]- Kết thúc lần giám định
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_KTGD_LAN = "QKA4UINVZY3R0FV";
		/// <summary>
		/// [XE_MAY_MOBILE] - Danh sách lần giám định xe máy
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_LAN_GD_LKE = "RC3BJ01J2EYJF8P";
		/// <summary>
		/// [XE_MAY_MOBILE] - Tạo yêu cầu giám định xe máy
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_LAN_GD_NH = "KBM414IFXZEG4DL";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lấy danh sách LHNV của hồ sơ
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_LHNV = "90NS7API0CKGWIN";
		/// <summary>
		/// [XE_MAY_MOBILE] - Xem thông tin chi tiết hồ sơ
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_LKE_CT = "72IC35K33GQO1CJ";
		/// <summary>
		/// [XE_MAY_MOBILE] - Nhận hồ sơ giám định xe máy
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_NHAN_GD = "UBE4HSC5BVOI2SW";
		/// <summary>
		/// [XE_MAY_MOBILE] -  Lấy danh sách đối tượng tổn thất nghiệp khác
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_NV_KHAC_LKE = "0GQM3ZPRMJO5QVK";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lấy thông tin chi tiết phương án của đối tượng tổn thất
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_NV_KHAC_LKE_CT = "2WLFAQJ0IICCUT4";
		/// <summary>
		/// [XE_MAY_MOBILE] - Yêu cầu cho phép giám định
		/// </summary>
		public const string PBH_BT_HS_XE_MAY_GD_MOBILE_YCGD = "0M1WVJJ60SGHSV0";
		/// <summary>
		/// MOBILE - Phê duyệt hồ sơ
		/// </summary>
		public const string PBH_BT_HS_XE_MOBILE_DUYET = "N5IOYB4D2LPI1NO";
		/// <summary>
		/// Hủy duyệt hồ sơ giám định (mobile)
		/// </summary>
		public const string PBH_BT_HS_XE_MOBILE_DUYET_XOA = "RA04POKN8ZKF7ZP";
		/// <summary>
		/// Nhập thông tin ý kiến khách hàng bổ sung hồ sơ 
		/// </summary>
		public const string PBH_BT_HS_Y_KIEN_KH_NH = "5YR2NIKHK54GFKN";
		/// <summary>
		/// Tìm kiếm + phân trang hồ sơ bồi thường khác
		/// </summary>
		public const string PBH_BT_KHAC_HS_LKE = "S49C2YFEGJU3D91";
		/// <summary>
		/// Lấy chi tiết hồ sơ bồi thường khác
		/// </summary>
		public const string PBH_BT_KHAC_HS_LKE_CT = "TAUT55H1CLH95WJ";
		/// <summary>
		/// Lưu hồ sơ bồi thường khác
		/// </summary>
		public const string PBH_BT_KHAC_HS_NH = "TBESIKCMSH04YOR";
		/// <summary>
		/// Tìm kiếm danh sách gcn bồi thường khác
		/// </summary>
		public const string PBH_BT_KHAC_HS_TIM_NDBH = "VVQWRGD2YEXY4NW";
		/// <summary>
		/// Lấy danh sách mã danh mục bồi thường khác
		/// </summary>
		public const string PBH_BT_KHAC_MA_DANH_MUC_CACHE = "JZCR3UPVI83VK8B";
		/// <summary>
		/// Lấy danh sách đánh giá của đối tác
		/// </summary>
		public const string PBH_BT_KH_DANH_GIA_LKE = "R7O5PDJOVNIWUQ1";
		/// <summary>
		/// Liệt kê chi tiết danh sách khách hàng đánh giá
		/// </summary>
		public const string PBH_BT_KH_DANH_GIA_LKE_CT = "GR17WLTUQ8PY0QI";
		/// <summary>
		/// Liệt kê danh sách khánh hàng đánh giá
		/// </summary>
		public const string PBH_BT_KH_DANH_GIA_LKE_V2 = "XB8E9DQTAQ6RTLQ";
		/// <summary>
		/// Nhập khách hàng đánh giá
		/// </summary>
		public const string PBH_BT_KH_DANH_GIA_NH = "GK2EGHZ5UA9HMMB";
		/// <summary>
		/// Xóa thông tin KH đánh giá
		/// </summary>
		public const string PBH_BT_KH_DANH_GIA_X = "WOQ1TB9HAF0E60S";
		/// <summary>
		/// Lấy thông tin hồ sơ theo short link
		/// </summary>
		public const string PBH_BT_KH_LINK_LKE_CT = "W1VTJRJD1P6V6U3";
		/// <summary>
		/// Thông tin xác nhận biên bản giám định
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_BBGD_LKE_CT = "8FZA2Q53POGCLN0";
		/// <summary>
		/// Cập nhật xác nhận đánh giá của khách hàng
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_CAP_NHAT = "77EQQ69DP0OVLSR";
		/// <summary>
		/// Lấy chi tiết xác nhận khách hàng từ url
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_CT = "2WN7GB5331JRBFX";
		/// <summary>
		/// Gửi email xác nhận khách hàng
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_GUI_EMAIL = "QYIALWSGLT0KO93";
		/// <summary>
		/// Gửi OTP để khách hàng xác nhận
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_GUI_OTP = "42NSKQDUPWNTFI0";
		/// <summary>
		/// Khách hàng xác nhận không qua OTP
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_KHONG_OTP = "BZI0Z1ZHF5VFRUY";
		/// <summary>
		/// Lưu xác nhận ký tay của khách hàng
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_KY_TAY = "NDKH2GSKGAN9P6M";
		/// <summary>
		/// Lấy email nhận xác nhận khách hàng
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_LAY_EMAIL = "YQK2Y505BFUK6NP";
		/// <summary>
		/// Lấy thông tin khách hàng theo shortlink 
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_NG_CT = "32241HJW4LIG1LU";
		/// <summary>
		/// Nhập thông tin khách hàng xác nhận PABT con người
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_NG_KHONG_OTP = "LKXM7PNVKK0SBD1";
		/// <summary>
		/// Khách hàng đã xác nhận bằng hình thức ký tay
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_NG_KY_TAY = "IVDKEME1N4VX4MG";
		/// <summary>
		/// Xác nhận PABT trên app khách hàng
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_NG_PABT = "WF2UEVG0ARRLVDC";
		/// <summary>
		/// Nhập xác nhận khách hàng
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_NH = "08GG19NC7SBEBKC";
		/// <summary>
		/// Lưu xác nhận khách hàng qua OTP
		/// </summary>
		public const string PBH_BT_KH_XAC_NHAN_OTP = "OHNED7AZPTAOSVN";
		/// <summary>
		/// Duyệt lịch nghỉ
		/// </summary>
		public const string PBH_BT_LICH_NGHI_DUYET = "UJ3ZU2TRTLJYSNJ";
		/// <summary>
		/// Lấy danh sách lịch nghỉ
		/// </summary>
		public const string PBH_BT_LICH_NGHI_LKE = "4T2BA5UJV0B9OTT";
		/// <summary>
		/// Lấy chi tiết lịch nghỉ
		/// </summary>
		public const string PBH_BT_LICH_NGHI_LKE_CT = "0YZ9Y0DLXG60BI4";
		/// <summary>
		/// Nhập lịch nghỉ
		/// </summary>
		public const string PBH_BT_LICH_NGHI_NH = "PZDSF9MSP6F02G5";
		/// <summary>
		/// Xóa lịch nghỉ
		/// </summary>
		public const string PBH_BT_LICH_NGHI_XOA = "0HTTFVTQ46YGFYW";
		/// <summary>
		/// Duyệt lịch trực
		/// </summary>
		public const string PBH_BT_LICH_TRUC_DUYET = "8FAFZYYJ0HJRMCE";
		/// <summary>
		/// Danh sách lịch trực + dòng
		/// </summary>
		public const string PBH_BT_LICH_TRUC_LKE = "X9H6F92M4WI8NZN";
		/// <summary>
		/// Chi tiết lịch trực
		/// </summary>
		public const string PBH_BT_LICH_TRUC_LKE_CT = "IVCV11MPJLVB2S5";
		/// <summary>
		/// Nhập lịch trực
		/// </summary>
		public const string PBH_BT_LICH_TRUC_NH = "M2FR8KLJ00WAHC8";
		/// <summary>
		/// Xóa lịch trực
		/// </summary>
		public const string PBH_BT_LICH_TRUC_XOA = "JRGIAJHF7SJ5FFR";
		/// <summary>
		/// Nhập hồ sô giấy tờ lỗi
		/// </summary>
		public const string PBH_BT_LOI_NH = "PLI93VTQ9W4TMEY";
		/// <summary>
		/// Lưu danh sách từng hồ sơ tồn
		/// </summary>
		public const string PBH_BT_LUU_DE_NGHI_THANH_TOAN = "6E2GU7KKBC3PX8T";
		/// <summary>
		/// Liệt kê danh sách mẫu sms
		/// </summary>
		public const string PBH_BT_MAU_SMS_LKE = "89684VGOBT7YSBQ";
		/// <summary>
		/// Liệt kê chi tiết cấu hình mẫu sms
		/// </summary>
		public const string PBH_BT_MAU_SMS_LKE_CT = "PHCQKHZKLHXQ63W";
		/// <summary>
		/// Nhập mẫu sms
		/// </summary>
		public const string PBH_BT_MAU_SMS_NH = "UFO8NIXP95YXDJR";
		/// <summary>
		/// Cache danh mục chung theo đối tác
		/// </summary>
		public const string PBH_BT_MA_DANH_MUC_CACHE = "MAEDCNAQYTU3V4Z";
		/// <summary>
		/// MOBILE - Danh sách Gara
		/// </summary>
		public const string PBH_BT_MOBILE_GARA = "G33C18XUC041E0F";
		/// <summary>
		/// Lấy tất cả danh sách nội dung trình
		/// </summary>
		public const string PBH_BT_ND_TRINH_CACHE = "5PD7WGL68GQZ1B0";
		/// <summary>
		/// Liệt kê danh sách nội dung trình
		/// </summary>
		public const string PBH_BT_ND_TRINH_LKE = "F11TF9N87EEH7LJ";
		/// <summary>
		/// Liệt kê danh sách nội dung nhận xét
		/// </summary>
		public const string PBH_BT_ND_TRINH_LKE_CT = "AVNUWE79MLV1KMD";
		/// <summary>
		/// Nhập thông tin nhận xét
		/// </summary>
		public const string PBH_BT_ND_TRINH_NH = "P0QE7IBB60I424B";
		/// <summary>
		/// Xóa thông tin nội dung trình
		/// </summary>
		public const string PBH_BT_ND_TRINH_X = "MWIJ5CSXB04I5GI";
		/// <summary>
		/// Xuất báo cáo những hồ sơ cần bổ sung hồ sơ
		/// </summary>
		public const string PBH_BT_NG_BC_CT_BO_SUNG_HO_SO = "O0OSI84QN0PNXXF";
		/// <summary>
		/// Báo cáo chi tiết quyền lợi (tất cả)
		/// </summary>
		public const string PBH_BT_NG_BC_CT_QUYEN_LOI_ALL = "6RKXJDWEPR646OI";
		/// <summary>
		/// Lấy danh sách cảnh báo con người
		/// </summary>
		public const string PBH_BT_NG_CANH_BAO_LKE_CT = "30PGLN4P8WHDSIQ";
		/// <summary>
		/// Cập nhật thông tin OCR con người
		/// </summary>
		public const string PBH_BT_NG_CAP_NHAT_OCR = "144T0KH5X769EE7";
		/// <summary>
		/// Cập nhật số hồ sơ tích hợp con người
		/// </summary>
		public const string PBH_BT_NG_CAP_NHAT_SO_HS = "JTXN8EP9L131NLJ";
		/// <summary>
		/// Danh sách trạng thái hồ sơ
		/// </summary>
		public const string PBH_BT_NG_DANH_SACH_TRANG_THAI_HS = "Z3P6WZ19NPD07ZL";
		/// <summary>
		/// Hiện thông tin trên Dashboard con người trang Home
		/// </summary>
		public const string PBH_BT_NG_DASHBOARD = "IO357KAE6P8UFDY";
		/// <summary>
		/// Lấy thông tin dashboard con người phân tích 1
		/// </summary>
		public const string PBH_BT_NG_DASHBOARD_1 = "E0YQOV5DRX2XBM4";
		/// <summary>
		/// Tải template danh sách đóng nhiều hồ sơ
		/// </summary>
		public const string PBH_BT_NG_DONG_NHIEU_HS = "G9994KE1TTNLPXK";
		/// <summary>
		/// Lấy thông tin gcn con người
		/// </summary>
		public const string PBH_BT_NG_HD_CT = "866APK06UIDN0YS";
		/// <summary>
		/// Mẫu in bảng kê hoàn quỹ bồi thường
		/// </summary>
		public const string PBH_BT_NG_HS_BANG_KE_HQBT_IN = "NYWL659WHQY9Z69";
		/// <summary>
		/// Mẫu in bảng kê thanh toán bồi thường
		/// </summary>
		public const string PBH_BT_NG_HS_BANG_KE_TTBT_IN = "HETBM85XP1TYUN3";
		/// <summary>
		/// Báo cáo tổng hợp
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_CAO_TONG_HOP = "Y0LTKTJ63A4TW3A";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Chuyển bồi thường sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_CHUYEN = "50QW5NAYOVD1C25";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Copy lần bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_COPY = "H3SG70XNS0723CR";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Duyệt lần bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_DUYET = "U4OV727H4TMNQHM";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Hủy duyệt lần bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_DUYET_XOA = "ENXZW2FJKUI8L5G";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Hủy hồ sơ bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_HUY_HS = "YRRFCX5IA1OJDB6";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Gỡ hủy hồ sơ bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_HUY_HS_XOA = "YS3VBXCHK9RHUOC";
		/// <summary>
		/// Mẫu in gửi yêu cầu xác nhận bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_IN = "C3KJCYWUW9PQ6CR";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Update khách hàng VIP (bảo lãnh)
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_KH_VIP = "Y34ZG034MIXOW50";
		/// <summary>
		/// Kiểm tra trùng sự kiện bảo lãnh CSYT
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_KIEM_TRA_TRUNG_CSYT = "DMXX0D7Z72O7M5E";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Thêm lần bảo lãnh sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_LAN_NH = "MYBWYWA6GWZTVH7";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Xem chi tiết quyền lợi
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_LAN_QLOI_CT = "YJSCJOH73MIN1H0";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Sửa quyền lợi sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_LAN_QLOI_SUA = "1BD67E6D5XV7A6Z";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Sửa lần bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_LAN_SUA = "JKVABHZ1SN4I699";
		/// <summary>
		/// Xóa lần bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_LAN_XOA = "LLSUY0ZEI7I3ZLQ";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Lấy danh sách hồ sơ bảo hiểm con người
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_LKE = "D3QT4O0KP8Q3MXA";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Lấy thông tin chi tiết hồ sơ sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_LKE_CT = "WWZDUD3UPE1TAAI";
		/// <summary>
		/// [MOBILE] -Tìm kiếm hồ sơ bảo lãnh trên app
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_MOBILE_LKE = "J1MFBKPDC8M8GDW";
		/// <summary>
		/// [MOBILE] - Thông tin chi tiết hồ sơ bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_MOBILE_LKE_CT = "11XRQKO2BPPWV09";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Nhập thông tin NDBH SK
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_NH = "9AOG9ASKEZ08QKX";
		/// <summary>
		/// Nhận hồ sơ bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_NHAN = "B72KI5YCFX3H3GS";
		/// <summary>
		/// [BLVP] Nhập chi tiết quyền lợi chi phí
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_QLOI_CHI_PHI_NH = "C5SQ5RSNAXHAP7I";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Xóa quyền lợi bh sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_QLOI_XOA = "5UWISY64ZSZHK78";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Từ chối bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_TU_CHOI = "L4WA2D16GD2B7RL";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Gỡ từ chối bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_TU_CHOI_XOA = "TN5PRSVGQHCJKO4";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Thay đổi cơ sở y tế
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_UPDATE_CSYT = "5C57RUEWIS9W1OM";
		/// <summary>
		/// Update thông tin người liên hệ 
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_UPDATE_NGUOI_LH = "HKUHDRL2ERO67QQ";
		/// <summary>
		/// Cập nhật người thông báo con người
		/// </summary>
		public const string PBH_BT_NG_HS_BAO_LANH_UPDATE_NGUOI_TB = "YMDEM16W92S6EHZ";
		/// <summary>
		/// Bảng kê thanh toán bồi thường bảo lãnh viện phí
		/// </summary>
		public const string PBH_BT_NG_HS_BC_BK_TTOAN_BLVP = "6EG9WGOI6KXSVFK";
		/// <summary>
		/// Bảng kê thanh toán bồi thường trực tiếp
		/// </summary>
		public const string PBH_BT_NG_HS_BC_BK_TTOAN_TRUC_TIEP = "RRA8HUKWUS2Z1VS";
		/// <summary>
		/// Danh sách hồ sơ chuyển kế toán [EXCEL]
		/// </summary>
		public const string PBH_BT_NG_HS_BC_BK_TTOAN_TRUC_TIEP_V2 = "QS4Y5DBV2D003KC";
		/// <summary>
		/// Bảng kê chi tiết hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_NG_HS_BC_CT = "VXYYS7F70PZZDCL";
		/// <summary>
		/// Báo cáo chi tiết hồ sơ bồi thường các lần khám
		/// </summary>
		public const string PBH_BT_NG_HS_BC_CT_LAN_KHAM = "KR8F2QD2YDMAL58";
		/// <summary>
		/// Bảng kê chi tiết hồ sơ chi tiết theo Quyền lợi bảo hiểm
		/// </summary>
		public const string PBH_BT_NG_HS_BC_CT_QUYEN_LOI = "KJOHHQH1PVUO7MG";
		/// <summary>
		/// Báo cáo dự phòng bồi thường
		/// </summary>
		public const string PBH_BT_NG_HS_BC_DU_PHONG = "8GQLE2YQ47N7XA2";
		/// <summary>
		/// Thống kê hồ sơ nhóm theo hình thức điều trị
		/// </summary>
		public const string PBH_BT_NG_HS_BC_TKE_HINH_THUC = "UAWF4Q2ZG60QRHJ";
		/// <summary>
		/// Thống kê hồ sơ nhóm theo nhóm nguyên nhân
		/// </summary>
		public const string PBH_BT_NG_HS_BC_TKE_NGUYEN_NHAN = "D9T5X0LFB3N63JY";
		/// <summary>
		/// Thống kê hồ sơ nhóm theo Quyền lợi được bảo hiểm
		/// </summary>
		public const string PBH_BT_NG_HS_BC_TKE_QUYEN_LOI = "ATHB0PG8QLLLTA8";
		/// <summary>
		/// Thống kê hồ sơ nhóm theo nhóm sản phẩm
		/// </summary>
		public const string PBH_BT_NG_HS_BC_TKE_SAN_PHAM = "DM9JHZ5P6LB77W0";
		/// <summary>
		/// Thống kê hồ sơ nhóm theo trạng thái xử lý
		/// </summary>
		public const string PBH_BT_NG_HS_BC_TKE_TRANG_THAI = "NZDBMKMYSIMYF7D";
		/// <summary>
		/// Lấy danh sách biểu mẫu báo cáo
		/// </summary>
		public const string PBH_BT_NG_HS_BIEU_MAU_BAO_CAO = "VVWRMIXZJS4112D";
		/// <summary>
		/// Cập nhật số hồ sơ con người
		/// </summary>
		public const string PBH_BT_NG_HS_CAP_NHAT_SO_HS = "2WMJXZ2EXVK4MK7";
		/// <summary>
		/// Lưu cấu hình gửi email hồ sơ khi duyệt
		/// </summary>
		public const string PBH_BT_NG_HS_CAU_HINH_EMAIL_NH = "MG6NRTCYM5BX6AH";
		/// <summary>
		/// Lấy danh sách hồ sơ chờ đóng con người
		/// </summary>
		public const string PBH_BT_NG_HS_CHO_DONG_LKE = "BRFG7U2AJQG0MNI";
		/// <summary>
		/// Lấy danh sách chứng từ sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_CHUNG_TU_LKE = "ERX1FYABVJXXLA9";
		/// <summary>
		/// Nhập chứng từ sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_CHUNG_TU_NH = "QDOUH4II3F94W50";
		/// <summary>
		/// Cập nhật thông tin OCR hóa đơn chứng từ con người
		/// </summary>
		public const string PBH_BT_NG_HS_CHUNG_TU_OCR_NH = "44950FZHMZGEF2F";
		/// <summary>
		/// OCR chung tu hoa don nhap
		/// </summary>
		public const string PBH_BT_NG_HS_CHUNG_TU_OCR_NH_NH = "GPNBGX19YUWVZRY";
		/// <summary>
		/// Xóa chứng từ sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_CHUNG_TU_XOA = "46J4ZHVGEOGZA0D";
		/// <summary>
		/// Chuyển người xử lý con người
		/// </summary>
		public const string PBH_BT_NG_HS_CHUYEN_NGUOI_XLY = "WXGYP3VEJWRM6H9";
		/// <summary>
		/// Chuyển thanh toán hồ sơ con người
		/// </summary>
		public const string PBH_BT_NG_HS_CHUYEN_THANH_TOAN = "SR5LAW0G28MWMMZ";
		/// <summary>
		/// Hủy chuyển thanh toán hồ sơ bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_CHUYEN_THANH_TOAN_HUY = "8QB39DDN7PP7WZY";
		/// <summary>
		/// Đóng hồ sơ thanh toán con người
		/// </summary>
		public const string PBH_BT_NG_HS_DONG_HS = "8LTUIMIZ0UK97AE";
		/// <summary>
		/// Báo cáo danh sách hồ chuyển thanh toán [Tính toán bồi thường con người]
		/// </summary>
		public const string PBH_BT_NG_HS_DS_CHUYEN_THANH_TOAN = "VV0BPK4GNOCCMKW";
		/// <summary>
		/// Đổi đối tượng bảo hiểm con người
		/// </summary>
		public const string PBH_BT_NG_HS_DT_UPDATE = "31Q45X45VFJLKDP";
		/// <summary>
		/// Mẫu in giấy yêu kiêm xác nhận bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_GIAY_YEU_CAU_IN = "VZGY952SS27CSYN";
		/// <summary>
		/// Mẫu in giấy yêu cầu trả tiền bh sức khỏe(tiếp nhận)
		/// </summary>
		public const string PBH_BT_NG_HS_GYC_TT_BH_IN = "ZBIGUVLPL40M2VO";
		/// <summary>
		/// Hủy đóng thanh toán hồ sơ con người
		/// </summary>
		public const string PBH_BT_NG_HS_HUY_DONG_HS = "RLTIMO33QP6H7BW";
		/// <summary>
		/// In ảnh bảo lãnh sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_IN_ANH = "EBHSJHOVG6UWKM3";
		/// <summary>
		/// Update khách hàng VIP
		/// </summary>
		public const string PBH_BT_NG_HS_KH_VIP = "O656A7VYETRZ4AP";
		/// <summary>
		/// Đóng lần tiếp nhận đóng hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_DONG = "RU4R1K9YBDX9VA2";
		/// <summary>
		/// Xuất báo cáo danh sách hồ sơ chuyển kế toán
		/// </summary>
		public const string PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_EXPORT_BC = "EHPZV37M7V4C643";
		/// <summary>
		/// Hủy đóng lần tiếp nhận đóng hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_HUY_DONG = "C27YS8VN0MX1E68";
		/// <summary>
		/// Lấy danh sách lần tiếp nhận đóng hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_LKE = "XA7B91U47ZOBTOQ";
		/// <summary>
		/// Lấy chi tiết lần tiếp nhận đóng hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_LKE_CT = "HOVVSKIKPCCDR92";
		/// <summary>
		/// Lưu lần tiếp nhận đóng hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_NH = "X7RSB3NZJ4S422G";
		/// <summary>
		/// Xóa lần tiếp nhận đóng hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_XOA = "N78P8Y7P88G0HBR";
		/// <summary>
		/// Lấy mẫu email sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_LAY_TTIN_EMAIL = "HF6E3KYUPYIV8VG";
		/// <summary>
		/// Lấy lịch sử tổn thất
		/// </summary>
		public const string PBH_BT_NG_HS_LSTT = "M5Y0LA6OZM5GV5I";
		/// <summary>
		/// Export danh sách lịch sử tổn thất con người
		/// </summary>
		public const string PBH_BT_NG_HS_LSTT_EXP = "1EZH0GOYFYISMBP";
		/// <summary>
		/// Lấy danh sách lịch sử tổn thất gom nhóm theo quyền lợi
		/// </summary>
		public const string PBH_BT_NG_HS_LSTT_GROUP = "RFOZHVUAKJ35U7Q";
		/// <summary>
		/// Lấy ra danh sách lịch sử tổn thất theo quyền lợi top 5 hợp đồng gần nhất
		/// </summary>
		public const string PBH_BT_NG_HS_LSTT_GROUP_TOP_5 = "URGZ8LH0T88UZK1";
		/// <summary>
		/// Lấy lịch sử tổn thất của gcn trong 5 hợp đồng gần nhất
		/// </summary>
		public const string PBH_BT_NG_HS_LSTT_TOP_5 = "LJV74N438TENK9N";
		/// <summary>
		/// Lấy top 5 hợp đồng tái tục của người được bảo hiểm
		/// </summary>
		public const string PBH_BT_NG_HS_LSTT_TOP_5_HD_TAI_TUC = "V6CQUIZLGXL87IL";
		/// <summary>
		/// Mẫu in phê duyệt phương án
		/// </summary>
		public const string PBH_BT_NG_HS_MAU_IN_PHE_DUYET_PA = "EYZLTV1TAC5USQV";
		/// <summary>
		/// Phân loại ảnh sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_PHAN_HANG_MUC = "DGJHEZ5YP9NZON7";
		/// <summary>
		/// Phân loại ảnh bênh viện
		/// </summary>
		public const string PBH_BT_NG_HS_PHAN_HANG_MUC_BV = "KCWGDNYP2UCGTBY";
		/// <summary>
		/// [TNVP BLVP TTVP] Lấy các quyền lợi chi tiết lịch sử tổn thất
		/// </summary>
		public const string PBH_BT_NG_HS_QLOI_LKE = "OPFC2BXPWIEGEK0";
		/// <summary>
		/// Lấy danh sách hồ sơ quyền lợi đã dùng
		/// </summary>
		public const string PBH_BT_NG_HS_QL_DA_DUNG = "OYU4RNNGZUODH82";
		/// <summary>
		/// Mẫu in thông báo bổ sung hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_TB_BO_SUNG_HO_SO_IN = "V2NA41A7OEMNCWB";
		/// <summary>
		/// Mẫu in thông báo phát sinh bảo lãnh viện phí
		/// </summary>
		public const string PBH_BT_NG_HS_TB_PHAT_SINH_BAO_LANH = "XO22OSPN2Q765CH";
		/// <summary>
		/// Mẫu in thông báo trả tiền bảo hiểm V2
		/// </summary>
		public const string PBH_BT_NG_HS_TB_TRA_TIEN_BH = "SDV9EBSUKO2N37J";
		/// <summary>
		/// Mẫu in trình duyệt bảo lãnh viện phí
		/// </summary>
		public const string PBH_BT_NG_HS_TB_TRINH_DUYET_BAO_LANH = "43O6EI16R7P8RD7";
		/// <summary>
		/// Mẫu in thông báo trình duyệt bảo lãnh viện phí
		/// </summary>
		public const string PBH_BT_NG_HS_TB_TRINH_DUYET_BAO_LANH_IN = "54YAXD5TYO6P2IU";
		/// <summary>
		/// Mẫu in thông báo trình duyệt phương án chi trả tiền bảo hiêm
		/// </summary>
		public const string PBH_BT_NG_HS_TB_TRINH_DUYET_PA_TRA_TIEN_BH = "OJHJ0M8GELPHTU2";
		/// <summary>
		/// Mẫu in phương án trả tiền bảo hiểm(tính toán)
		/// </summary>
		public const string PBH_BT_NG_HS_TB_TT_BH_IN = "8UDO0TW9Y6BMMPF";
		/// <summary>
		/// Lấy thông tin tiền hóa đơn chứng từ
		/// </summary>
		public const string PBH_BT_NG_HS_THU_HUONG_LAY_TT = "RZBPT4RG96PM12P";
		/// <summary>
		/// Nhập người hưởng thụ sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_THU_HUONG_NH = "T5GNJ0K18I4A3CF";
		/// <summary>
		/// Xóa người hưởng thụ sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_THU_HUONG_XOA = "OM19VD80TJPFMY0";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Chuyển hồ sơ tiếp nhận sang bộ phận tính toán
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_CHUYEN = "4O7WOS53XZ3HBGZ";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Hủy hồ sơ tiếp nhận bồi thường
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_HUY_HS = "09Y3UOO0Y2XEK1G";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Gỡ hủy hồ sơ tiếp nhận con người
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_HUY_HS_XOA = "4I1FMYTSMHH8TUA";
		/// <summary>
		/// [MAU_IN_NGUOI] - Tiếp nhận bồi thường con người
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_IN = "U7FH8189FR4UL4N";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Update khách hàng VIP (tiếp nhận)
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_KH_VIP = "MYQIDBLGMRXZ422";
		/// <summary>
		/// Lấy chi tiết lần nhận hồ sơ giấy tờ gốc chi tiết
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_CT_LKE_CT = "JUY71PHFVIALMHA";
		/// <summary>
		/// Lưu chi tiết lần bổ sung hồ sơ gốc
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_CT_NH = "ZMQX8U14W326KI4";
		/// <summary>
		/// Lấy danh sách lần nhận hồ sơ gốc
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_LKE = "0JTUZ3TOCBRG3X6";
		/// <summary>
		/// Xem chi tiết lần bổ sung hồ sơ gốc
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_LKE_CT = "8R4O9TJJT0DUFNH";
		/// <summary>
		/// Lưu lần nhận hồ sơ gốc
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_NH = "8YRI4YJ2FI4A9QX";
		/// <summary>
		/// Xóa tiếp nhận lần bổ sung hồ sơ gốc
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_X = "AS1P1XWXCYK3ZPW";
		/// <summary>
		/// Xác nhận lần bổ sung hồ sơ gốc
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_XAC_NHAN = "OR0V73TUNT78J0M";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Xem lần tiếp nhận hồ sơ mới nhất
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_CT = "W5WB0LN0B02WVV7";
		/// <summary>
		/// Kiểm tra trùng lần tiếp nhận
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_KIEM_TRA_TRUNG = "TTBLZNE7P2DLAEO";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Thêm hồ sơ tiếp nhận lần sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_NH = "RA4OY2L4548671X";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Xóa lần tiếp nhận hồ sơ sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LAN_XOA = "34LMOB2E7DW09XP";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Liệt kê hồ sơ tiếp nhận phần sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LKE = "OESEYLLP2KR3WC8";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Xem chi tiết hồ sơ bồi thường tiếp nhận
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LKE_CT = "V20HDF1EBSWVU8B";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Liệt kế các lần khám , yêu cầu tiếp nhận sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LKE_LAN = "FRKCWACV14QI1A8";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Xem thông tin chung hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_LKE_TTC = "DMPI25BFET7S2S4";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Lấy chi tiết người đươc bảo hiểm hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_NDBH_CT = "IQTKCK3B2F9WOQT";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Nhập hồ sơ tiếp nhận sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_NH = "F7OCSKMN1AQALI1";
		/// <summary>
		/// Tiếp nhận hồ sơ trực tiếp
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_NHAN_HS = "XYGFU4X00LKMH2V";
		/// <summary>
		/// [HSTT] Lưu chi phí chi tiết tiếp nhận trực tiếp
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_QLOI_CHI_PHI_NH = "IXORRP8QASX0CLK";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Lấy chi tiết quyền lợi hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_QLOI_CT = "O7JBORMWHZ1HGXD";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Thêm quyền lợi hồ sơ tiếp nhận lần sức khỏe
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_QLOI_NH = "ECM4TI1RVAM48Y0";
		/// <summary>
		/// [BTCN - TIẾP NHẬN] Xóa quyền lợi lần tiếp nhận hồ sơ
		/// </summary>
		public const string PBH_BT_NG_HS_TIEP_NHAN_QLOI_XOA = "K7KJ3VP8MO61WRV";
		/// <summary>
		/// Tìm kiếm người được bảo hiểm SK
		/// </summary>
		public const string PBH_BT_NG_HS_TIM_NDBH = "3BBXH1KGESUGWBR";
		/// <summary>
		/// Xuất báo cáo danh sách hồ sơ con người hủy
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_BAO_CAO_HS_HUY = "AJAMSKC8VNUW8T0";
		/// <summary>
		/// Copy hồ sơ con người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_COPY = "KB2W4OJ2SLONL7O";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Duyệt phương án chi trả (thông báo trả tiền bồi thường)
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_DUYET = "WTZGWB71TTIL2V0";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Hủy Duyệt phương án chi trả (thông báo trả tiền bồi thường)
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_DUYET_HUY = "IBDJWF9JNT845QH";
		/// <summary>
		/// Hủy hồ sơ tính toán con người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_HUY_HS = "F74P7UFT9IQBXGY";
		/// <summary>
		/// Gỡ hủy hồ sơ tính toán con người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_HUY_HS_XOA = "HLRPJQVXJAN3BVN";
		/// <summary>
		/// Mẫu in đề xuất bồi thường sức khỏe(tính toán bt)
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_IN = "MPV22D1BDQMNOKT";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Update khách hàng VIP (tính toán)
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_KH_VIP = "P4X9A2PD2CZZX9S";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Lấy chi tiết lần tính toán hồ sơ bồi thường con người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_LAN_CT = "S4JJKBRJKFGZOCF";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Tìm kiếm phân trang hồ sơ tính toán bồi thường con người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_LKE = "NMRC21AMOQQ7T3H";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Xem chi tiết 1 hồ sơ tính toán bồi thường
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_LKE_CT = "DA6QGWKLE2J9JYL";
		/// <summary>
		/// Xem hồ sơ tính toán trên mobile qrcode
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_MOBILE_LKE_CT = "4DWZPS69EZ4KR8L";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Nhận hồ sơ bồi thường từ bộ phận tiếp nhận chuyển sang
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_NHAN = "TBKU8OBTG31BR1S";
		/// <summary>
		/// [BLVP] Nhập chi tiết quyền lợi chi tiết
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_QLOI_CHI_PHI_NH = "1H8WEK51YL02Q4Z";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Nhập/sửa quyền lợi hồ sơ bồi thường con người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_QLOI_NH = "3UNLIHAHDWC75Z1";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Xóa quyền lợi lần tính toán hồ sơ con người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_QLOI_XOA = "IDC1Z6QMIVC76A6";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Trả lại hồ sơ bồi thường cho bộ phận tiếp nhận
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_TRA = "4CVJTRI37MR6T8P";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Từ chối bồi thường tính toán hồ sơ người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_TU_CHOI = "J7GOUWA2Y0RCSQD";
		/// <summary>
		/// [BTCN - TÍNH TOÁN] Hủy từ chối bồi thường tính toán hồ sơ người
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_TU_CHOI_XOA = "JG742AO73PA3252";
		/// <summary>
		/// Update thông tin tiếp nhận ở màn tính toán
		/// </summary>
		public const string PBH_BT_NG_HS_TINH_TOAN_UPDATE_TN = "65VCVXWBBJWSM9S";
		/// <summary>
		/// [BAO_LANH] Trình/duyệt bảo lãnh
		/// </summary>
		public const string PBH_BT_NG_HS_TRINH_DUYET_EMAIL = "KQ4L15YNT36PKQG";
		/// <summary>
		/// Mẫu in từ chối chi trả tiền bảo hiểm
		/// </summary>
		public const string PBH_BT_NG_HS_TU_CHOI_TIEN_BH_IN = "J11XAF9OKND482H";
		/// <summary>
		/// Cache danh mục bộ mã chung CSYT bệnh viện
		/// </summary>
		public const string PBH_BT_NG_MA_DANH_MUC_BV_CACHE = "FH4EMPW9D3431HN";
		/// <summary>
		/// Cache danh mục bộ mã chung CSYT
		/// </summary>
		public const string PBH_BT_NG_MA_DANH_MUC_CACHE = "XLK8XUW4CWVW4TD";
		/// <summary>
		/// Liệt kê bộ mã chung CSYT
		/// </summary>
		public const string PBH_BT_NG_MA_DANH_MUC_LKE = "KH47KOPLZF3DHJZ";
		/// <summary>
		/// Liệt kê chi tiết bộ mã chung CSYT
		/// </summary>
		public const string PBH_BT_NG_MA_DANH_MUC_LKE_CT = "0LLF3FN7YHCYNQ9";
		/// <summary>
		/// Nhập mã bộ mã chung CSYT
		/// </summary>
		public const string PBH_BT_NG_MA_DANH_MUC_NH = "9W6YWZQLORH96NB";
		/// <summary>
		/// Xóa bộ mã chung CSYT
		/// </summary>
		public const string PBH_BT_NG_MA_DANH_MUC_X = "L0LVHK6V7T6CCMY";
		/// <summary>
		/// Lấy danh sách quyền lợi gốc
		/// </summary>
		public const string PBH_BT_NG_QLOI_GOC_LKE_LHNV = "L3LT54K4W3AYUL8";
		/// <summary>
		/// Xem thông tin quyền lợi gốc
		/// </summary>
		public const string PBH_BT_NG_QLOI_GOC_LKE_TT = "ASR4CRIENSJVAC2";
		/// <summary>
		/// Lấy danh sách quyền lợi gốc
		/// </summary>
		public const string PBH_BT_NG_QLOI_GOC_XEM = "B1IVPWSTCT22IBL";
		/// <summary>
		/// Lấy danh sách quyền lợi từ hệ thống MIC tích hợp sang ESCS
		/// </summary>
		public const string PBH_BT_NG_QLOI_MIC_XEM = "Y8Y4HBV1V9V8M0L";
		/// <summary>
		/// Liệt kê thông tin SLA con người
		/// </summary>
		public const string PBH_BT_NG_SLA_KQ_LKE = "6V9XU4AEIQOZKE7";
		/// <summary>
		/// Lấy chi tiết SLA con người
		/// </summary>
		public const string PBH_BT_NG_SLA_LKE_CT = "43JS5NPP2UTODY2";
		/// <summary>
		/// Lưu cấu hình SLA con người
		/// </summary>
		public const string PBH_BT_NG_SLA_NH = "FBN4ZRQGSLT4RUK";
		/// <summary>
		/// Đóng nhiều hồ sơ cùng lúc
		/// </summary>
		public const string PBH_BT_NG_THANH_TOAN_TON_DONG_NHIEU_HS = "VPYNZMNOA78YBLH";
		/// <summary>
		/// Liệt kê + phân trang thanh toán tồn con người
		/// </summary>
		public const string PBH_BT_NG_THANH_TOAN_TON_LKE = "Q5HH7LLBW3TL8MZ";
		/// <summary>
		/// Toàn bộ thông tin phần con người
		/// </summary>
		public const string PBH_BT_NG_TOAN_BO_THONG_TIN_HO_SO = "GYQWMSK78D2JZUI";
		/// <summary>
		/// Lấy danh sách trạng thái con người
		/// </summary>
		public const string PBH_BT_NG_TRANG_THAI_LKE = "ZLY6T8W4QA79WC2";
		/// <summary>
		/// Lấy ước tổn thất - con người
		/// </summary>
		public const string PBH_BT_NG_UOC_TON_THAT_CT = "QR5BVTHZD6J8VW2";
		/// <summary>
		/// Lưu ước tổn thất - con người
		/// </summary>
		public const string PBH_BT_NG_UOC_TON_THAT_NH = "HE8YU96GIKBOAG8";
		/// <summary>
		/// Liệt kê danh sách sự kiện bảo hiểm
		/// </summary>
		public const string PBH_BT_NHOM_SU_KIEN_LKE = "1AI2B2ZZ6NJU68M";
		/// <summary>
		/// Liệt kê chi tiết sự kiện bảo hiểm
		/// </summary>
		public const string PBH_BT_NHOM_SU_KIEN_LKE_CT = "G16OZLCU5NA0ICQ";
		/// <summary>
		/// Nhập thông tin sự kiện bảo hiểm
		/// </summary>
		public const string PBH_BT_NHOM_SU_KIEN_NH = "96OFZCQVNIR4H38";
		/// <summary>
		/// Tìm kiếm nhóm sự kiện bảo hiểm
		/// </summary>
		public const string PBH_BT_NHOM_SU_KIEN_TKIEM = "7ZB4PGY0PLD9M95";
		/// <summary>
		/// Xóa sự kiện bảo hiểm
		/// </summary>
		public const string PBH_BT_NHOM_SU_KIEN_X = "AE7XT07OLGAA6HF";
		/// <summary>
		/// Liệt kê danh sách nội dung ghi chú
		/// </summary>
		public const string PBH_BT_NOI_DUNG_LKE = "KCFBSIFNEDVWDEJ";
		/// <summary>
		/// Liệt kê chi tiết nội dung ghi chú
		/// </summary>
		public const string PBH_BT_NOI_DUNG_LKE_CT = "LCKOXHFJGAQ4FTJ";
		/// <summary>
		/// Nhập thông tin ghi chú
		/// </summary>
		public const string PBH_BT_NOI_DUNG_NH = "HWGG90GDJ2BJCZF";
		/// <summary>
		/// Xóa nội dung ghi chú
		/// </summary>
		public const string PBH_BT_NOI_DUNG_X = "GTCGYVC15LJPPWN";
		/// <summary>
		/// Copy người dùng
		/// </summary>
		public const string PBH_BT_NSD_COPY = "PV1GNNY9H5AIW7X";
		/// <summary>
		/// Copy phân cấp
		/// </summary>
		public const string PBH_BT_PHAN_CAP_COPY = "U5HBXKD9U1GERMQ";
		/// <summary>
		/// Lấy thông tin phân cấp người dùng
		/// </summary>
		public const string PBH_BT_PHAN_CAP_LKE_CT = "31AESO7X6SAM27X";
		/// <summary>
		/// [Phân cấp] Danh sách ngày phân cấp
		/// </summary>
		public const string PBH_BT_PHAN_CAP_LKE_NGAY = "LL0T562GBX2JPLH";
		/// <summary>
		/// Liệt kê chi tiết phân cấp ngày
		/// </summary>
		public const string PBH_BT_PHAN_CAP_NGAY_LKE_CT = "YZMNF2TW8PAGNMU";
		/// <summary>
		/// Cập nhật ngày phân cấp
		/// </summary>
		public const string PBH_BT_PHAN_CAP_NGAY_NH = "ZLVMISVBN9XWXJR";
		/// <summary>
		/// Xóa phân cấp ngày
		/// </summary>
		public const string PBH_BT_PHAN_CAP_NGAY_X = "LKVZGDCVUNM5H8E";
		/// <summary>
		/// Lưu phân cấp giám định bồi thường
		/// </summary>
		public const string PBH_BT_PHAN_CAP_NH = "UJITBEAQHB3GSOC";
		/// <summary>
		/// Liệt kê phân cấp tạm ứng
		/// </summary>
		public const string PBH_BT_PHAN_CAP_TAM_UNG_THANH_TOAN_LKE = "6SJDTP9CIT6T7G0";
		/// <summary>
		/// Nhập phân cấp tạm ứng thanh toán
		/// </summary>
		public const string PBH_BT_PHAN_CAP_TAM_UNG_THANH_TOAN_NH = "NAA2TF31AKY4GK7";
		/// <summary>
		/// Liệt kê danh sách phân công giám định
		/// </summary>
		public const string PBH_BT_PHAN_CONG_GD_LKE = "X489JVUPY93C5YF";
		/// <summary>
		/// Liệt kê chi tiết thông tin phân nhóm giám định
		/// </summary>
		public const string PBH_BT_PHAN_CONG_GD_LKE_CT = "GD5DRWR3N5U49PX";
		/// <summary>
		/// Nhập thông tin phân nhóm giám định
		/// </summary>
		public const string PBH_BT_PHAN_CONG_GD_NH = "HNUFU86ORN5HP2E";
		/// <summary>
		/// Lấy danh sách cán bộ giám định
		/// </summary>
		public const string PBH_BT_PHAN_CONG_GD_NSD_LKE = "CXQPS4AHHJGLT20";
		/// <summary>
		/// Lấy danh sách thành viên của nhóm phân công GDVHT
		/// </summary>
		public const string PBH_BT_PHAN_CONG_GD_NSD_THEO_TRUONG_NHOM_LKE = "B0H3P8SEEFL0DFD";
		/// <summary>
		/// Xóa thông tin phân công giám định nhóm
		/// </summary>
		public const string PBH_BT_PHAN_CONG_GD_XOA = "1BL3O3XY5M3SQFM";
		/// <summary>
		/// Duyệt tạm ứng, thanh lý, thu đòi
		/// </summary>
		public const string PBH_BT_PHE_DUYET_KHAC_NH = "UBM5PVP15E8E5SJ";
		/// <summary>
		/// Hủy duyệt tạm ứng, thanh ly, thu đòi
		/// </summary>
		public const string PBH_BT_PHE_DUYET_KHAC_XOA = "H6GVRXR3217YF0F";
		/// <summary>
		/// Liệt kê thông tin phê duyệt chi tiết
		/// </summary>
		public const string PBH_BT_PHE_DUYET_LKE_CT = "VP72A0QFAFXCGSR";
		/// <summary>
		/// Duyệt hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_PHE_DUYET_NH = "G549BIKL1GWYGQS";
		/// <summary>
		/// [MOBILE - GIAMDINH] - Duyệt bồi thường - Từ chối duyệt
		/// </summary>
		public const string PBH_BT_PHE_DUYET_TU_CHOI = "RFGZTKSE9UL1DIQ";
		/// <summary>
		/// Gỡ duyệt giám định / bồi thường
		/// </summary>
		public const string PBH_BT_PHE_DUYET_XOA = "GDU17F19CV39AZD";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Báo cáo vi phạm SLA
		/// </summary>
		public const string PBH_BT_SLA_BC_VI_PHAM = "6RGS0FMWUT7LB6G";
		/// <summary>
		/// Liệt kê thông tin tiến trình SLA
		/// </summary>
		public const string PBH_BT_SLA_KQ_LKE = "DAAKM926N0IW39Z";
		/// <summary>
		/// Liệt kê thông tin SLA
		/// </summary>
		public const string PBH_BT_SLA_LKE_CT = "YI2MH0O3KOAYUVN";
		/// <summary>
		/// Nhập thông tin SLA
		/// </summary>
		public const string PBH_BT_SLA_LKE_NH = "J91QNO0PZQ2ZHER";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Báo cáo SLA
		/// </summary>
		public const string PBH_BT_SLA_MIC_XE_BC = "K3MLI5H9TKKAI8D";
		/// <summary>
		/// Nhập thông tin cấu hình SLA
		/// </summary>
		public const string PBH_BT_SLA_NH = "R9XM5Q4BCRE07D0";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Báo cáo năng suất SLA
		/// </summary>
		public const string PBH_BT_SLA_NSLD = "GMALQVVNDTW163H";
		/// <summary>
		/// Tìm kiếm sự kiện bảo hiểm
		/// </summary>
		public const string PBH_BT_SU_KIEN_BAO_HIEM_LKE = "4CJWII6FDG1QSL6";
		/// <summary>
		/// Thêm mới sự kiện bảo hiểm
		/// </summary>
		public const string PBH_BT_SU_KIEN_BAO_HIEM_NH = "32U2PZPKUC8N6VW";
		/// <summary>
		/// Danh sách sự kiện bảo hiểm theo vụ tổn thất
		/// </summary>
		public const string PBH_BT_SU_KIEN_BAO_HIEM_TKIEM = "ZSEBQAWLFCFPF5N";
		/// <summary>
		/// Tìm kiếm phân trang danh sách tạm ứng bồi thường
		/// </summary>
		public const string PBH_BT_TAM_UNG_LKE = "H19WHUEZZ0C3QLC";
		/// <summary>
		/// Báo cáo hồ sơ đề nghị chưa thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_ALL_EXP = "ZLL9SURSYS81MLX";
		/// <summary>
		/// Liệt kê + phân trang hoàn quỹ 
		/// </summary>
		public const string PBH_BT_THANH_TOAN_CT_HOAN_QUY_LKE = "4RJQLIU4BRERQ11";
		/// <summary>
		/// Liệt kê chi tiết thong tin hoàn quỹ
		/// </summary>
		public const string PBH_BT_THANH_TOAN_CT_HOAN_QUY_LKE_CT = "KPQJIBNS7BHTZ0O";
		/// <summary>
		/// Nhập thông tin hoàn quỹ
		/// </summary>
		public const string PBH_BT_THANH_TOAN_CT_HOAN_QUY_NH = "BQDTQZJR30P2HQI";
		/// <summary>
		/// Xóa thông tin hoàn quỹ
		/// </summary>
		public const string PBH_BT_THANH_TOAN_CT_HOAN_QUY_X = "W2UYXEGKMEL05VB";
		/// <summary>
		/// Liệt kê hồ sơ hoàn quỹ
		/// </summary>
		public const string PBH_BT_THANH_TOAN_CT_LKE = "3JEITLOGBLVF6L6";
		/// <summary>
		/// Tìm kiếm hồ sơ thanh toán chi tiết
		/// </summary>
		public const string PBH_BT_THANH_TOAN_CT_TKIEM = "N52PAOUV5PG7VYZ";
		/// <summary>
		/// Báo cáo hồ sơ thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_EXP = "QRQGS589GEAZ9J4";
		/// <summary>
		/// Gỡ xác nhận thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_HUY_XAC_NHAN = "PAIE5RMRKA4JMPC";
		/// <summary>
		/// Import excel danh sách hồ sơ thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_IMPORT_EXCEL = "250F4LZQHJHR98N";
		/// <summary>
		/// Liệt kê danh sách thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_LKE = "BGN51BYLS9PKHZL";
		/// <summary>
		/// Lấy chi tiết hồ sơ thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_LKE_CT = "32EDLIMTOR5XELB";
		/// <summary>
		/// Lấy tất cả danh sách hồ sơ tồn thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_LKE_TATCA = "F9HX12ISHNPR78X";
		/// <summary>
		/// Liệt kê danh sách thanh toán tồn
		/// </summary>
		public const string PBH_BT_THANH_TOAN_LKE_TON = "7A7M09S03GIPUIW";
		/// <summary>
		/// Lấy danh sách mapping danh hồ sơ tồn
		/// </summary>
		public const string PBH_BT_THANH_TOAN_MAPPING_EXCEL = "OAW8BQZ4IRMD28C";
		/// <summary>
		/// Template import danh sách hồ sơ đề nghị thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_MAU_EXP = "RZIQ1TSKND8KC8G";
		/// <summary>
		/// Nhập hồ sơ thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_NH = "MG09MTP5P0Y3YEH";
		/// <summary>
		/// Liệt kê hồ sơ chờ thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_TON_LKE = "052C3PIUVU2ES6U";
		/// <summary>
		/// Xác nhận thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_XAC_NHAN = "GL57CU4C5T7189A";
		/// <summary>
		/// Lấy danh sách hồ sơ tích hợp thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_XAC_NHAN_LKE_TICH_HOP = "3MIUWF2WHQGYLK7";
		/// <summary>
		/// Xóa hồ sơ thanh toán
		/// </summary>
		public const string PBH_BT_THANH_TOAN_XOA = "WV9QLQVKP3452D5";
		/// <summary>
		/// Lấy thông tin đối tác
		/// </summary>
		public const string PBH_BT_THONG_TIN_DOI_TAC = "9DFQT3PEROGDQH1";
		/// <summary>
		/// Lấy thông tin chứng từ
		/// </summary>
		public const string PBH_BT_THONG_TIN_DOI_TAC_CHUNG_TU = "J4X1JJ8TZLT7AUQ";
		/// <summary>
		/// [MOBILE] - Load thông tin chứng từ, thụ hưởng theo loại
		/// </summary>
		public const string PBH_BT_THONG_TIN_DOI_TAC_CHUNG_TU_MOBILE = "TBWBHGLLUUYOCF0";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin đối tác chứng từ
		/// </summary>
		public const string PBH_BT_THONG_TIN_DOI_TAC_CHUNG_TU_XE_MAY = "7ZPGA1Y1RHGIKY9";
		/// <summary>
		/// [XE_MAY_MOBILE] - Load thông tin chứng từ thụ hưởng
		/// </summary>
		public const string PBH_BT_THONG_TIN_DOI_TAC_CHUNG_TU_XE_MAY_MOBILE = "FRTZMDEL6JA192F";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin đối tác
		/// </summary>
		public const string PBH_BT_THONG_TIN_DOI_TAC_XE_MAY = "79JPSURIEYIDZIB";
		/// <summary>
		/// Export danh mục tiêu chuẩn thời gian KPI
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_KPI_EXP = "9W7BMNK6537NIO6";
		/// <summary>
		/// Nhập tiêu chí kpi
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_KPI_NH = "SBP94CX0Y5JR1OZ";
		/// <summary>
		/// Xem cấu hình tiêu chí kpi
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_LKE = "JJD33FIYXYISKT4";
		/// <summary>
		/// Liệt kê chi tiết tiêu chí kpi 
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_LKE_CT = "1J0T1F6FCFTM6IF";
		/// <summary>
		/// Liệt kê ngày + tiền
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_LKE_LKE = "6H2PMKK2JO37L6P";
		/// <summary>
		/// Liệt kê danh sách tiền [xe-kpi]
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_LKE_TIEN = "KJDF1RRU8A7RE4A";
		/// <summary>
		/// Thêm ngày áp dụng kpi
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_NGAY_NH = "ER4C2RVMU4EFCTV";
		/// <summary>
		/// Nhập thông tin tiến trình KPI
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_NHAP = "XBJMW0FMFFCX5EI";
		/// <summary>
		/// Thêm số tiền bồi thường kpi
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_TIEN_NH = "H1TBHGLRAS40G94";
		/// <summary>
		/// Xóa tiêu chí kpi
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_KPI_XOA = "579DTOEAOJH3M8U";
		/// <summary>
		/// Tiến trình bồi thường xe
		/// </summary>
		public const string PBH_BT_TIEN_TRINH_XE_LKE = "S9IFZLWJ3V34TIY";
		/// <summary>
		/// Tiếp nhận bảo lãnh bệnh viện (Cache)
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_CACHE = "BYGR3TMEGBQWUO7";
		/// <summary>
		/// Chuyển hồ sơ tiếp nhận bảo lãnh từ bệnh viện qua công ty bảo hiểm
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_CHUYEN = "ILDB4KWCA3IA16C";
		/// <summary>
		/// Hủy chuyển hồ sơ qua công ty bảo hiểm tiếp nhận bảo lãnh bệnh viện
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_CHUYEN_XOA = "4Y7WHMD2YGFGZSN";
		/// <summary>
		/// Copy lần tiếp nhận bảo lãnh bệnh viện
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_COPY = "YM5UG8AINZAMW1D";
		/// <summary>
		/// Thêm lần bảo lãnh tiếp nhận bảo lãnh viện phí
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_LAN_NH = "ILEKK6I8BEG2P1Z";
		/// <summary>
		/// Xóa lần tiếp nhận bảo lãnh
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_LAN_XOA = "N6AG7PUJO7LLJSW";
		/// <summary>
		/// Tìm kiếm phân trang tiếp nhận bảo lãnh bệnh viện
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_LKE = "QR49Y0THOE86BTF";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Lấy thông tin chi tiết hồ sơ tiếp nhận bảo lãnh sức khỏe
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_LKE_CT = "V8RROYU66SD73KQ";
		/// <summary>
		/// Lấy chi tiết người được bh tiếp nhận bao r lãnh bệnh viện
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_NDBH_CT = "ZYDP1V9RYA4EDMX";
		/// <summary>
		/// [BTCN - BẢO LÃNH] Nhập thông tin NDBH SK bệnh viện
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_NH = "3HWAUSZ6KDSI56V";
		/// <summary>
		/// [CSYT] Nhập chi phí chi tiết quyền lợi lần tiếp nhận bảo lãnh
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_QLOI_CHI_PHI_NH = "NU14S0P828NSZU8";
		/// <summary>
		/// Xóa quyền lợi lần tiếp nhận bảo lãnh bệnh viện
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_QLOI_XOA = "1AUJ5UC1882C5JF";
		/// <summary>
		/// Tìm kiếm người được bảo hiểm SK bệnh viện
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_BAO_LANH_TIM_NDBH = "7J7E8FJC1UUYJHZ";
		/// <summary>
		/// Chuyển bồi thường
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_CHUYEN = "HCOB6FHGS4SUSGW";
		/// <summary>
		/// [MOBILE] - Tiếp nhận giám định nhập
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_GD_MOBILE_NH = "9M6DMB6R4288RW8";
		/// <summary>
		/// Contact Center nhập thông tin giám định
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_GIAM_DINH_NH = "S41CMF0HPBGIGJM";
		/// <summary>
		/// Gỡ hủy hồ sơ tiếp nhận xe
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_GO_HUY = "7XZ5CPNKSSDSSZ5";
		/// <summary>
		/// Hủy hồ sơ tiếp nhận xe
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_HUY = "2KEEIEMT3YWR52J";
		/// <summary>
		/// Liệt kê danh sách vụ tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_LH_LKE = "19XS8EQ21YLUMKE";
		/// <summary>
		/// Nhập lần tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_LH_NH = "72OMK6YV8RS3DZN";
		/// <summary>
		/// Liệt kê danh sách hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_LKE = "6GFGKS99JDLSKVV";
		/// <summary>
		/// Lấy thông tin chi tiết hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_LKE_CT = "DCURYW7D4A2TV0U";
		/// <summary>
		/// [MOBILE] - Tiếp nhận chuyển giám định
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_MOBILE_CHUYEN = "YQGD6OM223MS6GQ";
		/// <summary>
		/// [MOBILE] - Gỡ hủy hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_MOBILE_GO_HUY = "890WE5E6Q7589QN";
		/// <summary>
		/// [MOBILE] - Hủy hồ sơ tiếp nhận 
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_MOBILE_HUY = "N8XPIGE8K8XK0IG";
		/// <summary>
		/// [MOBILE] - Lấy danh sách hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_MOBILE_LKE = "W8B30BFE7Y3IJHA";
		/// <summary>
		/// [MOBILE] - Xem thông tin chi tiết hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_MOBILE_LKE_CT = "DYHDPGC81W7JCYN";
		/// <summary>
		/// [App GD] - GĐ hiện trường Mở hồ sơ tiếp nhận 
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_MOBILE_NH = "IXXTMII6YEF6029";
		/// <summary>
		/// Nhập hồ sơ tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_NH = "9YC1HJZH01F593S";
		/// <summary>
		/// Kiểm tra số vụ tổn thất xảy ra trong cùng 1 ngày
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_VU_TT_KTRA = "Z64HCNO941L66GO";
		/// <summary>
		/// [MOBILE] - Nhập thông tin vụ tổn thất
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_VU_TT_MOBILE_NH = "2ZFSBAAJQS8V1UI";
		/// <summary>
		/// [MOBILE] - Xóa thông tin vụ tổn thất
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_VU_TT_MOBILE_XOA = "2D42W5H6XZDMJS1";
		/// <summary>
		/// Nhập vụ tổn thất ở trang tiếp nhận
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_VU_TT_NH = "XN7VFSNRY4V1E6Y";
		/// <summary>
		/// Xóa tiếp nhận vụ tổn thất CCCT
		/// </summary>
		public const string PBH_BT_TIEP_NHAN_VU_TT_XOA = "2VLU7Y077H7B7HS";
		/// <summary>
		/// Lấy danh sách các control ẩn hiện
		/// </summary>
		public const string PBH_BT_TRANG_THAI_TEN_AN_HIEN = "GZARMDYRWOQH4P0";
		/// <summary>
		/// Danh sách các control ẩn hiện tiếp nhận bảo lãnh
		/// </summary>
		public const string PBH_BT_TRANG_THAI_TEN_BV_AN_HIEN = "S1BG6MYQ2YC31DW";
		/// <summary>
		/// Liệt kê danh sách trạng thái tên
		/// </summary>
		public const string PBH_BT_TRANG_THAI_TEN_LKE = "DFSN9NQTD7FIGAF";
		/// <summary>
		/// Liệt kê chi tiết trạng thái tên
		/// </summary>
		public const string PBH_BT_TRANG_THAI_TEN_LKE_CT = "YG1EX7OOS9CWEBV";
		/// <summary>
		/// Nhập thông tin trạng thái tên
		/// </summary>
		public const string PBH_BT_TRANG_THAI_TEN_NHAP = "N1H7KG64CO1SRGS";
		/// <summary>
		/// Lấy dánh sách trạng thái tên
		/// </summary>
		public const string PBH_BT_TRANG_THAI_TEN_TKIEM = "SCCOT6CFTYD0VWT";
		/// <summary>
		/// [BENH_VIEN] Liệt kê cán bộ trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_BV_LKE = "BAY5CZCQK4ABV1C";
		/// <summary>
		/// [BENH_VIEN] Thêm cán bộ trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_BV_NH = "PA6LR86BV3C8UDW";
		/// <summary>
		/// [BENH_VIEN] Xóa cán bộ trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_BV_XOA = "I2HY9QVJV22BQZ3";
		/// <summary>
		/// Liệt kê danh sách người tham gia trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_LKE = "4V5JU0GSCC4E0JP";
		/// <summary>
		/// [BENH_VIEN] Liệt kê + phân trang nội dung trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_ND_BV_LKE = "3NA8M4V78R9D33Y";
		/// <summary>
		/// [BENH_VIEN] Nhập nôi dung trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_ND_BV_NH = "KR073BAWVESDICR";
		/// <summary>
		/// Liệt kê danh sách nội dung trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_ND_LKE = "OEQCBCF9EEHGRJB";
		/// <summary>
		/// Nhập nội dung trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_ND_NH = "I62MX1EGPBJV1S8";
		/// <summary>
		/// Thêm người tham gia trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_NH = "M4R8MAWULERLMM8";
		/// <summary>
		/// Xóa người tham gia trao đổi
		/// </summary>
		public const string PBH_BT_TRAO_DOI_XOA = "8YGOPVCUR726ICI";
		/// <summary>
		/// Xem thông tin phê duyệt tạm ứng, thanh lý, thu đòi
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_KHAC_LKE = "AQBX8WFYA9JE50E";
		/// <summary>
		/// Chi tiết phê duyệt tạm ứng thanh lý thu đòi
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_KHAC_LKE_CT = "1K4785SY7AM4T2D";
		/// <summary>
		/// Phê duyệt khác
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_KHAC_NH = "CNR9D9DYKZOLQTH";
		/// <summary>
		/// Hủy duyệt khác
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_KHAC_XOA = "6YVNA30PQFC6CC2";
		/// <summary>
		/// Liệt kê lịch sử trình duyệt
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_LICH_SU_LKE = "U4V3DZN69BOX0ZH";
		/// <summary>
		/// TÌm kiếm hồ sơ duyệt bồi thường
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_LKE = "UU20DDM15EJZRYJ";
		/// <summary>
		/// Cán bộ thêm lần trình duyệt 
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_NH = "AIYP01S2EQ3JEJQ";
		/// <summary>
		/// Trả ra các lãnh đạo để duyệt bồi thường
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_NSD_LKE = "5HSW7JI1F3Z0LDV";
		/// <summary>
		/// Trình duyệt hồ sơ
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_N_NH = "T11RSV5LOQA3RML";
		/// <summary>
		/// Cán bộ xóa trình duyệt bồi thường 
		/// </summary>
		public const string PBH_BT_TRINH_DUYET_XOA = "YUGLXDP36UKPQRA";
		/// <summary>
		/// [BC] - Xe báo cáo chu kỳ
		/// </summary>
		public const string PBH_BT_XE_BC_CHU_KY = "I5Q9ZSVHX6E85TE";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Báo cáo hồ sơ chưa giải quyết
		/// </summary>
		public const string PBH_BT_XE_BC_HS_CHUA_GIAI_QUYET = "MCV50H3P9VHRL76";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Báo cáo hồ sơ đã giải quyết
		/// </summary>
		public const string PBH_BT_XE_BC_HS_DA_GIAI_QUYET = "CPGOITUZGKSNEJI";
		/// <summary>
		/// Mẫu in biển bản xác minh hiện trường
		/// </summary>
		public const string PBH_BT_XE_BIEN_BAN_XAC_MINH_IN_OPES = "AOEA8LQY3C6YEL7";
		/// <summary>
		/// Tìm kiếm hồ sơ bồi thường xe ô tô
		/// </summary>
		public const string PBH_BT_XE_BT_LKE = "Z69W5N89XV26S5D";
		/// <summary>
		/// Xem chi tiết hồ sơ bồi thường xe ô tô
		/// </summary>
		public const string PBH_BT_XE_BT_LKE_CT = "4YKUJ5IVZSN509A";
		/// <summary>
		/// Liệt kê danh sách thông báo cảnh báo
		/// </summary>
		public const string PBH_BT_XE_CANH_BAO_LKE_CT = "OIM3JJ3VVKXDCKG";
		/// <summary>
		/// Cập nhật thông tin ocr
		/// </summary>
		public const string PBH_BT_XE_CAP_NHAT_OCR = "Y06VFE1ZO438OFY";
		/// <summary>
		/// Liệt kê cấu hình bồi thường
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_BOI_THUONG_LKE = "278ZE4EW2JNHQ5I";
		/// <summary>
		/// Nhập cấu hình bồi thường xe
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_BOI_THUONG_NH = "3GRBXJ29XUWY646";
		/// <summary>
		/// Xóa cấu hình bồi thường
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_BOI_THUONG_X = "DSJF677SD6JCH6N";
		/// <summary>
		/// Liệt kê chi tiết cấu hình phế
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_LKE_CT = "JWT29MI6ZPAIUH4";
		/// <summary>
		/// Nhập cấu hình xe
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_NH = "IPSKE6HPXDI0M5O";
		/// <summary>
		/// Xóa cấu hình chung xe ô tô
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_X = "OA049QGHES150II";
		/// <summary>
		/// Liệt kê thông tin cấu hình xử lý
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_XLY_LKE = "X9VPX4PN18JPUBO";
		/// <summary>
		/// Nhập thông tin cấu hình xử lý hồ sơ
		/// </summary>
		public const string PBH_BT_XE_CAU_HINH_XLY_NH = "7RU24L66EDOX34N";
		/// <summary>
		/// Liệt kê danh sách chi phí cẩu kéo
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_CAU_KEO_LKE = "34Q2TO6ZSBNK7W8";
		/// <summary>
		/// Liệt kê chi tiết thông tin chi phí cẩu kéo
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_CAU_KEO_LKE_CT = "RPJAY8QTPJZJ7EH";
		/// <summary>
		/// Nhập thông tin chi phí cẩu kéo
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_CAU_KEO_NH = "QHMK9O4ZIUVHVO3";
		/// <summary>
		/// Xóa thông tin chi phí cẩu kéo
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_CAU_KEO_X = "IRKDDUDIZDYLRO3";
		/// <summary>
		/// Danh sách chi phí khác
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_KHAC_HS_LKE = "V5B7Q4N9DDFG0R4";
		/// <summary>
		/// Lưu thông tin tính toán chi phí khác
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_KHAC_HS_NH = "L0PUKF8C7GGPB7U";
		/// <summary>
		/// Liệt kê + phân trang chi phí khác
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_KHAC_LKE = "VIIPFMIW1R4JUQH";
		/// <summary>
		/// Liệt kê thông tin chi tiết chi phí khác
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_KHAC_LKE_CT = "QR4IFDPG1YSJ8Y4";
		/// <summary>
		/// Liệt kê thông tin đơn vị (giám định, cẩu kéo, khác)
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_KHAC_LKE_LKE = "GFQUO4EFFXM7L66";
		/// <summary>
		/// Nhập thông tin chi phí khác
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_KHAC_NH = "JK8UV0JFM0FBMJJ";
		/// <summary>
		/// Xóa thông tin chi phí khác
		/// </summary>
		public const string PBH_BT_XE_CHI_PHI_KHAC_X = "RYLEXV8G4XXDFKH";
		/// <summary>
		/// Hiện thông tin trên Dashboard xe o to trang Home
		/// </summary>
		public const string PBH_BT_XE_DASHBOARD = "38P010AA2CQ0MQ9";
		/// <summary>
		/// Lấy thông tin dashboard xe ô tô phân tích 1
		/// </summary>
		public const string PBH_BT_XE_DASHBOARD_1 = "D3NG34E6SM5CFDH";
		/// <summary>
		/// Lấy thông tin dashboard xe ô tô phân tích 2
		/// </summary>
		public const string PBH_BT_XE_DASHBOARD_2 = "A9RU0VAA6OP0LNU";
		/// <summary>
		/// Liệt kê chi tiết dashboard bồi thường xe
		/// </summary>
		public const string PBH_BT_XE_DASHBOARD_CT = "TXADL26R74Z3BJ0";
		/// <summary>
		/// Lấy thông tin dashboard tiến trình giải quyết xe
		/// </summary>
		public const string PBH_BT_XE_DASHBOARD_SLA = "LJKCVBV5GR97U5U";
		/// <summary>
		/// Tìm kiếm thông tin hồ sơ ngoài trang chủ
		/// </summary>
		public const string PBH_BT_XE_DASHBOARD_TIM_KIEM = "CQTT8SORUQ01HPS";
		/// <summary>
		/// Lấy thông tin địa bàn của giám định viên
		/// </summary>
		public const string PBH_BT_XE_DIA_BAN_GD_LKE = "M9WO7114IZAA734";
		/// <summary>
		/// Lưu thông tin phân địa bàn giám định
		/// </summary>
		public const string PBH_BT_XE_DIA_BAN_GD_NH = "UJJU1G16SYQRZSO";
		/// <summary>
		/// Lấy danh sách giám định viên theo địa bàn
		/// </summary>
		public const string PBH_BT_XE_DIA_BAN_GD_NSD = "SGRKCV4SAV5ZX5H";
		/// <summary>
		/// Lấy danh sách đối tượng tổn thất
		/// </summary>
		public const string PBH_BT_XE_DOI_TUONG_TON_THAT_LKE = "P3J4ZIYBMRD7A59";
		/// <summary>
		/// Lưu đối tượng tổn thất
		/// </summary>
		public const string PBH_BT_XE_DOI_TUONG_TON_THAT_NH = "W3K6HV834EFXQGT";
		/// <summary>
		/// Xóa đối tượng tổn thất của hồ sơ
		/// </summary>
		public const string PBH_BT_XE_DOI_TUONG_TON_THAT_XOA = "Q2LGLC4KIIW3NEI";
		/// <summary>
		/// Thủ tục in biên bản giám định / biên bản bàn giao
		/// </summary>
		public const string PBH_BT_XE_GD_BBBG_IN = "0HK41KDVMF5PC7T";
		/// <summary>
		/// Biên bản giám định xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_BBBG_IN_V2 = "ZU23KHP0JGS71GS";
		/// <summary>
		/// Biên bản giám định hiện trường
		/// </summary>
		public const string PBH_BT_XE_GD_BBGD_HIEN_TRUONG_IN = "J932GHCXWVGL8AA";
		/// <summary>
		/// Biên bản giám định/xác định thiệt hại xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_BBGD_IN = "IN90S6GYJSKRT4H";
		/// <summary>
		/// Mẫu in biên bản giám định tổn thất
		/// </summary>
		public const string PBH_BT_XE_GD_BBGD_IN_OPES = "O18CZV18DU9DR39";
		/// <summary>
		/// Báo cáo giám định xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_BCGD_IN = "XMKD1P0RJ29D4SQ";
		/// <summary>
		/// Mẫu in báo cáo giám định [OPES]
		/// </summary>
		public const string PBH_BT_XE_GD_BCGD_IN_OPES = "X9XYSRH7KAUWREU";
		/// <summary>
		/// Lấy thông tin báo cáo giám định
		/// </summary>
		public const string PBH_BT_XE_GD_BCGD_LKE_CT = "TEIBGE2JNH93X77";
		/// <summary>
		/// Lưu thông tin báo cáo giám định
		/// </summary>
		public const string PBH_BT_XE_GD_BCGD_NH = "5SJEDXP7CIQA1ME";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Bắt đầu giám định xe
		/// </summary>
		public const string PBH_BT_XE_GD_BD_GD = "7JYB98IRF8EC1NH";
		/// <summary>
		/// Kiểm tra có được phép giám định chi tiết hay không
		/// </summary>
		public const string PBH_BT_XE_GD_BD_GDCT = "ZDAGRCHMGYWJXG1";
		/// <summary>
		/// Bắt đầu giám định đánh giá hiện trường
		/// </summary>
		public const string PBH_BT_XE_GD_BD_GDHT = "W4B07A574D2I08Z";
		/// <summary>
		/// Lấy số hồ sơ
		/// </summary>
		public const string PBH_BT_XE_GD_CAP_NHAT_SO_HS = "QZJGY0UPOB6MMDB";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy nội dung cuộc trò chuyện giám định
		/// </summary>
		public const string PBH_BT_XE_GD_CHAT_LKE = "ONLGT2TAIK5HLW9";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lưu thông tin nội dung chát
		/// </summary>
		public const string PBH_BT_XE_GD_CHAT_NH = "R54ZIURLN9M3J2M";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Chuyển sang bộ phận bồi thường
		/// </summary>
		public const string PBH_BT_XE_GD_CHUYEN_BT = "QW9K2WCUD7NVKTM";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Hủy chuyển bồi thường
		/// </summary>
		public const string PBH_BT_XE_GD_CHUYEN_BT_HUY = "37B92DXF7C3Q87K";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Chuyển giám định viên hiện trường
		/// </summary>
		public const string PBH_BT_XE_GD_CHUYEN_GDVHT = "98E34RL025SEA3I";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Chuyển người xử lý xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_CHUYEN_XL = "53NX6GLL5FPORA7";
		/// <summary>
		/// Hủy kết thúc đánh giá hiện trường
		/// </summary>
		public const string PBH_BT_XE_GD_DGHT_HUY_KT = "OBECZII5E8AYBLW";
		/// <summary>
		/// Kết thúc đánh giá hiện trường
		/// </summary>
		public const string PBH_BT_XE_GD_DGHT_KT = "FOW77N0UWZ55QAK";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Liệt kê chi tiết đánh giá hiện trường giám định xe
		/// </summary>
		public const string PBH_BT_XE_GD_DGHT_LKE_CT = "N5SEUOURQQY9ANL";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lưu đánh giá hiện trường giám định xe
		/// </summary>
		public const string PBH_BT_XE_GD_DGHT_NH = "DG2BGN6WEOJJ5O0";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy thông tin danh mục màn hình Giám định bồi thường
		/// </summary>
		public const string PBH_BT_XE_GD_DMUC = "KI7FZZM4S0E1MH5";
		/// <summary>
		/// Duyệt báo cáo giám định
		/// </summary>
		public const string PBH_BT_XE_GD_DUYET_BCGD = "RRP0XH9YVXGKKQI";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Tự duyệt giám định trong phân cấp
		/// </summary>
		public const string PBH_BT_XE_GD_DUYET_GD = "FP23PT9F8KCOXW3";
		/// <summary>
		/// Liệt kê danh sách GDVHT theo tỉnh thành, quận huyện
		/// </summary>
		public const string PBH_BT_XE_GD_GDVHT_LKE = "S3N97A4QA90WCGG";
		/// <summary>
		/// Gỡ hủy hồ sơ giám định
		/// </summary>
		public const string PBH_BT_XE_GD_GO_HUY = "YYBHH3WDS58AF05";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Sửa hạng mục tổn thất xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_HANG_MUC_SUA = "SKHRF4Q877CG82X";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Xóa hạng mục tổn thất xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_HANG_MUC_XOA = "LLWUSJ7D2FSSRTN";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy thông tin hợp đồng xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_HD_CT = "6TZ7KB42SQG1539";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Hủy hồ sơ giám định xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_HUY = "ABGSR7FOD5H93WZ";
		/// <summary>
		/// Hủy duyệt báo cáo giám định
		/// </summary>
		public const string PBH_BT_XE_GD_HUY_DUYET_BCGD = "3JKCXZCUH99UYR7";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Hủy duyệt biên bản giám định
		/// </summary>
		public const string PBH_BT_XE_GD_HUY_DUYET_GD = "LA408TSY66QAK4V";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Kết thúc giám định xe
		/// </summary>
		public const string PBH_BT_XE_GD_KT_GD = "WS172QHCBNF709D";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Hủy kết thúc giám định
		/// </summary>
		public const string PBH_BT_XE_GD_KT_GD_HUY = "FMU9IT1D97TW764";
		/// <summary>
		/// Tìm kiếm + phân trang danh sách Giám định xe
		/// </summary>
		public const string PBH_BT_XE_GD_LKE = "VEHKUYP5NDBP4WI";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy thông tin chi tiết Giám định xe
		/// </summary>
		public const string PBH_BT_XE_GD_LKE_CT = "QL6X2112116NOPD";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Reload lại hồ sơ từ notify
		/// </summary>
		public const string PBH_BT_XE_GD_LKE_CT_RELOAD = "7J9OFQPHAM0APVM";
		/// <summary>
		/// Export hồ sơ giám định
		/// </summary>
		public const string PBH_BT_XE_GD_LKE_EXPORT = "VU6CKUEDBRCBX73";
		/// <summary>
		/// [MOBILE] - Kết thúc hồ sơ giám định
		/// </summary>
		public const string PBH_BT_XE_GD_MOBILE_KT_GD = "87BMUQF8TEI3RJA";
		/// <summary>
		/// [MOBILE]- Hủy kết thúc hồ sơ giám định
		/// </summary>
		public const string PBH_BT_XE_GD_MOBILE_KT_GD_HUY = "6H0Y6EODWRZODJU";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Đặt lịch giám định Mobile
		/// </summary>
		public const string PBH_BT_XE_GD_MOBILE_LICH_NH = "22DWDR3LFYKLZQH";
		/// <summary>
		/// [MOBILE - GIAMDINH] - Lich nghỉ phép - Xem chi tiết
		/// </summary>
		public const string PBH_BT_XE_GD_MOBILE_LKE_CT = "LT4VF1JSYIQO0FF";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lưu thông tin người thông báo, liên hệ giám định xe
		/// </summary>
		public const string PBH_BT_XE_GD_NH = "SLT6FLPG4UC3X9P";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Tiếp nhận hồ sơ bên contact center
		/// </summary>
		public const string PBH_BT_XE_GD_NHAN_HS = "008XR24AONQAVC2";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy lại thông tin hạng mục tổn thất từ notify
		/// </summary>
		public const string PBH_BT_XE_GD_NOTIFY_LKE_CT = "8K4ODCQ07R4HO7U";
		/// <summary>
		/// Nhập thông tin hạng mục AICYCLE
		/// </summary>
		public const string PBH_BT_XE_GD_NV_AICYCLE_NH = "IOUP3HIAW09CMT3";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy danh sách chi tiết hạng mục
		/// </summary>
		public const string PBH_BT_XE_GD_NV_CT_LKE = "BOS3ORO8FE2O1CA";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Nhập chi tiết hạng mục tổn thất
		/// </summary>
		public const string PBH_BT_XE_GD_NV_CT_NH = "I4PV199F5WV3RN0";
		/// <summary>
		/// Lấy thông tin đánh giá theo loại hình nghiệp vụ
		/// </summary>
		public const string PBH_BT_XE_GD_NV_DGTT_LKE_CT = "T25PBJ5EW8CEKS2";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lưu thông tin giám định tổn thất xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_NV_GDTT_NH = "S5V6U2AG9PE5OHU";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy hạng mục tổn thất xe giám định xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_NV_LKE = "1PA8A4KJHUSW5W1";
		/// <summary>
		/// Danh sách tỷ lệ thương tật của đối tượng
		/// </summary>
		public const string PBH_BT_XE_GD_NV_THUONG_TAT_LKE = "1K3QZG43WA37A0G";
		/// <summary>
		/// Lấy ra chi tiết đánh giá tỷ lệ thương tật
		/// </summary>
		public const string PBH_BT_XE_GD_NV_THUONG_TAT_LKE_CT = "412YE0O0UBP153X";
		/// <summary>
		/// Lưu thông tin thương tật
		/// </summary>
		public const string PBH_BT_XE_GD_NV_THUONG_TAT_NH = "3FTM2WJAVEDFORT";
		/// <summary>
		/// Xóa thương tật
		/// </summary>
		public const string PBH_BT_XE_GD_NV_THUONG_TAT_XOA = "IM4AURM35ZNBU50";
		/// <summary>
		/// So sánh thông tin OCR giấy tờ xe
		/// </summary>
		public const string PBH_BT_XE_GD_OCR_SO_SANH = "J5LRD9PD9INLGB2";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Phân loại hạng mục tổn thất xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_PHAN_HANG_MUC = "3YQJ0W1B8KFZV4O";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Nhập hạng mục bồi thường của 1 hồ sơ
		/// </summary>
		public const string PBH_BT_XE_GD_PHAN_HANG_PHU_NH = "C5Z1HTUNJW78PQL";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Xóa hạng mục bồi thường của 1 hồ sơ
		/// </summary>
		public const string PBH_BT_XE_GD_PHAN_HANG_PHU_XOA = "J1HF86DNJWYV3VP";
		/// <summary>
		/// Thông báo tai nạn và yêu cầu bồi thường
		/// </summary>
		public const string PBH_BT_XE_GD_THONG_BAO_TAI_NAN = "ZZ9XNVWABZUJAFG";
		/// <summary>
		/// [OPES] - Thông báo tai nạn và yêu cầu bồi thường
		/// </summary>
		public const string PBH_BT_XE_GD_THONG_BAO_TAI_NAN_OPES = "3DBBEG2YCPKYE6I";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Tìm kiếm thông tin xe
		/// </summary>
		public const string PBH_BT_XE_GD_TIM_XE = "2Z3XV0E1XK72RKF";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Lấy danh sách trạng thái hồ sơ cache
		/// </summary>
		public const string PBH_BT_XE_GD_TRANG_THAI_LKE = "3H3CAP7HIQMONMH";
		/// <summary>
		/// [BTXE - GIÁM ĐỊNH] Cập nhật thông tin người thông báo GĐ xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_GD_TT_KH_UPDATE = "JXDYZDK3PXZEXK5";
		/// <summary>
		/// In ấn Giấy YC giám định, hồ sơ công an OPES
		/// </summary>
		public const string PBH_BT_XE_GD_YCHS_CHUNG_IN_OPES = "JHPYEUF6V2RD0VH";
		/// <summary>
		/// Giấy đề nghị chuyển tiền
		/// </summary>
		public const string PBH_BT_XE_GIAY_DE_NGHI_CHUYEN_TIEN_IN = "8YLFDLJPHV6CIOT";
		/// <summary>
		/// Giấy đề nghị chuyển tiền V2
		/// </summary>
		public const string PBH_BT_XE_GIAY_DE_NGHI_CHUYEN_TIEN_OPES_IN = "IZC4TYYIL25VXAT";
		/// <summary>
		/// Lấy danh sách hồ sơ tra cứu giá
		/// </summary>
		public const string PBH_BT_XE_GIA_HO_SO_LKE = "DEZE7CJ59GVWSDN";
		/// <summary>
		/// Lấy chi phí tính toán tự động
		/// </summary>
		public const string PBH_BT_XE_GIA_LAY = "QUTRXKE87Q1WEPW";
		/// <summary>
		/// [MOBILE] - Lấy giá tự động trên app giám định
		/// </summary>
		public const string PBH_BT_XE_GIA_MOBILE_LAY = "UW606MD1NFWW3K8";
		/// <summary>
		/// Mẫu in bảng kê thay thế
		/// </summary>
		public const string PBH_BT_XE_HS_BANG_KE_THAY_THE_IN_OPES = "VN8VE3CXPOLY5M2";
		/// <summary>
		/// Xem bảng giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_HS_BANG_TINH_TOAN_CTIET = "2UU17ROWXY7TOXK";
		/// <summary>
		/// Xem bảng chi tiết tính toán phương án
		/// </summary>
		public const string PBH_BT_XE_HS_BANG_TINH_TOAN_PA_CTIET = "SY9VHYT63IOWHQH";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] BTV chọn báo giá 
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_CHON = "E5PNLCINGMR271F";
		/// <summary>
		/// Thông tin file download báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_DOWNLOAD = "VOA30RN0AESLTNU";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Duyệt báo giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_DUYET = "UWHAT7IOS8EXM6E";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Hủy duyệt báo giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_DUYET_XOA = "TWEV26RMHTLRH4G";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy thông tin chuyển báo giá gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_API = "TTN8V8VQVTFVHYW";
		/// <summary>
		/// Lấy danh sách file api
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_API_THUMNAIL = "XDCCFQMTXA1CIUC";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Cập nhật trạng thái báo giá từ api gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_API_TTHAI = "9Z7H24M8W5KHX0G";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Api chấp nhận báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_CHAP_NHAN_GIA = "WGEYL767FTIPOBB";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy dữ liệu chuyển lần báo giá mới
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_CHUYEN = "F2WX4AVG74WV5FP";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy thông tin kết nối báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_KET_NOI = "E6UNUDV8DTAQXPB";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lưu thông tin báo giá mới
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_LAN_LUU = "ZKXO25YEYO8V2ZN";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Tạo lần báo giá mới với gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_LAN_NH = "IAL6GOTWMLUL3OT";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy thông tin báo giá của gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_LKE_CT = "KKXWBKI5ZB93UF2";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Nhập chuyển báo giá gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_NH = "U6LCAVJSRI1DQ0V";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Api nhận báo giá từ gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_NHAN_BG = "CAROPPRBKX0UO69";
		/// <summary>
		/// Lưu thông tin nhận hóa đơn
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_NHAN_HDON = "C73FPWRFBNUBJ4Q";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Cập nhật trạng thái báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_TTHAI = "CH1QT1QZ8I1S0CC";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Cập nhật trạng thái báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_TT_YC = "0HBXMVH399OB576";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Cập nhật số báo giá - Báo giá gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_UPDATE = "EAY6IBBHVTFHIUD";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Cập nhật trạng thái báo giá từ gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_UPDATE_TTHAI = "AJ83TC4M58XNFOS";
		/// <summary>
		/// Xóa hạng mục báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_XOA = "18THO4SI0WWNQCI";
		/// <summary>
		/// Yêu cầu gara sửa chữa
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_GARA_YCSC = "EGDUBVGG7YVIBO7";
		/// <summary>
		/// Lấy danh sách hạng mục OCR mapping
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_HANG_MUC_OCR_CACHE = "HHKYVDOXB8DV2CJ";
		/// <summary>
		/// Hủy kết thúc báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_HUY_KT = "P4PZTXM2GSUHB1O";
		/// <summary>
		/// Kết thúc báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_KT = "E3UA3Z50Y00UU5R";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy tất cả gara báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_LKE = "92RF9W2EFSHOVIH";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xem gara báo giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_LKE_CT = "H7BFNHN5GF6HL84";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Nhập báo giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_NH = "7HWBB3QUT5OAQ92";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Chọn gara báo giá hợp tác
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_NHIEU = "R3MG5VLD67FJBSC";
		/// <summary>
		/// Mapping báo giá ocr
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_OCR_MAPPING = "BBWKDDITWOC30EC";
		/// <summary>
		/// Nhập thông tin báo giá OCR
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_OCR_NH = "33ZIP5ORYBVA8E4";
		/// <summary>
		/// Danh sách hạng mục báo giá các gara
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_SO_SANH = "G4F2IJZVJ3OP6VM";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Thêm Gara báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_THEM = "4R6L2WLW7FOM960";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xóa gara báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_BAO_GIA_XOA = "RA53Y1KCC0KPKHR";
		/// <summary>
		/// Bảng kê thanh toán bồi thường xe ôtô
		/// </summary>
		public const string PBH_BT_XE_HS_BC_BK_TTOAN = "BCS4U6ZBK5WS338";
		/// <summary>
		/// Báo cáo hồ sơ bồi thường hộ
		/// </summary>
		public const string PBH_BT_XE_HS_BC_BTH = "1SQT24JNKLFB3MD";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Bảng kê chi tiết hồ sơ bồi thường xe ô tô
		/// </summary>
		public const string PBH_BT_XE_HS_BC_CT = "PRB6UHOH5X0HH6Y";
		/// <summary>
		/// [OPES] - Báo cáo bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_BC_CT_OPES = "WNMYJ3BT8GQ5EXO";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] cáo dự phòng bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_BC_DU_PHONG = "VSB6Z1GJ6CSEC9H";
		/// <summary>
		/// Báo cáo hồ sơ phát sinh
		/// </summary>
		public const string PBH_BT_XE_HS_BC_HS_PHAT_SINH = "181EYC43IH8E3IO";
		/// <summary>
		/// [OPES] Báo cáo hồ sơ phát sinh
		/// </summary>
		public const string PBH_BT_XE_HS_BC_HS_PHAT_SINH_OPES = "BBNJJAGQFPQJSF9";
		/// <summary>
		/// Danh sách thanh toán chuyển tiền
		/// </summary>
		public const string PBH_BT_XE_HS_BC_THANH_TOAN = "02RO9K946IEIKDI";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Báo cáo tiến trình giải quyết bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TIEN_TRINH = "VK007N6DYKC7N7T";
		/// <summary>
		/// Thống kê bồi thường theo Gara sửa chữa
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TKE_GARA = "Y5NI3C1QIPPCFI8";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Thống kê bồi thường theo hạng mục tổn thất
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TKE_HANG_MUC = "WZI86CQ0MBCZO3R";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Thống kê bồi thường theo hãng xe, hiệu xe
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TKE_HANG_XE = "9MJ09MUWTMBOU24";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Thống kê bồi thường theo khu vực
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TKE_KHU_VUC = "UYH4QO5TL7VE5J2";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Thống kê hồ sơ nhóm theo nhóm nguyên nhân xảy ra
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TKE_NGUYEN_NHAN = "IRC7DOF1TPSBZXU";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Thống kê bồi thường theo sản phẩm
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TKE_SAN_PHAM = "LVI36NZCHRSJ5LH";
		/// <summary>
		/// Thống kê bồi thường theo trạng thái xử lý
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TKE_TRANG_THAI = "4MLEGR3RO196GST";
		/// <summary>
		/// Báo cáo hồ sơ bồi thường trên phân cấp
		/// </summary>
		public const string PBH_BT_XE_HS_BC_TREN_PC = "S4745H3CHGHA9GU";
		/// <summary>
		/// Hồ sơ bồi thường đề nghị chuyển khoản
		/// </summary>
		public const string PBH_BT_XE_HS_BT_DE_NGHI_CHUYEN_KHOAN_IN = "E2R6EZEM1JSRK16";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy tất cả chứng từ
		/// </summary>
		public const string PBH_BT_XE_HS_CHUNG_TU_LKE = "R1G0WJWFO67WIVP";
		/// <summary>
		/// [MOBILE] - Lưu thông tin hóa đơn chứng từ
		/// </summary>
		public const string PBH_BT_XE_HS_CHUNG_TU_MOBILE_NH = "O0UQ32XP4DVCZZG";
		/// <summary>
		/// [MOBILE] - Xóa hóa đơn chứng từ
		/// </summary>
		public const string PBH_BT_XE_HS_CHUNG_TU_MOBILE_XOA = "6ZQ24BF400UBKRD";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Nhập chứng từ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_CHUNG_TU_NH = "VHYMY3P3M8M705E";
		/// <summary>
		/// Nhập thông tin OCR hóa đơn chứng từ xe
		/// </summary>
		public const string PBH_BT_XE_HS_CHUNG_TU_OCR_NH = "WKUHP8CBPX0Q8QL";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xóa chứng từ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_CHUNG_TU_XOA = "QUMHMIHIHC0HA62";
		/// <summary>
		/// Chuyển thanh toán bồi thường xe
		/// </summary>
		public const string PBH_BT_XE_HS_CHUYEN_THANH_TOAN = "4HY0F9D2HIMO0FT";
		/// <summary>
		/// Liệt kê thông tin BTV đánh giá
		/// </summary>
		public const string PBH_BT_XE_HS_DANH_GIA_BTV_LKE_CT = "L1JLXJXKUL71EKU";
		/// <summary>
		/// Nhập thông tin BTV đánh giá
		/// </summary>
		public const string PBH_BT_XE_HS_DANH_GIA_BTV_NH = "4WMTJH254AKOJB9";
		/// <summary>
		/// Xoá thông tin đánh giá của bồi thường viên
		/// </summary>
		public const string PBH_BT_XE_HS_DANH_GIA_BTV_X = "R98DLGJ5KO009Z2";
		/// <summary>
		/// Liệt kê chi tiết BTV đánh giá
		/// </summary>
		public const string PBH_BT_XE_HS_DANH_GIA_LKE_CT = "KSSJ94ZR2XLBNSS";
		/// <summary>
		/// Nhập thông tin bồi thường viên đánh giá
		/// </summary>
		public const string PBH_BT_XE_HS_DANH_GIA_NH = "PLU58NBGGQUQOGH";
		/// <summary>
		/// Mẫu in tờ trình đề xuất phương án sửa chữa
		/// </summary>
		public const string PBH_BT_XE_HS_DE_XUAT_PASC_IN = "6FY0YOBQQKIZZGP";
		/// <summary>
		/// Mẫu in đề xuất bồi thường v2
		/// </summary>
		public const string PBH_BT_XE_HS_DE_XUAT_PASC_IN_V2 = "HZL0WGTKB8VYKIB";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy danh sách DKBS theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_HS_DKBS_LKE = "UL97L6PANK79ATM";
		/// <summary>
		/// Đóng hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_DONG_HS = "7NDO791I55D92YX";
		/// <summary>
		/// Rollback hồ sơ đóng
		/// </summary>
		public const string PBH_BT_XE_HS_DONG_HS_ROLLBACK = "1BSJH1GOE96XX0Z";
		/// <summary>
		/// Lấy thông tin file cần ReGenerate
		/// </summary>
		public const string PBH_BT_XE_HS_GEN_FILE = "LBS5YH160ZQTRPX";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy danh sách nguyên nhân giảm trừ theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_HS_GIAM_TRU_LKE = "4K3LJATR7I56QFA";
		/// <summary>
		/// Mẫu in giấy giao nhận kiêm phiếu hẹn
		/// </summary>
		public const string PBH_BT_XE_HS_GIAY_GIAO_NHAN_KIEM_PHIEU_HEN_IN_OPES = "JVUUQOQUZPB8GWY";
		/// <summary>
		/// Lấy danh sách giá gợi ý
		/// </summary>
		public const string PBH_BT_XE_HS_GIA_TU_DONG_LKE = "6NJDLIL64G0GRHW";
		/// <summary>
		/// Gỡ hủy hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_GO_HUY = "DEGA5VNI68G9RRN";
		/// <summary>
		/// Hủy hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_HUY = "1OIP4Z3EXMUTY7G";
		/// <summary>
		/// Hủy chuyển thanh toán bồi thường xe
		/// </summary>
		public const string PBH_BT_XE_HS_HUY_CHUYEN_THANH_TOAN = "RZJJZK0L1W0WVFL";
		/// <summary>
		/// Chuyển lại hồ sơ cho cán bộ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_HUY_CHUYEN_THANH_TOAN_TT = "F818BUKW76ANCKA";
		/// <summary>
		/// Hủy đóng hồ sơ
		/// </summary>
		public const string PBH_BT_XE_HS_HUY_DONG_HS = "IUAIGU6T3UCLILH";
		/// <summary>
		/// In ảnh tổn thất
		/// </summary>
		public const string PBH_BT_XE_HS_IN_ANH = "UZNOT6B5L3B1OI0";
		/// <summary>
		/// In ảnh hóa đơn
		/// </summary>
		public const string PBH_BT_XE_HS_IN_ANH_HD = "QJSCNKXQ2UJ3J5O";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Dữ liệu email thông báo giám định
		/// </summary>
		public const string PBH_BT_XE_HS_LAY_TTIN_EMAIL = "RZSX2K8N3NCFJQ9";
		/// <summary>
		/// Kiểm tra thông tin trước khi gửi email
		/// </summary>
		public const string PBH_BT_XE_HS_LAY_TTIN_EMAIL_KTRA = "7A9W4APYP9HBYL1";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG - OPES] Dữ liệu email thông báo giám định
		/// </summary>
		public const string PBH_BT_XE_HS_LAY_TTIN_EMAIL_OPES = "6L0YQXAPTNB969L";
		/// <summary>
		/// Gửi mail ver 2
		/// </summary>
		public const string PBH_BT_XE_HS_LAY_TTIN_EMAIL_TEMP = "0I58ZZ0WEB7T0M5";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Tìm kiếm+phân trang hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_LKE = "CBEN5GI12OOF3I6";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xem hồ sơ bồi thường chi tiết
		/// </summary>
		public const string PBH_BT_XE_HS_LKE_CT = "0UTK9KUYLSLUDC8";
		/// <summary>
		/// Xuất excel màn hình bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_LKE_EXPORT = "N5607T38FX6UPYE";
		/// <summary>
		/// [MOBILE] - Hủy kết thúc báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_BAO_GIA_HUY_KT = "JPN8US8FRAYC6NP";
		/// <summary>
		/// [MOBILE] - Kết thúc báo giá
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_BAO_GIA_KT = "79SXJ7MLUI9VPWG";
		/// <summary>
		/// Lấy danh sách báo giá gara MOBILE
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_BAO_GIA_LKE = "9WOLH8DZ0ZSZP9O";
		/// <summary>
		/// [MOBILE] -  Xem chi tiết báo giá gara
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_BAO_GIA_LKE_CT = "EMGBICX62HHKX94";
		/// <summary>
		/// [MOBILE] - Lưu báo giá gara
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_BAO_GIA_NH = "N6D5YZDRRJPQC6M";
		/// <summary>
		/// [Mobile] - Thêm báo giá gara
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_BAO_GIA_THEM = "0V35LOU5H7O9ONF";
		/// <summary>
		/// [MOBILE] - Xóa báo giá gara
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_BAO_GIA_XOA = "SD4Y6E2HVPU810I";
		/// <summary>
		/// [MOBILE] - Danh sách hóa đơn chứng từ, người thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_CHUNG_TU_THU_HUONG_LKE = "P5SDQOM4YBXOY62";
		/// <summary>
		/// [MOBILE] - Chuyển thanh toán + đóng hồ sơ
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_CHUYEN_THANH_TOAN = "VNHC3XC2JSNGP7H";
		/// <summary>
		/// [MOBILE] - Rollback đóng  hồ sơ + chuyển thanh toán
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_CHUYEN_THANH_TOAN_ROLLBACK = "EXMK63RW1ZZ355V";
		/// <summary>
		/// [MOBILE] - Danh mục nhập hóa đơn chứng từ, thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_DMUC_CHUNG_TU_THU_HUONG_LKE = "DZR9GYTJSYVONJR";
		/// <summary>
		/// [MOBILE] -  Hủy đóng hồ sơ + hủy chuyển thanh toán
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_HUY_CHUYEN_THANH_TOAN_TT = "9OOVBG4HCI00Q3L";
		/// <summary>
		/// Kiểm tra số tiền trước khi trình
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_KTRA_TRINH_PA = "14S12GYL2G6Z1BB";
		/// <summary>
		/// [MOBILE] - Chọn phương án
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_PA_CHON = "25C6YKELCWZ429Z";
		/// <summary>
		/// Tìm kiếm phân trang hồ sơ cần tính toán
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_TINH_TOAN_LKE = "EU5X2TWCYRBKDOP";
		/// <summary>
		/// Lấy danh sách hồ sơ tính toán phương án
		/// </summary>
		public const string PBH_BT_XE_HS_MOBILE_TINH_TOAN_PA_LKE = "C2PWOEH77LUG25K";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Thủ tục nhận hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_NHAN_HS = "Y7XDGNB3ZOCPIPA";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Danh sách hạng mục chi tiết bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_NV_CT_LKE = "86POHYPAQ3GAKJE";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Nhập chi tiết hạng mục bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_NV_CT_NH = "RRCME7P3DJZMTFE";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lưu điều khoản bổ sung theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_HS_NV_DKBS_NH = "S9VBBES6C2G2008";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lưu thông tin ghi chú hạng mục
		/// </summary>
		public const string PBH_BT_XE_HS_NV_GHI_CHU_NH = "VK3W8656WT5BXKZ";
		/// <summary>
		/// Nhập thông tin khấu trừ
		/// </summary>
		public const string PBH_BT_XE_HS_NV_GIA_KTRU_NH = "QK1B83AJ4DL5Y4X";
		/// <summary>
		/// Lấy thông tin giảm giá
		/// </summary>
		public const string PBH_BT_XE_HS_NV_GIA_LKE = "3TZN47FKSUB1UD9";
		/// <summary>
		/// Lưu thông tin giảm giá
		/// </summary>
		public const string PBH_BT_XE_HS_NV_GIA_NH = "4CW4QQ4SIEFC05B";
		/// <summary>
		/// Lấy thông tin khấu trừ
		/// </summary>
		public const string PBH_BT_XE_HS_NV_KTRU_LKE = "GQLV1ZI6HQP7BOO";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xem chi tiết nghiệp vụ của 1 hồ sơ
		/// </summary>
		public const string PBH_BT_XE_HS_NV_LKE = "IK4RCOD135K6OCI";
		/// <summary>
		/// [MOBILE] - Nhập tính toán bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_NV_MOBILE_TINH_TOAN_NH = "KBYUKBMSVBPWKV7";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Nhập phương án bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_NV_NH = "QS8NG317WH525VF";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lưu nguyên nhân giảm trừ theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_HS_NV_NNGT_NH = "1T1WBGXCYY8RLMW";
		/// <summary>
		/// Lấy thông tin thuế
		/// </summary>
		public const string PBH_BT_XE_HS_NV_THUE_LKE = "X8B8C31IMF8O2ZV";
		/// <summary>
		/// Lưu thông tin thuế
		/// </summary>
		public const string PBH_BT_XE_HS_NV_THUE_NH = "WOHQEU8FXUXZJ4H";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Tính toán bồi thường XCG
		/// </summary>
		public const string PBH_BT_XE_HS_NV_TINH_TOAN = "QUMX93KN5ZX5D1P";
		/// <summary>
		/// Tính toán bồi thường ESCS
		/// </summary>
		public const string PBH_BT_XE_HS_NV_TINH_TOAN_ESCS = "0N3RXRVPB4EEQXN";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Tìm kiếm hạng mục đối tượng theo LHNV
		/// </summary>
		public const string PBH_BT_XE_HS_NV_TKIEM = "R8ENVYY2NK69B0E";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy danh sách hạng mục vật chất xe
		/// </summary>
		public const string PBH_BT_XE_HS_NV_VCX_LKE = "VE3TU80ZMODWEEJ";
		/// <summary>
		/// Cập nhật thông tin OCR chứng từ hóa đơn xe
		/// </summary>
		public const string PBH_BT_XE_HS_OCR_CHUNG_TU_NH = "9BA8HF609ATHJ1G";
		/// <summary>
		/// Xem bảng tính toán chi tiết phương án
		/// </summary>
		public const string PBH_BT_XE_HS_PA_BANG_VIEW = "8EZS1SOQFURCJ1K";
		/// <summary>
		/// Bỏ chọn phương án bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_PA_BO_CHON = "NHVGD4ARXSWV46K";
		/// <summary>
		/// Chọn phương án bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_PA_CHON = "8M87AR647727N68";
		/// <summary>
		/// Lưu khấu trừ phương án
		/// </summary>
		public const string PBH_BT_XE_HS_PA_CT_GIA_KTRU_NH = "ONYA80U5OB6R8RU";
		/// <summary>
		/// Lấy danh sách giảm giá của phương án bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_PA_CT_GIA_LKE = "5LVUIDVHJAYE1SF";
		/// <summary>
		/// Lưu thông tin chi tiết giảm giá
		/// </summary>
		public const string PBH_BT_XE_HS_PA_CT_GIA_NH = "ZAEZYY6NBLZXQ1F";
		/// <summary>
		/// Lấy thông tin khấu trừ phương án
		/// </summary>
		public const string PBH_BT_XE_HS_PA_CT_KTRU_LKE = "ZWEFWFTYUKWLE7P";
		/// <summary>
		/// Lấy danh sách thuế phương án
		/// </summary>
		public const string PBH_BT_XE_HS_PA_CT_THUE_LKE = "A2EEFMHNKM3DJ28";
		/// <summary>
		/// Lưu thông tin thuế phương án
		/// </summary>
		public const string PBH_BT_XE_HS_PA_CT_THUE_NH = "3JA6WB0RPE514CE";
		/// <summary>
		/// Lấy danh sách loại hình nghiệp vụ của phương án
		/// </summary>
		public const string PBH_BT_XE_HS_PA_LHNV_LKE = "WUGPLINKFNPUSFQ";
		/// <summary>
		/// Danh sách phương án
		/// </summary>
		public const string PBH_BT_XE_HS_PA_LKE = "YBTV94E1YG57E9Y";
		/// <summary>
		/// Lấy danh sách chi tiết các phương án của hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_PA_LKE_CT = "TWVMX3SFBWSI90E";
		/// <summary>
		/// [MOBILE] - Lưu phương án giá đối tượng nghiệp vụ khác
		/// </summary>
		public const string PBH_BT_XE_HS_PA_MOBILE_LHNV_KHAC_DTUONG_NH = "RVOG90KRCQXR0AP";
		/// <summary>
		/// [MOBILE] - Đề xuất phương án giá với các nghiệp vụ khác
		/// </summary>
		public const string PBH_BT_XE_HS_PA_MOBILE_LHNV_KHAC_NH = "1XGCBF1VTTUYL81";
		/// <summary>
		/// Lưu phương án VCX bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_PA_NH = "ZGL3QLLUYEN3WU6";
		/// <summary>
		/// Lưu phương án nghiệp vụ khác VCX
		/// </summary>
		public const string PBH_BT_XE_HS_PA_NV_CT_NH = "FUSXDAUSVTVMEII";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Tính toán phương án XCG
		/// </summary>
		public const string PBH_BT_XE_HS_PA_NV_TINH_TOAN = "5GCADU651ZRNCG3";
		/// <summary>
		/// Thêm mới phương án tối ưu nhất
		/// </summary>
		public const string PBH_BT_XE_HS_PA_NV_TONG_HOP_NH = "5DK10Y3WIUFJ4E6";
		/// <summary>
		/// Xóa phương án bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_PA_X = "SFP27362IX2Y9VX";
		/// <summary>
		/// Phân loại hình ảnh hồ sơ giấy tờ
		/// </summary>
		public const string PBH_BT_XE_HS_PHAN_HANG_MUC = "T0N2IYELBK4GK2Q";
		/// <summary>
		/// Lấy thông tin tiền bồi thường của hồ sơ
		/// </summary>
		public const string PBH_BT_XE_HS_SO_TIEN_LKE_CT = "2NT2AE27SFFP0WI";
		/// <summary>
		/// Cập nhật lại số tiền thuế
		/// </summary>
		public const string PBH_BT_XE_HS_SO_TIEN_THUE_NH = "6RSXJVS9ZFGD0MO";
		/// <summary>
		/// Tách nghiệp vụ hồ sơ
		/// </summary>
		public const string PBH_BT_XE_HS_TACH_NH = "2WSI4QXQKI0NFGU";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lấy danh sách tạm ứng của hồ sơ
		/// </summary>
		public const string PBH_BT_XE_HS_TAM_UNG_LKE = "TJMOPRESE13599E";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xem chi tiết tạm ứng bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TAM_UNG_LKE_CT = "W7I9V43Q5U88J5H";
		/// <summary>
		/// [BTXE-BỒI THƯỜNG]  Lấy danh sách hồ sơ tạm ứng bồi thường xe
		/// </summary>
		public const string PBH_BT_XE_HS_TAM_UNG_LKE_LKE = "6RPSB8H7VZ9CJH8";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Lưu thông tin tạm ứng bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TAM_UNG_NH = "G8537W6ZWA0I6ZZ";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xóa tạm ứng bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TAM_UNG_XOA = "8L1DBX74Y98B66A";
		/// <summary>
		/// Mẫu in tờ thông báo bồi thường [OPES]
		/// </summary>
		public const string PBH_BT_XE_HS_TB_BOI_THUONG_IN_OPES = "TSGR8DMM1Y7V8C3";
		/// <summary>
		/// Mẫu in thông báo duyệt phương án sữa chữa
		/// </summary>
		public const string PBH_BT_XE_HS_TB_DUYET_PHUONG_AN_IN = "FTYKGW3A3JNZJOB";
		/// <summary>
		/// Thông báo từ chối bồi thường xe
		/// </summary>
		public const string PBH_BT_XE_HS_TB_TU_CHOI_BOI_THUONG_IN = "R6IQEWRE8M7Y98A";
		/// <summary>
		/// Mẫu in thông báo bồi thường bãi nại
		/// </summary>
		public const string PBH_BT_XE_HS_THONG_BAO_BOI_THUONG_BAI_NAI_IN = "T0LW21PSJEYS6HQ";
		/// <summary>
		/// Mẫu in thông báo bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_THONG_BAO_BOI_THUONG_IN = "WN5EI8GKLM8E7JT";
		/// <summary>
		///  [Bồi thường] Thông tin toàn bộ hồ sơ bồi thườg
		/// </summary>
		public const string PBH_BT_XE_HS_THONG_TIN_HO_SO_BOI_THUONG = "CFGNVGF883NO0XS";
		/// <summary>
		/// Thông tin toàn bộ hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_THONG_TIN_TOAN_BO_HS = "LIZ631NEGDHUUAU";
		/// <summary>
		/// [MOBILE] - Lưu thông tin người thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_HS_THU_HUONG_MOBILE_NH = "99V1EX2HR5NJA7I";
		/// <summary>
		/// [MOBILE] - Xóa thông tin người thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_HS_THU_HUONG_MOBILE_XOA = "9FMCAHC3XRJDU58";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Nhập thông tin người thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_HS_THU_HUONG_NH = "T6T1R5ZRVRJMRDT";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Xóa thông tin người thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_HS_THU_HUONG_XOA = "3R3YJYDNM1L0OOZ";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Liệt kê chi tiết hạng mục TNDS
		/// </summary>
		public const string PBH_BT_XE_HS_TNDS_LKE = "EU2WK4204M71AOL";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Nhập chi tiết hạng mục TNDS
		/// </summary>
		public const string PBH_BT_XE_HS_TNDS_NH = "NP242EIRXN7N1UF";
		/// <summary>
		/// Mẫu in tổng hợp kết quả xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_HS_TONG_HOP_KQ_XCG_IN = "FN0SUWPH2TD7LJE";
		/// <summary>
		/// Bồi thường toàn bộ
		/// </summary>
		public const string PBH_BT_XE_HS_TON_THAT_TOAN_BO = "91U35PO1ABIJXDL";
		/// <summary>
		/// Xóa bồi thường toàn bộ
		/// </summary>
		public const string PBH_BT_XE_HS_TON_THAT_TOAN_BO_XOA = "A950MRBJCEDFKQP";
		/// <summary>
		/// Mẫu in tờ trình bảo lãnh
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_BAO_LANH_IN = "2D01NHG1FEFWDZR";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] - Tờ trình bảo lãnh
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_BL = "CEYY0TWA218M02V";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] - Tờ trình bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_BOI_THUONG = "IHVTL390XJPG45X";
		/// <summary>
		/// Mẫu in tờ trình bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_BOI_THUONG_IN = "1RS8GLD47L941L5";
		/// <summary>
		/// Mẫu in tờ trình bồi thường [OPES]
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_BOI_THUONG_IN_OPES = "ANKAAC29RZCB2RT";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] In tờ trình bồi thường / bảo lãnh
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_BT = "8KNKNHT5KKF1SUD";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] - Tờ trình phương án sữa chữa
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_PASC = "381KP4DHDANDV3X";
		/// <summary>
		/// Mẫu in tờ trình phương án sửa chữa
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_PASC_IN = "7DNHFUFBV7KYWYA";
		/// <summary>
		/// In tờ trình phương án khắc phục nhiều nghiệp vụ
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_PA_KHAC_PHUC_IN = "TLDZPXBTC76DTB2";
		/// <summary>
		/// Mẫu in tờ trình bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_TAM_UNG_BOI_THUONG_IN = "PBUGNAQHT91PROU";
		/// <summary>
		/// Mẫu in tờ trình tạm ứng hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_TAM_UNG_BOI_THUONG_IN_OPES = "51UKZVENOKWLLYE";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] - Tờ trình tạm ứng bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_TAM_UNG_BT = "FTRY6R42CQI50U0";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] - Tờ trình TNDS
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_TNDS = "UHKIEYLVHCWH3RK";
		/// <summary>
		/// [BTXE - BOITHUONG] Tờ trình từ chối bồi thường
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_TU_CHOI_BOI_THUONG_IN = "1408QCQQHZD5U5G";
		/// <summary>
		/// Tờ trình từ chối bồi thường OPES
		/// </summary>
		public const string PBH_BT_XE_HS_TO_TRINH_TU_CHOI_BOI_THUONG_IN_OPES = "TO25B5UUZG18AGZ";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] Trình/duyệt giám đinh xe
		/// </summary>
		public const string PBH_BT_XE_HS_TRINH_DUYET_EMAIL = "4SN5PRJN5C6Y9I0";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG - OPES] Trình/duyệt giám đinh xe
		/// </summary>
		public const string PBH_BT_XE_HS_TRINH_DUYET_EMAIL_OPES = "UTUEUPMQIV9TJDM";
		/// <summary>
		/// Mẫu in trưng cầu công an
		/// </summary>
		public const string PBH_BT_XE_HS_TRUNG_CAU_CONG_AN_IN_OPES = "3WBB4MITUPPR01J";
		/// <summary>
		/// [BTXE - BỒI THƯỜNG] - Xác minh phí bảo hiểm
		/// </summary>
		public const string PBH_BT_XE_HS_XAC_MINH_PHI = "XW0FUA8B29KJCKE";
		/// <summary>
		/// Mẫu in báo cáo không giám định biên bản giám định
		/// </summary>
		public const string PBH_BT_XE_KHONG_GD_BCGD_IN_OPES = "E0DSS3XZI5RSSZ1";
		/// <summary>
		/// Khách hàng VIP
		/// </summary>
		public const string PBH_BT_XE_KH_VIP = "14LLAKJZM0IIO4Q";
		/// <summary>
		/// Kiểm tra dữ liệu OCR giấy tờ xe
		/// </summary>
		public const string PBH_BT_XE_KIEM_TRA_OCR = "QCUWD904I0M1QOH";
		/// <summary>
		/// Kiểm tra phân cấp ước tổn thất
		/// </summary>
		public const string PBH_BT_XE_KTRA_PHAN_CAP_UOC = "828LD10ZDNNUDYM";
		/// <summary>
		/// Kiểm tra phân công xử lý
		/// </summary>
		public const string PBH_BT_XE_KTRA_XU_LY = "8OY73Q0M7SUHC7X";
		/// <summary>
		/// [Giám định] Liệt kê chi phí lần giám định
		/// </summary>
		public const string PBH_BT_XE_LAN_GD_CHI_PHI_LKE = "S91SAINU4UEUS8E";
		/// <summary>
		/// [Giám định] Nhập thông tin chi phí lần giám định
		/// </summary>
		public const string PBH_BT_XE_LAN_GD_CHI_PHI_NH = "SUTXSKQXIGTBF7J";
		/// <summary>
		/// [Giám định] Xóa thông tin chi phí lần giám định
		/// </summary>
		public const string PBH_BT_XE_LAN_GD_CHI_PHI_XOA = "NU8ZA8GU0DAKAHG";
		/// <summary>
		/// Hủy kết thúc lần giám định
		/// </summary>
		public const string PBH_BT_XE_LAN_GD_HUY_KTHUC = "5VA3P1FGJS50QND";
		/// <summary>
		/// Kết thúc lần giám định
		/// </summary>
		public const string PBH_BT_XE_LAN_GD_KTHUC = "WCQUJBRMJ8AC73I";
		/// <summary>
		/// Lưu thông tin lần giám định xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_LAN_GD_NH = "O1JF4Y1SWX6IHKU";
		/// <summary>
		/// Xóa lần giám định xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_LAN_GD_XOA = "2GFC9AUO36GP9WS";
		/// <summary>
		/// Cập nhật thông tin người liên hệ
		/// </summary>
		public const string PBH_BT_XE_LHE_CAP_NHAT = "NLPYJMTYKRZ9AQ4";
		/// <summary>
		/// Lấy danh sách lịch sử tổn thất
		/// </summary>
		public const string PBH_BT_XE_LSTT = "B0US37SLQEEPUGM";
		/// <summary>
		/// Lấy danh sách luồng xử lý
		/// </summary>
		public const string PBH_BT_XE_LUONG_XLY = "9KAR6UBMISIKTM6";
		/// <summary>
		/// [XE_MAY] - Danh sách chi phí khác
		/// </summary>
		public const string PBH_BT_XE_MAY_CHI_PHI_KHAC_HS_LKE = "6E393XGLGEFF0EQ";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin tính toán chi phí khác của hồ sơ
		/// </summary>
		public const string PBH_BT_XE_MAY_CHI_PHI_KHAC_HS_NH = "83IXOFJB0HWVWG1";
		/// <summary>
		/// [XE_MAY] - Liệt kê thông tin chi phí khác
		/// </summary>
		public const string PBH_BT_XE_MAY_CHI_PHI_KHAC_LKE = "F8W4O4I32SUAE3E";
		/// <summary>
		/// [XE_MAY] - Liệt kê chi tiết thông tin chi phí khác
		/// </summary>
		public const string PBH_BT_XE_MAY_CHI_PHI_KHAC_LKE_CT = "7A3HA5GBV073A13";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin chi phí khác 
		/// </summary>
		public const string PBH_BT_XE_MAY_CHI_PHI_KHAC_NH = "KFVVK8WX3OLTYRE";
		/// <summary>
		/// [XE_MAY] - Xóa thông tin chi phí khác
		/// </summary>
		public const string PBH_BT_XE_MAY_CHI_PHI_KHAC_X = "KMQY9A1RNKZVAWZ";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lấy thông tin dashboard xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_DASHBOARD = "H44JRT2NGNBG9GE";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách đối tượng tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_DOI_TUONG_TON_THAT_LKE = "DS1BVT1O0JEH1UH";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin đối tượng tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_DOI_TUONG_TON_THAT_NH = "912BDX39CYKGFRF";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin đối tượng tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_DOI_TUONG_TON_THAT_XOA = "HWORTOMHTUB42KW";
		/// <summary>
		/// [XE_MAY] - Biên bản ghi nhận hiện trường
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BBGD_HIEN_TRUONG_IN = "IV6SR2NBL1WA3PW";
		/// <summary>
		/// [XE_MAY] - Biên bản giám định/xác định thiệt hại xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BBGD_IN = "4E3AA7GU9LI5THP";
		/// <summary>
		/// [XE_MAY] - Báo cáo giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BCGD_IN = "HNID9J0FXD5F04B";
		/// <summary>
		/// [XE_MAY] - Liệt kê thông tin báo cáo giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BCGD_LKE_CT = "ACZ08G8J2TBDHQN";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin báo cáo giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BCGD_NH = "UFS11WMFQC4UYN4";
		/// <summary>
		/// [XE_MAY] - Bắt đầu giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BD_GD = "HP40C2VREMGLIKU";
		/// <summary>
		/// [XE_MAY] - Bắt đầu giám định chi tiết xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BD_GDCT = "DKV68QRC9Z9EWFW";
		/// <summary>
		/// [XE_MAY] - Bắt đầu giám định hiện trường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_BD_GDHT = "PWBZ5B1U9PPQHNP";
		/// <summary>
		/// [XE_MAY] - Lấy số hồ sơ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_CAP_NHAT_SO_HS = "QN6TDKHUGPAZ3WU";
		/// <summary>
		/// [XE_MAY] - Chuyển hồ sơ sang bộ phận bồi thường
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_CHUYEN_BT = "CM7JOHZN2KU6HVX";
		/// <summary>
		/// [XE_MAY] - Huỷ chuyển bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_CHUYEN_BT_HUY = "ZPMXTKYT24KNX51";
		/// <summary>
		/// [XE_MAY] - Chuyển người xử lý xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_CHUYEN_XL = "2Z0HL97DBXH8FDJ";
		/// <summary>
		/// [XE_MAY] - Kết thúc đánh giá hiện trường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_DGHT_KT = "9UOQ2B26RXRZ09A";
		/// <summary>
		/// [XE_MAY] - Liệt kê chi tiết đánh giá hiện trường giám định xe
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_DGHT_LKE_CT = "7TIPEG4Q71Y6Q1C";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin đánh giá hiện trường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_DGHT_NH = "31YDRJDKXCP9HUJ";
		/// <summary>
		/// [XE_MAY] - Duyệt báo cáo giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_DUYET_BCGD = "FXNP3SSG7TXLIPN";
		/// <summary>
		/// [XE_MAY] - Duyệt biên bản giám định xe may
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_DUYET_GD = "V587H5UZL2CH85K";
		/// <summary>
		/// [XE_MAY] - Liệt kê giám định viên theo tỉnh thành, quận huyện
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_GDVHT_LKE = "54SXDIOEOYAELCV";
		/// <summary>
		/// [XE_MAY] - Gỡ huỷ hồ sơ giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_GO_HUY = "KT775ARELNQTTH3";
		/// <summary>
		/// [XE_MAY] - Sửa hạng mục tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_HANG_MUC_SUA = "L3MJPAKHPPH6VHT";
		/// <summary>
		/// [XE_MAY] - Xoá hạng mục tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_HANG_MUC_XOA = "J3FMR5FOYTOU23I";
		/// <summary>
		/// [XE_MAY] - Huỷ hồ sơ giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_HUY = "LNW7TE60I6Q6TGM";
		/// <summary>
		/// [XE_MAY] - Huỷ duyệt báo cáo giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_HUY_DUYET_BCGD = "3MRSPE51YLUAP57";
		/// <summary>
		/// [XE_MAY] - Huỷ duyệt biên bản giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_HUY_DUYET_GD = "S7XL5HFXZRKP38L";
		/// <summary>
		/// [XE_MAY] - Kết thúc giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_KT_GD = "NS6HI8UQLLZLYEO";
		/// <summary>
		/// [XE_MAY] - Huỷ kết thúc giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_KT_GD_HUY = "KLY8QN4WWRG0JWN";
		/// <summary>
		/// [XE_MAY] - Tìm kiếm phân trang hồ sơ giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_LKE = "CALR8OTIGNX9DNQ";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin chi tiết hồ sơ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_LKE_CT = "6QWM40SREAXSO9Y";
		/// <summary>
		/// [XE_MAY] - Reload thông tin chi tiết hồ sơ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_LKE_CT_RELOAD = "EC62H1VESJON7E5";
		/// <summary>
		/// [XE_MAY_MOBILE] - Kết thúc giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_MOBILE_KT_GD = "5ZJ68TDXYUQD51X";
		/// <summary>
		/// [XE_MAY_MOBILE] - Huỷ kết thúc giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_MOBILE_KT_GD_HUY = "S2QL0J0QOWYQSXB";
		/// <summary>
		/// [XE_MAY_MOBILE] - Đặt lịch giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_MOBILE_LICH_NH = "2KQ5DL8LJJNRVWC";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin người thông báo, liên hệ giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NH = "X7DMHEWJYR0YGYW";
		/// <summary>
		/// [XE_MAY] - Nhận hồ sơ giám định
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NHAN_HS = "BVZFILC877LGB7M";
		/// <summary>
		/// [XE_MAY] - Lấy lại thông tin hạng mục xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NOTIFY_LKE_CT = "3D6LGQYGEP4M0AS";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách chi tiết hạng mục
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_CT_LKE = "GCLAH4LU2ETYTWG";
		/// <summary>
		/// [XE_MAY] - Nhập chi tiết hạng mục tổn thất
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_CT_NH = "ANGZPZUWBOHNPM6";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin đánh giá theo loại hình nghiệp vụ
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_DGTT_LKE_CT = "QQOSWOT7W8Z8C6Q";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin giám định tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_GDTT_NH = "HDLZGZICGXXPQUS";
		/// <summary>
		/// [XE_MAY] -  Lấy hạng mục tổn thất xe giám định xe cơ giới
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_LKE = "6JXPN9YIMRU9Q2S";
		/// <summary>
		/// [XE_MAY] - Liệt kê danh sách tỷ lệ thương tật xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_THUONG_TAT_LKE = "8ILOA75NBB3C6DX";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lấy danh sách thương tật xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_THUONG_TAT_LKE_CT = "WPLE241PAKY90BT";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin đánh giá  tỷ lệ thương tật xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_THUONG_TAT_NH = "UEMBZTXOBHA819K";
		/// <summary>
		/// [XE_MAY] - Xoá tỉ lệ thương tật
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_NV_THUONG_TAT_XOA = "XSOS66XYYGTO42A";
		/// <summary>
		/// [XE_MAY] - Phân loại hạng mục tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_PHAN_HANG_MUC = "4SK7A972VO4F5PL";
		/// <summary>
		/// [XE_MAY] -  Nhập hạng mục bồi thường của 1 hồ sơ
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_PHAN_HANG_PHU_NH = "EV8I830B9L0SKMR";
		/// <summary>
		/// [XE_MAY] - Xóa hạng mục bồi thường của 1 hồ sơ
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_PHAN_HANG_PHU_XOA = "9QGLPA27G46NKIC";
		/// <summary>
		/// [XE_MAY] - Thông báo tai nạn và yêu cầu bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_THONG_BAO_TAI_NAN = "JX6DXVZ4NU5YN6X";
		/// <summary>
		/// [XE_MAY] - Cập nhật thông tin người thông báo GĐ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_GD_TT_KH_UPDATE = "E2XO5A6FFYQSTPJ";
		/// <summary>
		/// [XE_MAY] - Xem bảng giá tính toán chi tiết xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BANG_TINH_TOAN_CTIET = "71YLVJJB2L2RFKK";
		/// <summary>
		/// [XE_MAY] -  Xem bảng chi tiết tính toán phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BANG_TINH_TOAN_PA_CTIET = "CU2W5EB2N0JNAH1";
		/// <summary>
		/// [XE_MAY] - BTV chọn báo giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_CHON = "RLWW5ZKWOMEKB1Q";
		/// <summary>
		/// [XE_MAY] - Duyệt báo giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_DUYET = "PMGC0E2182AVBNH";
		/// <summary>
		/// [XE_MAY] - Huỷ duyệt báo giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_DUYET_XOA = "8BKTMNY3AST0E31";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin báo giá gara
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_GARA_LKE_CT = "OGH0ILMG4S5I3GT";
		/// <summary>
		/// [XE_MAY] - Huỷ kết thúc báo giá xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_HUY_KT = "OLNQ6T4O0KW8BM1";
		/// <summary>
		/// [XE_MAY] - Kêt thúc báo giá xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_KT = "LXYPS6LIYL0HT0E";
		/// <summary>
		/// [XE_MAY] -  Lấy tất cả gara báo giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_LKE = "G68GZF05619VNVM";
		/// <summary>
		/// [XE_MAY] - Lấy gara báo giá chi tiết
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_LKE_CT = "YHRUYNQQ4VNG79I";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin gara báo giá xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_NH = "Q33ACGONTUBTPN9";
		/// <summary>
		/// [XE_MAY] - So sánh báo giá gara
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_SO_SANH = "DQNODLH5UYUO41T";
		/// <summary>
		/// [XE_MAY] - Thêm gara báo giá gara sửa chữa xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_THEM = "EKETG35MIHI1W3Q";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin gara báo giá xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_BAO_GIA_XOA = "Y1QJG4MA2TGTAHC";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin hoá đơn chứng từ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_CHUNG_TU_LKE = "IWP70EWDZQ9DVXO";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lưu thông tin chứng từ hoá đơn xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_CHUNG_TU_MOBILE_NH = "L8C9RZS7QXT891P";
		/// <summary>
		/// [XE_MAY_MOBILE] - Xoá hoá đơn chứng từ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_CHUNG_TU_MOBILE_XOA = "ODRK2JH7T6DL18O";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin chứng từ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_CHUNG_TU_NH = "UDSSNRFI3XO6K7I";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin chứng từ bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_CHUNG_TU_XOA = "IVDIS25AIE438QV";
		/// <summary>
		/// [XE_MAY] - Chuyển thanh toán xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_CHUYEN_THANH_TOAN = "09RAFT1SC9ANBX5";
		/// <summary>
		/// [XE_MAY] - Liệt kê thông tin BTV đánh giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_DANH_GIA_BTV_LKE_CT = "DBD8HMZTVLSXOL3";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin BTV đánh giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_DANH_GIA_BTV_NH = "9ERVV7H43BIZY16";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin chi tiết BTV đánh giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_DANH_GIA_LKE_CT = "O0XO4K3Q448FY52";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin BTV đánh giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_DANH_GIA_NH = "Q94S1NWFWGI4TE7";
		/// <summary>
		/// [XE_MAY] - Lấy điều khoản bổ sung theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_DKBS_LKE = "Y13PJIBTL7109ID";
		/// <summary>
		/// [XE_MAY] - Đóng hồ sơ bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_DONG_HS = "QMGXL78GRFFUVDS";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin file cần ReGenerate
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_GEN_FILE = "5E978MQQX73W0C7";
		/// <summary>
		/// [XE_MAY] - Lấy nguyên nhân giảm trừ theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_GIAM_TRU_LKE = "6I7NB4GT8K173IK";
		/// <summary>
		/// [XE_MAY] - Gỡ huỷ hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_GO_HUY = "5K82U0LG8CDG0I9";
		/// <summary>
		/// [XE_MAY] - Huỷ hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_HUY = "ZDGHTHM66ASEFZ3";
		/// <summary>
		/// [XE_MAY] - Huỷ chuyển thanh toán bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_HUY_CHUYEN_THANH_TOAN = "X14HT95IMBBRWIC";
		/// <summary>
		/// [XE_MAY] - Huỷ đóng hồ sơ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_HUY_DONG_HS = "6JIDU6P61VBLI7X";
		/// <summary>
		/// [XE_MAY] - Liệt kê + phân trang bòi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_LKE = "W6OSGBMP4F3NCDK";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin chi tiết hồ sơ bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_LKE_CT = "4GGUX73BK92MAJK";
		/// <summary>
		/// [XE_MAY_MOBILE] - Hủy kết thúc báo giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_BAO_GIA_HUY_KT = "785CZN278Q7T76H";
		/// <summary>
		/// [XE_MAY_MOBILE] - Kết thúc báo giá gara
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_BAO_GIA_KT = "BEGCE0QFCO8YN5G";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lấy tất cả gara báo giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_BAO_GIA_LKE = "3016Q3TQY98DX01";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lấy thông tin chi tiết báo giá gara
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_BAO_GIA_LKE_CT = "MLRX4VV9B4XMZP3";
		/// <summary>
		/// [XE_MAY_MOBILE] - Nhập thông tin báo giá gara
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_BAO_GIA_NH = "EFEQFO97PL7G9D1";
		/// <summary>
		/// [XE_MAY_MOBILE] - Thêm gara báo giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_BAO_GIA_THEM = "ZGRM3ZNJ1OULGHK";
		/// <summary>
		/// [XE_MAY_MOBILE] - Xoá gara báo giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_BAO_GIA_XOA = "GP3502BDP8X5DYN";
		/// <summary>
		/// [XE_MAY_MOBILE] - Danh sách hoá đơn chứng từ thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_CHUNG_TU_THU_HUONG_LKE = "7S6C08RI7SSIELG";
		/// <summary>
		/// [XE_MAY_MOBILE] - Chuyển thanh toán hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_CHUYEN_THANH_TOAN = "5SFS6VVJEXCHZD7";
		/// <summary>
		/// [XE_MAY_MOBILE] - Huỷ chuyển thanh toán xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_HUY_CHUYEN_THANH_TOAN_TT = "1C25P5XMPDMY2FS";
		/// <summary>
		/// [XE_MAY_MOBILE] - Kiểm tra trình duyệt phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_KTRA_TRINH_PA = "RUXADRZ6273VMLB";
		/// <summary>
		/// [XE_MAY_MOBILE] - Chọn phương án 
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_MOBILE_PA_CHON = "Y7VF19SUKGWVK2C";
		/// <summary>
		/// [XE_MAY] - Nhận hồ sơ bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NHAN_HS = "7JVM3V4Y2C4UILQ";
		/// <summary>
		/// [XE_MAY] -  Danh sách hạng mục chi tiết bồi thường
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_CT_LKE = "DP1LVKE0GTQDZPJ";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin chi tiết hạng mục
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_CT_NH = "B6QF1A7K9NHG86J";
		/// <summary>
		/// [XE_MAY] - Lưu điều khoản bổ sung theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_DKBS_NH = "12C39TCUS7AQHY4";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin ghi chú
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_GHI_CHU_NH = "3DWYAAUMD6ETY49";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin khấu trừ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_GIA_KTRU_NH = "J0XB21TPBU9BGNG";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin giảm giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_GIA_LKE = "2Y2ZPKF76DMXCE2";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin giảm giá
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_GIA_NH = "S7VY7BL41L770ZZ";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin khấu trừ
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_KTRU_LKE = "LQ4PEWDXRG4KP89";
		/// <summary>
		/// [XE_MAY] - Xem chi tiết nghiệp vụ của 1 hồ sơ
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_LKE = "5X6DE8LJA046AXN";
		/// <summary>
		/// [XE_MAY_MOBILE] - Nhập thông tin tính toán
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_MOBILE_TINH_TOAN_NH = "R6CP9Y1BUPDFIEM";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin phương án bồi thường
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_NH = "DK99Q2JARJFV1VH";
		/// <summary>
		/// [XE_MAY] - Lưu NNGT theo hạng mục
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_NNGT_NH = "DWTH2CP1DLI2BS1";
		/// <summary>
		/// [XE_MAY] - Liệt kê thuế 
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_THUE_LKE = "NQIIL28876DJZAA";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin thuế
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_THUE_NH = "8Z3KP1KBOKGSJ4J";
		/// <summary>
		/// [XE_MAY] - Tính toán bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_TINH_TOAN = "YY7WLPZA6PSYL5F";
		/// <summary>
		/// [XE_MAY] - Lấy hạng mục theo LHNV
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_NV_TKIEM = "9E1M2FU2GOFO82D";
		/// <summary>
		/// [XE_MAY] - Xem thông tin tính toán phương án chi tiết
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_BANG_VIEW = "SYNCBR6T6LNB54J";
		/// <summary>
		/// [XE_MAY] - Bỏ chọn phương án 
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_BO_CHON = "G6AOQZN6ME7THKA";
		/// <summary>
		/// [XE_MAY] - Chọn phương án bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_CHON = "8PIXIIGX6AFIOQW";
		/// <summary>
		/// [XE_MAY] - Lưu khấu trừ phương án bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_CT_GIA_KTRU_NH = "KRCJ5YE0VC7EBYE";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách giảm giá phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_CT_GIA_LKE = "FFNAJ1H26E6RUD5";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin giảm giá phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_CT_GIA_NH = "C3LJ2E8FNE6T70F";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin khấu trừ phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_CT_KTRU_LKE = "58IKQ70WDMO69ZO";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách thuế phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_CT_THUE_LKE = "DB6WNKWUXUAGKE6";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin thuế phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_CT_THUE_NH = "I8JPW3I8HDUIY57";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách loại hình nghiệp vụ 
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_LHNV_LKE = "LGZVY0ZMZGKRE0L";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_LKE = "4KKGDWITMEFCMKZ";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách chi tiết các phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_LKE_CT = "AR7LXJJJGWXRYFR";
		/// <summary>
		/// [XE_MAY_MOBILE] - Lưu phương án nghiệp vụ khác
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_MOBILE_LHNV_KHAC_DTUONG_NH = "R1CNFFO9W3HG698";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin phương án
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_NH = "HXRV6VG0W64HOQP";
		/// <summary>
		/// [XE_MAY] - Lưu phương án nghiệp vụ khác
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_NV_CT_NH = "6Z10A0P2DYKXUQK";
		/// <summary>
		/// [XE_MAY] - Tính toán phương án bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_NV_TINH_TOAN = "ZGT860WWWCTDJ84";
		/// <summary>
		/// [XE_MAY] - Thêm mới phương án tối ưu nhất
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_NV_TONG_HOP_NH = "RXRWV3FBOR0PA8L";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin phương án 
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PA_X = "P9RKV6IVP0UGJ0Q";
		/// <summary>
		/// [XE_MAY] - Phân loại hạng mục tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_PHAN_HANG_MUC = "4H1C12BPYY06IU2";
		/// <summary>
		/// [XE_MAY] - Cập nhật số tiền thuế xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_SO_TIEN_THUE_NH = "DRI301QGTNJEEUM";
		/// <summary>
		/// [XE_MAY] - Liệt kê thông tin tạm ứng bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TAM_UNG_LKE = "EKLNE5OI3SWPELI";
		/// <summary>
		/// [XE_MAY] - Lấy thông tin chi tiết tạm ứng bồi thường
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TAM_UNG_LKE_CT = "MXV2NL6VLL10HDO";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin tạm ứng xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TAM_UNG_NH = "8TP223KSKYNLEE2";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin tạm ứng bồi thường xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TAM_UNG_XOA = "VF8P6L1BKHJANG7";
		/// <summary>
		/// [XE_MAY_MOBILE] - Nhập thông tin người thụ hưởng xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_THU_HUONG_MOBILE_NH = "F5JGJBI4HRQ38M2";
		/// <summary>
		/// [XE_MAY_MOBILE] - Xoá thông tin người thụ hưởng xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_THU_HUONG_MOBILE_XOA = "2UQPZTDS6XCZGID";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin người thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_THU_HUONG_NH = "XD7E7241339J8HC";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin người thụ hưởng
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_THU_HUONG_XOA = "WUY0IBQFRJ9HV0D";
		/// <summary>
		/// [XE_MAY] - Nhập chi tiết hạng mục TNDS xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TNDS_NH = "UUESDSI12F4J9BB";
		/// <summary>
		/// [XE_MAY] - Bồi thường toàn bộ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TON_THAT_TOAN_BO = "3OFIFSSUSZZMEO3";
		/// <summary>
		/// [XE_MAY] - Xóa bồi thường toàn bộ xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TON_THAT_TOAN_BO_XOA = "OB2BZIJJWH8F84W";
		/// <summary>
		/// [XE_MAY] - Tờ trình phương án sửa chữa
		/// </summary>
		public const string PBH_BT_XE_MAY_HS_TO_TRINH_PASC_IN = "69K7SU6Y3L3GP2Z";
		/// <summary>
		/// [XE_MAY] - Kiểm tra phân công xử lý
		/// </summary>
		public const string PBH_BT_XE_MAY_KTRA_XU_LY = "0O0MO8X6NWGVYOM";
		/// <summary>
		/// [XE_MAY] - Liệt kê chi phí lần giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_LAN_GD_CHI_PHI_LKE = "VO7DCF8BQUVA6E0";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin chi phí lần giám định
		/// </summary>
		public const string PBH_BT_XE_MAY_LAN_GD_CHI_PHI_NH = "8E5L1C5N5I5054T";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin chi phí lần giám định
		/// </summary>
		public const string PBH_BT_XE_MAY_LAN_GD_CHI_PHI_XOA = "ND5CN0JVPITTG5U";
		/// <summary>
		/// [XE_MAY] - Huỷ kết thúc lần giám định
		/// </summary>
		public const string PBH_BT_XE_MAY_LAN_GD_HUY_KTHUC = "SQKI2T3YYX3AFSG";
		/// <summary>
		/// [XE_MAY] - Kết thúc giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_LAN_GD_KTHUC = "F9VSYPAR2EM113K";
		/// <summary>
		/// [XE_MAY] - Nhập thông tin lần giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_LAN_GD_NH = "V8XBAQNI98X4FE8";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin lần giám định xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_LAN_GD_XOA = "M6YCUT70GBF2M7E";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin người liên quan xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_NGUOI_LIEN_QUAN_NH = "AFE2T8JHFKUPW4R";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin người liên quan xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_NGUOI_LIEN_QUAN_XOA = "1LQ45QCZE664H1W";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách thu đòi NTBA
		/// </summary>
		public const string PBH_BT_XE_MAY_THU_DOI_NTBA_LKE = "GRFZDKEI6MIG3XA";
		/// <summary>
		/// [XE_MAY] - Lưu người thứ 3 thu đòi
		/// </summary>
		public const string PBH_BT_XE_MAY_THU_DOI_NTBA_NH = "L5IW0P4BZK9UIZL";
		/// <summary>
		/// [XE_MAY] - Xóa người thứ 3 thu đòi
		/// </summary>
		public const string PBH_BT_XE_MAY_THU_DOI_NTBA_XOA = "3PGOLZPBAF1LLKC";
		/// <summary>
		/// [XE_MAY] - Dach sách vật tư thu hồi xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_THU_HOI_LKE = "M8QAMAYML3N2PTK";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin vật tư thu hồi xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_THU_HOI_NH = "MDWABV9P9LL5WR9";
		/// <summary>
		/// [XE_MAY] - Xoá thông tin vật tư thu hồi xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_THU_HOI_XOA = "F24GFNFY6MHMOA7";
		/// <summary>
		/// [XE_MAY] - Lưu ước tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_UOC_TON_THAT_NH = "Y40MM98H2FOBY6J";
		/// <summary>
		/// [XE_MAY] - Lưu thông tin diễn biến vụ tổn thất
		/// </summary>
		public const string PBH_BT_XE_MAY_VU_TT_NH = "W3VFM7IZFOMXLUC";
		/// <summary>
		/// [XE_MAY] - Cập nhật thông tin bằng lái xe
		/// </summary>
		public const string PBH_BT_XE_MAY_VU_TT_UPDATE = "3R6BAWLLEJFRHLS";
		/// <summary>
		/// [XE_MAY] - Xóa thông tin vụ tổn thất xe máy
		/// </summary>
		public const string PBH_BT_XE_MAY_VU_TT_XOA = "4595MD74QZMDNZD";
		/// <summary>
		/// Lưu thông tin người liên quan (GĐ xe cơ giới)
		/// </summary>
		public const string PBH_BT_XE_NGUOI_LIEN_QUAN_NH = "DIVYC8EH26OQYGF";
		/// <summary>
		/// Xóa người liên quan (Giám đinh xe cơ giới)
		/// </summary>
		public const string PBH_BT_XE_NGUOI_LIEN_QUAN_XOA = "GUBRDHMAN765GX7";
		/// <summary>
		/// Lấy cache nhóm đối tượng tổn thất
		/// </summary>
		public const string PBH_BT_XE_NHOM_DOI_TUONG_CACHE = "LHUGCTIN77FPU8F";
		/// <summary>
		/// Liệt kê thông tin nhóm đối tượng tổn thất
		/// </summary>
		public const string PBH_BT_XE_NHOM_DOI_TUONG_LKE = "RU5YTZ6W6VFT0J6";
		/// <summary>
		/// Liệt kê thông tin chi tiết nhóm đối tượng tốn thất
		/// </summary>
		public const string PBH_BT_XE_NHOM_DOI_TUONG_LKE_CT = "7MO1WMO7WLOO9S5";
		/// <summary>
		/// Nhập thông tin nhóm đối tượng
		/// </summary>
		public const string PBH_BT_XE_NHOM_DOI_TUONG_NH = "8RS5K56RH93O0GA";
		/// <summary>
		/// Xóa thông tin nhóm đối tượng 
		/// </summary>
		public const string PBH_BT_XE_NHOM_DOI_TUONG_XOA = "XQ8CLA8EHVMYDQL";
		/// <summary>
		/// Liệt kê danh sách hồ sơ tạm ứng
		/// </summary>
		public const string PBH_BT_XE_TAM_UNG_TKIEM = "9J5TLZRI9HIHNWR";
		/// <summary>
		/// Danh sách người thứ 3 thu đòi
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_LKE = "2W25VA66XSFBAZZ";
		/// <summary>
		/// Tìm kiếm danh sách thu đòi người thứ 3
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_LKE_PT = "GEID7JDTTXVI5WM";
		/// <summary>
		/// Lưu thông tin người thứ 3 thu đòi
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_NH = "Z5AC7OJGJWXCGRB";
		/// <summary>
		/// Liệt kê danh sách thu đòi người thứ 3 phát sinh
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_PS_LKE = "6F51CP1C7JO4J03";
		/// <summary>
		/// Liêt kê chi tiết danh sách thu đòi người thứ 3 phát sinh
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_PS_LKE_CT = "0HV7Z50Y2EEKJSR";
		/// <summary>
		/// Nhập thông tin thu đòi người thứ 3 phát sinh
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_PS_NH = "PTZEN7HMF1YXYXM";
		/// <summary>
		/// Xóa thông tin thu đòi người thứ 3 phát sinh
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_PS_XOA = "MTFYOFPRU09278N";
		/// <summary>
		/// Xóa thông tin người thứ 3 thu đòi
		/// </summary>
		public const string PBH_BT_XE_THU_DOI_NTBA_XOA = "BH1FEZBUAG7N9F2";
		/// <summary>
		/// Danh sách vật tư thu hồi
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_LKE = "F2W8ED3GW4EK24M";
		/// <summary>
		/// Lưu thông tin vật tư thu hồi
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_NH = "YG3CJME5D830N4J";
		/// <summary>
		/// Tìm kiếm vật tư thu hồi phát sinh
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_PS_LKE = "B3FXBLTKR669DY8";
		/// <summary>
		/// Lấy thông tin chi tiết thanh lý thu hồi vật tư phát sinh
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_PS_LKE_CT = "RFETKNM9XBT1CKS";
		/// <summary>
		/// Lưu thông tin yêu cầu phát sinh thanh lý thu hồi vật tư
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_PS_NH = "7IXKY13YJ063C37";
		/// <summary>
		/// Xóa thông tin thanh lý thu hồi vật tư phát sinh
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_PS_XOA = "D41OR1HY18ZCNRH";
		/// <summary>
		/// Danh sách vật tư thu hồi
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_TKIEM = "15V5ZSSKTSPIJK3";
		/// <summary>
		/// Xóa thông tin vật tư thu hồi
		/// </summary>
		public const string PBH_BT_XE_THU_HOI_XOA = "F7X42575UZVDERP";
		/// <summary>
		/// Mẫu in tờ trình thuê giám định
		/// </summary>
		public const string PBH_BT_XE_TO_TRINH_THUE_GD_IN = "N58C1GAHP3JAVN3";
		/// <summary>
		/// Lấy ước tổn thất
		/// </summary>
		public const string PBH_BT_XE_UOC_TON_THAT_CT = "UO4E8II2UNIO1TC";
		/// <summary>
		/// Lấy danh sách lhnv đối tượng hợp đồng tham gia
		/// </summary>
		public const string PBH_BT_XE_UOC_TON_THAT_LHNV_LKE = "VORX0JJ26B7X6SK";
		/// <summary>
		/// Lưu ước tổn thất
		/// </summary>
		public const string PBH_BT_XE_UOC_TON_THAT_NH = "HDHP91XH6UT317G";
		/// <summary>
		/// Lưu ước tổn thất nghiệp vụ
		/// </summary>
		public const string PBH_BT_XE_UOC_TON_THAT_NV_NH = "G3GQ3C2VQYFLGXD";
		/// <summary>
		/// Lấy ước tổn thất gợi ý
		/// </summary>
		public const string PBH_BT_XE_UOC_TON_THAT_TU_DONG = "J0J076R2F1O1STA";
		/// <summary>
		/// Lưu thông tin diễn biến tổn thất
		/// </summary>
		public const string PBH_BT_XE_VU_TT_NH = "M0GWZGLGH3YXZME";
		/// <summary>
		/// Bổ sung thông tin bằng lái xe
		/// </summary>
		public const string PBH_BT_XE_VU_TT_UPDATE = "KCAC2RSIH8ABH6I";
		/// <summary>
		/// Bổ sung thêm thông tin đăng kiểm xe
		/// </summary>
		public const string PBH_BT_XE_VU_TT_UPDATE_DK = "G2K2WK65HVMRDLC";
		/// <summary>
		/// Xóa thông tin vụ tổn thất
		/// </summary>
		public const string PBH_BT_XE_VU_TT_XOA = "LADXF9Q1B9VY2IU";
		/// <summary>
		/// [PJICO] - Mẫu in xác nhận ấn chỉ
		/// </summary>
		public const string PBH_BT_XE_XAC_NHAN_AN_CHI_PJICO = "GPNGAIF7RPUYRN1";
		/// <summary>
		/// Lưu xác nhận khách hàng
		/// </summary>
		public const string PBH_BT_XE_XAC_NHAN_KH_NH = "TZ3Y8RS7GPAWE69";
		/// <summary>
		/// Lấy thông tin ý kiến hồ sơ từ hash code
		/// </summary>
		public const string PBH_BT_Y_KIEN_GET_INFO_HASHCODE = "ZHO3FWJWL0KV9TW";
		/// <summary>
		/// Lấy thông tin chi tiết trình xin ý kiến của hồ sơ
		/// </summary>
		public const string PBH_BT_Y_KIEN_HS_LKE = "JQQVRLUZBKNQE8Z";
		/// <summary>
		/// Liệt kê lịch sử xin ý kiến
		/// </summary>
		public const string PBH_BT_Y_KIEN_LICH_SU_LKE = "KLFOQO4NYQOZ3P5";
		/// <summary>
		/// Tìm kiếm phân trang cho ý kiến
		/// </summary>
		public const string PBH_BT_Y_KIEN_LKE = "WDSR3VXVWI1J8UP";
		/// <summary>
		/// Liệt kê chi tiết xin ý kiến của hồ sơ
		/// </summary>
		public const string PBH_BT_Y_KIEN_LKE_CT = "JWOH43FEPTGZDWE";
		/// <summary>
		/// Liệt kê thông tin chi tiết hồ sơ
		/// </summary>
		public const string PBH_BT_Y_KIEN_LKE_THONG_TIN_HO_SO = "W0LB88M5PRQVG7U";
		/// <summary>
		/// Xin ý kiến hồ sơ bồi thường
		/// </summary>
		public const string PBH_BT_Y_KIEN_NH = "M8GJI37Z0ZLUISC";
		/// <summary>
		/// Gửi email ý kiến cấp trên
		/// </summary>
		public const string PBH_BT_Y_KIEN_NH_EMAIL = "RGA1K3I6BZQLO50";
		/// <summary>
		/// Lấy nội dung ý kiến
		/// </summary>
		public const string PBH_BT_Y_KIEN_NOI_DUNG = "UHYMZ7KB6EZEABS";
		/// <summary>
		/// Liệt kê chi tiết cho ý kiến
		/// </summary>
		public const string PBH_BT_Y_KIEN_NSD_CT_LKE_CT = "DBSEYQUGRW9QXDS";
		/// <summary>
		/// Lưu ý kiến nsd 
		/// </summary>
		public const string PBH_BT_Y_KIEN_NSD_CT_NH = "AIQHPQ5GROFYWSI";
		/// <summary>
		/// Trình ý kiến/Hủy trình/Đóng ý kiến
		/// </summary>
		public const string PBH_BT_Y_KIEN_TRINH = "6CMW5P1F37VZ3DI";
		/// <summary>
		/// Thu hồi ý kiến
		/// </summary>
		public const string PBH_BT_Y_KIEN_XOA = "NZX9PLZG03MU5DU";
		/// <summary>
		/// Lấy thông tin cấu hình web BLVP của bệnh viện
		/// </summary>
		public const string PBH_CAI_DAT_UNG_DUNG_BV_LKE = "34BU2U398JL3ZB5";
		/// <summary>
		/// Lấy thông tin cài đặt ứng dụng
		/// </summary>
		public const string PBH_CAI_DAT_UNG_DUNG_LKE = "9BHPXAER8I47MKS";
		/// <summary>
		/// Nhập cấu hình cài đặt mẫu in - logo
		/// </summary>
		public const string PBH_CAI_DAT_UNG_DUNG_NH = "1MG9OSLDVMAP4TP";
		/// <summary>
		/// [SURVEY] Liệt kê danh sách chiến dịch
		/// </summary>
		public const string PBH_CHIEN_DICH_LKE = "1ZV573F2KW29AN5";
		/// <summary>
		/// Nhập cấu hình dịch vụ AI
		/// </summary>
		public const string PBH_DICH_VU_AI_NH = "2U6WBUOPGVXE3MH";
		/// <summary>
		/// Lấy tất cả danh sách báo giá
		/// </summary>
		public const string PBH_DICH_VU_BAO_GIA_CACHE = "VVIK1Y4UR9SABD7";
		/// <summary>
		/// Liệt kê dịch vụ báo giá Gara
		/// </summary>
		public const string PBH_DICH_VU_BAO_GIA_LKE = "WVZ52PEYDE5UTS0";
		/// <summary>
		/// Lấy cấu hình call api báo giá gara
		/// </summary>
		public const string PBH_DICH_VU_BAO_GIA_LKE_CT = "1TC6HWUTM31XOL2";
		/// <summary>
		/// Nhập thông tin báo giá Gara
		/// </summary>
		public const string PBH_DICH_VU_BAO_GIA_NH = "Z53FMYG7MHP629P";
		/// <summary>
		/// Kiểm tra đăng ký dịch vụ video call voice call
		/// </summary>
		public const string PBH_DICH_VU_CALL_KTRA_DANG_KY = "IDZ76RZQDIY7TZ8";
		/// <summary>
		/// Liệt kê danh sách dịch vụ call
		/// </summary>
		public const string PBH_DICH_VU_CALL_LKE = "PVXW1L7WMF2SFQ8";
		/// <summary>
		/// Xem chi tiết dịch vụ call
		/// </summary>
		public const string PBH_DICH_VU_CALL_LKE_CT = "CA0AZBUIC6SDXAK";
		/// <summary>
		/// Nhập dịch vụ call
		/// </summary>
		public const string PBH_DICH_VU_CALL_NH = "9U6NNWSCYAAMUCV";
		/// <summary>
		/// Xóa dịch vụ call
		/// </summary>
		public const string PBH_DICH_VU_CALL_X = "NGTWFM6D5Z5B4QS";
		/// <summary>
		/// Liệt kê dịch vụ googel maps
		/// </summary>
		public const string PBH_DICH_VU_GOOGLE_LKE = "Y3PPT7MQY367ZAL";
		/// <summary>
		/// Xem chi tiết dịch vụ Google Maps
		/// </summary>
		public const string PBH_DICH_VU_GOOGLE_LKE_CT = "S6DN8N9I9CKLGG5";
		/// <summary>
		/// Nhập dịch vụ google maps
		/// </summary>
		public const string PBH_DICH_VU_GOOGLE_NH = "4DLSXI9HCI06F2R";
		/// <summary>
		/// Xóa dịch vụ google maps
		/// </summary>
		public const string PBH_DICH_VU_GOOGLE_X = "4ZYYALK3QEE0SWB";
		/// <summary>
		/// Kiểm tra cấu hình dịch vụ
		/// </summary>
		public const string PBH_DICH_VU_KIEM_TRA = "AQYNJTFXFT17IAG";
		/// <summary>
		/// Gửi thông báo YCBSHS tới khách hàng
		/// </summary>
		public const string PBH_DICH_VU_MCM_GUI_THONG_BAO = "SI91TI3YK20OMKJ";
		/// <summary>
		/// Cập nhật trạng thái callback MCM
		/// </summary>
		public const string PBH_DICH_VU_MCM_LICH_GUI_CALLBACK = "KA41XRM80N0HB4F";
		/// <summary>
		/// Lấy danh sách tin nhắn gửi MCM
		/// </summary>
		public const string PBH_DICH_VU_MCM_LICH_GUI_LKE = "GKO6GU444OYZHVA";
		/// <summary>
		/// Cập nhật kết quả gửi tin nhắn
		/// </summary>
		public const string PBH_DICH_VU_MCM_LICH_GUI_UPDATE = "EY0FB4LHR9DHWHN";
		/// <summary>
		/// Kiểm tra dịch vụ OCR
		/// </summary>
		public const string PBH_DICH_VU_OCR_CVS_KIEM_TRA = "OO6LQDM6M3UNPJN";
		/// <summary>
		/// Liệt kê thông tin chi tiết dịch vụ OCR CVS
		/// </summary>
		public const string PBH_DICH_VU_OCR_CVS_LKE_CT = "ISQZRRCKL3G0FQ6";
		/// <summary>
		/// Liệt kê danh sách dịch vụ OCR
		/// </summary>
		public const string PBH_DICH_VU_OCR_LKE = "H32JZUUXOM4D72K";
		/// <summary>
		/// Xem chi tiết dịch vụ Ocr
		/// </summary>
		public const string PBH_DICH_VU_OCR_LKE_CT = "IZ7AJAR8MTIA8QH";
		/// <summary>
		/// Nhập cấu hình dịch vụ OCR
		/// </summary>
		public const string PBH_DICH_VU_OCR_NH = "NKOA2RLZBEC5YJD";
		/// <summary>
		/// Xóa dịch vụ Ocr
		/// </summary>
		public const string PBH_DICH_VU_OCR_X = "YQ350T64AAKYE10";
		/// <summary>
		/// Nhập thông tin lịch gửi SMS
		/// </summary>
		public const string PBH_DICH_VU_SMS_GUI_THONG_BAO = "PDTR6R3K7XPZV2S";
		/// <summary>
		/// Nhập cấu hình dịch vụ sms
		/// </summary>
		public const string PBH_DICH_VU_SMS_NH = "J8XEQIBJXN69D40";
		/// <summary>
		/// Đọc thông tin hóa đơn điện tử
		/// </summary>
		public const string PBH_DOC_EBILL_CT = "3DQWZGMNP8E1SVD";
		/// <summary>
		/// Lưu thông tin đọc hóa đơn điện tử
		/// </summary>
		public const string PBH_DOC_EBILL_NH = "Q78YNB5H6J7VR3M";
		/// <summary>
		/// Export hợp đồng xe ô tô
		/// </summary>
		public const string PBH_DS_XE_EXP = "KQVBDMPXUJK5X1S";
		/// <summary>
		/// [PM báo giá] - Danh sách đơn báo giá
		/// </summary>
		public const string PBH_DTBG_BAO_GIA_LKE = "4PL5CVL22SAZ2Q6";
		/// <summary>
		/// [PM báo giá] - Lấy thông tin chi tiết báo giá gara
		/// </summary>
		public const string PBH_DTBG_BAO_GIA_LKE_CT = "7EIRO2TP9Q0E7C5";
		/// <summary>
		/// [PM báo giá] - Cài đặt ứng dụng gara
		/// </summary>
		public const string PBH_DTBG_CAI_DAT_UNG_DUNG_LKE = "H9T507SZ0D0W689";
		/// <summary>
		/// Liệt kê danh sách người sử dụng (Báo giá Gara)
		/// </summary>
		public const string PBH_DTBG_NSD_LKE = "15QP2T62URQV7GX";
		/// <summary>
		/// [PM báo giá] - Login hệ thống gara báo giá
		/// </summary>
		public const string PBH_DTBG_NSD_LOGIN = "I6O9I3VTJ853VB1";
		/// <summary>
		/// Xuất danh sách người
		/// </summary>
		public const string PBH_EXPORT_DS_NG = "LJL6T6XMEO8V2RU";
		/// <summary>
		/// Xuất danh sách xe
		/// </summary>
		public const string PBH_EXPORT_DS_XE = "ELXNIE6BYNHLZ21";
		/// <summary>
		/// Xuất gói bảo hiểm
		/// </summary>
		public const string PBH_EXPORT_GOI_BH = "QFWD5WUMJ62J8WI";
		/// <summary>
		/// Lấy thông tin mức độ tổn thất nhận diện AI
		/// </summary>
		public const string PBH_FILE_AI_MUC_DO = "THGALFZUQ7T9FYB";
		/// <summary>
		/// Lưu thông tin kết quả nhận diện AI
		/// </summary>
		public const string PBH_FILE_AI_NH = "KHIISDQCA3273RD";
		/// <summary>
		/// Lấy ra thông tin ảnh chi tiết để xem ảnh
		/// </summary>
		public const string PBH_FILE_BT = "JZKN45US24UJHC3";
		/// <summary>
		/// Nhận diện ảnh tổn thất AI theo danh sách
		/// </summary>
		public const string PBH_FILE_NHAN_DIEN_AI = "A645XQF8G5CSAYO";
		/// <summary>
		/// Lấy thông tin file theo ma_file
		/// </summary>
		public const string PBH_FILE_OPENID_LKE_CT = "WITMDAWY1IXVOC8";
		/// <summary>
		/// Xóa file tự động
		/// </summary>
		public const string PBH_FILE_OPENID_XOA = "QEDCKOS2D1ULGC6";
		/// <summary>
		/// Danh sách video của hồ sơ
		/// </summary>
		public const string PBH_FILE_VIDEO_LKE = "2L2D0J3YSAT9W6S";
		/// <summary>
		/// Lấy thông tin video
		/// </summary>
		public const string PBH_FILE_VIDEO_LKE_CT = "4LLOHURKMNG3463";
		/// <summary>
		/// Lưu thông tin video
		/// </summary>
		public const string PBH_FILE_VIDEO_NH = "XRBOKK5OKE3NQ81";
		/// <summary>
		/// Sửa tên file video
		/// </summary>
		public const string PBH_FILE_VIDEO_SUA_TEN = "7R78CC5FZ4LPN8J";
		/// <summary>
		/// Tìm kiếm phân trang File hình ảnh, tài liệu
		/// </summary>
		public const string PBH_FILE_XEM_DANH_SACH = "ZT6M49OEWT78UT6";
		/// <summary>
		/// Lấy danh sách hồ sơ bồi thường màn chi phí giám định
		/// </summary>
		public const string PBH_GD_HS_BT_LKE = "J4GAYF93XCZO6YR";
		/// <summary>
		/// Lấy chi tiết hồ sơ bồi thường màn chi phí giám định
		/// </summary>
		public const string PBH_GD_HS_BT_LKE_CT = "4N30STIBH05LJGO";
		/// <summary>
		/// Nhập thông tin chứng từ chi phí giám định
		/// </summary>
		public const string PBH_GD_HS_CHUNG_TU_NH = "6IB0YDY7FRGG2KQ";
		/// <summary>
		/// Xóa chứng từ hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_CHUNG_TU_XOA = "BE6JRHPES3ZUIQP";
		/// <summary>
		/// Chuyển thanh toán hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_CHUYEN_TT = "7YT06E0UI42HUHV";
		/// <summary>
		/// Hủy chuyển thanh toán hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_CHUYEN_TT_XOA = "ZW4XGHOZ7BKQEJS";
		/// <summary>
		/// Lưu chi phí giám định chi tiết
		/// </summary>
		public const string PBH_GD_HS_CT_NH = "AMSLJ9KQJWOR1SK";
		/// <summary>
		/// Lưu chi phí thực tế hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_CT_TIEN_THUC_TE_NH = "JTUBPZ5XVUMO0WF";
		/// <summary>
		/// Xóa chi phí chi tiết giám định
		/// </summary>
		public const string PBH_GD_HS_CT_X = "Y2HS0FFCXFL26F6";
		/// <summary>
		/// Đóng hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_DONG_HS = "JV7KIS6DFPE02XW";
		/// <summary>
		/// Hủy đóng hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_HUY_DONG_HS = "UYTZA1196G9790R";
		/// <summary>
		/// Liệt kê danh sách chi phí giám định
		/// </summary>
		public const string PBH_GD_HS_LKE = "NW3U9O7AZERI80K";
		/// <summary>
		/// Lấy chi tiết hồ sơ giám định(TPA)
		/// </summary>
		public const string PBH_GD_HS_LKE_CT = "DOFA0Y1M43GG2WU";
		/// <summary>
		/// Lưu thông tin chi phí giám định
		/// </summary>
		public const string PBH_GD_HS_NH = "X7EXR1TINXD8WYL";
		/// <summary>
		/// Phân loại hạng mục giấy tờ hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_PHAN_HANG_MUC = "KODS0WUBSY0H34V";
		/// <summary>
		/// Lưu thông tin thụ hưởng hồ sơ giám định con người
		/// </summary>
		public const string PBH_GD_HS_THU_HUONG_NH = "9ORZZRMDFY2FGMW";
		/// <summary>
		/// Xóa người thụ hưởng hồ sơ giám định
		/// </summary>
		public const string PBH_GD_HS_THU_HUONG_XOA = "5OATDZ923PVSNJG";
		/// <summary>
		/// Lấy dữ liệu cho mẫu in trình giám định
		/// </summary>
		public const string PBH_GD_HS_TRINH_IN = "4R49GCB37QZ1U7Z";
		/// <summary>
		/// Liệt kê danh sách cấu hình giá gara
		/// </summary>
		public const string PBH_GIA_GARA_CAU_HINH_LKE = "HTLHKPNNMBTJSJ6";
		/// <summary>
		/// Lấy thông tin email đánh giá rủi ro
		/// </summary>
		public const string PBH_HD_DGRR_NH_EMAIL = "55MFZU989FZMLZZ";
		/// <summary>
		/// Liệt kê đồng tái
		/// </summary>
		public const string PBH_HD_DONG_TAI_BH_LKE = "OCDCMO4WRMPGYWX";
		/// <summary>
		/// Xem chi tiết Email CC
		/// </summary>
		public const string PBH_HD_EMAIL_CC_LKE_CT = "LN3HC7H73JZJ1W5";
		/// <summary>
		/// Xóa Emaill CC
		/// </summary>
		public const string PBH_HD_EMAIL_CC_LKE_X = "GFL80S2F71QUGZ7";
		/// <summary>
		/// Nhập Emaill CC
		/// </summary>
		public const string PBH_HD_EMAIL_CC_NH = "A3N4NG13QJOBWL8";
		/// <summary>
		/// Hủy duyệt hợp đồng
		/// </summary>
		public const string PBH_HD_HUY_DUYET = "I2I0FTJNY0SCV6Z";
		/// <summary>
		/// Lấy thong tin đồng tái của gcn bồi thường khác
		/// </summary>
		public const string PBH_HD_KHAC_GCN_DS_DONG_TAI_LKE = "OOLUQHNFMM3WEGI";
		/// <summary>
		/// Lấy chi tiết danh sách gcn bồi thường khác
		/// </summary>
		public const string PBH_HD_KHAC_GCN_DS_LKE = "MB98HKK7MVBFSVS";
		/// <summary>
		/// Lưu thông tin người được bảo hiểm hợp đồng khác
		/// </summary>
		public const string PBH_HD_KHAC_GCN_NH = "0E269D1XC0M9VC4";
		/// <summary>
		/// Liệt kê chi tiết hợp đồng khác
		/// </summary>
		public const string PBH_HD_KHAC_LKE = "QFKDE553ZYRV3MM";
		/// <summary>
		/// Lưu hợp đồng khác
		/// </summary>
		public const string PBH_HD_KHAC_NH = "39EWDYWUHT7JEB7";
		/// <summary>
		/// Lấy thông tin khách hàng
		/// </summary>
		public const string PBH_HD_KH_DETAIL = "5YOD81OFQKRV63P";
		/// <summary>
		/// liệt kê khách hàng
		/// </summary>
		public const string PBH_HD_KH_LKE = "8HFS0ALYPZOIBF1";
		/// <summary>
		/// Xem chi tiết khách hàng
		/// </summary>
		public const string PBH_HD_KH_LKE_CT = "KY3YQQVBPL5X5P9";
		/// <summary>
		/// Lưu thông tin khách hàng
		/// </summary>
		public const string PBH_HD_KH_NH = "YMF4VJJ7Z5F7PU5";
		/// <summary>
		/// Nhập thông tin khách hàng
		/// </summary>
		public const string PBH_HD_KH_NHAP = "I9S3QMG2MZ50QOH";
		/// <summary>
		/// Khách hàng đăng nhập
		/// </summary>
		public const string PBH_HD_KH_TK_MOBILE_DANG_NHAP = "FSV1LP24GM2VX27";
		/// <summary>
		/// Danh sách kỳ thanh toán
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_LKE = "28AAXZ18TO20RQ3";
		/// <summary>
		/// Lấy danh sách kỳ thanh toán 
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_LKE_LKE = "OO0BACI4204W10M";
		/// <summary>
		/// Xem chi tiết kỳ thanh toán
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_LKE_LKE_CT = "XHHH4TB8EM872QI";
		/// <summary>
		/// Lưu thông tin kỳ thanh toán của MIC
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_MIC_NH = "EJNQRSOK4FY6UGO";
		/// <summary>
		/// Lưu thông tin kỳ thanh toán
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_NH = "IAXT34HS7UU89D2";
		/// <summary>
		/// Nhập thông tin kỳ thanh toán
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_NH_NH = "28M19WG5HSE7ZU8";
		/// <summary>
		/// Lưu kỳ thanh toán OPES
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_OPES_NH = "GYXGQZOYIELBNOJ";
		/// <summary>
		/// Tích hợp lấy thông tin kỳ thanh toán
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_TICH_HOP = "G8I9R5QS8BIBYBS";
		/// <summary>
		/// Xóa thông tin kỳ thanh toán
		/// </summary>
		public const string PBH_HD_KY_THANH_TOAN_XOA = "6MZTMZ7W7B7BUPJ";
		/// <summary>
		/// Lấy danh sách quyền lợi bổ sung của nđbh
		/// </summary>
		public const string PBH_HD_NGUOI_DS_DKBS_LKE = "XE3UQ0Y82RTL4YY";
		/// <summary>
		/// Lấy danh sách điều khoản quyền lợi của gcn
		/// </summary>
		public const string PBH_HD_NGUOI_DS_DK_LKE_CT = "RAM6CKKTNU7OC1G";
		/// <summary>
		/// Lấy danh sách người được bảo hiểm của hợp đồng
		/// </summary>
		public const string PBH_HD_NGUOI_DS_LKE = "RSXZ5T82SEUPJEN";
		/// <summary>
		/// Lấy thông tin chi tiết Giấy chứng nhận con người
		/// </summary>
		public const string PBH_HD_NGUOI_DS_LKE_CT = "LD2F0RFJ1IJUGW4";
		/// <summary>
		/// Lấy danh sách đối tượng hợp đồng mapping từ excel
		/// </summary>
		public const string PBH_HD_NGUOI_DS_MAPPING_EXCEL = "2XG2X4RDTK3RM50";
		/// <summary>
		/// Update danh sách đối tượng cần chấm dứt hợp đồng
		/// </summary>
		public const string PBH_HD_NGUOI_DS_MAPPING_NH = "VT3F5RCCPOQZ9Y2";
		/// <summary>
		/// Download template edit đối tượng hợp đồng bảo hiểm
		/// </summary>
		public const string PBH_HD_NG_DS_DOWNLOAD_EDIT_TEMPLATE = "ZD29HJCJDOECZ7Q";
		/// <summary>
		/// Export hợp đồng con người
		/// </summary>
		public const string PBH_HD_NG_EXP = "67ERKNDWYX8MVDJ";
		/// <summary>
		/// danh mục con người
		/// </summary>
		public const string PBH_HD_NG_GCN_DM_LKE = "5Z44OCNIU4O8CXN";
		/// <summary>
		/// Lấy chi tiết đồng tái con người
		/// </summary>
		public const string PBH_HD_NG_GCN_DONG_TAI_CT = "WUTZEM69E5CMLCA";
		/// <summary>
		/// Xóa đồng tái hợp đồng sức khỏe
		/// </summary>
		public const string PBH_HD_NG_GCN_DONG_TAI_DELETE = "VW8NA57AV05EJNC";
		/// <summary>
		/// Lấy danh sách đồng tái của hồ sơ
		/// </summary>
		public const string PBH_HD_NG_GCN_DS_DONG_TAI_LKE = "1ED1ASKXBVTAOYK";
		/// <summary>
		/// Lưu thông tin đồng tái sức khỏe
		/// </summary>
		public const string PBH_HD_NG_GCN_DS_DONG_TAI_SAVE = "P2SIB354HE98ZRF";
		/// <summary>
		/// liệt kê chi tiết con người
		/// </summary>
		public const string PBH_HD_NG_GCN_DS_LKE = "1R7CBR1NB7BKVBD";
		/// <summary>
		/// Lưu danh sách người
		/// </summary>
		public const string PBH_HD_NG_GCN_DS_NH = "ABSD9ZAQF4245LU";
		/// <summary>
		/// Xem quyền lợi gói bảo hiểm gcn
		/// </summary>
		public const string PBH_HD_NG_GCN_DS_QL_LKE = "ZT3SBY5Q5VDZ90N";
		/// <summary>
		/// Xóa danh sách người
		/// </summary>
		public const string PBH_HD_NG_GCN_DS_XOA = "ZX5O23AQQU8CUX3";
		/// <summary>
		/// Xuất danh sách HDCN
		/// </summary>
		public const string PBH_HD_NG_GCN_EXP = "3QXBUCK8J74W8PY";
		/// <summary>
		/// lấy thông tin gói bảo hiểm
		/// </summary>
		public const string PBH_HD_NG_GCN_GOIBH_CT = "YB16YBXZJBTIF08";
		/// <summary>
		/// Nhập HĐ người
		/// </summary>
		public const string PBH_HD_NG_GCN_HD_NH = "7D31L37QTLOW8IC";
		/// <summary>
		/// liệt kê hợp đồng người
		/// </summary>
		public const string PBH_HD_NG_GCN_LKE = "L4YUXFJNDGRCIHJ";
		/// <summary>
		/// người xem chi tiết
		/// </summary>
		public const string PBH_HD_NG_GCN_LKE_CT = "Y2JFHWN25Y6X6TQ";
		/// <summary>
		/// Cập nhật thông tin giấy chứng nhận
		/// </summary>
		public const string PBH_HD_NG_GCN_UPDATE = "GH5NA1FTF4CWLFO";
		/// <summary>
		/// [API TÍCH HỢP] - Hợp đồng con người
		/// </summary>
		public const string PBH_HD_NG_TICH_HOP_IMPORT = "W0DGJ7E5JJ7XAF3";
		/// <summary>
		/// Phân loại hồ sơ giấy tờ hạng mục hợp đồng
		/// </summary>
		public const string PBH_HD_PHAN_LOAI = "K8WTXO6FP2WWEUF";
		/// <summary>
		/// Liệt kê tổng phí TPA hợp đồng sức khỏe
		/// </summary>
		public const string PBH_HD_PHI_TPA_LK = "7CFC9V109CV7B4H";
		/// <summary>
		/// Tổng phí TPA hợp đồng sức khỏe nhập
		/// </summary>
		public const string PBH_HD_PHI_TPA_NH = "ZRCWNTS2O86Q6TN";
		/// <summary>
		/// Xóa phí phát sinh TPA
		/// </summary>
		public const string PBH_HD_PHI_TPA_X = "WMAJK8B7FS01M5D";
		/// <summary>
		/// Lấy thông tin chi tiết QRCode
		/// </summary>
		public const string PBH_HD_QRCODE_LKE_CT = "QGWFMXAN36SI0RJ";
		/// <summary>
		/// Nhập thông tin QRCode hợp đồng
		/// </summary>
		public const string PBH_HD_QRCODE_NH = "FB852NZOVTN84NH";
		/// <summary>
		/// Lưu thông tin điều khoản bổ sung xe
		/// </summary>
		public const string PBH_HD_XE_DKBS_NH = "FNS10KYVGCIT2RQ";
		/// <summary>
		/// Lấy danh sách điều khoản bổ sung của đối tượng bảo hiểm
		/// </summary>
		public const string PBH_HD_XE_DKBS_TKIEM = "5IG71UNKPAUIP9O";
		/// <summary>
		/// Xe nhập đồng tái
		/// </summary>
		public const string PBH_HD_XE_DO_TAI_NH = "8P68BGAQIJIH99L";
		/// <summary>
		/// Lấy thông tin chi tiết đánh giá rủi ro
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_CT_LKE = "LKCYXTRRW6PLYQV";
		/// <summary>
		/// Nhập thông tin đánh giá rủi ro
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_CT_NH = "5QFIY36HN71I340";
		/// <summary>
		/// Lấy danh sách hạng mục rủi ro cấp đơn theo hồ sơ BT
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_HSBT_LKE = "IRAFYNJE6NCB3IX";
		/// <summary>
		/// Nhập thông tin khách hàng xác nhận DGRR
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_KH_XAC_NHAN = "DBI79ME0D1ZF51L";
		/// <summary>
		/// Lấy thông tin mẫu in đánh giá rủi ro
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_LAN_IN = "Q694QNM826XU4GL";
		/// <summary>
		/// Xác nhận lần đánh giá rủi ro
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_LAN_XAC_NHAN = "VR2I6YVELHR7WYB";
		/// <summary>
		/// Lấy danh sách xe đánh giá rủi ro
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_LKE = "P49KCVPQK6HRZB0";
		/// <summary>
		/// Lấy danh sách ảnh Thumnail DGRR
		/// </summary>
		public const string PBH_HD_XE_GCN_DGRR_THUMNAIL_LKE = "1ZU7HJRPEVS3YWF";
		/// <summary>
		/// liệt kê danh mục xe cơ giới
		/// </summary>
		public const string PBH_HD_XE_GCN_DM_LKE = "HPCG40S5N07B98S";
		/// <summary>
		/// Lấy danh sách đồng tái xe
		/// </summary>
		public const string PBH_HD_XE_GCN_DS_DONG_TAI_LKE = "IVBMNBE0Z0P46NI";
		/// <summary>
		/// Liệt kê danh sách xe
		/// </summary>
		public const string PBH_HD_XE_GCN_DS_LKE = "JAE3YEB3R2B2OBM";
		/// <summary>
		/// Lưu thông tin xe HĐ
		/// </summary>
		public const string PBH_HD_XE_GCN_DS_NH = "EWNOPIOL1B2FDYT";
		/// <summary>
		/// Update giấy chứng nhận
		/// </summary>
		public const string PBH_HD_XE_GCN_DS_SUA = "XG42523GMU9HN3P";
		/// <summary>
		/// Update giấy chứng nhận CTCT
		/// </summary>
		public const string PBH_HD_XE_GCN_DS_SUA_CTCT = "EM8D7O7I62G9ZD3";
		/// <summary>
		/// xóa danh sách xe
		/// </summary>
		public const string PBH_HD_XE_GCN_DS_XOA = "HDODZ4U5Y45VD7V";
		/// <summary>
		/// Xe excel nhập
		/// </summary>
		public const string PBH_HD_XE_GCN_EXCEL_NH = "7AWH7BPOG4PBPCY";
		/// <summary>
		/// Lấy danh sách hạng mục chi tiết đọc từ AI
		/// </summary>
		public const string PBH_HD_XE_GCN_HANG_MUC_LKE = "G2KW4CCQK6X5ISK";
		/// <summary>
		/// Lưu đánh giá chi tiết hạng mục AI
		/// </summary>
		public const string PBH_HD_XE_GCN_HANG_MUC_NH = "73OSL42VMBX21ZL";
		/// <summary>
		/// Lưu hợp đồng xe
		/// </summary>
		public const string PBH_HD_XE_GCN_HD_NH = "1YXZ0LEG6FS91NM";
		/// <summary>
		/// liệt kê xe cơ giới
		/// </summary>
		public const string PBH_HD_XE_GCN_LKE = "FNQ8PX0842YQR0P";
		/// <summary>
		/// liệt kê chi tiết HĐ xe
		/// </summary>
		public const string PBH_HD_XE_GCN_LKE_CT = "SHZI7DNPGIL8NIR";
		/// <summary>
		/// Lưu hợp đồng xe
		/// </summary>
		public const string PBH_HD_XE_GCN_NH = "VS3SGE7JJ710FY2";
		/// <summary>
		/// Lấy tất cả hạng mục mapping AI
		/// </summary>
		public const string PBH_HT_MAPPING_HANG_MUC_CACHE = "OMUPRTLZYY42ZVU";
		/// <summary>
		/// Nhập mapping hạng mục
		/// </summary>
		public const string PBH_HT_MAPPING_HANG_MUC_NH = "SQIVIYI6NX5O7WP";
		/// <summary>
		/// Lấy danh sách mã bệnh cache
		/// </summary>
		public const string PBH_HT_MA_BENH_CACHE = "1M4W66BGTJFT2EI";
		/// <summary>
		/// Lấy danh sách bệnh viện
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_BV_CACHE = "N7PS6RP79U5B7UU";
		/// <summary>
		/// Cache danh mục mã bệnh viện
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_CACHE = "3AC4HTTD6X3MAK7";
		/// <summary>
		/// Export danh mục cơ sở y tế
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_EXP = "7WC9KMUIWS03UPQ";
		/// <summary>
		/// Lưu thông tin người liên hệ của bệnh viện
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_LHE_NH = "5IMI93WLOL9KDWV";
		/// <summary>
		/// Lấy danh sách người liên hệ cơ sở y tế
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_LHE_TKIEM = "ZDDZVFVEOL6QRMF";
		/// <summary>
		/// Liệt kê danh sách mã bệnh viện
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_LKE = "76MOAN2A7HAILRD";
		/// <summary>
		/// Xem chi tiết mã bệnh viện
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_LKE_CT = "RV5YI4KOYJNRBAC";
		/// <summary>
		/// Nhập mã bệnh viện
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_NH = "LEBBYFHRIBPZOXN";
		/// <summary>
		/// Lấy danh sách nhà thuốc
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_NT_CACHE = "7NWC7J2TZA57I89";
		/// <summary>
		/// Xóa mã bệnh viện
		/// </summary>
		public const string PBH_HT_MA_BENH_VIEN_X = "0E0CG2W3DAU32RU";
		/// <summary>
		/// Nhập bộ mã chung
		/// </summary>
		public const string PBH_HT_MA_CHUNG_NH = "H57LF7TV676OBMP";
		/// <summary>
		/// Xóa bộ mã chung
		/// </summary>
		public const string PBH_HT_MA_CHUNG_X = "WJY29DNW9FX7HGC";
		/// <summary>
		/// Cache danh mục mã đối tác theo phân quyền người dùng
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CACHE = "F2VZTA45DBY2ICV";
		/// <summary>
		/// Cache danh mục mã chi nhánh đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_CACHE = "BNVOD0JBPMJSGIC";
		/// <summary>
		/// Lấy chi tiết cấu hình 1 chi nhánh của đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_CT = "1TXAYC4NM6FKYMH";
		/// <summary>
		/// Lấy danh sách cấu hình chi nhánh đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_LK = "SYF3OMB1378RHSC";
		/// <summary>
		/// Lưu cấu hình chi nhánh đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_NH = "T9ERH9S1RTRCB9R";
		/// <summary>
		/// Lấy tất cả đơn vị của công ty bảo hiểm
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_CTYBH = "DW60VTTUTL10991";
		/// <summary>
		/// Nhập mã đối tác chi nhánh
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_NH = "XZG5EW0LOISAR2K";
		/// <summary>
		/// Lấy tất cả chi nhánh đối tác (QTHT)
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_TATCA = "C92NFSNF8J5W02G";
		/// <summary>
		/// Lấy danh sách đơn vị người dùng
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_TKIEM = "DPBFGQI95HPOQTG";
		/// <summary>
		/// Lưu thông tin tài khoản chi nhánh
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_TK_NH = "K8KWW72B1YWNLKG";
		/// <summary>
		/// Xóa tài khoản chi nhánh
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_TK_XOA = "ZL434KR2Y1NXGIP";
		/// <summary>
		/// Xóa danh mục đối tác chi nhánh
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CHI_NHANH_XOA = "ORZKA6GB9XLP8RY";
		/// <summary>
		/// Xuất excel đơn vị
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CN_EXP = "9NC0N8GGPRWRCNY";
		/// <summary>
		/// Liệt kê danh sách mã đối tác chi nhánh
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CN_LKE = "0VAS91R7P99S0YP";
		/// <summary>
		/// Xem đối tác chi nhánh chi tiết
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CN_LKE_CT = "VJNFFPUXULTXYP9";
		/// <summary>
		/// Lấy danh sách chi nhánh theo đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_CN_TATCA = "GNPDBCD6CZMMC2T";
		/// <summary>
		/// Liệt kê danh sách Đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_LKE = "JQTMRULTKF3QPMC";
		/// <summary>
		/// Xem đối tác chi tiết
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_LKE_CT = "KXFO1DLZ99O8238";
		/// <summary>
		/// Nhập danh mục Đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_NH = "0YMQCQK7O7FY2QM";
		/// <summary>
		/// Liệt kê phòng đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_PHONG_LKE = "N1IKL0LQRHQYR2Y";
		/// <summary>
		/// Xem phòng đối tác chi tiết
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_PHONG_LKE_CT = "0I8GXIA6RX9XZ3C";
		/// <summary>
		/// Nhập phòng đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_PHONG_NHAP = "6XYOR52YGMW24MA";
		/// <summary>
		/// Lấy tất cả đối tác (QTHT)
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_TAT_CA = "YUO78F35OYQBLGL";
		/// <summary>
		/// Xóa đối tác
		/// </summary>
		public const string PBH_HT_MA_DOI_TAC_XOA = "I5LRID3A6IC6U9M";
		/// <summary>
		/// Liệt kê danh sách gara báo giá
		/// </summary>
		public const string PBH_HT_MA_GARA_BAO_GIA_LKE = "XYDOHHJE4YJFVF2";
		/// <summary>
		/// Cache danh mục gara theo đối tác
		/// </summary>
		public const string PBH_HT_MA_GARA_CACHE = "5TJXJEZLGLD9PZ2";
		/// <summary>
		/// Export danh mục gara
		/// </summary>
		public const string PBH_HT_MA_GARA_EXP = "A3ZNMAMX7SAYRTK";
		/// <summary>
		/// Thông tin kết nối hệ thống gara
		/// </summary>
		public const string PBH_HT_MA_GARA_KET_NOI = "YKJ65IVIKSIUCYD";
		/// <summary>
		/// Tìm kiếm + phân trang Gara
		/// </summary>
		public const string PBH_HT_MA_GARA_LKE = "TOZ407TQ7KXHR4F";
		/// <summary>
		/// Lấy thông tin chi tiết Gara
		/// </summary>
		public const string PBH_HT_MA_GARA_LKE_CT = "5AHQN8JO4NPQFFK";
		/// <summary>
		/// Lưu thông tin Gara
		/// </summary>
		public const string PBH_HT_MA_GARA_NH = "PYX1VBMK66CR8KV";
		/// <summary>
		/// Tìm kiếm gara
		/// </summary>
		public const string PBH_HT_MA_GARA_TKIEM = "Y84C97CS1P5FBB6";
		/// <summary>
		/// Xóa Gara
		/// </summary>
		public const string PBH_HT_MA_GARA_XOA = "YS85SRYN719KH49";
		/// <summary>
		/// Cache danh mục mã hãng xe
		/// </summary>
		public const string PBH_HT_MA_HANG_XE_CACHE = "7UJLW9HXX95QDA5";
		/// <summary>
		/// Export danh mục hãng xe
		/// </summary>
		public const string PBH_HT_MA_HANG_XE_EXP = "HKDBNJLXX267M9Q";
		/// <summary>
		/// Export Example ESCS
		/// </summary>
		public const string PBH_HT_MA_HANG_XE_EXPORT = "ATDG4KLSTO22EJN";
		/// <summary>
		/// Xem hãng xe
		/// </summary>
		public const string PBH_HT_MA_HANG_XE_LKE = "19YQZKFXYPUT5T5";
		/// <summary>
		/// Xem chi tiết hãng xe
		/// </summary>
		public const string PBH_HT_MA_HANG_XE_LKE_CT = "TJG0YFSRD9QLLDC";
		/// <summary>
		/// Nhập hãng xe 
		/// </summary>
		public const string PBH_HT_MA_HANG_XE_NHAP = "0HZ4EZNV5N0S42F";
		/// <summary>
		/// Xóa hãng xe 
		/// </summary>
		public const string PBH_HT_MA_HANG_XE_XOA = "76HYQK65KAGYTQY";
		/// <summary>
		/// Cache danh mục mã hiệu xe
		/// </summary>
		public const string PBH_HT_MA_HIEU_XE_CACHE = "4046L2E7ED24Y4N";
		/// <summary>
		/// Danh mục hiệu xe
		/// </summary>
		public const string PBH_HT_MA_HIEU_XE_DM = "2VI4QBYWBJUT2CQ";
		/// <summary>
		/// Export danh mục hiệu xe
		/// </summary>
		public const string PBH_HT_MA_HIEU_XE_EXP = "5PJ7M1CXUZW6QK5";
		/// <summary>
		/// Danh sách hiệu xe
		/// </summary>
		public const string PBH_HT_MA_HIEU_XE_LKE = "S284NAA05RG2NX3";
		/// <summary>
		/// Xem hiệu xe chi tiết
		/// </summary>
		public const string PBH_HT_MA_HIEU_XE_LKE_CT = "C3J19LTXS7TXSQY";
		/// <summary>
		/// Nhập hiệu xe
		/// </summary>
		public const string PBH_HT_MA_HIEU_XE_NHAP = "G6YYAFZJ8JXK6M0";
		/// <summary>
		/// Xóa hiệu xe
		/// </summary>
		public const string PBH_HT_MA_HIEU_XE_XOA = "NWPAYIA6U70W5XD";
		/// <summary>
		/// Lấy cache hạng mục bồi thường khác
		/// </summary>
		public const string PBH_HT_MA_KHAC_HANG_MUC_CACHE = "8H9444A05POX3F6";
		/// <summary>
		/// Danh mục kho lưu trữ hạng mục thu hồi
		/// </summary>
		public const string PBH_HT_MA_KHO_DMUC = "W02YTRYWE48ZUJA";
		/// <summary>
		/// Liệt kê + phân trang mã kho
		/// </summary>
		public const string PBH_HT_MA_KHO_LKE = "C7YRCSFA9Y13C3X";
		/// <summary>
		/// Lấy chi tiết mã kho
		/// </summary>
		public const string PBH_HT_MA_KHO_LKE_CT = "HEY9ZCAS1LQNQCJ";
		/// <summary>
		/// Thêm + sửa mã kho
		/// </summary>
		public const string PBH_HT_MA_KHO_NH = "BK32PALM0QW7D8X";
		/// <summary>
		/// Xóa mã kho
		/// </summary>
		public const string PBH_HT_MA_KHO_XOA = "4LWGGW0RKGKYK70";
		/// <summary>
		/// Cache danh mục loại hình nghiệp vụ theo đối tác
		/// </summary>
		public const string PBH_HT_MA_LHNV_CACHE = "RTLU5QWJUBESLWZ";
		/// <summary>
		/// Lấy ra danh sách loại hình nghiệp vụ khác
		/// </summary>
		public const string PBH_HT_MA_LHNV_KHAC = "XQFRFHM78N5YVQE";
		/// <summary>
		/// Lấy danh sách loại hình nghiệp vụ xe
		/// </summary>
		public const string PBH_HT_MA_LHNV_XE = "IGJNP7ZRL3AFSXQ";
		/// <summary>
		/// [XE_MAY] - Lấy danh sách loại hình nghiệp vụ xe máy
		/// </summary>
		public const string PBH_HT_MA_LHNV_XE_MAY = "23FGXO7Q5CK6RFV";
		/// <summary>
		/// [XE_MAY] - Lấy cache lhnv xe máy
		/// </summary>
		public const string PBH_HT_MA_LHNV_XE_MAY_CACHE = "24YFAYW17SQX4Q4";
		/// <summary>
		/// Danh mục mã ngân hàng
		/// </summary>
		public const string PBH_HT_MA_NGAN_HANG_DMUC = "TKTP57HE56FFA0R";
		/// <summary>
		/// Export danh mục ngân hàng
		/// </summary>
		public const string PBH_HT_MA_NGAN_HANG_EXP = "UVQK9Y8IOI3OFZB";
		/// <summary>
		/// Liệt kê danh sách mã ngân hàng
		/// </summary>
		public const string PBH_HT_MA_NGAN_HANG_LKE = "AWIT9MJBM1PRN0D";
		/// <summary>
		/// Liệt kê chi tiết mã ngân hàng
		/// </summary>
		public const string PBH_HT_MA_NGAN_HANG_LKE_CT = "HB3730C99E4UMM1";
		/// <summary>
		/// Nhập mã ngân hàng
		/// </summary>
		public const string PBH_HT_MA_NGAN_HANG_NH = "5UWH64I0EJ5NBWF";
		/// <summary>
		/// Xóa mã ngân hàng
		/// </summary>
		public const string PBH_HT_MA_NGAN_HANG_XOA = "QW0OCU8ACZ0P4VP";
		/// <summary>
		/// Export danh mục nhà bảo hiểm
		/// </summary>
		public const string PBH_HT_MA_NHA_BH_EXP = "CY9L045P5GAVGI5";
		/// <summary>
		/// Tìm kiếm + phân trang danh sách nhà bảo hiểm
		/// </summary>
		public const string PBH_HT_MA_NHA_BH_LKE = "961FH4LFX7Y24EC";
		/// <summary>
		/// Lấy thông tin chi tiết nhà bảo hiểm
		/// </summary>
		public const string PBH_HT_MA_NHA_BH_LKE_CT = "4WJDOZTZK48W56H";
		/// <summary>
		/// Nhập mã nhà bảo hiểm
		/// </summary>
		public const string PBH_HT_MA_NHA_BH_NH = "9XN6XG1FJ4GIXCF";
		/// <summary>
		/// Lấy tất cả danh sách nhà bảo hiểm
		/// </summary>
		public const string PBH_HT_MA_NHA_BH_TATCA = "NS0U5WH84OWMXJG";
		/// <summary>
		/// Xóa thông tin nhà bảo hiểm
		/// </summary>
		public const string PBH_HT_MA_NHA_BH_XOA = "724PTTC8KCRMMB6";
		/// <summary>
		/// Danh mục mã phòng ban
		/// </summary>
		public const string PBH_HT_MA_PHONG_BAN_DMUC = "GCRZUFTE9VYUAYI";
		/// <summary>
		/// Export danh mục phòng ban
		/// </summary>
		public const string PBH_HT_MA_PHONG_BAN_EXP = "R8ZC2NX8TEOWDOR";
		/// <summary>
		/// Liệt kê danh sách mã phòng ban
		/// </summary>
		public const string PBH_HT_MA_PHONG_BAN_LKE = "UQXO89KL4Q2R7GI";
		/// <summary>
		/// Liệt kê chi tiết mã phòng ban
		/// </summary>
		public const string PBH_HT_MA_PHONG_BAN_LKE_CT = "Q98IOD9TX3W0I6Q";
		/// <summary>
		/// Nhập mã phòng ban
		/// </summary>
		public const string PBH_HT_MA_PHONG_BAN_NH = "ZMFPY88ESPIAHD0";
		/// <summary>
		/// Xóa mã phòng ban
		/// </summary>
		public const string PBH_HT_MA_PHONG_BAN_XOA = "CR6ERKJ8HWD3HR5";
		/// <summary>
		/// Cache danh mục mã đơn vị hành chính theo đối tác
		/// </summary>
		public const string PBH_HT_MA_TINH_CACHE = "69Z1O87LXJGZGL7";
		/// <summary>
		/// Lấy tất cả danh sách Đơn vị hành chính
		/// </summary>
		public const string PBH_HT_MA_TINH_DMUC = "O8XZRU5OI6NL493";
		/// <summary>
		/// Export danh mục đơn vị hành chính
		/// </summary>
		public const string PBH_HT_MA_TINH_EXP = "DW58MMAVVECK8U8";
		/// <summary>
		/// Lấy danh sách Tỉnh thành
		/// </summary>
		public const string PBH_HT_MA_TINH_LKE = "I6YMMSCLU5S3D6M";
		/// <summary>
		/// Liệt kê chi tiết mã tỉnh
		/// </summary>
		public const string PBH_HT_MA_TINH_LKE_CT = "5ITPPOLSRR2CR7G";
		/// <summary>
		/// Cập nhật mã tỉnh thành
		/// </summary>
		public const string PBH_HT_MA_TINH_NH = "K7E7C2AHA4EBEDG";
		/// <summary>
		/// [HỆ THỐNG MÃ] Xóa mã tỉnh
		/// </summary>
		public const string PBH_HT_MA_TINH_XOA = "ASLCBZANPEKHD6X";
		/// <summary>
		/// Lấy danh sách hạng mục so sánh báo giá
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_AI = "MTEYU0UX9UMILER";
		/// <summary>
		/// Nhập thông tin hạng mục AICLYCLE
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_AICYCLE_NH = "WE1NSNTKNC99GME";
		/// <summary>
		/// Cache danh mục hạng mục xe theo đối tác
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_CACHE = "A3UTNHOLBK5851V";
		/// <summary>
		/// Export danh mục xe hạng mục
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_EXP = "OPZM3QQFXX016HU";
		/// <summary>
		/// Import excel mã xe hạng mục
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_IMPORT_EXCEL = "AQM84OH6Q7ZXMXK";
		/// <summary>
		/// Liệt kê danh sách mã xe hạng mục
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_LKE = "WTA81MNF7UOFI1H";
		/// <summary>
		/// Liệt kê chi tiết mã xe hạng mục
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_LKE_CT = "KOZ3EIALU837ZLX";
		/// <summary>
		/// Nhập mã xe hạng mục
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_NH = "OMMJHQD98JJ4K4E";
		/// <summary>
		/// Xóa mã xe hạng mục
		/// </summary>
		public const string PBH_HT_MA_XE_HANG_MUC_X = "MCZN1FYV6FLD2G3";
		/// <summary>
		/// Danh mục mức độ tổn thất theo đối tác
		/// </summary>
		public const string PBH_HT_MA_XE_MUC_DO_TT_DMUC = "D9PAF0QEKDBZT07";
		/// <summary>
		/// Export danh mục mức độ tổn thất
		/// </summary>
		public const string PBH_HT_MA_XE_MUC_DO_TT_EXP = "NXN6QE0JU7PLJGF";
		/// <summary>
		/// Liệt kê danh sách mức độ xe tổn thất
		/// </summary>
		public const string PBH_HT_MA_XE_MUC_DO_TT_LKE = "9X0UYDBVTCKBBPY";
		/// <summary>
		/// Xem chi tiết xe mức độ tổn thất
		/// </summary>
		public const string PBH_HT_MA_XE_MUC_DO_TT_LKE_CT = "8S6EUOTUKF5093V";
		/// <summary>
		/// Nhập mã xe mức độ tổn thất
		/// </summary>
		public const string PBH_HT_MA_XE_MUC_DO_TT_NH = "O9CMPNGC7G677L0";
		/// <summary>
		/// Xóa mức xe tổn thất
		/// </summary>
		public const string PBH_HT_MA_XE_MUC_DO_TT_X = "GCUKCUAX4HQXG5D";
		/// <summary>
		/// Cache danh mục Menu
		/// </summary>
		public const string PBH_HT_MENU_CACHE = "HRPTBWTLOJEIM8J";
		/// <summary>
		/// Lấy danh sách menu cha
		/// </summary>
		public const string PBH_HT_MENU_CHA = "HG4QUUZJHV6PO9E";
		/// <summary>
		/// Liệt kê danh sách Menu
		/// </summary>
		public const string PBH_HT_MENU_LKE = "MPY6OMJ9BF9S9B6";
		/// <summary>
		/// Xem chi tiết Menu
		/// </summary>
		public const string PBH_HT_MENU_LKE_CT = "3XEF2LJXTF6B17I";
		/// <summary>
		/// Nhập thông tin menu
		/// </summary>
		public const string PBH_HT_MENU_NH = "OGCEPY0Z6CMP5TP";
		/// <summary>
		/// Lưu thông tin menu
		/// </summary>
		public const string PBH_HT_MENU_NHAP = "9SNP4CNBWCBYUEH";
		/// <summary>
		/// [HỆ THỐNG MÃ] Xóa thông tin Menu
		/// </summary>
		public const string PBH_HT_MENU_XOA = "MGKLITFDZ64HUQ0";
		/// <summary>
		/// Liệt kê danh sách người dùng bệnh viện
		/// </summary>
		public const string PBH_HT_NSD_BV_LKE = "DMD27FB4X5QKJQ3";
		/// <summary>
		/// Liệt kê thông tin chi tiết NSD bệnh viện
		/// </summary>
		public const string PBH_HT_NSD_BV_LKE_CT = "0OIJ0SAQQDFDTT8";
		/// <summary>
		/// Nhập người dùng (bệnh viện)
		/// </summary>
		public const string PBH_HT_NSD_BV_NH = "MITDH1FT4U55CGV";
		/// <summary>
		/// Xóa thông tin người sử dụng bệnh viện
		/// </summary>
		public const string PBH_HT_NSD_BV_XOA = "Q5ITCHCK61HSYT9";
		/// <summary>
		/// Cache danh sách người sử dụng theo đối tác
		/// </summary>
		public const string PBH_HT_NSD_CACHE = "JUWCWTNQC5115MX";
		/// <summary>
		/// Liệt kê danh sách người dùng
		/// </summary>
		public const string PBH_HT_NSD_LKE = "LOLW0K55B3D6IRH";
		/// <summary>
		/// Liệt kê danh sách nsd quyền bt xe
		/// </summary>
		public const string PBH_HT_NSD_PHAN_CONG_GD_LKE = "5Z1RUTE5R1DBWW3";
		/// <summary>
		/// Tìm kiến cán bộ giám định hiện trường
		/// </summary>
		public const string PBH_HT_NSD_QUYEN_BTXE_TKIEM = "NXBQ4WBVSIUGHXX";
		/// <summary>
		/// Lấy danh sách người sử dụng
		/// </summary>
		public const string PBH_HT_NSD_QUYEN_CACHE = "4FVK1FI29CMNCCM";
		/// <summary>
		/// Lấy tất cả danh sách quyền
		/// </summary>
		public const string PBH_HT_NSD_QUYEN_LKE = "ZZ65V61V2L4MANQ";
		/// <summary>
		/// [SURVEY] Lấy toàn bộ đối tác 
		/// </summary>
		public const string PBH_HT_NSD_SV_CACHE = "X1RVOMTSYGYDF6X";
		/// <summary>
		/// Liệt kê thông tin khóa dữ liệu
		/// </summary>
		public const string PBH_KHOA_DL_LKE = "HXY7OXXF2Z0CU1D";
		/// <summary>
		/// Liệt kê chi tiết thong tin khóa dữ liệu
		/// </summary>
		public const string PBH_KHOA_DL_LKE_CT = "6TNXKQ0DFEWG8OU";
		/// <summary>
		/// Nhập thông tin khóa dữ liệu
		/// </summary>
		public const string PBH_KHOA_DL_NH = "CIV9ED00UVT12F7";
		/// <summary>
		/// Xóa thông tin khóa dữ liệu
		/// </summary>
		public const string PBH_KHOA_DL_XOA = "A4BCU0NZCO4GHU2";
		/// <summary>
		/// MOBILE - Danh bạ liên hệ
		/// </summary>
		public const string PBH_MOBILE_DANH_BA = "2OIGRURZOYDKRCX";
		/// <summary>
		/// MOBILE - Danh mục hệ thống
		/// </summary>
		public const string PBH_MOBILE_DANH_MUC = "RTESPN2RIAAE8W0";
		/// <summary>
		/// [App bồi thường] - Lấy danh mục hệ thống
		/// </summary>
		public const string PBH_MOBILE_DANH_MUC_CHUNG = "43OFK8UOC84JBUH";
		/// <summary>
		/// MOBILE - Lấy danh mục đơn vị hành chính
		/// </summary>
		public const string PBH_MOBILE_DANH_MUC_TINH_THANH = "0NF0B4TD8B5EW3X";
		/// <summary>
		/// Lấy danh sách giám định viên cho mobile
		/// </summary>
		public const string PBH_MOBILE_GDVHT = "61J7YJWWAHV5VRL";
		/// <summary>
		/// MOBILE - Hiển thị hồ sơ đã nhận, chưa nhận trang HOME
		/// </summary>
		public const string PBH_MOBILE_HOME = "6ETEFD41GL1MCRU";
		/// <summary>
		/// [MOBILE - GIAMDINH] - Lich nghỉ phép - danh sách
		/// </summary>
		public const string PBH_MOBILE_LICH_NGHI_LKE = "HHJ0L8K4TSM4L75";
		/// <summary>
		/// [MOBILE - GIAMDINH] - Lich nghỉ phép - Lưu
		/// </summary>
		public const string PBH_MOBILE_LICH_NGHI_NH = "L8PTBJ7IDL9JZNY";
		/// <summary>
		/// [MOBILE - GIAMDINH] - Lich nghỉ phép - Xóa
		/// </summary>
		public const string PBH_MOBILE_LICH_NGHI_XOA = "IAEH1TJ2H525YWN";
		/// <summary>
		/// Lấy danh sách loại hình nghiệp vụ
		/// </summary>
		public const string PBH_MOBILE_XE_LHNV = "YE2NCLQYSIPG5Q2";
		/// <summary>
		/// Mẫu in đề xuất bồi thường sức khỏe
		/// </summary>
		public const string PBH_NG_DE_XUAT_BOI_THUONG_IN = "O2V1THWJVVBCDF0";
		/// <summary>
		/// In giấy ủy quyền
		/// </summary>
		public const string PBH_NG_GIAY_UY_QUYEN_IN = "YRT0DM0BTHTVWFB";
		/// <summary>
		/// Mẫu in giấy yêu cầu trả tiền bh sức khỏe
		/// </summary>
		public const string PBH_NG_GYC_TRA_TIEN_BH_IN = "E2PIDSEF8P55U7I";
		/// <summary>
		/// Nhập thông tin người gói bảo hiểm cấu hình
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_CAU_HINH_BV_NH = "MOWK46P2X5FFLVL";
		/// <summary>
		/// Xóa cấu hình mã bệnh (Tỷ lệ đồng - thời gian chờ)
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_CAU_HINH_MA_BENH_X = "5J2NGMQUCQCH0SB";
		/// <summary>
		/// Export danh sách gói bh
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_CT_EXP = "CVIH01WYICZQ18C";
		/// <summary>
		/// Import  quyền lợi vào gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_CT_IMPORT_EXCEL = "PULCW0TWR2I4W2O";
		/// <summary>
		/// Lấy tất cả điều khoản bổ sung của gói sức khỏe
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_DKBS_LK = "GOTBT8MES3FUIVI";
		/// <summary>
		/// Điều khoản bổ sung quyền lợi gói bảo hiểm sức khỏe nhập
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_DKBS_NH = "PX1P6EKZNW7D7P3";
		/// <summary>
		/// Xóa điều khoản bổ sung
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_DKBS_X = "ZA34UI4QAIJBL7U";
		/// <summary>
		/// người gói danh mục
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_DM_LKE = "M4PB9WVPSIOYB2X";
		/// <summary>
		/// Lấy tất cả các gói bảo hiểm của công ty bảo hiểm gốc
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_GETALL = "UUE5FB91DEF3MTD";
		/// <summary>
		/// Lưu ghi chú khác gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_GHI_CHU_KHAC_NH = "AJWVXMVJOTTHTSN";
		/// <summary>
		/// Liệt kê gói bh
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_LKE = "6H0TSJSYADB8RU9";
		/// <summary>
		/// Liệt kê chi tiết gói
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_LKE_CT = "4NFYI8504O9BW6E";
		/// <summary>
		/// Lấy thông tin chi tiết gói theo mã
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_MA_LKE_CT = "LIZY1ZYKR4EQUGH";
		/// <summary>
		/// Lưu gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_NH = "PCDA267N78OAR9N";
		/// <summary>
		/// Lấy danh sách nhóm gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_NHOM_CACHE = "Q5YXP8HA74LAF9Y";
		/// <summary>
		/// Thêm mới nhóm gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_NHOM_NH = "LPYXF330YARI39K";
		/// <summary>
		/// Xóa nhóm gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_NHOM_X = "GEDD2NKQYMFSH0I";
		/// <summary>
		/// Lưu thông tin tiền quyền lợi gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_TIEN_NH = "1QEGFUKS2ETJ8AJ";
		/// <summary>
		/// Xóa gói bảo hiểm
		/// </summary>
		public const string PBH_NG_NGUOI_GOI_BH_XOA = "6K8Q6Z2GBGYN23K";
		/// <summary>
		/// Mẫu in thông báo trả tiền bảo hiểm 
		/// </summary>
		public const string PBH_NG_THONG_BAO_TRA_TIEN_BH_IN = "40IPR22S8QVEY4E";
		/// <summary>
		/// Mẫu in thông báo từ chối trả tiền bảo hiểm sức khỏe
		/// </summary>
		public const string PBH_NG_THONG_BAO_TU_CHOI_TRA_TIEN_BH_IN = "MNNGTE6KXPV4HQ1";
		/// <summary>
		/// Lấy quá trình xử lý tiếp nhận bảo lãnh bệnh viện
		/// </summary>
		public const string PBH_QTXL_BV_LKE = "3QTFIF68XLYC6EJ";
		/// <summary>
		/// Lấy danh sách quá trình xử lý giám định xe cơ giới
		/// </summary>
		public const string PBH_QTXL_LKE = "1F0GBO29GPC3KNJ";
		/// <summary>
		/// [SURVEY] Liệt kê danh sách thông báo
		/// </summary>
		public const string PBH_SV_THONG_BAO_LKE = "RG781LTF9B3HZPX";
		/// <summary>
		/// Liệt kê danh sách thông tin tích hợp API
		/// </summary>
		public const string PBH_TICH_HOP_API_LOG_LKE = "0SUZ6E4W2LJGLKU";
		/// <summary>
		/// Liệt kê thông tin chi tiết tích hợp API log
		/// </summary>
		public const string PBH_TICH_HOP_API_LOG_LKE_CT = "2RKXCW5H3U2HERZ";
		/// <summary>
		/// Log api truy vấn core
		/// </summary>
		public const string PBH_TICH_HOP_API_LOG_NH = "IDWJ4481O53W370";
		/// <summary>
		/// [SURVEY] Liệt kê thông tin triển khai chiến dịch
		/// </summary>
		public const string PBH_TRIEN_KHAI_CHIEN_DICH_LKE = "EGLV15JABNNC3FZ";
		/// <summary>
		/// [SURVEY] Liệt kê chi tiết triển khai chiến dịch
		/// </summary>
		public const string PBH_TRIEN_KHAI_CHIEN_DICH_LKE_CT = "Q52DRUKI959WFP6";
		/// <summary>
		/// [SURVEY] Nhập thông tin triển khai chiến dịch
		/// </summary>
		public const string PBH_TRIEN_KHAI_CHIEN_DICH_NHAP = "PHYC4XLD4ZLTZU5";
		/// <summary>
		/// [SURVEY] Liệt kê danh sách triển khai chiến dich
		/// </summary>
		public const string PBH_TRIEN_KHAI_CHIEN_DICH_TAT_CA = "IQNWKTDRP6D75E1";
		/// <summary>
		/// [SURVEY] Xóa thông tin triển khai chiến dịch
		/// </summary>
		public const string PBH_TRIEN_KHAI_CHIEN_DICH_XOA = "NJZ62UBBRVMCN3S";
		/// <summary>
		/// Lấy chi tiết bệnh
		/// </summary>
		public const string PHT_BENH_CT = "EEBI03KF7PHDQ5Z";
		/// <summary>
		/// Export danh mục các loại bệnh
		/// </summary>
		public const string PHT_BENH_EXP = "QF1YIVOHEQSJI0L";
		/// <summary>
		/// Danh sách mã bệnh
		/// </summary>
		public const string PHT_BENH_LKE = "J2ZLQXAOCC9QGX6";
		/// <summary>
		/// Lấy thông tin chi tiết dịch vụ tin nhắn MCM
		/// </summary>
		public const string PHT_BH_DICH_VU_MCM_TEMPLATE_CT = "5XIPEGNTT66JDWS";
		/// <summary>
		/// Liệt kê danh sách tin nhắn MCM
		/// </summary>
		public const string PHT_BH_DICH_VU_MCM_TEMPLATE_LKE = "07WP0ZKU7ZXO293";
		/// <summary>
		/// Nhập danh sách tin nhắn MCM
		/// </summary>
		public const string PHT_BH_DICH_VU_MCM_TEMPLATE_NH = "3DCEE5F0QYJO6U5";
		/// <summary>
		/// Xóa danh sách tin nhăn MCM
		/// </summary>
		public const string PHT_BH_DICH_VU_MCM_TEMPLATE_X = "472ERYHAPL3B5SC";
		/// <summary>
		/// [API] Lấy danh sách file
		/// </summary>
		public const string PHT_BH_FILE_API_LKE = "3RD27D16RTVMIHI";
		/// <summary>
		/// [API] Lấy chi tiết file
		/// </summary>
		public const string PHT_BH_FILE_API_LKE_CT = "R80XEF79SOFWCLI";
		/// <summary>
		/// Upload files
		/// </summary>
		public const string PHT_BH_FILE_BV_LUU = "0ANLCIFFRFU825A";
		/// <summary>
		/// Lấy chi tiết ảnh bảo lãnh bệnh viện
		/// </summary>
		public const string PHT_BH_FILE_BV_TAI_FILE = "9QCXVMDS8M6PAJY";
		/// <summary>
		/// Lấy danh sách file bệnh viện
		/// </summary>
		public const string PHT_BH_FILE_BV_THUMNAIL = "RP7SCKM87C2QYS4";
		/// <summary>
		/// Xóa file trong hồ sơ tiếp nhận bảo lãnh bệnh viện
		/// </summary>
		public const string PHT_BH_FILE_BV_XOA = "2OCA5UFMEZ41G00";
		/// <summary>
		/// Lấy danh sách file đánh giá rủi ro
		/// </summary>
		public const string PHT_BH_FILE_DGRR_THUMNAIL = "RAFVYFM59CN4KZE";
		/// <summary>
		/// Đọc OCR báo giá gara
		/// </summary>
		public const string PHT_BH_FILE_DOC_BAO_GIA_OCR = "5RCEZPTM77UIHYC";
		/// <summary>
		/// Đọc OCR  file ảnh
		/// </summary>
		public const string PHT_BH_FILE_DOC_OCR = "ZAYWRIQLJ2W0IMT";
		/// <summary>
		/// Tìm kiếm file
		/// </summary>
		public const string PHT_BH_FILE_LKE = "BJIDRC33ZDFDHVV";
		/// <summary>
		/// Lấy thông tin chi tiết file
		/// </summary>
		public const string PHT_BH_FILE_LKE_CT = "E9PJFOP8Q88CVXM";
		/// <summary>
		/// Lưu file generate lỗi
		/// </summary>
		public const string PHT_BH_FILE_LOG_NH = "M6VIFT911L2G7CN";
		/// <summary>
		/// Upload ảnh giám định xe cơ giới
		/// </summary>
		public const string PHT_BH_FILE_LUU = "0YMQCQK7OULAXCG";
		/// <summary>
		/// Lưu thông tin file ký số
		/// </summary>
		public const string PHT_BH_FILE_LUU_KY_SO = "2UYBJ1XO6XTZ3BT";
		/// <summary>
		/// Lưu thông tin file
		/// </summary>
		public const string PHT_BH_FILE_NH = "QLB6ZH08ZSGERIP";
		/// <summary>
		/// Lấy chi tiết ảnh tổn thất
		/// </summary>
		public const string PHT_BH_FILE_TAI_FILE = "FAXYNA4H90WNTCO";
		/// <summary>
		/// Lấy chi tiết ảnh tổn thất api gara
		/// </summary>
		public const string PHT_BH_FILE_TAI_FILE_API_GARA = "9D05T0B6JJGGA6B";
		/// <summary>
		/// Download zip file ảnh/tài liệu tổn thất
		/// </summary>
		public const string PHT_BH_FILE_TAI_FILE_NEN = "DOKSJZZBFDHX884";
		/// <summary>
		/// Lấy danh sách file
		/// </summary>
		public const string PHT_BH_FILE_THUMNAIL = "HR8J1IGPMKUMJEV";
		/// <summary>
		/// Lưu thông tin tích hợp file
		/// </summary>
		public const string PHT_BH_FILE_TICH_HOP = "2HWFEWAI87TGSFW";
		/// <summary>
		/// Xóa file ảnh trong hồ sơ giám định xe cơ giới
		/// </summary>
		public const string PHT_BH_FILE_XOA = "ES23115IT9JVZR7";
		/// <summary>
		/// Xóa file trình
		/// </summary>
		public const string PHT_BH_FILE_XOA_FILE_TRINH = "7PJMM3PHFENFMSN";
		/// <summary>
		/// Import excel danh sách gcn hợp đồng con người
		/// </summary>
		public const string PHT_BH_HD_NG_GCN_IMPORT_EXCEL = "YQ5PCZ60YKV0AAK";
		/// <summary>
		/// Import excel gcn hợp đồng xe
		/// </summary>
		public const string PHT_BH_HD_XE_GCN_IMPORT_EXCEL = "8NS8297TMYO7DZV";
		/// <summary>
		/// Danh sách ứng dụng cài đặt
		/// </summary>
		public const string PHT_CAI_DAT_UNG_DUNG_LKE = "UFFGF8GOOSVOBPR";
		/// <summary>
		/// Cập nhật cài đặt ứng dụng
		/// </summary>
		public const string PHT_CAP_NHAT_CAI_DAT_UNG_DUNG = "XQE2A57MQRS5BC3";
		/// <summary>
		/// Lấy cấu hình dashboard
		/// </summary>
		public const string PHT_CAU_HINH_DASHBOARD_AN_HIEN = "CWAU9PMJNNUXZLD";
		/// <summary>
		/// Liệt kê chi tiết danh mục cấu hình dashboard
		/// </summary>
		public const string PHT_CAU_HINH_DASHBOARD_LKE = "TL9G73RMRAA6QJ7";
		/// <summary>
		/// Lấy chi tiết cấu hình dashboard
		/// </summary>
		public const string PHT_CAU_HINH_DASHBOARD_LKE_CT = "LZ3ESSS7GYOPBHT";
		/// <summary>
		/// Lưu cấu hình dashboard
		/// </summary>
		public const string PHT_CAU_HINH_DASHBOARD_NH = "OYIEWZ1AP18NFJT";
		/// <summary>
		/// Xóa cấu hình dashboard
		/// </summary>
		public const string PHT_CAU_HINH_DASHBOARD_XOA = "8X9KCVB1ZHXC36R";
		/// <summary>
		/// Lưu thông tin cấu hình danh mục duyệt giá
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_DANH_MUC_NH = "5TQRPTFZ3B7CAP5";
		/// <summary>
		/// Lấy danh sách hãng hiệu xe đang áp dụng CH duyệt giá
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_HANG_HIEU_XE_LKE = "JCCAAMEWF9IOL3O";
		/// <summary>
		/// Lưu cấu hình duyệt giá
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_HANG_MUC_NH = "3Z77CSDCLC6DDYL";
		/// <summary>
		/// Lấy danh sách hạng mục nhập duyệt giá 
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_HANG_MUC_NH_LKE = "OJZMV9RA3WLPLLO";
		/// <summary>
		/// Tìm kiếm + phân trang hạng mục cấu hình
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_HANG_MUC_NH_TKIEM = "AG6IWLGML6G1HSW";
		/// <summary>
		/// Kiểm tra hố sơ có được tự động duyệt giá hay không
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_HO_SO = "4Y6O7SBG7WCU1BV";
		/// <summary>
		/// Danh sách ngày áp dụng cấu hình duyệt giá tự động
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_LKE = "LKV55SNREDR13LZ";
		/// <summary>
		/// Lấy thông tin chi tiết cấu hình duyệt giá tự động
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_LKE_CT = "HU9BTJ1MO3S7FPI";
		/// <summary>
		/// Nhập ngày áp dụng cấu hình duyệt giá
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_GIA_NGAY_AD_NH = "1JNEQIL71P5OPGK";
		/// <summary>
		/// Lưu cấu hình duyệt tự động người
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_NG_DANH_MUC_NH = "0BY2DUF8TX06BLF";
		/// <summary>
		/// Kiểm tra hồ sơ sức khỏe có đủ tiêu chí duyệt tự động hay không
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_NG_HO_SO = "TNMTGFYVFMTYRTV";
		/// <summary>
		/// Liệt kê danh sách ngày áp dụng cấu hình tự động duyệt người
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_NG_LKE = "7JU1RK9RFVAJS1E";
		/// <summary>
		/// Lấy chi tiết cấu hình duyêt tự động con người
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_NG_LKE_CT = "IKC26W7KUKLP8IQ";
		/// <summary>
		/// Thêm ngày áp dụng cấu hình duyệt tự động người
		/// </summary>
		public const string PHT_CAU_HINH_DUYET_NG_NGAY_AD_NH = "D8S26SGQBR4G9PA";
		/// <summary>
		/// Liệt kê cấu hình ngày nghỉ lễ
		/// </summary>
		public const string PHT_CAU_HINH_NGAY_NGHI_LKE = "AJUMZ8555P7UHO6";
		/// <summary>
		/// Lấy nhóm phân cấp chi tiết
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_PC_NSD_CACHE = "6JGN3ULU509Z8M1";
		/// <summary>
		/// Lấy chi tiết nhóm phân cấp theo ngày phân cấp
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_PC_NSD_LKE_CT = "I0RH14ZYGYG9B0K";
		/// <summary>
		/// Lấy danh sách nhóm phân cấp
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_PC_NSD_LKE_NGAY = "I4D48J2120AM4EX";
		/// <summary>
		/// Lấy chi tiết nhóm phân cấp theo ngày pc
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_PC_NSD_NGAY_LKE_CT = "FK4ABMFZFTXXBE8";
		/// <summary>
		/// Lưu cấu hình phân cấp ngày
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_PC_NSD_NGAY_NH = "SD8CJVCHZWTF8U6";
		/// <summary>
		/// Lưu nhóm phân cấp
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_PC_NSD_NH = "Y5QEVKS9W72Z68O";
		/// <summary>
		/// Lưu phân cấp chung nhóm phân cấp
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_PC_NSD_TAM_UNG_THANH_TOAN_NH = "OQE6H7P8JI88SJC";
		/// <summary>
		/// Lấy danh sách và danh sách chi tiết nhóm quyền nsd
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_QUYEN_NSD_CACHE = "G81Q90QGR3L33KP";
		/// <summary>
		/// Lưu nhóm quyền cấu hình
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_QUYEN_NSD_NH = "JSKBIGVGTEMCZBV";
		/// <summary>
		/// Xóa nhóm quyền người sử dụng
		/// </summary>
		public const string PHT_CAU_HINH_NHOM_QUYEN_NSD_XOA = "7PLGYY09ASMZ3G2";
		/// <summary>
		/// Liệt kê danh sách cấu hình phân cấp TPA
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CAP_TPA_LKE = "L3OVAAPL8BZZVDZ";
		/// <summary>
		/// Liệt kê chi tiết cấu hình phân cấp TPA
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CAP_TPA_LKE_CT = "U1GRG5XTOY5E121";
		/// <summary>
		/// Nhập thông tin cấu hình phân cấp TPA
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CAP_TPA_NH = "MR34XVZUTSQ46XG";
		/// <summary>
		/// Xóa phân cấp cấu hình TPA
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CAP_TPA_X = "5X9Q31POBZR9SXG";
		/// <summary>
		/// Liệt kê thông tin phân công địa bàn
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CONG_DIA_BAN_LKE = "PUL2ZZ9E6I2SWIX";
		/// <summary>
		/// Lấy thông tin chi tiết phân công theo địa bàn
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CONG_DIA_BAN_LKE_CT = "FL0RKTOELQ79WL6";
		/// <summary>
		/// Liệt kê chi tiết CH Phân công theo địa bàn
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CONG_DIA_BAN_LKE_CTIET = "HFOT18XNFHWHQJI";
		/// <summary>
		/// Liệt kê chi tiết cấu hình phân công theo địa bàn
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CONG_DIA_BAN_LKE_LKE = "TOCQ0RKV5G1JSQV";
		/// <summary>
		/// Nhập thông tin cấu hình theo địa bàn 
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CONG_DIA_BAN_NH = "8XS2O66FRHOMU44";
		/// <summary>
		/// Xóa thông tin cấu hình phân công địa bàn
		/// </summary>
		public const string PHT_CAU_HINH_PHAN_CONG_DIA_BAN_X = "WSFZCGLC1Q3SAEU";
		/// <summary>
		/// Lưu toàn bộ chức năng hệ thống
		/// </summary>
		public const string PHT_CN_NH = "JURR9A6UTQQFCUH";
		/// <summary>
		/// Cache dịch vụ OCR
		/// </summary>
		public const string PHT_DICH_VU_OCR_CACHE = "02ZUKMGAH1K6X6C";
		/// <summary>
		/// Dịch vụ OCR
		/// </summary>
		public const string PHT_DICH_VU_OCR_CVS_NH = "9N11S8PLTY70HLK";
		/// <summary>
		/// Lấy tất cả mã dịch vụ cấp trên 
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_CACHE = "IIMPWHLLLL7PCT5";
		/// <summary>
		/// Lấy danh sách dịch vụ chi tiết
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_CT_CACHE = "7XLMKVY6RDZN4JL";
		/// <summary>
		/// Tìm kiếm phân trang dịch vụ sức khỏe
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_CT_LKE = "ITR0TBYEGXJC5B3";
		/// <summary>
		/// Export bộ mã dịch vụ sức khỏe
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_EXP = "RKT7RNYTDBD65IF";
		/// <summary>
		/// Import excel dịch vụ sức khỏe
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_IMPORT_EXCEL = "6FREHXMX75WOBL0";
		/// <summary>
		/// Lấy chi tiết dịch vụ sức khỏe
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_LKE_CT = "ENDK293PJ1DZJYS";
		/// <summary>
		/// Lưu thông tin dịch vụ sức khỏe
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_NH = "70V16MLDE1EVK60";
		/// <summary>
		/// Xóa dịch vụ sức khỏe
		/// </summary>
		public const string PHT_DICH_VU_SUC_KHOE_XOA = "2IIIOHH0BR0A6IZ";
		/// <summary>
		/// Lấy tọa độ của các giám định viên hiện trường
		/// </summary>
		public const string PHT_DINH_VI_GDV_LKE = "QQOR8XKDMP3CVOG";
		/// <summary>
		/// Lấy định vị giám định viện hiện trường
		/// </summary>
		public const string PHT_DINH_VI_NH = "ZP1WLPHQPHAJY4K";
		/// <summary>
		/// Liệt kê + phân trang danh mục đơn vị cẩu kéo
		/// </summary>
		public const string PHT_DVI_CAU_KEO_LKE = "LY25K37VRR5LVTI";
		/// <summary>
		/// Liệt kê chi tiết danh mục đơn vị cẩu kéo
		/// </summary>
		public const string PHT_DVI_CAU_KEO_LKE_CT = "669PXZ6C7DJQ51J";
		/// <summary>
		/// Liệt kê thông tin công ty cẩu kéo 
		/// </summary>
		public const string PHT_DVI_CAU_KEO_LKE_TT = "MX9SS1DEMEE635D";
		/// <summary>
		/// Nhập thông tin đơn vị cẩu kéo
		/// </summary>
		public const string PHT_DVI_CAU_KEO_NH = "3EYOGZ8FZ1PDWXR";
		/// <summary>
		/// Xóa thông tin đơn vị cẩu kéo
		/// </summary>
		public const string PHT_DVI_CAU_KEO_X = "77ZX494ZU398HAB";
		/// <summary>
		/// Import excel đơn vị hành chính
		/// </summary>
		public const string PHT_DVI_HANH_CHINH_IMPORT_EXCEL = "Y62SLJ2V937RC19";
		/// <summary>
		/// Export giá gara
		/// </summary>
		public const string PHT_GIA_GARA_EXP = "VGHUJHZRZM4N6P8";
		/// <summary>
		/// Lấy danh sách gara hợp tác
		/// </summary>
		public const string PHT_GIA_GARA_HOP_TAC = "ETY2N0XPVPF79QE";
		/// <summary>
		/// Import excel giá gara
		/// </summary>
		public const string PHT_GIA_GARA_IMPORT = "QVT9RMUI8VKII4K";
		/// <summary>
		/// Tìm kiếm phân trang giá gara
		/// </summary>
		public const string PHT_GIA_GARA_LKE = "XUS2BEF6HQ4Y084";
		/// <summary>
		/// Lấy chi tiết giá gara
		/// </summary>
		public const string PHT_GIA_GARA_LKE_CT = "T5H2QTGIGCOI7M9";
		/// <summary>
		/// Lưu giá gara
		/// </summary>
		public const string PHT_GIA_GARA_NHAP = "TZMQZ5WMC5H5NXI";
		/// <summary>
		/// Tìm kiếm giá gara
		/// </summary>
		public const string PHT_GIA_GARA_TKIEM = "RTQ91AI2ACSQIT0";
		/// <summary>
		/// Xóa thông tin gara báo giá
		/// </summary>
		public const string PHT_GIA_GARA_XOA = "D3Z9TYS6CFRW9Q1";
		/// <summary>
		/// Xóa 1 dòng dữ liệu báo giá gara
		/// </summary>
		public const string PHT_GIA_GARA_XOA_DONG = "FA118PZ4DJ2QGFE";
		/// <summary>
		/// Liệt kê lịch đọc OCR báo giá
		/// </summary>
		public const string PHT_LICH_DOC_OCR_BAO_GIA_LKE = "SFMQBK2E3PPE6WL";
		/// <summary>
		/// Liệt kê lịch đọc OCR
		/// </summary>
		public const string PHT_LICH_DOC_OCR_LKE_LKE = "WN68JRL138Z1JXU";
		/// <summary>
		/// Lưu thông tin file đính kèm email
		/// </summary>
		public const string PHT_LICH_GUI_EMAIL_FILE_DINH_KEM_NH = "63GX9XW6B8SSVBA";
		/// <summary>
		/// Tìm kiếm phân trang lịch giám định
		/// </summary>
		public const string PHT_LICH_LKE = "H3AAES1C4XO0S0O";
		/// <summary>
		/// Thông tin chi tiết lịch giám định
		/// </summary>
		public const string PHT_LICH_LKE_CT = "7F0ENT8TWG0QIFE";
		/// <summary>
		/// Đặt lịch
		/// </summary>
		public const string PHT_LICH_NH = "QE6RYDH06RV7E4O";
		/// <summary>
		/// Lưu thông tin lịch giám định
		/// </summary>
		public const string PHT_LICH_NH_NH = "VFGGCTGAY549E75";
		/// <summary>
		/// Lấy danh sách ngày có lịch giám định theo tháng
		/// </summary>
		public const string PHT_LICH_THANG_LKE = "3CMCVTVISJAU6IC";
		/// <summary>
		/// Gửi email mẫu template ESCS
		/// </summary>
		public const string PHT_MAIL_ESCS = "2PYTIVR95PS2ED2";
		/// <summary>
		/// Lấy thông tin danh sách file đính kèm
		/// </summary>
		public const string PHT_MAIL_MAU_GUI_ATTACH_FILE = "APEZRNI5218X383";
		/// <summary>
		/// Lấy danh sách template mẫu email bệnh viện
		/// </summary>
		public const string PHT_MAIL_MAU_GUI_BV_LKE = "YBGCFF5PMODBEHA";
		/// <summary>
		/// Lấy danh sách template mẫu email
		/// </summary>
		public const string PHT_MAIL_MAU_GUI_LKE = "1WUHFLI9OWBR0IY";
		/// <summary>
		/// Liệt kê email cấu hình
		/// </summary>
		public const string PHT_MAIL_MAU_GUI_LKE_CH = "4AXF07T7ZL7G36W";
		/// <summary>
		/// Liệt kê chi tiết mail cấu hình
		/// </summary>
		public const string PHT_MAIL_MAU_GUI_LKE_CH_CT = "D2V3RV0LO6OMGF3";
		/// <summary>
		/// Nhập mail cấu hình
		/// </summary>
		public const string PHT_MAIL_MAU_GUI_LKE_CH_NH = "I3B23H4XPT07NLJ";
		/// <summary>
		/// Lấy thông tin mẫu email
		/// </summary>
		public const string PHT_MAIL_MAU_GUI_LKE_CT = "XP6H8F3N3DSQGO6";
		/// <summary>
		/// Liệt kê danh sách mail server
		/// </summary>
		public const string PHT_MAIL_SERVER_LKE = "P73RG0Z3PVK7HS6";
		/// <summary>
		/// Xem chi tiết mail server
		/// </summary>
		public const string PHT_MAIL_SERVER_LKE_CT = "UWWNFYPYCYOLWC5";
		/// <summary>
		/// Nhập maill server
		/// </summary>
		public const string PHT_MAIL_SERVER_NH = "4B2O78KIHE773IS";
		/// <summary>
		/// Xóa thông tin mail server
		/// </summary>
		public const string PHT_MAIL_SERVER_XOA = "K65OUHUDM21WKOW";
		/// <summary>
		/// Liệt kê + phân trang danh sách tài khoản email
		/// </summary>
		public const string PHT_MAIL_TAI_KHOAN_LKE = "925WGKDOH2IOYUB";
		/// <summary>
		/// Liệt kê chi tiết thông tin tài khoản email
		/// </summary>
		public const string PHT_MAIL_TAI_KHOAN_LKE_CT = "W4CEDE3H9DLAE38";
		/// <summary>
		/// Lấy danh sách tài khoản email gửi
		/// </summary>
		public const string PHT_MAIL_TAI_KHOAN_LKE_TATCA = "9TPXA0VEE23X3UC";
		/// <summary>
		/// Nhập thông tin tài khoản email server
		/// </summary>
		public const string PHT_MAIL_TAI_KHOAN_NH = "68HRZWUHRWEPPK5";
		/// <summary>
		/// Xóa thông tin tài khoản mail server
		/// </summary>
		public const string PHT_MAIL_TAI_KHOAN_XOA = "OCGA6F88VUFOOEJ";
		/// <summary>
		/// Phân trang mapping mã hạng mục liệt kê
		/// </summary>
		public const string PHT_MAPPING_HANG_MUC_LKE = "NGY430R3PF20RLL";
		/// <summary>
		/// Lấy thông tin mẫu in bệnh viện
		/// </summary>
		public const string PHT_MAU_IN_BV_LKE_IN = "LQAD43RKNI5IKT5";
		/// <summary>
		/// Liệt kê danh sách thông tin cấu hình ký mẫu in
		/// </summary>
		public const string PHT_MAU_IN_CH_KY_LKE = "GLM2KA2W0UCBHCW";
		/// <summary>
		/// Liệt kê chi tiết cấu hình ký mẫu in
		/// </summary>
		public const string PHT_MAU_IN_CH_KY_LKE_CT = "PRRJJJR0IYEE30R";
		/// <summary>
		/// Nhập thông tin cấu hình ký mẫu in
		/// </summary>
		public const string PHT_MAU_IN_CH_KY_NH = "HG9N0ISMJL7T3DR";
		/// <summary>
		/// Xóa thông tin cấu hình ký mẫu in
		/// </summary>
		public const string PHT_MAU_IN_CH_KY_X = "0W47NYU0BIGCAU1";
		/// <summary>
		/// Lấy danh sách biểu mẫu (tiếp nhận)
		/// </summary>
		public const string PHT_MAU_IN_DS_BIEU_MAU = "2VPDMLKT6T7DQX6";
		/// <summary>
		/// Lấy danh sách biểu mẫu (tiếp nhận)
		/// </summary>
		public const string PHT_MAU_IN_DS_BIEU_MAU_BV = "MFDF4550RWQ9N3E";
		/// <summary>
		/// In mẫu in ESCS
		/// </summary>
		public const string PHT_MAU_IN_ESCS = "SEACTX8R27XJ3RD";
		/// <summary>
		/// Export danh mục mẫu in
		/// </summary>
		public const string PHT_MAU_IN_EXP = "LKDK20ECIWDUDQE";
		/// <summary>
		/// In mẫu in ESCS và ký số
		/// </summary>
		public const string PHT_MAU_IN_KY_SO_ESCS = "DEACTX8R27XJ3RS1";
		/// <summary>
		/// Liệt kê danh sách mẫu in 
		/// </summary>
		public const string PHT_MAU_IN_LKE = "S6B8ZN5VK2KJXT9";
		/// <summary>
		/// Liệt kê chi tiết mẫu in 
		/// </summary>
		public const string PHT_MAU_IN_LKE_CT = "ULJYQYJOFZHC9P2";
		/// <summary>
		/// Lấy thông tin mẫu in
		/// </summary>
		public const string PHT_MAU_IN_LKE_IN = "1802WYU03EV3A61";
		/// <summary>
		/// Lấy file cần ký số
		/// </summary>
		public const string PHT_MAU_IN_LKE_KY = "R3HI626OM4LUREI";
		/// <summary>
		/// Nhập mẫu in 
		/// </summary>
		public const string PHT_MAU_IN_NH = "Y2IOBFWK6AJPBV6";
		/// <summary>
		/// Xóa mẫu in
		/// </summary>
		public const string PHT_MAU_IN_XOA = "GSKTWVYAESYRFEG";
		/// <summary>
		/// Lấy danh sách các loại chi phí bảo hiểm con người bệnh viện
		/// </summary>
		public const string PHT_MA_BENH_CHI_PHI_BV_TKIEM = "LMBQJWGIPXVW9TI";
		/// <summary>
		/// Liệt kê danh sách chi phí mã bệnh
		/// </summary>
		public const string PHT_MA_BENH_CHI_PHI_LKE = "73E8ASEI2OLLX9P";
		/// <summary>
		/// Liệt kê mã bệnh chi phí
		/// </summary>
		public const string PHT_MA_BENH_CHI_PHI_LKE_CT = "S7RGMF45LOP1WAI";
		/// <summary>
		/// Nhập thông tin cấu hình mã bệnh - chi phí
		/// </summary>
		public const string PHT_MA_BENH_CHI_PHI_NHAP = "MN0YMW5U77HYJB6";
		/// <summary>
		/// Lấy danh sách các loại chi phí bảo hiểm con người
		/// </summary>
		public const string PHT_MA_BENH_CHI_PHI_TKIEM = "3LVKL8DP569XIN5";
		/// <summary>
		/// Import excel mã bệnh viện
		/// </summary>
		public const string PHT_MA_BENH_IMPORT_EXCEL = "O13EN6SF0YCQAQV";
		/// <summary>
		/// Tìm kiếm + phân trang mã bệnh
		/// </summary>
		public const string PHT_MA_BENH_LKE = "BXUWYR3IANTIDZD";
		/// <summary>
		/// Lấy thông tin bệnh viện để gen mã QR
		/// </summary>
		public const string PHT_MA_BENH_VIEN_GEN_QRCODE = "TIEETY2TBDCQCLV";
		/// <summary>
		/// Import excel mã bệnh viện
		/// </summary>
		public const string PHT_MA_BENH_VIEN_IMPORT_EXCEL = "H18GJM9OALC10V5";
		/// <summary>
		/// Import người liên hệ bệnh viện
		/// </summary>
		public const string PHT_MA_BENH_VIEN_LHE_IMPORT = "5TQGZ7MBNVDM89P";
		/// <summary>
		/// Thêm QRCODE bệnh viện
		/// </summary>
		public const string PHT_MA_BENH_VIEN_QRCODE_NH = "FJ3X9I0RVBOP0JF";
		/// <summary>
		/// Liệt kê danh sách câu hỏi
		/// </summary>
		public const string PHT_MA_CAU_HOI_HUONG_DAN_LKE = "EC4L99IWCZ7N9RN";
		/// <summary>
		/// Liệt kê chi tiết danh sách câu hỏi
		/// </summary>
		public const string PHT_MA_CAU_HOI_HUONG_DAN_LKE_CT = "LRSWFKH3YNCF5O3";
		/// <summary>
		/// Lưu thông tin bộ mã các câu hỏi
		/// </summary>
		public const string PHT_MA_CAU_HOI_HUONG_DAN_NH = "20NV2ZM1N1FW4EG";
		/// <summary>
		/// Xóa bộ mã câu hỏi
		/// </summary>
		public const string PHT_MA_CAU_HOI_HUONG_DAN_XOA = "B6ZUPZTUJY5M8X7";
		/// <summary>
		/// Lấy danh sách các loại chi phí bệnh viện
		/// </summary>
		public const string PHT_MA_CHI_PHI_BV_CACHE = "KU4I3MTO081RFC0";
		/// <summary>
		/// Lấy danh sách các loại chi phí
		/// </summary>
		public const string PHT_MA_CHI_PHI_CACHE = "Y5EYJ2XK8XRE1PW";
		/// <summary>
		/// Liệt kê chi phí giám định
		/// </summary>
		public const string PHT_MA_CHI_PHI_GD_LKE = "R8V3SH5X6TIL4HQ";
		/// <summary>
		/// Liệt kê chi tiết chi phí giám định
		/// </summary>
		public const string PHT_MA_CHI_PHI_GD_LKE_CT = "2I10IT49YXOVU4C";
		/// <summary>
		/// Nhập chi phí giám định
		/// </summary>
		public const string PHT_MA_CHI_PHI_GD_NH = "50LZTQZUM4IOS7J";
		/// <summary>
		/// Tìm kiếm loại chi phí giám định
		/// </summary>
		public const string PHT_MA_CHI_PHI_GD_TKIEM = "RQTB6IEPWHWISIG";
		/// <summary>
		/// Xóa thông tin chi phí giám định
		/// </summary>
		public const string PHT_MA_CHI_PHI_GD_X = "MB1WQ4SEKMC2S9B";
		/// <summary>
		/// Liệt kê danh mục chi phí
		/// </summary>
		public const string PHT_MA_CHI_PHI_LKE = "5K16A61VJJ24CUR";
		/// <summary>
		/// Liệt kê chi tiết danh mục chi phí
		/// </summary>
		public const string PHT_MA_CHI_PHI_LKE_CT = "F89UFSML38LL2AV";
		/// <summary>
		/// Nhập danh mục các loại chi phí
		/// </summary>
		public const string PHT_MA_CHI_PHI_NHAP = "XXKXGAZJA82GTP9";
		/// <summary>
		/// Danh sách tất cả chi phí khám chữa bệnh
		/// </summary>
		public const string PHT_MA_CHI_PHI_TATCA = "FRFC9UJ5FRG3OM9";
		/// <summary>
		/// Xóa danh mục chi phí
		/// </summary>
		public const string PHT_MA_CHI_PHI_XOA = "I9A4TCZ752ZNWSU";
		/// <summary>
		/// Cache danh mục chức danh
		/// </summary>
		public const string PHT_MA_CHUC_DANH_CACHE = "Z4BFDA2LJSZ3BL5";
		/// <summary>
		/// Liệt kê thông tin chức danh
		/// </summary>
		public const string PHT_MA_CHUC_DANH_LKE = "ELLTJ7I88KLXPLT";
		/// <summary>
		/// Liệt kê chi tiết thông tin chức danh
		/// </summary>
		public const string PHT_MA_CHUC_DANH_LKE_CT = "SAZFDM4WPFD7OYK";
		/// <summary>
		/// Nhập thông tin chức danh
		/// </summary>
		public const string PHT_MA_CHUC_DANH_NH = "M4N0EH2BRWWN3NZ";
		/// <summary>
		/// Xóa thông tin chức danh
		/// </summary>
		public const string PHT_MA_CHUC_DANH_X = "Z4TSB0GEFXXMOFM";
		/// <summary>
		/// Export danh mục bộ mã dùng chung
		/// </summary>
		public const string PHT_MA_CHUNG_EXP = "MO6HTS6ROGWXMAE";
		/// <summary>
		/// Import excel bộ mã chung
		/// </summary>
		public const string PHT_MA_CHUNG_IMPORT_EXCEL = "UGNQQYSNJ05W1AU";
		/// <summary>
		/// Liệt kê danh sách bộ mã chung
		/// </summary>
		public const string PHT_MA_CHUNG_LKE = "8YYZ52BQNUJEENR";
		/// <summary>
		/// Liệt kê chi tiết bộ mã chung
		/// </summary>
		public const string PHT_MA_CHUNG_LKE_CT = "1RT2E57JXCY6DQG";
		/// <summary>
		/// Lấy danh sách công ty giám định
		/// </summary>
		public const string PHT_MA_CTY_GIAM_DINH_CACHE = "O8GXY3YDT562O3K";
		/// <summary>
		/// Liệt kê danh sách mã công ty giám định
		/// </summary>
		public const string PHT_MA_CTY_GIAM_DINH_LKE = "JV9ASW54QI60EEK";
		/// <summary>
		/// Liệt kê chi tiết mã công ty giám định
		/// </summary>
		public const string PHT_MA_CTY_GIAM_DINH_LKE_CT = "UYPTWB7NHSK6P90";
		/// <summary>
		/// Nhập mã công ty giám định
		/// </summary>
		public const string PHT_MA_CTY_GIAM_DINH_NH = "ZWSQQB4WLUI80X7";
		/// <summary>
		/// Tìm kiếm công ty giám định
		/// </summary>
		public const string PHT_MA_CTY_GIAM_DINH_TKIEM = "LCNFVA8N7D47CM6";
		/// <summary>
		/// Xóa mã công ty giám định
		/// </summary>
		public const string PHT_MA_CTY_GIAM_DINH_X = "AKDFN0ZYEAF33YK";
		/// <summary>
		/// Xóa cấu hình đối tác xử lý hồ sơ
		/// </summary>
		public const string PHT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_CT_X = "YWLS0SG2MAR2OJG";
		/// <summary>
		/// Lấy danh sách tài khoản thanh toán của chi nhánh
		/// </summary>
		public const string PHT_MA_DOI_TAC_CHI_NHANH_TAI_KHOAN_LKE = "1NJZ1Y1GTNJQGWB";
		/// <summary>
		/// Liệt kê thông tin mã đối tác token key
		/// </summary>
		public const string PHT_MA_DOI_TAC_TOKEN_KEY_LKE = "8EN8WQAZ0K02EYF";
		/// <summary>
		/// Liệt kê chi tiết thông tin mã đối tác token key
		/// </summary>
		public const string PHT_MA_DOI_TAC_TOKEN_KEY_LKE_CT = "9M5NM7636FISSOF";
		/// <summary>
		/// Nhập thông tin mã đối tác token key
		/// </summary>
		public const string PHT_MA_DOI_TAC_TOKEN_KEY_NH = "TOCS931T04D93DL";
		/// <summary>
		/// Xóa thông tin mã đối tác token key
		/// </summary>
		public const string PHT_MA_DOI_TAC_TOKEN_KEY_XOA = "131JLG2YLQV8RQH";
		/// <summary>
		/// Lấy danh sách đơn vị tính 
		/// </summary>
		public const string PHT_MA_DVI_TINH_CACHE = "UVJ8XMJSZXVUTLY";
		/// <summary>
		/// Export danh sách đơn vị tính thuốc
		/// </summary>
		public const string PHT_MA_DVI_TINH_EXP = "QK8CM7O0TRNTJAY";
		/// <summary>
		/// Import Excel ĐVT thuốc
		/// </summary>
		public const string PHT_MA_DVI_TINH_IMPORT_EXCEL = "NTOC46HSNWUQUBJ";
		/// <summary>
		/// Liệt kê danh sách đơn vị tính
		/// </summary>
		public const string PHT_MA_DVI_TINH_LKE = "8DSCR9CP4Y5FLJU";
		/// <summary>
		/// Liệt kê chi tiết danh sách DVT 
		/// </summary>
		public const string PHT_MA_DVI_TINH_LKE_CT = "1LEVBX1S8VOLPG6";
		/// <summary>
		/// Nhập thông tin DVT 
		/// </summary>
		public const string PHT_MA_DVI_TINH_NHAP = "WSJ4X56I4F7562W";
		/// <summary>
		/// Tìm kiếm đơn vị tính theo nhóm
		/// </summary>
		public const string PHT_MA_DVI_TINH_TKIEM = "Z57YMAZ8UZ7ATRG";
		/// <summary>
		/// Xóa thông tin DVT 
		/// </summary>
		public const string PHT_MA_DVI_TINH_XOA = "9D7FXSST1KWDUFQ";
		/// <summary>
		/// Lấy danh sách cấu hình gara
		/// </summary>
		public const string PHT_MA_GARA_CONFIG_LKE = "DC2U1BH6IBLKWQ5";
		/// <summary>
		/// Liệt kê danh sách gara cấu hình
		/// </summary>
		public const string PHT_MA_GARA_CONFIG_LKE_GARA = "8239L54ACCE3MWF";
		/// <summary>
		/// Lưu thông tin cấu hình gara
		/// </summary>
		public const string PHT_MA_GARA_CONFIG_NH = "RFXI4QMECO9V91T";
		/// <summary>
		/// Import excel mã gara
		/// </summary>
		public const string PHT_MA_GARA_IMPORT_EXCEL = "RD9QZLISK7VCZR7";
		/// <summary>
		/// Danh sách gara cấu hình
		/// </summary>
		public const string PHT_MA_GARA_TKIEM = "A9SUVLJ4WC5T4G1";
		/// <summary>
		/// Import excel hãng xe
		/// </summary>
		public const string PHT_MA_HANG_XE_IMPORT_EXCEL = "ODVAQZVBXT2TB8J";
		/// <summary>
		/// Import excel mã hiệu xe
		/// </summary>
		public const string PHT_MA_HIEU_XE_IMPORT_EXCEL = "4BC12RU5IC270WB";
		/// <summary>
		/// Lấy danh sách loại hình nghiệp vụ con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_CACHE = "U5D79E91RH0YXDX";
		/// <summary>
		/// Lấy cấu hình nguyên nhân quyền lợi sản phẩm con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_CAU_HINH_CACHE = "97Q04H39IKTJEXE";
		/// <summary>
		/// Tìm kiếm phân trang cấu hình lhnv con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_CAU_HINH_LKE = "SKWKMGGT8C469EV";
		/// <summary>
		/// Cấu hình lhnv con người nhập
		/// </summary>
		public const string PHT_MA_LHNV_CN_CAU_HINH_NH = "A04KH5UR4R5OWCB";
		/// <summary>
		/// Danh sách quyền lợi cha
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_CHA = "6OWZ3KO2NKX6A1P";
		/// <summary>
		/// Lấy tất cả quyền lợi bổ sung con người 
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_DKBS_CACHE = "GR9JOZBIIRGDNQ4";
		/// <summary>
		/// Export danh mục quyền lợi sản phẩm
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_EXP = "SCK4OVEWPIZN336";
		/// <summary>
		/// Import excel quyền lợi sản phẩm
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_IMPORT_EXCEL = "3DC5EL4MQLMRCQM";
		/// <summary>
		/// Liệt kê quyền lợi sản phẩm
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_LKE = "HXQ6XQSV6SN0WJ9";
		/// <summary>
		/// Xem chi tiết quyền lợi sản phẩm
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_LKE_CT = "N2193843IFCW8NW";
		/// <summary>
		/// Nhập quyền lợi sản phẩm
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_NH = "GUGC9H5IXB2F97O";
		/// <summary>
		/// Lấy danh sách dạng tree quyền lợi
		/// </summary>
		public const string PHT_MA_LHNV_CN_CT_TREE = "IXZCHBZO5SA51U2";
		/// <summary>
		/// Lấy tất cả danh sách sản phẩm con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_DMUC = "QI4YR8HVDXWGR21";
		/// <summary>
		/// Export danh mục sản phẩm con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_EXP = "S9CMVFZDH1W0TCV";
		/// <summary>
		/// Import excel mã loại hình nghiệp vụ cn
		/// </summary>
		public const string PHT_MA_LHNV_CN_IMPORT_EXCEL = "QY9QROH787MIVET";
		/// <summary>
		/// Liệt kê danh sách mã LHNV con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_LKE = "27JULAZPRZNFAQF";
		/// <summary>
		/// Xem chi tiết mã LHNV con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_LKE_CT = "Q2ZCI9OOJPJJZRG";
		/// <summary>
		/// Nhập mã LHNV con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_NH = "2U3VDPU81E9TSHF";
		/// <summary>
		/// Xóa sản phẩm con người
		/// </summary>
		public const string PHT_MA_LHNV_CN_X = "QK9ZZ7FSE31CJQY";
		/// <summary>
		/// Export danh mục loại hình nghiệp vụ xe
		/// </summary>
		public const string PHT_MA_LHNV_EXP = "RXI3M5TU07O05BR";
		/// <summary>
		/// Import excel mã loại hình nghiệp vụ xe
		/// </summary>
		public const string PHT_MA_LHNV_IMPORT_EXCEL = "EA9PLTV52PY6EX0";
		/// <summary>
		/// Liệt kê loại hình nghiệp vụ
		/// </summary>
		public const string PHT_MA_LHNV_LKE = "9R63PRINGCV047V";
		/// <summary>
		/// Xem chi tiết mã loại hình nghiệp vụ
		/// </summary>
		public const string PHT_MA_LHNV_LKE_CT = "JEGSS7DBDP3LWKW";
		/// <summary>
		/// Nhập loại hình nghiệp vụ
		/// </summary>
		public const string PHT_MA_LHNV_NH = "LGUIISG3XSN7V47";
		/// <summary>
		/// Xóa loại hình nghiệp vụ
		/// </summary>
		public const string PHT_MA_LHNV_XOA = "T8AEMMBO9HZSPE5";
		/// <summary>
		/// Cache danh mục mã loại xe
		/// </summary>
		public const string PHT_MA_LOAI_XE_CACHE = "29VCBSK528O1VY6";
		/// <summary>
		/// Export danh mục loại xe
		/// </summary>
		public const string PHT_MA_LOAI_XE_EXP = "C02LUZRS94J5TTN";
		/// <summary>
		/// Import excel mã loại xe
		/// </summary>
		public const string PHT_MA_LOAI_XE_IMPORT_EXCEL = "9RECGQGNSK0G2AM";
		/// <summary>
		/// Liệt kê danh sách mã loại xe
		/// </summary>
		public const string PHT_MA_LOAI_XE_LKE = "CPV0MY4EED2OJOB";
		/// <summary>
		/// Liệt kê chi tiết mã loại xe
		/// </summary>
		public const string PHT_MA_LOAI_XE_LKE_CT = "KF858PJETBA71JX";
		/// <summary>
		/// Nhập mã loại xe
		/// </summary>
		public const string PHT_MA_LOAI_XE_NH = "IJRHKW5HN4PJUN9";
		/// <summary>
		/// Xóa mã loại xe
		/// </summary>
		public const string PHT_MA_LOAI_XE_X = "UOZ1ETXEII8G5NI";
		/// <summary>
		/// Nhập mã lỗi hồ sơ
		/// </summary>
		public const string PHT_MA_LOI_HO_SO_NH = "NR1FH19I5HJ81X2";
		/// <summary>
		/// Import excel mã ngân hàng
		/// </summary>
		public const string PHT_MA_NGAN_HANG_IMPORT_EXCEL = "2MWAGXMY9RJAY4L";
		/// <summary>
		/// Hạng mục con người CACHE
		/// </summary>
		public const string PHT_MA_NG_HANG_MUC_CACHE = "OOZKKLCCVPX98PV";
		/// <summary>
		/// Liệt kê danh sách hạng mục con người
		/// </summary>
		public const string PHT_MA_NG_HANG_MUC_LKE = "2TPNZVXYH9XJM5N";
		/// <summary>
		/// Liệt kê chi tiết hạng mục con người
		/// </summary>
		public const string PHT_MA_NG_HANG_MUC_LKE_CT = "6SE9FL9G7SR5ER8";
		/// <summary>
		/// Nhập hạng mục con người
		/// </summary>
		public const string PHT_MA_NG_HANG_MUC_NH = "M1B6PR7O24F1J8E";
		/// <summary>
		/// Danh sách nhóm ghi chú
		/// </summary>
		public const string PHT_MA_NG_HANG_MUC_NHOM_GHI_CHU_LKE = "ISF5ODC0OWEN4T0";
		/// <summary>
		/// Xóa thông tin hạng mục con người
		/// </summary>
		public const string PHT_MA_NG_HANG_MUC_XOA = "YJ2UDZI2OC3Z33U";
		/// <summary>
		/// Import excel nhà bảo hiểm
		/// </summary>
		public const string PHT_MA_NHA_BH_IMPORT_EXCEL = "69FSV43VO9R3YNB";
		/// <summary>
		/// Import excel mã phòng ban
		/// </summary>
		public const string PHT_MA_PHONG_BAN_IMPORT_EXCEL = "BPO6G64EUU4HBKV";
		/// <summary>
		/// Thông tin liên hệ liệt kê
		/// </summary>
		public const string PHT_MA_TTLH_LKE = "B9G7D43M4IQU71H";
		/// <summary>
		/// Liệt kê chi tiết thông tin liên hệ
		/// </summary>
		public const string PHT_MA_TTLH_LKE_CT = "5TKI1XJM9H4DZVM";
		/// <summary>
		/// Nhập thông tin liên hệ
		/// </summary>
		public const string PHT_MA_TTLH_NH = "GLSLXCY7QJLE0UF";
		/// <summary>
		/// Xóa thông tin liên hệ
		/// </summary>
		public const string PHT_MA_TTLH_XOA = "321ZSHDMWINHBS2";
		/// <summary>
		/// [CAUHINHXE] Cấu hình xe khấu hao liệt kê ngày 
		/// </summary>
		public const string PHT_MA_XE_CAU_HINH_LKE_NGAY = "PD08PSCGXZYTPYL";
		/// <summary>
		/// Lấy đánh giá hiện trường (cache)
		/// </summary>
		public const string PHT_MA_XE_DGHT_CACHE = "GJMGPOILFQETB78";
		/// <summary>
		/// Liệt kê thông tin đánh giá hiện trường
		/// </summary>
		public const string PHT_MA_XE_DGHT_LKE = "6FTMKH1XS4IF9GV";
		/// <summary>
		/// Liệt kê chi tiết đánh giá hiện tường
		/// </summary>
		public const string PHT_MA_XE_DGHT_LKE_CT = "HMMEFGMND5Z9APZ";
		/// <summary>
		/// Nhập thông tin đánh giá hiện trường
		/// </summary>
		public const string PHT_MA_XE_DGHT_NH = "E8DDVCRTF11G6FC";
		/// <summary>
		/// Xóa thông tin đánh giá hiện trường
		/// </summary>
		public const string PHT_MA_XE_DGHT_XOA = "A7OJU6312BBF2W9";
		/// <summary>
		/// Liệt kê danh sách phương pháp tính giảm trừ bảo hiểm
		/// </summary>
		public const string PHT_MA_XE_GIAM_TRU_LKE_CT = "S9S8JEZ5J13CIXB";
		/// <summary>
		/// Nhập thông tin phương pháp tính giảm trừ bảo hiểm
		/// </summary>
		public const string PHT_MA_XE_GIAM_TRU_NH = "6XCNWP54GNL9V56";
		/// <summary>
		/// Xóa mã xe giảm trừ
		/// </summary>
		public const string PHT_MA_XE_GIAM_TRU_X = "X4YXJZXOWKV38JQ";
		/// <summary>
		/// Cache thông tin hạng mục AICycle
		/// </summary>
		public const string PHT_MA_XE_HANG_MUC_AICYCLE_CACHE = "29WMAJN2J6QFSRJ";
		/// <summary>
		/// Export danh sách hạng mục
		/// </summary>
		public const string PHT_MA_XE_HANG_MUC_AICYCLE_EXP = "BMQC1EOJI31KN5C";
		/// <summary>
		/// Import danh sách hạng mục AI
		/// </summary>
		public const string PHT_MA_XE_HANG_MUC_AICYCLE_IMPORT_EXCEL = "TNL8MRIW21JOSYK";
		/// <summary>
		/// Lấy thông tin mã xe hạng mục AICLYCLE
		/// </summary>
		public const string PHT_MA_XE_HANG_MUC_AICYCLE_LKE = "6QPKHSJIB8BOZ8M";
		/// <summary>
		/// Liệt kê chi tiết thông tin hạng mục 
		/// </summary>
		public const string PHT_MA_XE_HANG_MUC_AICYCLE_LKE_CT = "ZJRSH8GFCFSBBOE";
		/// <summary>
		/// CACHE hạng mục đánh gia rủi ro 
		/// </summary>
		public const string PHT_MA_XE_HANG_MUC_DGRR_CACHE = "08VWT52SDOMDHXK";
		/// <summary>
		/// Lấy hạng mục toàn cảnh
		/// </summary>
		public const string PHT_MA_XE_HANG_MUC_TOAN_CANH = "7YFAKFVRGQFFY1D";
		/// <summary>
		/// Liệt kê danh sách phương pháp tính khấu hao
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_LKE = "6FQPROYT903990O";
		/// <summary>
		/// Xem chi tiết phương pháp khấu hao
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_LKE_CT = "9THSFRAFZG8EICN";
		/// <summary>
		/// Liệt kê danh sách phương pháp tính khấu hao loại xe
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_LOAI_XE_LKE = "JDCRJBEPZJBP6AV";
		/// <summary>
		/// Nhập phương pháp tính khấu hao loại xe
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_LOAI_XE_NH = "6P0B6O0DRZC7J8T";
		/// <summary>
		/// Xóa cấu hình khấu hao loại xe
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_LOAI_XE_X = "NQ3AMTWCNYERC4Y";
		/// <summary>
		/// Lưu danh sách ngày khấu hao
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_NGAY_NH = "69ZRF9KF8U4TXEN";
		/// <summary>
		/// Nhập phương pháp tính khấu hao
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_NH = "24B2A7QT1SCSTB1";
		/// <summary>
		/// Xóa mã xe khấu hao
		/// </summary>
		public const string PHT_MA_XE_KHAU_HAO_X = "NQLSIWA1ZANV2IV";
		/// <summary>
		/// CACHE thông tin mức độ tổn thất AICYCLE
		/// </summary>
		public const string PHT_MA_XE_MUC_DO_TT_AICYCLE_CACHE = "G9YBXCTDKKRXIMI";
		/// <summary>
		/// Lấy tất cả danh sách mức độ tt mapping
		/// </summary>
		public const string PHT_MA_XE_MUC_DO_TT_AI_CACHE = "BO74DPHY8R08IV2";
		/// <summary>
		/// Liệt kê danh sách mức độ tổn thất (AI)
		/// </summary>
		public const string PHT_MA_XE_MUC_DO_TT_AI_LKE = "3Z9B23FJ8WR2I91";
		/// <summary>
		/// Nhập mức độ tổn thất (AI)
		/// </summary>
		public const string PHT_MA_XE_MUC_DO_TT_AI_NH = "KHATCA4J938ZP1E";
		/// <summary>
		/// Import excel mức độ tổn thất
		/// </summary>
		public const string PHT_MA_XE_MUC_DO_TT_IMPORT_EXCEL = "44LMRQN2ZENOSN2";
		/// <summary>
		/// Vị trí tổn thất xe cache
		/// </summary>
		public const string PHT_MA_XE_VI_TRI_TT_CACHE = "I8127BKE8VRZ9DK";
		/// <summary>
		/// Lấy thông tin version app
		/// </summary>
		public const string PHT_MOBILE_APP_LKE = "01AYD37XDONP8O8";
		/// <summary>
		/// Liệt kê danh sách cấu hình duyệt
		/// </summary>
		public const string PHT_NGUOI_DUYET_MAU_LKE = "5T5BZ5S2PLKUD7V";
		/// <summary>
		/// Liệt kê chi tiết cấu hình duyệt
		/// </summary>
		public const string PHT_NGUOI_DUYET_MAU_LKE_CT = "LMCEZ6I6B5NI2ST";
		/// <summary>
		/// Nhập cấu hình duyệt
		/// </summary>
		public const string PHT_NGUOI_DUYET_MAU_NH = "ZDLJYIA1X0LZK73";
		/// <summary>
		/// Tìm kiếm danh sách cán bộ phê duyệt
		/// </summary>
		public const string PHT_NGUOI_DUYET_MAU_TKIEM_NSD = "3E3EOHITY9CQXWX";
		/// <summary>
		/// Tìm kiếm người duyệt theo chi nhánh
		/// </summary>
		public const string PHT_NGUOI_DUYET_MAU_TKIEM_NSD_CNHANH = "SNK2MDWH8QOSX59";
		/// <summary>
		/// Xóa nhóm phê duyệt
		/// </summary>
		public const string PHT_NGUOI_DUYET_MAU_XOA = "XIIXSRDQXD087O1";
		/// <summary>
		/// Liệt kê danh sách người xin ý kiến mẫu
		/// </summary>
		public const string PHT_NGUOI_XIN_Y_KIEN_MAU_LKE = "KV2NBA2B8V2784A";
		/// <summary>
		/// Lấy chi tiết người xin ý kiến mẫu
		/// </summary>
		public const string PHT_NGUOI_XIN_Y_KIEN_MAU_LKE_CT = "K8PBXCMFPMJRILU";
		/// <summary>
		/// Nhập cấu hình xin ý kiến
		/// </summary>
		public const string PHT_NGUOI_XIN_Y_KIEN_MAU_NH = "CTVHTP2U2NVHOAB";
		/// <summary>
		/// Login nsd bệnh viện
		/// </summary>
		public const string PHT_NSD_BV_LOGIN = "8Q3PJX7ZFZ9V14A";
		/// <summary>
		/// Tìm kiếm NSD bệnh viện
		/// </summary>
		public const string PHT_NSD_BV_TKIEM = "KOBH08C2YMF65NY";
		/// <summary>
		/// Lấy Call ID của user đăng nhập
		/// </summary>
		public const string PHT_NSD_CALL_ID_LKE_CT = "5EVX7B23TJON1L4";
		/// <summary>
		/// Cấp lại mật khẩu mới (Quên mật khẩu)
		/// </summary>
		public const string PHT_NSD_CAP_LAI_MK = "FLI8LJ6QQZM6MPB";
		/// <summary>
		/// Danh sách cán bộ theo danh sách đơn vị
		/// </summary>
		public const string PHT_NSD_CNHANH_LKE = "VEZJRNJR2JPDS9W";
		/// <summary>
		/// Lấy danh sách nsd ý kiến theo chi nhánh
		/// </summary>
		public const string PHT_NSD_CNHANH_Y_KIEN_LKE = "35GUL7E8BF92WTQ";
		/// <summary>
		/// Lấy danh sách người xin ý kiến theo danh sách
		/// </summary>
		public const string PHT_NSD_CNHANH_Y_KIEN_LKE_NSD = "B2JDQHZ1J82HCQ9";
		/// <summary>
		/// Lấy danh mục trang thông tin người dùng
		/// </summary>
		public const string PHT_NSD_DMUC = "I5DUTGQHHPGOKS3";
		/// <summary>
		/// Đổi mật khẩu
		/// </summary>
		public const string PHT_NSD_DOI_MAT_KHAU = "V6CZUALT43RJPA3";
		/// <summary>
		/// Export danh mục người dùng
		/// </summary>
		public const string PHT_NSD_EXP = "V85H3Z8AQTBKOQA";
		/// <summary>
		/// Tải template upload danh sách nsd
		/// </summary>
		public const string PHT_NSD_EXP_MAU_EXCEL = "OM1L85TMI500D7D";
		/// <summary>
		/// Export danh mục ghi log nsd
		/// </summary>
		public const string PHT_NSD_HANH_DONG_EXP = "I6TAYROS3RK2F18";
		/// <summary>
		/// Danh sách người sử dụng hành động
		/// </summary>
		public const string PHT_NSD_HANH_DONG_LKE = "YCEWNBQ4ONGOMR8";
		/// <summary>
		/// Xem chi tiết người sử dụng hành động
		/// </summary>
		public const string PHT_NSD_HANH_DONG_LKE_CT = "MYV075GGJCZC3F2";
		/// <summary>
		/// Ghi log người sử dụng
		/// </summary>
		public const string PHT_NSD_HANH_DONG_NH = "41GIN7YWQZYIH1C";
		/// <summary>
		/// Lấy tất cả người sử dụng của đơn vị
		/// </summary>
		public const string PHT_NSD_HE_SO_XLY_CACHE_NSD = "6FB9CB9F1QKFI6J";
		/// <summary>
		/// Tìm kiếm phân trang cấu hình hệ số xử lý cán bộ
		/// </summary>
		public const string PHT_NSD_HE_SO_XLY_LK = "NYG5KKA762UJJU2";
		/// <summary>
		/// Lấy cấu hình hệ số người sử dụng
		/// </summary>
		public const string PHT_NSD_HE_SO_XLY_LKE_CT = "V1CNR0FKF4IWZ03";
		/// <summary>
		/// Hệ số xử lý nsd nhập
		/// </summary>
		public const string PHT_NSD_HE_SO_XLY_NH = "QEWHW59UJJ3PRUB";
		/// <summary>
		/// Hệ số xử lý nsd xóa
		/// </summary>
		public const string PHT_NSD_HE_SO_XLY_X = "M9R6KTMC9BGXO00";
		/// <summary>
		/// Import danh sách người dùng
		/// </summary>
		public const string PHT_NSD_IMPORT_EXCEL = "MRJEKUBJ0M9OOWY";
		/// <summary>
		/// Tìm kiếm + phân trang danh sách người dùng
		/// </summary>
		public const string PHT_NSD_LKE = "9QIZH1GXEGXA94N";
		/// <summary>
		/// Lấy thông tin chi tiết người dùng
		/// </summary>
		public const string PHT_NSD_LKE_CT = "OJ26IJGJW5CWSBG";
		/// <summary>
		/// Login hệ thống (CMS)
		/// </summary>
		public const string PHT_NSD_LOGIN = "40JHCH02I9S139W";
		/// <summary>
		/// Đăng ký tài khoản (Mobile)
		/// </summary>
		public const string PHT_NSD_MOBILE_DKY = "VK6EX3IAZHX1A6B";
		/// <summary>
		/// MOBILE - Login
		/// </summary>
		public const string PHT_NSD_MOBILE_LOGIN = "PY8AHDD1UZA71X0";
		/// <summary>
		/// Xóa tài khoản
		/// </summary>
		public const string PHT_NSD_MOBILE_XOA = "VU0G8UUS0WH3TU6";
		/// <summary>
		/// Lưu thông tin người dùng
		/// </summary>
		public const string PHT_NSD_NH = "RQ88TGR5X3Z7EJW";
		/// <summary>
		/// Thông tin gửi email cấp lại MK mới
		/// </summary>
		public const string PHT_NSD_QUEN_MK = "EKG2VDTZG86ARQ7";
		/// <summary>
		/// Kiểm tra thông tin token lấy lại mật khẩu
		/// </summary>
		public const string PHT_NSD_QUEN_MK_LKE_CT = "D9R09G20BQOXPC6";
		/// <summary>
		/// Kiểm tra đăng nhập connect Stringee
		/// </summary>
		public const string PHT_NSD_STRINGEE_LOGIN = "HJRSFSD8A4EUEQK";
		/// <summary>
		/// Khóa/ Mở khóa/ Xóa tài khoản
		/// </summary>
		public const string PHT_NSD_TRANG_THAI = "OQXW4GQ5DT10NAF";
		/// <summary>
		/// OCR bang ke chi phi vien phi thanh toan
		/// </summary>
		public const string PHT_OCR_BANG_KE_CHI_TIET_NH = "56KKUQAZD9OGW0D";
		/// <summary>
		/// Lưu thông tin OCR bằng lái xe
		/// </summary>
		public const string PHT_OCR_BANG_LAI_OTO_NH = "XOP5IVT0GPA3XD3";
		/// <summary>
		/// Liệt kê thông tin ocr báo giá gara
		/// </summary>
		public const string PHT_OCR_BAO_GIA_GARA_LKE = "05R3U1R169L2DCW";
		/// <summary>
		/// Nhập thông tin báo giá gara
		/// </summary>
		public const string PHT_OCR_BAO_GIA_GARA_NH = "O8BB9SHZWNR2LST";
		/// <summary>
		/// Lưu thông tin OCR đăng kiểm xe
		/// </summary>
		public const string PHT_OCR_DANG_KIEM_OTO_NH = "CEPNNW479481PIU";
		/// <summary>
		/// Lưu thông tin OCR đăng ký xe
		/// </summary>
		public const string PHT_OCR_DANG_KY_OTO_NH = "6HB3HC2744M6P7N";
		/// <summary>
		/// Liệt kê thông tin danh sách giấy tờ OCR
		/// </summary>
		public const string PHT_OCR_GIAY_TO_CAU_HINH_LKE = "2LGZ9TSP4UN5Q9W";
		/// <summary>
		/// Kiểm tra dữ liệu OCR đã có trong bảng chưa
		/// </summary>
		public const string PHT_OCR_GIAY_TO_KIEM_TRA = "WW1F8L8J5IIB6N3";
		/// <summary>
		/// Liệt kê thông tin OCR giấy tờ
		/// </summary>
		public const string PHT_OCR_GIAY_TO_LKE = "FNBMUVJZ75BBQAR";
		/// <summary>
		/// Nhập thông tin OCR giấy tờ
		/// </summary>
		public const string PHT_OCR_GIAY_TO_NH = "GZ13CLGE10FATDE";
		/// <summary>
		/// Nhập thông tin OCR hóa đơn chi tiết
		/// </summary>
		public const string PHT_OCR_HOA_DON_CHI_TIET_NH = "C0030OMQPNO2KR6";
		/// <summary>
		/// Nhập thông tin OCR chứng từ hóa đơn
		/// </summary>
		public const string PHT_OCR_HOA_DON_NH = "6B7Y44UAPFO5E04";
		/// <summary>
		/// Nhập thông tin OCR
		/// </summary>
		public const string PHT_OCR_NH = "YNQMYETV3RGYLN2";
		/// <summary>
		/// Liệt kê danh sách giấy tờ phân loai OCR
		/// </summary>
		public const string PHT_OCR_PHAN_LOAI_GIAY_TO_LKE = "OS1ITT61U7SQ54C";
		/// <summary>
		/// Lấy tất cả danh sách phần trăm thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_CACHE = "LSQVICWBUSDGFO0";
		/// <summary>
		/// EXPORT Tỉ lệ thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_EXP = "4VGXVXQN3USHTPV";
		/// <summary>
		/// Import tỉ lệ thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_IMPORT = "FVSQ7BCMXCKMCS0";
		/// <summary>
		/// Liệt kê cấu hình phần trăm thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_LKE = "8AC0I18LE4IMNUA";
		/// <summary>
		/// Lấy thông tin phần trăm thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_LKE_CT = "7G7P9IEFM29AG7Q";
		/// <summary>
		/// Nhập tỷ lệ phần trăm thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_NH = "U5LXYHC8EGT9RM2";
		/// <summary>
		/// Danh sách tỷ lệ thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_TREE = "MWT8ZYU1B0IF124";
		/// <summary>
		/// Xóa cấu hình phần tẳm thương tật
		/// </summary>
		public const string PHT_PHAN_TRAM_THUONG_TAT_XOA = "AN7UAOUJ7JLKFI8";
		/// <summary>
		/// Tìm kiếm phân trang danh sách Quyền
		/// </summary>
		public const string PHT_QUYEN_LKE = "4DLPB1ZNXUVG7JK";
		/// <summary>
		/// Tim kiếm chức năng của hệ thống
		/// </summary>
		public const string PHT_QUYEN_TKIEM = "EM76RHOFX7NZ1ZX";
		/// <summary>
		/// Thêm cài đặt ứng dụng
		/// </summary>
		public const string PHT_THEM_CAI_DAT_UNG_DUNG = "X0C2OW7W1QRLOKK";
		/// <summary>
		/// Lấy danh sách thông báo bệnh viện cần gửi
		/// </summary>
		public const string PHT_THONG_BAO_BV_GUI = "KGO13YWC16QSNAV";
		/// <summary>
		/// Tìm kiếm + phân trang thông báo bảo lãnh bệnh viện
		/// </summary>
		public const string PHT_THONG_BAO_BV_LKE = "QGVKMJ5EJ8B7M2P";
		/// <summary>
		/// Đọc tất cả nội dung thông báo
		/// </summary>
		public const string PHT_THONG_BAO_DOC_TATCA_TB = "15DTUCWKGBAQR4S";
		/// <summary>
		/// Đọc thông báo Notify
		/// </summary>
		public const string PHT_THONG_BAO_DOC_TB = "6B90UY1PTR5GGF9";
		/// <summary>
		/// Lấy danh sách thông báo cần gửi
		/// </summary>
		public const string PHT_THONG_BAO_GUI = "A14LX2EZY99E7OU";
		/// <summary>
		/// Lấy danh sách thông báo hồ sơ mới
		/// </summary>
		public const string PHT_THONG_BAO_HS_MOI_LKE = "E53FP3D4TXJYF6F";
		/// <summary>
		/// Nhập thông tin token kết nối notify
		/// </summary>
		public const string PHT_THONG_BAO_KET_NOI_NH = "GZS8UKFJ34Z8YWH";
		/// <summary>
		/// Tim kiếm  + phân trang notify
		/// </summary>
		public const string PHT_THONG_BAO_LKE = "53BJPPF5I766H1D";
		/// <summary>
		/// Ngắt kết nối gửi notify
		/// </summary>
		public const string PHT_THONG_BAO_NGAT_KN = "58GJMSETKD4KI46";
		/// <summary>
		/// Gửi notify mẫu
		/// </summary>
		public const string PHT_THONG_BAO_NOTIFY = "A9HS2PT244LNWES";
		/// <summary>
		/// Bắn notify test
		/// </summary>
		public const string PHT_THONG_BAO_NOTIFY_TEST_NH = "ZD0P5QWLSVW222P";
		/// <summary>
		/// Cache danh mục tra cứu giá
		/// </summary>
		public const string PHT_TRA_CUU_GIA_CACHE = "TWFQLCIP0OFYOQR";
		/// <summary>
		/// Lấy tất cả danh sách tra cứu giá
		/// </summary>
		public const string PHT_TRA_CUU_GIA_DMUC = "SLSH6DGU7P8VD1Y";
		/// <summary>
		/// Liệt kê danh sách tra cứu giá
		/// </summary>
		public const string PHT_TRA_CUU_GIA_LKE = "3Q1TBX00A6H3XLL";
		/// <summary>
		/// Xem chi tiết tra cứu giá
		/// </summary>
		public const string PHT_TRA_CUU_GIA_LKE_CT = "463HH71CTMG0R5X";
		/// <summary>
		/// Xóa cài đặt ứng dụng
		/// </summary>
		public const string PHT_XOA_CAI_DAT_UNG_DUNG = "UG9F2YI24NLHMWJ";
		/// <summary>
		/// Chuyển hồ sơ giám định sang bộ phận thanh toán
		/// </summary>
		public const string PH_GD_HS_CHUYEN_THANH_TOAN = "STQZWZ5XS18PI5J";
		/// <summary>
		/// Lấy danh sách gói bảo hiểm sức khỏe
		/// </summary>
		public const string PKH_BH_NG_GOI_BH = "D7PNH25U6BUEGRZ";
		/// <summary>
		/// Lấy danh sách sản phẩm bảo hiểm sức khỏe
		/// </summary>
		public const string PKH_BH_NG_NHLV = "5UPXSP10II3EOUY";
		/// <summary>
		/// Lấy thông tin người sử dụng
		/// </summary>
		public const string PKH_NSD_CT = "0877RGLL6EFUNWN";
		/// <summary>
		/// Cập nhật thông tin người sử dụng
		/// </summary>
		public const string PKH_NSD_UPDATE = "RHHF2PKZLBL2B4R";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Lấy chi tiết hồ sơ giám định
		/// </summary>
		public const string PMOBILE_BH_BT_HS_XE_GD_LKE_CT = "ZYUTZ1KK7Z0L7VC";
		/// <summary>
		/// [MOBILE] - Lấy thông tin chi tiết hồ sơ tiếp nhận
		/// </summary>
		public const string PMOBILE_BH_BT_HS_XE_TIEP_NHAN_LKE_CT = "KS7W2FMM1YFMQ1K";
		/// <summary>
		/// Copy lần bảo lãnh mobile
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_BAO_LANH_COPY = "5NAIZ90IK4IVY84";
		/// <summary>
		/// Duyệt hồ sơ bảo lãnh
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_BAO_LANH_DUYET = "RZ2N5AOH447VN0G";
		/// <summary>
		/// Hủy hồ sơ bảo lãnh mobile
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_BAO_LANH_HUY_HS = "DCIE75NKMKM9VJL";
		/// <summary>
		/// Gỡ hủy hồ sơ bảo lãnh mobile
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_BAO_LANH_HUY_HS_XOA = "33AZ1BDJZJKLN9A";
		/// <summary>
		/// Chuyển người xử lý bảo lãnh mobile
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_CHUYEN_NGUOI_XLY = "PCTKJWHKK7QL9I7";
		/// <summary>
		/// Chuyển thanh toán mobile
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_CHUYEN_THANH_TOAN = "HZM3G4GGU4BFDJK";
		/// <summary>
		/// Hủy chuyển thanh toán mobile
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_CHUYEN_THANH_TOAN_HUY = "HP9Q49BFEX27QY4";
		/// <summary>
		/// Lịch sử tổn thất app khách hàng
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_LSTT = "EU1V3WIRB0RGACR";
		/// <summary>
		/// Phân loại hạng mục con người mobile
		/// </summary>
		public const string PMOBILE_BH_BT_NG_HS_PHAN_HANG_MUC = "A8HQ8VBRJOOCIOC";
		/// <summary>
		/// [MOBILE] - Lấy danh sach strao đổi
		/// </summary>
		public const string PMOBILE_BH_BT_TRAO_DOI_ND_LKE = "50EFOJSDXN0S3QT";
		/// <summary>
		/// Lấy lịch sử trình duyệt mobile
		/// </summary>
		public const string PMOBILE_BH_BT_TRINH_DUYET_LICH_SU_LKE = "I8N7BCKMBW9TYCB";
		/// <summary>
		/// [MOBILE] - Bảng tính toán bồi thường liệt kê
		/// </summary>
		public const string PMOBILE_BH_BT_XE_HS_BANG_TINH_TOAN_CTIET = "HAEP0QROOPJUKQD";
		/// <summary>
		/// [MOBILE] - Liệt kê chi tiết nghiệp vụ của hồ sơ
		/// </summary>
		public const string PMOBILE_BH_BT_XE_HS_NV_LKE = "F5VUFUPQSWZO5JY";
		/// <summary>
		/// [MOBILE] - Nhập thông tin tính toán bồi thường
		/// </summary>
		public const string PMOBILE_BH_BT_XE_HS_NV_NH = "DPH8H6SHZUN9SNP";
		/// <summary>
		/// [XE_MAY_MOBILE] - Liệt kê chi tiết nghiệp vụ của hồ sơ
		/// </summary>
		public const string PMOBILE_BH_BT_XE_MAY_HS_NV_LKE = "DI62WV6V62RX7ID";
		/// <summary>
		/// Tìm kiếm phân trang hồ sơ giám định
		/// </summary>
		public const string PMOBILE_BH_GD_HS_LKE = "B9UN6BETIAQRDG5";
		/// <summary>
		/// [HSGD] Lấy chi tiết hồ sơ giám định
		/// </summary>
		public const string PMOBILE_BH_GD_HS_LKE_CT = "MEHNOEW8P4P3590";
		/// <summary>
		/// Lấy danh sách quá trình xử lý mobile
		/// </summary>
		public const string PMOBILE_BH_QTXL_LKE = "56596JE62QGLV5T";
		/// <summary>
		/// Tìm kiếm thông tin giấy chứng nhận
		/// </summary>
		public const string PMOBILE_BH_XE_GCN_DGRR_TIM_XE = "NC5UHC2EIU9KHPO";
		/// <summary>
		/// [MOBILE] - Tìm kiếm GCN hợp đồng xe
		/// </summary>
		public const string PMOBILE_BH_XE_GCN_TIM_XE = "EDOM3PMHNS1XJB4";
		/// <summary>
		/// Tìm kiếm GCN con người trên app bồi thường
		/// </summary>
		public const string PMOBILE_BT_NG_GCN_TIM_KIEM = "Q5WL20TYCN21QYC";
		/// <summary>
		/// Tìm kiếm GCN xe trên app bồi thường
		/// </summary>
		public const string PMOBILE_BT_XE_GCN_TIM_KIEM = "Z7G4LE1AI8QMSGS";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Danh mục chung app
		/// </summary>
		public const string PMOBILE_DANH_MUC = "2MP3IYCV19BKRYJ";
		/// <summary>
		/// Danh mục xe cung cấp cho đối tác
		/// </summary>
		public const string PMOBILE_DANH_MUC_XE_DOI_TAC = "1OOW7PCWY1E0KU4";
		/// <summary>
		/// Danh sách hồ sơ tiếp nhận
		/// </summary>
		public const string PMOBILE_DOI_TAC_BH_BT_HS_XE_TIEP_NHAN_LKE = "2869P3QC6R58T63";
		/// <summary>
		/// Lấy thông tin chi tiết hồ sơ tiếp nhận
		/// </summary>
		public const string PMOBILE_DOI_TAC_BH_BT_HS_XE_TIEP_NHAN_LKE_CT = "CSDV9DJVM4T7K77";
		/// <summary>
		/// [MOBILE-KH] - Xóa file
		/// </summary>
		public const string PMOBILE_DOI_TAC_BH_FILE_XOA = "I4UKRHJO7EGRTIA";
		/// <summary>
		/// Thay đổi thông tin người liên hệ
		/// </summary>
		public const string PMOBILE_DOI_TAC_BT_XE_LHE_CAP_NHAT = "T4DGAKTD5Y3HSYV";
		/// <summary>
		/// Chuyển hồ sơ tiếp nhận sang giám định API
		/// </summary>
		public const string PMOBILE_DOI_TAC_BT_XE_TIEP_NHAN_CHUYEN = "IUXLFM0AG8RQDM0";
		/// <summary>
		/// Nhập thông tin khai báo tổn thất từ app khách hàng
		/// </summary>
		public const string PMOBILE_DOI_TAC_BT_XE_TIEP_NHAN_NH = "K9EPOO6X0W2ZEXE";
		/// <summary>
		/// DANH SÁCH GARA API
		/// </summary>
		public const string PMOBILE_DOI_TAC_DMUC_GARA = "3J1TKXVR0VNPO7Z";
		/// <summary>
		/// Danh sách hạng mục app khách hàng
		/// </summary>
		public const string PMOBILE_DOI_TAC_DMUC_HANG_MUC_LKE = "28QEM53TMSIG6FK";
		/// <summary>
		/// [MOBILE_KH] - Lấy danh sách hồ sơ giấy tờ
		/// </summary>
		public const string PMOBILE_DOI_TAC_DMUC_HO_SO_GIAY_TO_LKE = "4OOR98RM35X7DEE";
		/// <summary>
		/// Danh sách tỉnh thành
		/// </summary>
		public const string PMOBILE_DOI_TAC_DMUC_TINH_THANH = "4202T3ZJYQPE3LP";
		/// <summary>
		/// Danh mục xe app mobile kh
		/// </summary>
		public const string PMOBILE_DOI_TAC_DMUC_XE = "057G3N6SOJMO56N";
		/// <summary>
		/// [MOBILE_KH] - Lấy danh sách file thumnail hồ sơ giấy tờ
		/// </summary>
		public const string PMOBILE_DOI_TAC_HO_SO_GIAY_TO_YCBS = "92NPLZOLYBXVS3Q";
		/// <summary>
		/// [MOBILE_KH] - Lấy chi tiết file
		/// </summary>
		public const string PMOBILE_DOI_TAC_HO_SO_GIAY_TO_YCBS_CT = "FJKTLLNSAU6F10M";
		/// <summary>
		/// Lấy danh sách lịch sử tổn thất trên app khách hàng
		/// </summary>
		public const string PMOBILE_DOI_TAC_XE_LSTT = "P7PM4FF7KU3ZG7V";
		/// <summary>
		/// Lấy tất cả dịch vụ sức khỏe cha mobile
		/// </summary>
		public const string PMOBILE_HT_DICH_VU_SUC_KHOE_CACHE = "4IW43A1XTARBRZ1";
		/// <summary>
		/// Lấy tất cả chi tiết dịch vụ theo mã dịch vụ cấp trên mobile
		/// </summary>
		public const string PMOBILE_HT_DICH_VU_SUC_KHOE_CT_CACHE = "PZ088WLYAC4S4VV";
		/// <summary>
		/// [MOBILE APP] Lấy danh sách sản phẩm con người
		/// </summary>
		public const string PMOBILE_HT_MA_LHNV_CN_LKE = "Q8AFLQHR8742G85";
		/// <summary>
		/// [MOBOLE APP KH] - Lấy danh sách thông báo app khách hàng
		/// </summary>
		public const string PMOBILE_HT_THONG_BAO_LKE = "LH2S8FAZVRJ88YL";
		/// <summary>
		/// Tìm kiếm phân trang hồ sơ KH khai báo
		/// </summary>
		public const string PMOBILE_KH_BT_HS_LKE = "IZGIYSYZ5I75K78";
		/// <summary>
		/// [MOBILE APP] - Thông tin chi tiết hồ sơ bồi thường con người
		/// </summary>
		public const string PMOBILE_KH_BT_HS_LKE_CT = "DQVBMQMZZ2S74LH";
		/// <summary>
		/// [MOBILE APP] - Khai báo hồ sơ bồi thường con người
		/// </summary>
		public const string PMOBILE_KH_BT_NG_HS_TIEP_NHAN_NH = "DZCPXMJL0ADKEBU";
		/// <summary>
		/// [Mobile] - Chuyển hồ sơ sang giám định
		/// </summary>
		public const string PMOBILE_KH_BT_XE_TIEP_NHAN_CHUYEN = "4Y9Z9UZHIOR2YL8";
		/// <summary>
		/// Khai báo tiếp nhận bồi thường xe App Mobile
		/// </summary>
		public const string PMOBILE_KH_BT_XE_TIEP_NHAN_NH = "GYXFTR12SCMJ3VL";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Lấy danh sách giấy chứng nhận
		/// </summary>
		public const string PMOBILE_KH_HOP_DONG_LKE = "DGLLYBNACTJH6AT";
		/// <summary>
		/// [MOBILE KH] - Lấy chi tiết quyền lợi theo GCN
		/// </summary>
		public const string PMOBILE_KH_HOP_DONG_LKE_QLOI_CT = "RGU3J3F5TRGCE2U";
		/// <summary>
		/// [MOBILE APP] - Tìm kiếm giấy chứng nhận con người
		/// </summary>
		public const string PMOBILE_KH_NG_GCN_TIM_KIEM = "792B1LBSZRWMMNU";
		/// <summary>
		/// [MOBILE KH] Lấy thông tin email 
		/// </summary>
		public const string PMOBILE_KH_TTIN_EMAIL = "7A7I4JCOM7BCIN9";
		/// <summary>
		/// Tìm kiếm xe trên app khách hàng
		/// </summary>
		public const string PMOBILE_KH_XE_GCN_TIM_KIEM = "OMIK3U1GJFVSMI1";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Khai báo vụ tổn thất
		/// </summary>
		public const string PMOBILE_NSD_BH_BT_XE_GD_NH = "H9DRZPTGCX5G64F";
		/// <summary>
		/// [MOBILE KH] - Cập nhật mật khẩu đã quên
		/// </summary>
		public const string PMOBILE_NSD_CAP_NHAT_MK = "Y3A2Z1FEM8XTVXI";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Đăng ký tài khoản sau khi xác thực
		/// </summary>
		public const string PMOBILE_NSD_DANG_KY = "JV6NP40SHT931UK";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Đăng nhập
		/// </summary>
		public const string PMOBILE_NSD_DANG_NHAP = "AGADA6OAKVNBAV6";
		/// <summary>
		/// [MOBILE_KH] đối mật khẩu
		/// </summary>
		public const string PMOBILE_NSD_DOI_MAT_KHAU = "I49R1YVI4R7IQMK";
		/// <summary>
		/// Api đăng ký tài khoản từ đối tác
		/// </summary>
		public const string PMOBILE_NSD_DOI_TAC_DANG_KY = "I77Q98K84T782HH";
		/// <summary>
		/// [MOBILE_KH] Đổi thông tin
		/// </summary>
		public const string PMOBILE_NSD_DOI_THONG_TIN = "OZGKRK04YJW2FPF";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Kiểm tra số điện thoại đăng ký và gửi OTP
		/// </summary>
		public const string PMOBILE_NSD_KTRA_SDT = "UMCRY5PJL8EYUWR";
		/// <summary>
		/// Liệt kê thông tin tài khoản nsd mobile
		/// </summary>
		public const string PMOBILE_NSD_LKE = "XMWPH2XTNWSMKDD";
		/// <summary>
		/// Liệt kê chi tiết thông tin NSD
		/// </summary>
		public const string PMOBILE_NSD_LKE_CT = "CKFEBJZL6XWQL8E";
		/// <summary>
		/// Nhập thông tin NSD mobile
		/// </summary>
		public const string PMOBILE_NSD_NHAP = "Y4ZKGCV72KVP26M";
		/// <summary>
		/// [MOBILE - CUSTOMER] - Xác thực OTP đăng ký
		/// </summary>
		public const string PMOBILE_NSD_XAC_NHAN_OTP = "XTVLG4XGHC50AB1";
		/// <summary>
		/// Xóa thông tin NSD mobile
		/// </summary>
		public const string PMOBILE_NSD_XOA = "OIWY50C5FPLNZZK";
		/// <summary>
		/// [PORTAL] - Cache danh mục chung theo đối tác
		/// </summary>
		public const string PORTAL_BH_BT_MA_DANH_MUC_CACHE = "J1V7TA3YNFN4DWC";
		/// <summary>
		/// [PORTAL] - Xuất báo cáo những hồ sơ cần bổ sung hồ sơ
		/// </summary>
		public const string PORTAL_BH_BT_NG_BC_CT_BO_SUNG_HO_SO = "Q7EPEMLANQNOBRB";
		/// <summary>
		/// [PORTAL] - Báo cáo chi tiết quyền lợi (tất cả)
		/// </summary>
		public const string PORTAL_BH_BT_NG_BC_CT_QUYEN_LOI_ALL = "QOH96RG3OQEQ48R";
		/// <summary>
		/// [PORTAL] - Danh sách trạng thái hồ sơ
		/// </summary>
		public const string PORTAL_BH_BT_NG_DANH_SACH_TRANG_THAI_HS = "FFVPFFY62H1SE56";
		/// <summary>
		/// [PORTAL] - Báo cáo tổng hợp
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BAO_CAO_TONG_HOP = "QWNWR83I3TKQ34Q";
		/// <summary>
		/// [PORTAL] - Bảng kê thanh toán bồi thường bảo lãnh viện phí
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_BK_TTOAN_BLVP = "1B8H6116L2PB56H";
		/// <summary>
		/// [PORTAL] - Bảng kê thanh toán bồi thường trực tiếp
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_BK_TTOAN_TRUC_TIEP = "E66UJ1QYOJWC3WO";
		/// <summary>
		/// [PORTAL] - Bảng kê chi tiết hồ sơ bồi thường
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_CT = "04DUT4NT4TILBIG";
		/// <summary>
		/// [PORTAL] - Báo cáo chi tiết hồ sơ bồi thường các lần khám
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_CT_LAN_KHAM = "WK2EVS9C7RHBNYI";
		/// <summary>
		/// [PORTAL] - Bảng kê chi tiết hồ sơ chi tiết theo Quyền lợi bảo hiểm
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_CT_QUYEN_LOI = "IZ0UGR1EPD8873J";
		/// <summary>
		/// [PORTAL] - Báo cáo dự phòng bồi thường
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_DU_PHONG = "SXN7O6KKYRBMGJA";
		/// <summary>
		/// [PORTAL] - Thống kê hồ sơ nhóm theo hình thức điều trị
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_TKE_HINH_THUC = "AI7MV5OYFQ5UORG";
		/// <summary>
		/// [PORTAL] - Thống kê hồ sơ nhóm theo nhóm nguyên nhân
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_TKE_NGUYEN_NHAN = "FJKCIKPONXX5AHE";
		/// <summary>
		/// [PORTAL] - Thống kê hồ sơ nhóm theo Quyền lợi được bảo hiểm
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_TKE_QUYEN_LOI = "LUC5D74WFIY3MVI";
		/// <summary>
		/// [PORTAL] - Thống kê hồ sơ nhóm theo nhóm sản phẩm
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_TKE_SAN_PHAM = "K0GV6RIRV4B07U4";
		/// <summary>
		/// [PORTAL] - Thống kê hồ sơ nhóm theo trạng thái xử lý
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_BC_TKE_TRANG_THAI = "OKGZUGOCK67FCXD";
		/// <summary>
		/// [PORTAL] - Báo cáo danh sách hồ chuyển thanh toán [Tính toán bồi thường con người]
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_DS_CHUYEN_THANH_TOAN = "GWPU7K0P46XWV28";
		/// <summary>
		/// [PORTAL] - Xuất báo cáo danh sách hồ sơ chuyển kế toán
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_EXPORT_BC = "LZD47ST297AIEXZ";
		/// <summary>
		/// [PORTAL] - Xuất báo cáo danh sách hồ sơ con người hủy
		/// </summary>
		public const string PORTAL_BH_BT_NG_HS_TINH_TOAN_BAO_CAO_HS_HUY = "AHSPNPD6G4Q18T5";
		/// <summary>
		/// [PORTAL] lấy danh mục chung
		/// </summary>
		public const string PORTAL_BH_BT_NG_MA_DANH_MUC_CACHE = "KCF86ZY1S0CEJ25";
		/// <summary>
		/// Portal tìm kiếm phân trang HSBT con người
		/// </summary>
		public const string PORTAL_BH_BT_NG_TINH_TOAN_LKE = "7BRZ0ACUNW7J4VH";
		/// <summary>
		/// [PORTAL] - Lấy danh sách các control ẩn hiện
		/// </summary>
		public const string PORTAL_BH_BT_TRANG_THAI_TEN_AN_HIEN = "ABVW5MXDFM09D38";
		/// <summary>
		/// [PORTAL] - Liệt kê danh sách hồ sơ giám định
		/// </summary>
		public const string PORTAL_BH_BT_XE_GD_LKE = "3YSIKKHZRANFW1P";
		/// <summary>
		/// [PORTAL] - Bảng kê thanh toán bồi thường xe ôtô
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_BK_TTOAN = "W88P9BCVUJHVU7B";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] Bảng kê chi tiết hồ sơ bồi thường xe ô tô
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_CT = "E6DYMO6XK0PVIV3";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] cáo dự phòng bồi thường
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_DU_PHONG = "D7SP338GFHFFTG5";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] Báo cáo tiến trình giải quyết bồi thường
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TIEN_TRINH = "ZZGWALCTC3SHD9H";
		/// <summary>
		/// [PORTAL] - Thống kê bồi thường theo Gara sửa chữa
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TKE_GARA = "G6QBHSTV3FZPCF6";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] Thống kê bồi thường theo hạng mục tổn thất
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TKE_HANG_MUC = "VZFJ467K4CES5Q9";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] Thống kê bồi thường theo hãng xe, hiệu xe
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TKE_HANG_XE = "5SAAQD1W6WLA8CT";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] Thống kê bồi thường theo khu vực
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TKE_KHU_VUC = "7TKEKTDLGD533T8";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] Thống kê hồ sơ nhóm theo nhóm nguyên nhân xảy ra
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TKE_NGUYEN_NHAN = "RI0H397MB6QREWY";
		/// <summary>
		/// [PORTAL - BTXE - BỒI THƯỜNG] Thống kê bồi thường theo sản phẩm
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TKE_SAN_PHAM = "BX4D38FCEP84JNX";
		/// <summary>
		/// PORTAL - Thống kê bồi thường theo trạng thái xử lý
		/// </summary>
		public const string PORTAL_BH_BT_XE_HS_BC_TKE_TRANG_THAI = "FZ35UH2DCLDJCTH";
		/// <summary>
		/// [PORTAL] - Lấy chi tiết ảnh
		/// </summary>
		public const string PORTAL_BH_FILE_TAI_FILE = "IRR1QZ193GOMQAJ";
		/// <summary>
		/// [PORTAL] - Lấy danh sách file thumnail
		/// </summary>
		public const string PORTAL_BH_FILE_THUMNAIL = "JSKK6ZVEHX54ABY";
		/// <summary>
		/// [PM PORTAL]Lấy chi tiết gc
		/// </summary>
		public const string PORTAL_BH_HD_NGUOI_DS_LKE_CT = "IQSDLS201W1LLKU";
		/// <summary>
		/// [PORTAL] - Lấy chi tiết đồng tái
		/// </summary>
		public const string PORTAL_BH_HD_NG_GCN_DONG_TAI_CT = "NC0F01MWMJB07W4";
		/// <summary>
		/// [PORTAL] - Lấy danh sách đồng tái của hồ sơ
		/// </summary>
		public const string PORTAL_BH_HD_NG_GCN_DS_DONG_TAI_LKE = "0DZGP3TSRLYWAZG";
		/// <summary>
		/// [PORTAL] - Lấy danh sách hợp đồng
		/// </summary>
		public const string PORTAL_BH_HD_NG_GCN_DS_HDBS = "8GRFGMI43E2Y0UO";
		/// <summary>
		/// [PORTAL] - Lấy chi tiết hợp đồng con người
		/// </summary>
		public const string PORTAL_BH_HD_NG_GCN_DS_LKE = "CS8I8ZFRJKSAKL8";
		/// <summary>
		/// [PORTAL] - Lấy chi tiết quyền lợi gói bảo hiểm GCN
		/// </summary>
		public const string PORTAL_BH_HD_NG_GCN_DS_QL_LKE = "AVJZV9CNJ1HWCZ3";
		/// <summary>
		/// [PORTAL] - Liệt kê + phân trang hợp đồng con người
		/// </summary>
		public const string PORTAL_BH_HD_NG_GCN_LKE = "CGD9T4B09FYI1PQ";
		/// <summary>
		/// [PORTAL] - Lấy chi tiết hợp đồng
		/// </summary>
		public const string PORTAL_BH_HD_XE_GCN_DS_LKE = "EKU1WVFH8WAYLNX";
		/// <summary>
		/// [PORTAL] - Liệt kê thông tin hợp đồng xe 
		/// </summary>
		public const string PORTAL_BH_HD_XE_GCN_LKE = "5ZIX08WM0BTN0YJ";
		/// <summary>
		/// [PORTAL] - lay DSCSYT
		/// </summary>
		public const string PORTAL_BH_HT_MA_BENH_VIEN_CACHE = "UT42OE8LBOHP2MK";
		/// <summary>
		/// [PM PORTAL]Danh mục mã ngân hàng
		/// </summary>
		public const string PORTAL_BH_HT_MA_NGAN_HANG_DMUC = "14GURGZG7PZR1LU";
		/// <summary>
		/// [PORTAL] - Lấy danh sách tất cả nhà bảo hiểm
		/// </summary>
		public const string PORTAL_BH_HT_MA_NHA_BH_TATCA = "M4GTSWOB3NVUFAV";
		/// <summary>
		/// [PM PORTTAL] Lấy danh sách tỉnh thành quận huyện
		/// </summary>
		public const string PORTAL_BH_HT_MA_TINH_DMUC = "K795MM9NGVZQMCL";
		/// <summary>
		/// [PORTAL]- Cài đặt ứng dụng
		/// </summary>
		public const string PORTAL_CAI_DAT_UNG_DUNG_LKE = "2OQ2MWN9W440MSS";
		/// <summary>
		/// [PORTAL] - Lấy danh sách đối tác CACHE
		/// </summary>
		public const string PORTAL_HT_MA_DOI_TAC_CACHE = "TUJOTW0A9AXRE0L";
		/// <summary>
		/// [PORTAL] - Lấy danh sách chi nhánh CACHE
		/// </summary>
		public const string PORTAL_HT_MA_DOI_TAC_CHI_NHANH_CACHE = "JP5KI140DV825OW";
		/// <summary>
		/// [PORTAL] - Lấy tất cả danh sách sản phẩm con người
		/// </summary>
		public const string PORTAL_HT_MA_LHNV_CN_DMUC = "ZB7BOMJF47IWZ9R";
		/// <summary>
		/// [PM PORTAL]Lưu hồ sơ tiếp nhận trực tiếp
		/// </summary>
		public const string PORTAL_KH_BT_NG_HS_TIEP_NHAN_NH = "8H5F13SRFVV95C8";
		/// <summary>
		/// [PORTAL] - Lấy ds biểu mẫu
		/// </summary>
		public const string PORTAL_MAU_IN_DS_BIEU_MAU = "B48BNZSQY3YR8P4";
		/// <summary>
		/// [PORTAL] - Toàn bộ thông tin hồ sơ con người
		/// </summary>
		public const string PORTAL_NG_TOAN_BO_THONG_TIN_HO_SO = "B3B3RYFOFB0RB0H";
		/// <summary>
		/// [PORTAL] - Đổi mật khẩu
		/// </summary>
		public const string PORTAL_NSD_DOI_MAT_KHAU = "QZVS79QO4QK3YWS";
		/// <summary>
		/// [PORTAL] - NSD login
		/// </summary>
		public const string PORTAL_NSD_LOGIN = "6DDAJB0JTZG957Z";
		/// <summary>
		/// [PORTAL] - Toàn bộ thông tin hồ sơ bồi thường xe
		/// </summary>
		public const string PORTAL_XE_TOAN_BO_THONG_TIN_HO_SO = "U2L6YXCE11R95XH";
		/// <summary>
		/// [SURVEY] Lấy thông tin cài đặt ứng dụng survey
		/// </summary>
		public const string PSURVEY_CAI_DAT_UNG_DUNG_LKE = "2OPIYWNSHUA3A76";
		/// <summary>
		/// [SURVEY] Liệt kê danh sách câu hỏi
		/// </summary>
		public const string PSURVEY_CAU_HOI_LKE = "OAVY8E5K2JXY8L8";
		/// <summary>
		/// [SURVEY] Liệt kê chi tiết thông tin câu hỏi
		/// </summary>
		public const string PSURVEY_CAU_HOI_LKE_CT = "IGAV9KL1VHZLPYG";
		/// <summary>
		/// [SURVEY] Login hệ thống survey
		/// </summary>
		public const string PSURVEY_NSD_LOGIN = "LF867IG4TH8EPBK";
		/// <summary>
		/// Đẩy dữ liệu bồi thường con người
		/// </summary>
		public const string PTICH_HOP_DL_BOI_THUONG_CON_NGUOI_MIC = "LSPF4U4JTIY0VFS";
		/// <summary>
		/// Chuyển dữ liệu bồi thường
		/// </summary>
		public const string PTICH_HOP_DL_BOI_THUONG_XE = "QAZIAZEJ5TR5NSV";
		/// <summary>
		/// Đẩy dữ liệu bồi thường OPES
		/// </summary>
		public const string PTICH_HOP_DL_BOI_THUONG_XE_OPES = "26KXQ5V2V9UYVQK";
		/// <summary>
		/// Tích hợp GCN cũ MIC
		/// </summary>
		public const string PTICH_HOP_HOP_DONG_CON_NGUOI_CU_MIC = "IL7B8QVIVGBKG6V";
		/// <summary>
		/// Tích hợp gcn DIGINS
		/// </summary>
		public const string PTICH_HOP_HOP_DONG_CON_NGUOI_DIGINS = "I9LM2CB9OXP49UR";
		/// <summary>
		/// Tích hợp GCN MIC
		/// </summary>
		public const string PTICH_HOP_HOP_DONG_CON_NGUOI_MIC = "MTGPX08XJK6BOXU";
		/// <summary>
		/// Import hợp đồng từ core đối tác
		/// </summary>
		public const string PTICH_HOP_HOP_DONG_XE = "E3BZ6IWXNN5BGY8";
		/// <summary>
		/// Tích hợp GCN OPES
		/// </summary>
		public const string PTICH_HOP_HOP_DONG_XE_OPES = "HFPWPEPFHGJI1T6";
		/// <summary>
		/// Lưu thông tin hợp đồng xe PJICO
		/// </summary>
		public const string PTICH_HOP_HOP_DONG_XE_PJICO = "6AG5LA86SGNZO0A";
		/// <summary>
		/// Cập nhật số hồ sơ tích hợp
		/// </summary>
		public const string PTICH_HOP_SO_HS = "S1OLQ3AQ6P2YG9C";
		/// <summary>
		/// Cập nhật số hồ sơ và số tiếp nhận
		/// </summary>
		public const string PTICH_HOP_SO_HS_SO_TN = "WI8RDXS5GIMIEH9";
		/// <summary>
		/// [ATACC MOBILE] - Lấy danh sách banner hiển thị
		/// </summary>
		public const string P_ESCS_ATACC_BANNER_QC = "VMRR8DB8HZE3NJ7";
		/// <summary>
		/// [ATACC MOBILE] - Gửi email thông báo bổ sung hồ sơ giấy tờ
		/// </summary>
		public const string P_ESCS_ATACC_BSHS_GUI_EMAIL = "A7IAWU7BXTM1WNX";
		/// <summary>
		/// [ATACC MOBILE] - Kiểm tra tồn tại người được bảo hiểm
		/// </summary>
		public const string P_ESCS_ATACC_CHECK_NDBH_BTCN = "88FRIVO3LONRWC4";
		/// <summary>
		/// [ATACC MOBILE] - Đăng ký
		/// </summary>
		public const string P_ESCS_ATACC_DANG_KY = "GDF3MGRCNO0HTHN";
		/// <summary>
		/// [ATACC MOBILE] - Đăng nhập
		/// </summary>
		public const string P_ESCS_ATACC_DANG_NHAP = "M5TH21ZN0HIGIE1";
		/// <summary>
		/// [ATACC MOBILE] - Khai báo hồ sơ bồi thường con người
		/// </summary>
		public const string P_ESCS_ATACC_KB_HS_BTCN = "MRYBB2N3B1M45RI";
		/// <summary>
		/// API đẩy thông tin bồi thường sang cho ABIC - Lấy theo ngày cập nhật thông tin hồ sơ
		/// </summary>
		public const string P_ESCS_ATACC_PUSH_DATA_ABIC_CREATE = "DWAWV3N7G5OCEBJ";
		/// <summary>
		/// API đẩy thông tin bồi thường sang cho MIC
		/// </summary>
		public const string P_ESCS_ATACC_PUSH_DATA_MIC = "ORG8T8Z3HHNRNW2";
		/// <summary>
		/// [ATACC MOBILE] - Quên mật khẩu
		/// </summary>
		public const string P_ESCS_ATACC_QUEN_MAT_KHAU = "SAAUK6KW0XS8NLO";
		/// <summary>
		/// [ATACC MOBILE] - Sửa thông tin tài khoản
		/// </summary>
		public const string P_ESCS_ATACC_SUA_TT_TAI_KHOAN = "RWG7APXLN7QVXQZ";
		/// <summary>
		/// [ATACC MOBILE] - Thay đổi mật khẩu
		/// </summary>
		public const string P_ESCS_ATACC_THAY_DOI_MAT_KHAU = "PCW3X2O3V4Q39XK";
		/// <summary>
		/// [ATACC MOBILE] - Lấy lịch sử bồi thường con người
		/// </summary>
		public const string P_ESCS_ATACC_TRUY_VAN_BT = "X5IROQB3QXRA7GC";
		/// <summary>
		/// [ATACC MOBILE] - Xem chi tiết hồ sơ bồi thường con người
		/// </summary>
		public const string P_ESCS_ATACC_TRUY_VAN_BT_CT = "B0EFC5YECJYXGMJ";
		/// <summary>
		/// [ATACC MOBILE] - Tự động đăng nhập
		/// </summary>
		public const string P_ESCS_ATACC_TU_DONG_DANG_NHAP = "JK0FZFPTOYKKPHQ";
		/// <summary>
		/// [ATACC MOBILE] - Upload tài liệu
		/// </summary>
		public const string P_ESCS_ATACC_UPLOAD = "H7SMX81HK59MMYF";
		/// <summary>
		/// [ATACC MOBILE] - Lấy version app
		/// </summary>
		public const string P_ESCS_ATACC_VERSION = "SXN5ZQN8GF159SG";
		/// <summary>
		/// [ATACC MOBILE] - Danh sách người thân, người liên quan
		/// </summary>
		public const string P_ESCS_ATACC_VIEW_HD_KH = "93YCV9VB9DTHWF0";
		/// <summary>
		/// [ATACC MOBILE] - Xem danh sách quyền lợi của đối tượng
		/// </summary>
		public const string P_ESCS_ATACC_VIEW_HD_KH_CT = "XO5JPJC5V50O6BO";
		/// <summary>
		/// Lưu lần bảo lãnh mobile
		/// </summary>
		public const string P_MOBILE_BH_BT_NG_HS_BAO_LANH_LAN_NH = "5P0SMALY6O99H02";
		/// <summary>
		/// Lưu hồ sơ bảo lãnh mobile
		/// </summary>
		public const string P_MOBILE_BH_BT_NG_HS_BAO_LANH_NH = "DXDQS5BYGA1WPF8";
		/// <summary>
		/// Tìm người được bảo hiểm mobile
		/// </summary>
		public const string P_MOBILE_BH_BT_NG_HS_TIM_NDBH = "5TD8G8WD29M3KW9";
		/// <summary>
		/// Lấy chi tiết gcn mobile
		/// </summary>
		public const string P_MOBILE_BH_HD_NGUOI_DS_LKE_CT = "NXS8V43JAP4XX7Q";
		/// <summary>
		/// Tìm kiếm phân trang danh sách bệnh viện
		/// </summary>
		public const string P_MOBILE_MA_BENH_VIEN_BV_LKE = "KWMLPHVQ84IK2PM";
		/// <summary>
		/// Tìm kiếm phân trang nhà thuốc mobile
		/// </summary>
		public const string P_MOBILE_MA_BENH_VIEN_NT_LKE = "69FCL4SPCEA6MJV";
	}
}