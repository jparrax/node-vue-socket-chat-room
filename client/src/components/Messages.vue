<template>
  <b-container>
    <b-container class="messages-box">
      <b-row>
        <b-col>Welcome to our room...</b-col>
      </b-row>
      <b-row v-for="(message, propertyName, index) in messages" :key="index">
        <b-col>{{message.name + ": " + message.message}}</b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
export default {
  props: ['messages']
}
</script>
<style scoped>
  .messages-box{
    height:300px;
    border: 1px solid #ced4da;
    margin: 5px 0px 5px 0px;
    overflow-y: scroll;
    color: #495057;
  }

</style>