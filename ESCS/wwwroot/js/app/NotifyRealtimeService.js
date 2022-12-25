"use strict";
Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
var connection = new signalR.HubConnectionBuilder().withUrl("/notify-service").build();
connection.on("sendToUser", function (thong_bao) {
    console.log(thong_bao);


    var _notifyService = new NotifyService();
    var _homePage = new HomePage();
    if (thong_bao !== undefined && thong_bao !== null) {
        if (thong_bao.ctiet_action_code !== "GD:THONG_BAO_HS_MOI") {
            _notifyService.showNotify(thong_bao.nd_tom_tat, thong_bao);
        }
        _homePage.getNotify();
        _homePage.getContractNotify();
        //Reload lại hồ sơ tại đây
        if (thong_bao.ctiet_action_code.startsWith("GD:")) {
            if (ho_so_chi_tiet == undefined || ho_so_chi_tiet == null || ho_so_chi_tiet.data_info == undefined || ho_so_chi_tiet.data_info == null ||
                ho_so_chi_tiet.data_info.ho_so == undefined || ho_so_chi_tiet.data_info.ho_so == null ||
                ho_so_chi_tiet.data_info.ho_so.ma_doi_tac == undefined || ho_so_chi_tiet.data_info.ho_so.ma_doi_tac == null || ho_so_chi_tiet.data_info.ho_so.ma_doi_tac == '' ||
                ho_so_chi_tiet.data_info.ho_so.so_id == undefined || ho_so_chi_tiet.data_info.ho_so.so_id == null || ho_so_chi_tiet.data_info.ho_so.so_id == '' ||
                ho_so_chi_tiet.data_info.ho_so.so_id.toString() != thong_bao.ctiet_so_id) {
                return;
            }
        }
        if (thong_bao.ctiet_action_code.startsWith("BT:")) {
            if (ho_so_chi_tiet == undefined || ho_so_chi_tiet == null || ho_so_chi_tiet.data_info == undefined || ho_so_chi_tiet.data_info == null ||
                ho_so_chi_tiet.data_info.ho_so == undefined || ho_so_chi_tiet.data_info.ho_so == null ||
                ho_so_chi_tiet.data_info.ho_so.ma_doi_tac == undefined || ho_so_chi_tiet.data_info.ho_so.ma_doi_tac == null || ho_so_chi_tiet.data_info.ho_so.ma_doi_tac == '' ||
                ho_so_chi_tiet.data_info.ho_so.so_id == undefined || ho_so_chi_tiet.data_info.ho_so.so_id == null || ho_so_chi_tiet.data_info.ho_so.so_id == '' ||
                ho_so_chi_tiet.data_info.ho_so.so_id.toString() != thong_bao.ctiet_so_id) {
                return;
            }
        }
        if (thong_bao.ctiet_ma_doi_tac !== undefined && thong_bao.ctiet_ma_doi_tac !== null && thong_bao.ctiet_ma_doi_tac !== "" &&
            thong_bao.ctiet_so_id !== undefined && thong_bao.ctiet_so_id !== null && thong_bao.ctiet_so_id !== "") {
            if (thong_bao.ctiet_action_code !== undefined && thong_bao.ctiet_action_code !== null && thong_bao.ctiet_action_code.startsWith("GD:")) {
                if (CONSTANT_PM=="GD") {
                    var _carInvestigationService = new CarInvestigationService();
                    var objGetDetail = { ma_doi_tac: thong_bao.ctiet_ma_doi_tac, so_id: thong_bao.ctiet_so_id };
                    _carInvestigationService.layThongTinChiTietHoSo(objGetDetail).then(res => {
                        ho_so_chi_tiet = res;
                        bindDataDienBienTonThat(res, false);
                        hienThiChatVoiGiamDinhVien();
                        if (thong_bao.ctiet_action_code === "GD:RELOAD_HS_STEP2" && carClaimTabShow === "stepThongTinGiamDinh") {
                            showStep("stepThongTinGiamDinh");
                            ganTrangThaiHoSo();
                        }
                        if (thong_bao.ctiet_action_code === "GD:RELOAD_STEP3" && carClaimTabShow === "stepHinhAnhHoSo") {
                            showStep("stepHinhAnhHoSo");
                            ganTrangThaiHoSo();
                            loadDanhSachHoSoGiayTo();
                        }
                        if (thong_bao.ctiet_action_code === "GD:RELOAD_HS_STEP4" && carClaimTabShow === "stepDanhGiaTonThat") {
                            showStep("stepDanhGiaTonThat");
                            ganTrangThaiHoSo();
                        }
                    });
                }
            }
            if (thong_bao.ctiet_action_code !== undefined && thong_bao.ctiet_action_code !== null && thong_bao.ctiet_action_code.startsWith("BT:")) {
                if (CONSTANT_PM == "BT") {
                    console.log("Thông báo", thong_bao);
                    var _carCompensationService = new CarCompensationService();
                    var objGetDetail = { ma_doi_tac: thong_bao.ctiet_ma_doi_tac, so_id: thong_bao.ctiet_so_id };
                    if (thong_bao.ctiet_action_code.startsWith("BT:TRINH_DUYET")) {
                        _carCompensationService.layThongTinChiTietHoSo(objGetDetail).then(res => {
                            ho_so_chi_tiet = res;
                            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                        });
                    }
                }
            }
        }
    }
});
connection.on("receiveMessage", function (message) {
    console.log("receiveMessage", message)
    var obj = {
        ma_doi_tac: message.ma_doi_tac,
        so_id: message.so_id,
        dvi_gdinh: message.ma_dtac_gui,
        ma_gdv: message.nsd_gui,
        ten_gdv: message.nsd_gui_ten,
        trang: 1,
        so_dong: 100
    };
    var dot_symbol = "_ESCSDOTSYMBOL_"
    var at_symbol = "_ESCSATSYMBOL_"
    var objGdvMa = obj.ma_gdv.replace(/\./g, dot_symbol);
    objGdvMa = objGdvMa.replace(/\@/g, at_symbol);
    var parentId = "#ESChat_" + obj.dvi_gdinh + "_" + objGdvMa;
    var contentName = "ESChatContent_" + obj.dvi_gdinh + "_" + objGdvMa;
    var _eschat = new ESChat();
    if ($(parentId).length <= 0) {
        _eschat.showHide({
            page: 1,
            contents: [],
            is_show: true,
            dispay_name: obj.ten_gdv,
            is_call_video: true,
            is_attach_file: true,
            is_scroll_load_event: true,
            data: obj,
            ajax_load: {
                url: "/home/getcontentchat",
                type: "POST"
            }
        });
    }
    else {
        try {
            message.thoi_gian = ESUtil.getTimeChat(message.tg_gui);
            console.log();
            ESUtil.appendHTML("templateTinNhanDen", contentName, message);
            var objDiv = document.getElementById(contentName);
            objDiv.scrollTop = objDiv.scrollHeight;
        } catch { };
    }
    
});
connection.start().then(function () {
    connection.invoke("GetConnectionId", {}).then(function (connectionId) { console.log("Chat Connection", connectionId); });
}).catch(function (err) { return console.error(err.toString()); });

