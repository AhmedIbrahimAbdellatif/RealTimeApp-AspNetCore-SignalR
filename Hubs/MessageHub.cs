using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace RealTimeApp_AspNetCore_SignalR {
    public class MessageHub : Hub 
    {
        static List<string> connections = new List<string>();
        public Task SendMessageToAll(string message) 
        {
            return Clients.All.SendAsync("ReceiveMessage", message);
        }

        public Task SendMessageToCaller(string message) {
            return Clients.Caller.SendAsync("ReceiveMessage", message);
        }

        public Task SendMessageToUser(string connectionId, string message) {
            return Clients.Client(connectionId).SendAsync("ReceiveMessage",message);
        }

        public Task JoinGroup(string group) {
            return Groups.AddToGroupAsync(Context.ConnectionId, group);
        }

        public Task SendMessageToGroup(string groupName, string message) {
            return Clients.Group(groupName).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync() {
            connections.Add(Context.ConnectionId);
            // await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await Clients.All.SendAsync("UserConnected", connections);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex) {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }
    }
}