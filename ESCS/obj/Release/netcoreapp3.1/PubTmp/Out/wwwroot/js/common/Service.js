const pageLogin = "/home/logout";
const INVALID_AUTH = "INVALID_AUTH";
var IS_MULTIPLE_PROMISE = false;
function showLoading(isShow, aceptShow, divLoading = 'body') {
    if (isShow && aceptShow) {
        ESLoading.show(divLoading);
    }
    else {
        ESLoading.hide(divLoading);
    }
}
function Service(isLoading = true, divLoading = "body") {
    IS_MULTIPLE_PROMISE = false;
    this.isMultiplePromise = false;
    this.divLoading = divLoading;
    this.isLoading = isLoading;
    this.isArrayData = false;
    this.isPostObject = false;
    this.showErrorMsg = true;
    this.request = {
        cache: false,
        datatype: 'json',
        headers: {
            //'RequestVerificationToken': $("input[name='__RequestVerificationToken']").val()
        },
        beforeSend: function () {
            showLoading(true, isLoading, divLoading);
        },
        complete: function () {
            showLoading(false, isLoading, divLoading);
        }
    };
    this.addHeader = function (key, value) {
        this.request.headers[key] = value;
    };
    this.getData = function (url) {
        var rq = this.request;
        return new Promise((resolve, reject) => {
            var _notifyService = new NotifyService();
            rq.type = 'get';
            rq.url = url;
            rq.data = {};
            rq.success = function (response) {
                if (response !== undefined && response !== null && response.state_info !== undefined && response.state_info !== null && response.state_info.status === "NotOK") {
                    if (response.state_info.message_code !== INVALID_AUTH) {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                    setTimeout(function () { window.location.href = pageLogin; }, 3000);
                }
                resolve(response);
            };
            rq.error = function (err) {
                if (err.status === 427) {
                    _notifyService.error(err.responseJSON.message);
                }
                else if (err.status === 428) {
                    window.location.href = pageLogin;
                }
                else if (err.status === 404) {
                    _notifyService.error(err.responseJSON.message);
                }
                else {
                    _notifyService.error(err.responseJSON.message);
                }
                reject(err);
            };
            $.ajax(rq);
        });
    };
    this.postData = function (url, data) {
        if (data !== undefined && data !== null && typeof data === 'object' && data.hasOwnProperty("nsd")) {
            delete data.nsd;
        }
        var rq = this.request;
        rq.headers["RequestVerificationToken"] = $("input[name='__RequestVerificationToken']").val();
        var isArr = this.isArrayData;
        var isPostObject = this.isPostObject;
        var showErrorMsg = this.showErrorMsg;
        return new Promise((resolve, reject) => {
            var _notifyService = new NotifyService();
            rq.type = 'post';
            rq.url = url;
            if (isArr) {
                rq.contentType = 'application/json; charset=utf-8';
                rq.data = JSON.stringify(data);
            }
            else if (isPostObject)
            {
                rq.data = data;
            }
            else {
                rq.data = JSON.stringify(data);
            }
            rq.success = function (response) {
                if (response !== undefined && response !== null && response.state_info !== undefined && response.state_info !== null && response.state_info.status === "NotOK") {
                    if (response.state_info.message_code !== INVALID_AUTH && showErrorMsg) {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    if (!IS_MULTIPLE_PROMISE && showErrorMsg) {
                        _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                        setTimeout(function () { window.location.href = pageLogin; }, 3000);
                    }
                }
                resolve(response);
            };
            rq.error = function (err) {
                if (showErrorMsg) {
                    if (err.status === 428) {
                        _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                        setTimeout(function () { window.location.href = pageLogin; }, 3000);
                    }
                    else {
                        try { _notifyService.error(err.responseJSON.message); } catch { _notifyService.error("Lỗi chưa xác định");}
                    }
                }
                reject(err);
            };
            $.ajax(rq);
        });
    };
    this.postDataTimeOut = function (url, data, timeOut = 0, messageTimeOut = "Thông tin truy vấn vượt quá giới hạn thời gian cho phép") {
        if (data !== undefined && data !== null && typeof data === 'object' && data.hasOwnProperty("nsd")) {
            delete data.nsd;
        }
        var rq = this.request;
        var isArr = this.isArrayData;
        var isPostObject = this.isPostObject;
        var showErrorMsg = this.showErrorMsg;
        return new Promise((resolve, reject) => {
            var _notifyService = new NotifyService();
            rq.type = 'post';
            rq.url = url;
            if (isArr) {
                rq.contentType = 'application/json; charset=utf-8';
                rq.data = JSON.stringify(data);
            }
            else if (isPostObject) {
                rq.data = data;
            }
            else {
                rq.data = JSON.stringify(data);
            }
            rq.success = function (response) {
                if (response !== undefined && response !== null && response.state_info !== undefined && response.state_info !== null && response.state_info.status === "NotOK") {
                    if (response.state_info.message_code !== INVALID_AUTH && showErrorMsg) {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    if (!IS_MULTIPLE_PROMISE && showErrorMsg) {
                        _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                        setTimeout(function () { window.location.href = pageLogin; }, 3000);
                    }
                }
                resolve(response);
            };
            rq.error = function (err) {
                if (showErrorMsg) {
                    if (err.statusText == 'timeout') {
                        _notifyService.error(messageTimeOut);
                        return;
                    }
                    else if (err.status === 428) {
                        _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                        setTimeout(function () { window.location.href = pageLogin; }, 3000);
                    }
                    else {
                        _notifyService.error(err.responseJSON.message);
                    }
                }
                reject(err);
            };
            rq.timeout = timeOut;
            $.ajax(rq);
        });
    };
    this.postDataObject = function (url, data) {
        if (data !== undefined && data !== null && typeof data === 'object' && data.hasOwnProperty("nsd")) {
            delete data.nsd;
        }
        var rq = this.request;
        var isArr = this.isArrayData;
        var isPostObject = this.isPostObject;
        return new Promise((resolve, reject) => {
            var _notifyService = new NotifyService();
            rq.type = 'post';
            rq.url = url;
            if (isArr) {
                rq.contentType = 'application/json; charset=utf-8';
                rq.data = JSON.stringify(data);
            }
            else {
                rq.data = data;
            }
            rq.success = function (response) {
                resolve(response);
            };
            rq.error = function (err) {
                if (err.status === 428) {
                    window.location.href = pageLogin;
                }
                else {
                    _notifyService.error(err.responseJSON.message);
                }
                reject(err);
            };
            $.ajax(rq);
        });
    };
    this.postFormData = function (url, formData) {
        var rq = this.request;
        return new Promise((resolve, reject) => {
            var _notifyService = new NotifyService();
            rq.type = 'post';
            rq.url = url;
            rq.processData = false;
            rq.data = formData;
            rq.contentType = false,
                rq.success = function (response) {
                    if (response !== undefined && response !== null && response.state_info !== undefined && response.state_info !== null && response.state_info.status === "NotOK") {
                        if (response.state_info.message_code !== INVALID_AUTH) {
                            _notifyService.error(response.state_info.message_body);
                            return;
                        }
                        _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                        setTimeout(function () { window.location.href = pageLogin; }, 3000);
                    }
                    resolve(response);
                };
            rq.error = function (err) {
                if (err.status === 428) {
                    window.location.href = pageLogin;
                }
                else {
                    _notifyService.error(err?.responseJSON?.message??"unknown!");
                }
                reject(err);
            };
            $.ajax(rq);
        });
    };
    this.getFile = function (url, data) {
        var rq = this.request;
        var isArr = this.isArrayData;
        return new Promise((resolve, reject) => {
            var _notifyService = new NotifyService();
            rq.type = 'post';
            rq.url = url;
            rq.responseType = 'arraybuffer';
            if (isArr) {
                rq.contentType = 'application/json; charset=utf-8';
                rq.data = JSON.stringify(data);
            }
            else {
                rq.data = JSON.stringify(data);
            }
            rq.success = function (response) {
                if (response !== undefined && response !== null && response.state_info !== undefined && response.state_info !== null && response.state_info.status === "NotOK") {
                    if (response.state_info.message_code !== INVALID_AUTH) {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                    setTimeout(function () { window.location.href = pageLogin; }, 3000);
                }
                resolve(response);
            };
            rq.error = function (err) {
                console.log("err", err);
                if (err.status === 428) {
                    window.location.href = pageLogin;
                }
                else {
                    _notifyService.error(err.responseJSON.message);
                }
                reject(err);
            };
            $.ajax(rq);
        });
    };
    this.all = function (arrPromise) {
        IS_MULTIPLE_PROMISE = true;
        return new Promise((resolve, reject) => {
            Promise.all(arrPromise).then(arrRes => {
                for (var i = 0; i < arrRes.length; i++) {
                    var response = arrRes[i];
                    if (response !== undefined && response !== null && response.state_info !== undefined && response.state_info !== null && response.state_info.status === "NotOK") {
                        if (response.state_info.message_code !== INVALID_AUTH) {
                            _notifyService.error(response.state_info.message_body);
                            return;
                        }
                        _notifyService.error("Tài khoản của bạn đã bị thay đổi mật khẩu. Trở về trang đăng nhập sau 3 giây.");
                        setTimeout(function () { window.location.href = pageLogin; }, 3000);
                        IS_MULTIPLE_PROMISE = false;
                        return;
                    }
                }
                resolve(arrRes);
            });
        });
    }
}