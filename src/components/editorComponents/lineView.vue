<template>
  <div class="leakWaterStyle">
   <!-- <div
      class="lineStyle"
      :style="{
          width:obj.style.w + 'px',
          height:obj.style.h + 'px',
          zIndex:obj.style.zIndex,
          background: obj.style.backColor,
          borderRadius:obj.style.borderRadius +'px'
        }"
    >
    </div> -->
    <div>
        <div class="lineBox">
          <span class="mNumber beforBox"> {{obj.style.warnMinVal}} m </span>
          <div
            class="lineStyle"
            :style="{
                width:obj.style.w + 'px',
                height:obj.style.h + 'px',
                zIndex:obj.style.zIndex
              }">
              <div class="warginRange" :style="warginRangeObj" > </div>
          </div>
          <span class="mNumber afterBox"> {{obj.style.warnMaxVal}} m </span>
        </div>

        <div class="tooltipBox">
            <div class="topTriangle" :style="{marginLeft:triangleLeft}" ></div>
            <div class="inforBox" :style="{marginLeft:inforBoxLeft}">
                漏水点位置：<span style="color:red;">{{obj.style.warnPoint}}</span> m <br/>
                报警区域：<span style="color:red;">{{obj.style.warnPoint - obj.style.warnRange}} ~ {{obj.style.warnPoint + obj.style.warnRange}}</span> m 
            </div>
        </div>
      </div>
  </div>
</template>

<script>

  import {mapState} from 'vuex'
  import global from '../common.vue'

  export default {
    name: 'svgAttr',
    props:["obj"],
    data () {
      return {
         value: [4, 8],
         visible:true,
         width:100,
         positionInfor:true,
         triangleLeft:0,
         inforBoxLeft:0,
      }
    },
    computed:{
      warginRangeObj(){
        //计算报警点在线中的位置
        let allLong =  global.accSub(this.obj.style.warnMaxVal,this.obj.style.warnMinVal); //漏水线总长度
        let partLong = global.accSub(this.obj.style.warnPoint,this.obj.style.warnMinVal); //报警点与起始点距离
        let percentage = global.accDiv(partLong,allLong); //报警点所在百分比
        let Range = global.accMul(this.obj.style.warnRange,2) //范围宽度
        let RangePercent = global.accDiv(Range,allLong); //报警范围的百分比
        let halfRangePercent = global.accDiv(RangePercent,2);
        let widthPercent = global.accSub(percentage,halfRangePercent); //报警点 - 一半的范围

        this.triangleLeft = global.accMul(percentage,100) +'%';

        return{
          width: global.accMul(RangePercent,100) + '%',
          left: global.accMul(widthPercent,100) + '%',
          height: this.obj.style.h +'px'
        }
      },
      // obj(){
      //   let inforBoxEle = document.getElementsByClassName("inforBox")[0].offsetWidth;

      // }
    },
    watch:{
      "obj.warnPoint": {
        handler(newName, oldName) {
           if(oldName == undefined){
             inforBoxLeft = "";
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

.lineStyle{
  width:100%;
  height:100%;
  border:0;
  background-color:rgba(121, 266, 252,0.67);
  position: relative;
}

.topTriangle{
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  margin-left:-5px;
}

.inforBox{
    padding:18px 20px;
    background: #FFF;
    min-width: 150px;
    max-width: 200px;
    border: 1px solid #EBEEF5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    word-break: break-all;
}

.tooltipBox{
  position: relative;
}

.warginRange{
  background-color: tomato;
  position: absolute;
}

.lineBox{
  position: relative;
}

.mNumber{
  position:absolute;
  top:-30px;
}

.beforBox{
  left:0;
}

.afterBox{
  right: 0;
}
</style>

