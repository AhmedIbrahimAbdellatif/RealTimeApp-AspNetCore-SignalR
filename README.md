# Real-Time Chat App

### Introduction

> This project is a practice on creating real-time apps using Asp.Net Core and SignalR

***

### Project Scope

- Communicating with the `Caller` of a server hub method
- Handle events for when a connection is made `onConnected` or terminated `onDisconnected`
- Send messages to specific connected `Clients`
- Send messages to `Group` connected `Clients`

***

### What is SignalR?

> It is a library that simplifies adding real-time web functionality to apps which allows server-side code push content to clients

***

### Problem Space

> The problem of refreshing data is the problem that SignalR solves

##### Http Protocol

- A stateless request-response protocol
- Whenever the client wants to refresh its data, it has to make a request to the server
- There is not means by which the server can push data to the client
- The problem is very clear in a scenario when the state changes and the client doesn't know about the change until it refreshes or sends a new request to the server

***

### Techniques Supported by SignalR for Real-Time Communication

> SignalR will use a negotiation between the client and the server to determine the technique to use

##### WebSockets *(The one used in this project)*

- It allows a two-way communication between the client and the server
- The initial request is still required to be done by the client to establish a connection between the client and the server
  - This request should contain `Upgrade` and `Connection` headers with values of "WebSocket" and "Upgrade"
- After negotiation, a bidirectional WebSockets connection is established which allows for a "Push" model
- A long-established connection can be used by the client to send more requests or by the server to send data to the clients without requiring the clients to make any additional requests
- This connection remains open until the client is closed or the web page is refreshed for example

##### Server Sent Events

- This is a one way messaging technique with one-way connection from the server to the clients
- The client initiates the connection, then the server can stream events down to the client
  - The request sent from the client has the header `Accept` with value of "text/event-stream"
- The client cannot make any additional requests with this connection

##### Long Polling

- It is an old technique that was originally used to pull data from webservers before the existence of the 2 previous techniques
- The client makes a request to the server and the server holds-on and sends a response back when it has data to provide
- Connection is closed once the server responds with data, the client will immediately reconnect to the server so that the cycle continues

***

### Push Model of the Project

> Since it is a simple chat web application, I chose to implement the push model using SignalR WebSockets as client users can both send and receive messages

***

### Simple Description of Project Architecture

- I created a hub does the following
  - Notifies all clients with newly created/terminated connections
  - Has a method for joining groups
  - Has methods for sending messages to all clients, the client that called the hub method, a certain group
- I created server side scripts that will run on the client side to send messages or join a group by invoking one of the hub methods
- So a client can communicate with other clients through invoking the required hub method, and accordingly the hub pushes data to the specified clients

***

