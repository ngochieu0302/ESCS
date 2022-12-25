var _CContact = {
    _service: new Service(),
    timkiemKH: function (objTimKiem) {
        return _CContact._service.postData("/contract/car/kh_timkiem", objTimKiem);
    },

    get_detail_kh: function (data) {
        return _CContact._service.postData("/contract/car/kh_detail", data);
    },

    kh_nhap: function (obj) {
        return _CContact._service.postData("/contract/car/kh_nh", obj);
    },

    searchKH: function (data) {
        var configColumnTimKiem = [
            ["loai_kh_hthi", "Loại", "60", "string"],
            ["ten_doi_tac_cn", "Chi nhánh", "150", "string"],
            ["ma", "Mã KH", "90", "string"],
            ["ten", "Tên", "200", "string"],
            ["dchi", "Địa chỉ", "250", "string"],
            ["mst", "Mã số thuế", "100", "string"],
            ["cmt", "CMT/ căn cước", "100", "string"],
            ["d_thoai", "Điện thoại", "100", "string"]
        ];

        _gridWidget.create(data, "table-data-kh", configColumnTimKiem, '100%', '170');

        $('#table-data-kh').unbind('rowselect');
        $('#table-data-kh').on('rowselect', function (event) {
            var args = event.args;
            var boundIndex = args.rowindex;
            var visibleIndex = args.visibleindex;
            var rightclick = args.rightclick;
            var ev = args.originalEvent;
            var data = $('#table-data-kh').jqxGrid('getrowdata', boundIndex);
            data.ma_kh = data.ma;

            _CContact.get_detail_kh(data).then(res => {
                try {
                    _frmKH.setData(res.data_info.kh[0]);
                } catch (ex) {
                    _Health._frmKH.setData(res.data_info.kh[0]);
                }
            });
        });
    },

    timkiem: function () {
        var dataObject = null;
        try {
            dataObject = _frmKH.getJsonData();
        } catch (ex) {
            dataObject = _Health._frmKH.getJsonData();
        }
        _CContact.timkiemKH(dataObject).then(res => {
            _CContact.searchKH(res.data_info);
        });
    }
}

$(document).ready(function () {
    _CContact.searchKH(null);

    $('#btnMoiKH').bind('click', function () {
        try {
            _frmKH.resetForm();
            _frmKH.clearErrorMessage();
        } catch (ex) {
            _Health._frmKH.resetForm();
            _Health._frmKH.clearErrorMessage();
        }
    });
});