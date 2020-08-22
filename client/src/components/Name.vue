<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-input v-model="name" placeholder="Enter your name" @keyup="changeName()"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      name: ''
    }
  }, 
  methods: {
    changeName: function(){
      this.$emit('changeName', this.name)
    }
  }
}
</script>
<style scoped>

</style>