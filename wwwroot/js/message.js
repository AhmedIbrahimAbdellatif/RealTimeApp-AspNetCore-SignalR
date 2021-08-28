"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/messages").build();

connection.on("ReceiveMessage", function(message) {
    var div = document.createElement("div");
    div.innerHTML = message + "<hr/>";
    document.getElementById("messages").appendChild(div);
});

connection.start().catch(function(err) {
    return console.log.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function(event) {
    var message = document.getElementById("message").value;
    connection.invoke("SendMessageToAll", message).catch(function(err) {
        return console.log.error(err.toString());
    });
    event.preventDefault();
});