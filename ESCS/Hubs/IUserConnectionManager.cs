using ESCS.COMMON.Request;
using ESCS.Hubs;
using ESCS.MODEL.ESCS;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECSS.Hubs
{
    public class ConnectionSignalr
    {
        public string connectionId { get; set; }
        public HubConnection hubConnection { get; set; }
    }
    public interface IUserConnectionManager
    {
        void KeepUserConnection(MessageNotify messageNotify, HubConnection connection);
        void RemoveUserConnection(string connectionId);
        List<ConnectionSignalr> GetUserConnections(string userId);
    }
    public class UserConnectionManager : IUserConnectionManager
    {
        protected readonly IHubContext<SendNotifyHub> _sendNotifyHubContext;
        public UserConnectionManager(IHubContext<SendNotifyHub> sendNotifyHubContext)
        {
            _sendNotifyHubContext = sendNotifyHubContext;
        }
        private static Dictionary<string, List<ConnectionSignalr>> userConnectionMap = new Dictionary<string, List<ConnectionSignalr>>();

        private static string userConnectionMapLocker = string.Empty;
        public List<ConnectionSignalr> GetUserConnections(string userId)
        {
            var conn = new List<ConnectionSignalr>();
            lock (userConnectionMapLocker)
            {
                conn = userConnectionMap[userId];
            }
            return conn;
        }
        public void KeepUserConnection(MessageNotify messageNotify, HubConnection connection)
        {
            lock (userConnectionMapLocker)
            {
                if (string.IsNullOrEmpty(messageNotify.ma_doi_tac) || string.IsNullOrEmpty(messageNotify.nsd))
                {
                    return;
                }
                string key = messageNotify.ma_doi_tac + "/" + messageNotify.nsd;
                if (!userConnectionMap.ContainsKey(key))
                {
                    userConnectionMap[key] = new List<ConnectionSignalr>();
                }
                
                userConnectionMap[key].Add(new ConnectionSignalr() { connectionId = messageNotify.connectionid, hubConnection = connection });
            }
        }
        public void RemoveUserConnection(string connectionId)
        {
            lock (userConnectionMapLocker)
            {
                foreach (var userId in userConnectionMap.Keys)
                {
                    if (userConnectionMap.ContainsKey(userId))
                    {
                        if (userConnectionMap[userId].Select(n => n.connectionId).Contains(connectionId))
                        {
                            var hub = userConnectionMap[userId].Where(n => n.connectionId == connectionId).Select(n=>n.hubConnection).FirstOrDefault();
                            if (hub != null)
                            {
                                hub.StopAsync();
                                hub.DisposeAsync();
                            }
                            userConnectionMap[userId].RemoveAll(n => n.connectionId == connectionId);
                            break;
                        }
                    }
                }
            }
        }
    }
}
