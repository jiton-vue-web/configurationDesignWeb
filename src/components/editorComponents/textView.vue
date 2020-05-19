<template>
    <!-- <input
        class="textareaStyle"
        type="text"
        v-model="obj.style.text" 
        :style="{
          zIndex:obj.style.zIndex,
          fontSize: obj.style.fontSize + 'px',
          fontFamily: obj.style.fontFamily,
          color: obj.style.color,
          textAlign: obj.style.textAlign,
          lineHeight: obj.style.lineHeight,
          background: obj.style.backColor
        }" /> -->
        <div
          class="textareaStyle"
          :style="{
            zIndex:obj.style.zIndex,
            fontSize: obj.style.fontSize + 'px',
            fontFamily: obj.style.fontFamily,
            color: obj.style.color,
            textAlign: obj.style.textAlign,
            lineHeight: obj.style.lineHeight + 'px',
            background: obj.style.backColor
          }" >
          {{obj.style.text}}
        </div>
   
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    // name: 'textArrt',
    props:["obj"],
    data () {
      return {
          styleObj:{}
      }
    },
    methods: {
     
    },
    mounted () {

    }
  }
</script>

<style>
.textareaStyle{
  width:100%;
  display:block;
  border:0;
}
</style>

