<template>
  <div class="home">
    <VueImage/>
    <Name @changeName="updateName($event)"/>
    <Messages :messages="messages"/>
    <Message @changeMessage="updateMessage($event)" @sendMessage="saveMessage()"/>
  </div>
</template>

<script>
// @ is an alias to /src
import VueImage from '../components/VueImage'
import Name from '../components/Name'
import Messages from '../components/Messages'
import Message from '../components/Message'
// import io from 'socket.io-client'

export default {
  name: 'Home',
  components: {
    VueImage,
    Name,
    Messages,
    Message
  },
  data () {
    return {
      message: {
        name: '',
        message: ''
      },
      messages: [],
      // socket: io("http://localhost:3000")
    }
  },
  methods: {
    updateName: function(updatedName){
      this.message.name = updatedName;
    },
    updateMessage: function(updatedMessage){
      this.message.message = updatedMessage;
    },
    // joinServer: function(){
    //   this.socket.on('messages', data => {
    //     this.messages = data;
    //     console.log('Mounted started');
    //   })
    // },
    saveMessage: function(){
      this.$socket.emit('input', this.message);
    }
  },
  sockets: {
    connect: function (data) {
      console.log('socket connected');
    },
    messages: function(data){
      console.log('event triggered by the socket');
      this.messages = data;
    }
  },
  mounted: function(){
    console.log('Component mounted');
  },
  destroyed: function(){
    console.log('Component destroyed');
  }
}
</script>
