<template>
    <div class="drawLayersStyle">
      <svg :width="obj.style.w +'px'" :height="obj.style.h +'px'" :viewBox="`0 0 ${widthVal} ${heightVal}`" preserveAspectRatio="xMidYMid meet">
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
          pointArr:"",
          widthVal:this.obj.style.w,
          heightVal:this.obj.style.h
      }
    },
    watch: {
      "obj.style.w": {
      handler(newVal, oldVal) {
        if(oldVal == newVal){
          this.widthVal = newVal
        }
      },
      deep: true
      },
      "obj.style.h": {
      handler(newVal, oldVal) {
        if(oldVal == newVal){
          this.heightVal = newVal
        }
      },
      deep: true
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

