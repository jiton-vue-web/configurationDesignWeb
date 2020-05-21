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
        // addPoint(event){
        //     if(event.ctrlKey){
        //         var layer = event.currentTarget;
        //         var position = layer.getBoundingClientRect();
        //         let x = event.clientX - position.x;
        //         let y = event.clientY - position.y;
        //         //第一个点，说明是新图形开始
        //         if(this.pointArr == ""){
        //             this.pointArr = this.pointArr + x +"," + y ;
        //         }else{
        //             this.pointArr = this.pointArr +" " +  + x +"," + y ; 
        //         }
        //     }
        // },
        // keyupCtrl(){
        //     this.pointArr = "";
        // }
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

