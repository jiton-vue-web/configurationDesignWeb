<template>
    <button
        class="btnStyle"
        :style="{
            zIndex:obj.style.zIndex,
            fontSize: obj.style.fontSize + 'px',
            fontFamily: obj.style.fontFamily,
            color: obj.style.color,
            textAlign: obj.style.textAlign,
            lineHeight: obj.style.lineHeight,
            background: obj.style.backColor,
            borderRadius:obj.style.borderRadius +'px'
        }" >
        {{obj.style.text}}
    </button>
   
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'buttonAttr',
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
.btnStyle{
  width:100%;
  height:100%;
  display:block;
  border:0;
}


</style>

