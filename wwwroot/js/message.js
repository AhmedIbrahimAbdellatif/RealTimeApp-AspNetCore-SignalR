"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/messages").build();
var myConnectionId = null;
connection.on("ReceiveMessage", function(message) {
    var div = document.createElement("div");
    div.innerHTML = message + "<hr/>";
    document.getElementById("messages").appendChild(div);
});

connection.on("UserConnected", function(connections) {
    if(myConnectionId == null) {
        myConnectionId = connections[connections.length-1];
        console.log("myConnectionId:" + myConnectionId);
    }
    var groupElement = document.getElementById("group");
    for (var i = 0; i < connections.length; i++) {
        console.log(connections[i]);
        if(connections[i] !== myConnectionId && !$('#group option[value="' + connections[i] + '"]').length) {
            var option = document.createElement("option");
            option.text = connections[i];
            option.value = connections[i];
            groupElement.add(option);
        }
    }
});

connection.on("UserDisconnected", function(connectionId) {
    var groupElement = document.getElementById("group");
    for(var i = 0; i < groupElement.length; i++) {
        if (groupElement.options[i].value == connectionId) {
            groupElement.remove(i);
        }
    }
})

connection.start().catch(function(err) {
    return console.log.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function(event) {
    var message = document.getElementById("message").value;
    var groupElement = document.getElementById("group");
    var groupValue = groupElement.options[groupElement.selectedIndex].value;
    if(groupValue === "All" || groupValue === "Myself") {
        var method = groupValue === "All" ? "SendMessageToAll" : "SendMessageToCaller";
        connection.invoke(method, message).catch(function(err) {
            return console.log.error(err.toString());
        });
    }
    else if (groupValue === "PrivateGroup") {
        connection.invoke("SendMessageToGroup", "PrivateGroup", message).catch(function(error) {
            return console.log.error(err.toString());
        })
    }
    else {
        console.log(message);
        connection.invoke("SendMessageToUser", groupValue, message).catch(function(err) {
            return console.log.error(err.toString());
        });
    }
    
    event.preventDefault();
});

document.getElementById("joinGroup").addEventListener("click", function (event) {
    connection.invoke("JoinGroup", "PrivateGroup").catch(function (error) {
        return console.error(err.toString());
    })
    event.preventDefault();
});