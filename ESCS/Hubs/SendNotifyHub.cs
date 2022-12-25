using ESCS.COMMON.Contants;
using ESCS.COMMON.Http;
using ESCS.COMMON.Request;
using ECSS.Hubs;
using ESCS.MODEL.ESCS;
using ESCS.MODEL.ESCS.ModelView;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;

namespace ESCS.Hubs
{
    public class SendNotifyHub : Hub
    {
        private readonly IUserConnectionManager _userConnectionManager;
        private readonly IHubContext<SendNotifyHub> _sendNotifyHub;
        public SendNotifyHub(
            IUserConnectionManager userConnectionManager,
            IHubContext<SendNotifyHub> sendNotifyHub)
        {
            _userConnectionManager = userConnectionManager;
            _sendNotifyHub = sendNotifyHub;
        }
        public async Task<string> GetConnectionId(RequestHub req)
        {
            var httpContext = this.Context.GetHttpContext();
            var session = httpContext.Request.Cookies[ESCSConstants.ESCS_TOKEN]?.ToString();

            if (session == null)
                return null;
            escs_nguoi_dung authen = JsonConvert.DeserializeObject<escs_nguoi_dung>(Utilities.DecryptByKey(session, ESCS.COMMON.Http.AppSettings.KeyEryptData));
            MessageNotify messageNotify = new MessageNotify();
            messageNotify.ma_doi_tac = authen.ma_doi_tac;
            messageNotify.nsd = authen.nsd;
            messageNotify.ma_doi_tac_hs = string.IsNullOrEmpty(req.ma_doi_tac_hs) ? "" : req.ma_doi_tac_hs;
            messageNotify.so_id_hs = string.IsNullOrEmpty(req.so_id_hs) ? "" : req.so_id_hs;
            messageNotify.connectionid = Context.ConnectionId;
            HubConnection connection = null;
            string signature = Utilities.Sha256Hash(messageNotify.ma_doi_tac + "." + messageNotify.nsd + "." + authen.pas);

            string url = string.Format(HttpConfiguration.BaseUrl + "/notify-service?ma_doi_tac={0}&nsd={1}&ma_doi_tac_hs={2}&so_id_hs={3}&signature={4}", messageNotify.ma_doi_tac, messageNotify.nsd, messageNotify.ma_doi_tac_hs, messageNotify.so_id_hs, signature);
            connection = new HubConnectionBuilder()
              .WithUrl(url, options =>
              {
                  options.Headers["ePartnerCode"] = HttpConfiguration.PartnerCode;
                  options.Headers["eAuthToken"] = HttpConfiguration.AccessToken;
                  options.Headers["eAction"] = StoredProcedure.PBH_BT_XE_GD_CHAT_NH;
                  options.Headers["eSignature"] = "";
              })
              .Build();

            connection.On<MessageChat>("receiveMessage", message =>
            {
                string keyReceiveMessage = message.ma_dtac_nhan + "/" + message.nsd_nhan;
                List<ConnectionSignalr> lstConnection = _userConnectionManager.GetUserConnections(keyReceiveMessage);
                if (lstConnection!=null)
                {
                    var conn = lstConnection.Where(n => n.hubConnection.ConnectionId == message.connectionId).FirstOrDefault();
                    if (conn != null)
                    {
                        _sendNotifyHub.Clients.Client(conn.connectionId).SendAsync("receiveMessage", message);
                    }
                }
            });
            connection.On<gdv_tt, List<StatusUploadFileResultApi>, Dictionary<string, string>> ("receiveImagesUpload", (gdv, status, data_info) =>
            {
                string keyReceiveMessage = gdv.ma_dtac_gdv_tt + "/" + gdv.ma_gdv_tt;
                List<ConnectionSignalr> lstConnection = _userConnectionManager.GetUserConnections(keyReceiveMessage);
                if (lstConnection!=null)
                {
                    foreach (var item in lstConnection)
                    {
                        _sendNotifyHub.Clients.Client(item.connectionId).SendAsync("receiveImagesUpload", gdv, status, data_info);
                    }
                }
                
            });
            connection.On<ht_thong_bao_gui>("sendToUser", (thong_bao) =>
            {
                List<ConnectionSignalr> clients = _userConnectionManager.GetUserConnections(thong_bao.ma_doi_tac + "/" + thong_bao.nsd);
                if (clients != null && clients.Count() > 0)
                {
                    var conn = clients.Where(n => n.hubConnection.ConnectionId == thong_bao.connection_id);
                    if (conn!=null)
                    {
                        foreach (var clientId in conn)
                        {
                            _sendNotifyHub.Clients.Client(clientId.connectionId).SendAsync("sendToUser", thong_bao);
                        }
                    }
                }

            });
            if (connection.State == HubConnectionState.Disconnected)
            {
                await connection.StartAsync();
            }
            string connectionIDOpenId = await connection.InvokeAsync<string>("GetConnectionId");
            _userConnectionManager.KeepUserConnection(messageNotify, connection);
            string connectString = connectionIDOpenId;
            return connectString;
        }
        public void sendMessage(string messageStr)
        {
            MessageChat message = JsonConvert.DeserializeObject<MessageChat>(messageStr);
            //Gửi message lên openid tại đây
            var httpContext = this.Context.GetHttpContext();
            var connectstringId = this.Context.ConnectionId;
            var session = httpContext.Request.Cookies[ESCSConstants.ESCS_TOKEN]?.ToString();
            if (session == null)
                return;
            escs_nguoi_dung authen = JsonConvert.DeserializeObject<escs_nguoi_dung>(Utilities.DecryptByKey(session, ESCS.COMMON.Http.AppSettings.KeyEryptData));
            message.ma_doi_tac_nsd = authen.ma_doi_tac;
            message.ma_chi_nhanh_nsd = authen.ma_chi_nhanh;
            message.nsd = authen.nsd;
            message.pas = authen.pas;
            message.tg_gui = Convert.ToInt64(DateTime.Now.ToString("yyyyMMddHHmmss"));
            message.ma_dtac_gui = authen.ma_doi_tac;
            message.nsd_gui = authen.nsd;
            message.nsd_gui_ten = authen.ten;
            string key = message.ma_doi_tac_nsd + "/" + message.nsd;
            List<ConnectionSignalr> lstConnection = _userConnectionManager.GetUserConnections(key);
            if (lstConnection != null)
            {
                var conn = lstConnection.Where(n => n.connectionId == connectstringId).FirstOrDefault();
                if (conn != null)
                {
                    var connection = conn.hubConnection;
                    message.connectionId = connection.ConnectionId;
                    connection.InvokeAsync("chatMessage", JsonConvert.SerializeObject(message), HttpConfiguration.PartnerCode, StoredProcedure.PBH_BT_XE_GD_CHAT_NH, HttpConfiguration.AccessToken, HttpConfiguration.Environment);
                }
            }
        }
        public async override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            _userConnectionManager.RemoveUserConnection(connectionId);
            var value = await Task.FromResult(0);
        }
    }
    public class RequestHub
    {
        public string ma_doi_tac_hs { get; set; }
        public string so_id_hs { get; set; }
    }
    public class MessageChat
    {
        public string ma_doi_tac_nsd { get; set; }
        public string ma_chi_nhanh_nsd { get; set; }
        public string nsd { get; set; }
        public string pas { get; set; }

        /// <summary>
        /// ConnectionId nhận
        /// </summary>
        public string connectionId { get; set; }
        /// <summary>
        /// Mã nội dung tin nhắn
        /// </summary>
        public string ma { get; set; }
        /// <summary>
        /// Mã đối tác người gửi
        /// </summary>
        public string ma_dtac_gui { get; set; }
        /// <summary>
        /// Mã người sử dụng gửi
        /// </summary>
        public string nsd_gui { get; set; }
        /// <summary>
        /// Tên người sử dụng gửi
        /// </summary>
        public string nsd_gui_ten { get; set; }
        /// <summary>
        /// Mã đối tác người nhận
        /// </summary>
        public string ma_dtac_nhan { get; set; }
        /// <summary>
        /// Mã người sử dụng nhận
        /// </summary>
        public string nsd_nhan { get; set; }
        /// <summary>
        /// Tên người sử dụng nhan
        /// </summary>
        public string nsd_nhan_ten { get; set; }
        /// <summary>
        /// Mã đối tác của hồ sơ
        /// </summary>
        public string ma_doi_tac { get; set; }
        /// <summary>
        /// Số id hồ sơ
        /// </summary>
        public string so_id { get; set; }
        /// <summary>
        /// Số hợp đồng
        /// </summary>
        public string so_hd { get; set; }
        /// <summary>
        /// Thời gian gửi
        /// </summary>
        public decimal? tg_gui { get; set; }
        /// <summary>
        /// Nội dung gửi
        /// </summary>
        public string nd { get; set; }
        /// <summary>
        /// Mã nội dung đang trả lời
        /// </summary>
        public string ma_cha { get; set; }
        /// <summary>
        /// Nội dung đang trả lời
        /// </summary>
        public string nd_ma_cha { get; set; }
        /// <summary>
        /// File dạng base64
        /// </summary>
        public string file_base64 { get; set; }
        /// <summary>
        /// Tên file
        /// </summary>
        public string ten_file { get; set; }
        /// <summary>
        /// Loại nội dung chát: text, file
        /// </summary>
        public string loai_nd { get; set; }
        /// <summary>
        /// Trạng thái đọc
        /// </summary>
        public decimal? tthai_doc { get; set; }
    }
}
