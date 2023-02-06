import consumer from "channels/consumer"

consumer.subscriptions.create("GetmessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    // console.log("hello message channel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if(data['new_message']){
      var parentDiv = document.getElementById("chat");
      document.getElementById("msg_box").value = "";
      try{
        document.getElementById('empty_chat').remove();
        parentDiv.classList.remove('text-center')
        parentDiv.classList.add('text-start')
      } catch(error){
        console.log("Element already removed, ignoring error:", error);
      }
      if(data['new_message']['room_id'] == parentDiv.getAttribute('data-id')){
        parentDiv.innerHTML = parentDiv.innerHTML + 
        `<div class="card text-bg-success mb-2">
            <div class="card-body">` + 
            data['user'].username +`: `+data['new_message']['message']
            + `</div>
        </div>`;
      }
    }

    if(data['new_room']){
      // console.log(data['new_room']);
      const element = document.getElementById('roomList');
      try{
        const childElement = element.querySelector('.no-records-found');
        element.removeChild(childElement);
      } catch(error){
        console.log("Element already removed, ignoring", error);
      }
      const countChild = element.childNodes.length + 1;
      element.innerHTML = element.innerHTML + 
        `<tr>
            <td>`+countChild+`</td>
            <td>`+data['new_room']['room_name']+`</td>
            <td>
                <button type="button" onclick="getMessage(this)" data-id="`+ data['new_room']['id'] +`" class="btn btn-outline-success w-75 enterBtn" disabled>Select</button>
            </td>
        </tr>`;
      if(log == 1){
        let index = element.childNodes.length - 1;
        document.getElementsByClassName('enterBtn')[index].disabled = false;
      }
    }
  }
});
