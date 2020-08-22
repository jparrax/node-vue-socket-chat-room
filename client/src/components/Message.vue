<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-input v-model="message" placeholder="Enter a message" @keyup="changeMessage()" @keydown.enter="sendMessage()"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  }, 
  methods: {
    changeMessage: function(){
      this.$emit('changeMessage', this.message);
    },
    sendMessage: function(){
      this.$emit('sendMessage');
      this.message = '';
    }
  }
}
</script>
<style scoped>

</style>