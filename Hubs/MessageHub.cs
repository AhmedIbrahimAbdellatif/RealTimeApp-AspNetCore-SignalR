using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace RealTimeApp_AspNetCore_SignalR {
    public class MessageHub : Hub 
    {
        public Task SendMessageToAll(string message) 
        {
            return Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}