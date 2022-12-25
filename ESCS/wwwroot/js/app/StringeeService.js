function StringeeService(config = undefined) {
    this.config = undefined;
    this.from = null;
    this.user_id = null;
    this.authen = null;
    this.video_call = false;
    
    this.connect = function () {
        var _instance = this;
        var _service = new Service();
        _service.showErrorMsg = false;
        _service.postData("/callapp/authencall", {}).then(res => {
            if (res.state_info.status !== "OK") {
                console.log(res.state_info.message_body);
                return;
            }
            console.log("access_token stringee",res.data_info.access_token);
            this.authen = res.data_info;
            var access_token = res.data_info.access_token;
            var from = res.data_info.from;
            var user_id = res.data_info.user_id;
            if (user_id == null || user_id == "") {
                console.log("Không xác định được UserId Call");
                return;
            }
            _instance.from = from;
            _instance.user_id = user_id;

            if (_instance.config === undefined) {
                _instance.config = {
                    showMode: 'none',//full | min | none
                    //top: 300,
                    //left: 300,
                    bottom: 15,
                    right: 15,
                    askCallTypeWhenMakeCall: true,//Mở sự lựa chọn kiểu cuộc gọi
                    arrowLeft: 155,
                    arrowDisplay: 'none',
                    fromNumbers: [{ alias: 'Hệ thống ESCS', number: from }]
                };
            }
            console.log("config stringee", _instance.config);

            StringeeSoftPhone.init(_instance.config);
            
            ////Chế độ hiển thị thay đổi
            StringeeSoftPhone.on('displayModeChange', function (event) {
                console.log('displayModeChange', event);
                if (event === 'min') {
                    StringeeSoftPhone.config({ arrowLeft: 75 });
                } else if (event === 'full') {
                    StringeeSoftPhone.config({ arrowLeft: 155 });
                }
            });
            ////Access token hết hạn, yêu cầu cấp access token mới
            StringeeSoftPhone.on('requestNewToken', function () {
                console.log('requestNewToken+++++++');
                StringeeSoftPhone.connect(access_token);
            });
            ////Để gọi video, cần có 2 sự kiện sau và gán các stream vào các thẻ video tương ứng
            if ($("video#localVideo").length > 0 && $("video#remoteVideo").length) {
                StringeeSoftPhone.on('addlocalstream', function (stream) {
                    localVideo.srcObject = null;
                    localVideo.srcObject = stream;
                });
                StringeeSoftPhone.on('addremotestream', function (stream) {
                    remoteVideo.srcObject = null;
                    remoteVideo.srcObject = stream;
                });
            }
            ////Hoàn thành việc xác thực
            StringeeSoftPhone.on('authen', function (res) {
                console.log('authen: ', res);
            });
            ////Bị ngắt kết nối
            StringeeSoftPhone.on('disconnect', function () {
                $("#call-video-modal").modal("hide");
                console.log('disconnected');
            });
            ////Trạng thái về kết nối của cuộc gọi
            StringeeSoftPhone.on('signalingstate', function (state) {
                console.log('Trạng thái kết nối cuộc gọi', state);
                var userId = StringeeSoftPhone._iframe.contentWindow.document.querySelector("#page-diapad .wrap-typing-number input").value;
                //bắt cuộc gọi
                if (state.reason == "Answered" && state.code == 3 && userId.startsWith("video_") && _instance.video_call) {
                    $("#call-video-modal").modal("show");
                }
                //ngắt cuộc gọi
                if (state.reason == "Ended" && state.code == 6) {
                    $("#call-video-modal").modal("hide");
                }
            });
            //Sự kiện xảy ra ngay trước khi makeCall
            StringeeSoftPhone.on('beforeMakeCall', function (call, callType) {
                _instance.video_call = call.isVideoCall;
                console.log('beforeMakeCall: call: ' , call);
                console.log('beforeMakeCall: ' + callType);
                return true;
            });
            //Sự kiện nút gọi được click
            StringeeSoftPhone.on('makeOutgoingCallBtnClick', function (fromNumber, toNumber, callType) {
                console.log('makeOutgoingCallBtnClick: fromNumber=' + fromNumber + ', toNumber=' + toNumber + ',callType=' + callType);
            });
            //Sự kiện nút nghe máy được click
            StringeeSoftPhone.on('answerIncomingCallBtnClick', function () {
                if (_instance.video_call) {
                    $("#call-video-modal").modal("show");
                }
                console.log('answerIncomingCallBtnClick');
            });
            //Sự kiện có cuộc gọi đến
            StringeeSoftPhone.on('incomingCall', function (incomingcall) {
                _instance.video_call = incomingcall.isVideoCall;
                console.log('incomingCall: ', incomingcall);
            });
            //Sự kiện nút ngắt máy được click
            StringeeSoftPhone.on('endCallBtnClick', function () {
                $("#call-video-modal").modal("hide");
                console.log('endCallBtnClick');
            });
            //Sự kiện màn hình "call" ẩn
            StringeeSoftPhone.on('callingScreenHide', function () {
                console.log('callingScreenHide');
            });
            //Sự kiện từ chối nghe cuộc gọi đến
            StringeeSoftPhone.on('declineIncomingCallBtnClick', function () {
                console.log('Từ chối cuộ gọi');
            });
            //Sự kiện màn hình cuộc gọi đến ẩn
            StringeeSoftPhone.on('incomingScreenHide', function () {
                console.log('incomingScreenHide');
            });
            StringeeSoftPhone.connect(access_token);
            
        });
    };
    this.callDefault = function (phone) {
        var _instance = this;
        if (StringeeSoftPhone) {
            StringeeSoftPhone.show("none");
        }
        _instance.checkConnection(res => {
            if (res.data_info !== null && res.data_info.count !== undefined && res.data_info.count <= 0) {
                var _notifyService = new NotifyService();
                _notifyService.error("Kết nối cuộc gọi bị gián đoạn");
                return;
            }
            if (phone !== undefined && phone !== null && phone !== "") {
                if (!phone.startsWith("+84")) {
                    phone = "+84 " + phone;
                }
            }
            StringeeSoftPhone._iframe.contentWindow.document.querySelector("#page-diapad .wrap-typing-number input").value = phone;
            StringeeSoftPhone.show("full");
        });
    }
    this.callApp = function (userid) {
        var _instance = this;
        _instance.user_id = userid;
        if (StringeeSoftPhone) {
            StringeeSoftPhone.show("none");
        }
        _instance.checkConnection(res => {
            if (res.data_info !== null && res.data_info.count !== undefined && res.data_info.count <= 0) {
                var _notifyService = new NotifyService();
                _notifyService.error("Kết nối cuộc gọi bị gián đoạn");
                return;
            }
            if (userid !== undefined && userid !== null && userid !== "") {
                if (!userid.startsWith("video_")) {
                    userid = "video_" + userid;
                }
            }
            StringeeSoftPhone._iframe.contentWindow.document.querySelector("#page-diapad .wrap-typing-number input").value = userid;
            StringeeSoftPhone.show("full");
        });
    }
    this.call = function (phoneNumber, isVideo = false) {
        var _instance = this;
        var _service = new Service();
        _service.showErrorMsg = false;
        _service.postData("/callapp/authencall", {}).then(res => {
            if (res.state_info.status !== "OK") {
                console.log(res.state_info.message_body);
                return;
            }
            console.log("access_token", res.data_info.access_token);
            var access_token = res.data_info.access_token;
            var from = res.data_info.from;

            var client = new StringeeClient();
            client.connect(access_token);
            //Xác thực thành công
            client.on('authen', function (res) {
                console.log('authen', res);

                var call = new StringeeCall(client, from, phoneNumber, isVideo);
                _instance.settingCallEvent(call);
                client.on('incomingcall', function (incomingcall) {
                    console.log('incomingcall', incomingcall);
                    call = incomingcall;
                    _instance.settingCallEvent(incomingcall);
                    var answer = confirm('Incoming call from: ' + incomingcall.fromNumber + ', do you want to answer?');
                    if (answer) {
                        call.answer(function (res) {
                            console.log('answer res', res);
                        });
                    } else {
                        call.reject(function (res) {
                            console.log('reject res', res);
                        });
                    }
                });
                ////Trả lời cuộc gọi
                //call.answer(function (res) {
                //    console.log('answer res', res);
                //});
                ////Từ chối cuộc gọi
                //call.reject(function (res) {
                //    console.log('reject res', res);
                //});
                ////Ngắt kết nối
                //call.hangup(function (res) {
                //    console.log('hangup res', res);
                //});
                call.makeCall(function (res) {
                    console.log('make call callback: ' + JSON.stringify(res));
                });
            });
            //Ngắt kết nối
            client.on('disconnect', function () {
                console.log('disconnected');
            });
            //Cấp mới token
            client.on('requestnewtoken', function () {
                console.log('++++++++++++++ requestnewtoken; please get new access_token from YourServer and call client.connect(new_access_token)+++++++++');
                //please get new access_token from YourServer and call: 
                //client.connect(new_access_token);
            });
        });
    }
    this.settingCallEvent = function (call) {
        call.on('addremotestream', function (stream) {
            // reset srcObject to work around minor bugs in Chrome and Edge.
            console.log('addremotestream');
            remoteVideo.srcObject = null;
            remoteVideo.srcObject = stream;
        });

        call.on('addlocalstream', function (stream) {
            // reset srcObject to work around minor bugs in Chrome and Edge.
            console.log('addlocalstream');
            localVideo.srcObject = null;
            localVideo.srcObject = stream;
        });

        call.on('signalingstate', function (state) {
            console.log('signalingstate ', state);
            var reason = state.reason;
        });

        call.on('mediastate', function (state) {
            console.log('mediastate ', state);
        });

        call.on('info', function (info) {
            console.log('on info:' + JSON.stringify(info));
        });
    }
    this.checkConnection = function (callback = undefined) {
        var _instance = this;
        var _service = new Service();
        _service.postData("/callapp/checkconnection", { user_id: _instance.user_id }).then(res => {
            if (res.state_info.status !== "OK") {
                var _notifyService = new NotifyService();
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (callback) {
                callback(res);
            }
        });
    }
    this.hide = function () {
        StringeeSoftPhone.show("none");
    }
}
