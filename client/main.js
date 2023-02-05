function createSocket(){
  const socket = new WebSocket('ws://127.0.0.1:3000/cable');

  // When the socket is opened, send data to the server
  socket.onopen = function(event){
    console.log("Connection established");
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        id: 1,
        channel: 'GetmessageChannel'
      })
    };
    socket.send(JSON.stringify(msg));
  }

  socket.onmessage = function(event){
    const data = JSON.parse(event.data);
    if(data.type === "ping"){
      return;
    }
    if(data.message){
      console.log(data.message);
    }
  };

  socket.onclose = function(event){
    console.log("Disconnected from server");
  };

  socket.onerror = function(error){
    console.log("Websocket error: ", error);
  };
}

createSocket();