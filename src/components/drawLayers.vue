<template>
  <div class="drawLayers" @keyup="drawDiv($event)"></div>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'drawLayers',
    data () {
      return {
          
      }
    },
    methods: {
        drawDiv(event){
            //ctrl键任意角度描值
         if(e.ctrlKey){
            console.log("Ctrl")
            // this.$store.commit('pasteComponents');
          }

          if(e.shiftKey){
            console.log("Shift")
            // this.$store.commit('pasteComponents');
          }
        }
    },
    mounted () {

    }
  }
</script>

<style>


</style>

