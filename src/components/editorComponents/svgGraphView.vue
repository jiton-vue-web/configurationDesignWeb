<template>
    <div class="drawLayersStyle">
    <svg :width="obj.style.w +'px'" :height="obj.style.h +'px'">
        　<polygon 
            :points="obj.style.pointArr"
            :style="{
                zIndex:obj.style.zIndex,
                fontSize: obj.style.fontSize + 'px',
                fontFamily: obj.style.fontFamily,
                color: obj.style.color,
                textAlign: obj.style.textAlign,
                lineHeight: obj.style.lineHeight,
                stroke: obj.style.backColor,
                strokeWidth: obj.style.borderWidth,
                fillOpacity: obj.style.opacity,
                fill: obj.style.backColor,
                transform:`scale(${obj.style.scaleX},${obj.style.scaleY})`
            }"
            /> 
    </svg>
  </div>
   
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'svgAttr',
    props:["obj"],
    data () {
      return {
          pointArr:""
      }
    },
    methods: {

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

