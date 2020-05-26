<template>
  <div class="leakWaterStyle">
    <div :style="boxStyle">
        <div :style="lineBox">
          <div class="lengthInfor" v-if="obj.style.showStartEnd == 0 && obj.style.leakWaterPosition == 0">
            <span :style="[mNumber,beforBox]"> {{obj.style.startPoint == 0 ? obj.style.warnMinVal : obj.style.warnMaxVal}} m </span>
            <span :style="[mNumber,afterBox]"> {{obj.style.startPoint == 0 ? obj.style.warnMaxVal : obj.style.warnMinVal}} m </span>
          </div>
          <div
            class="lineStyle"
            :style="{
                width:obj.style.w + 'px',
                height:obj.style.h + 'px',
                zIndex:obj.style.zIndex
              }">
              <div class="warginRange" :style="warginRangeObj" v-if="obj.style.leakWaterPosition == 0"></div>
          </div>
        </div>

        <div class="topTriangle" :style="triangleStyle"  v-if="obj.style.showTooltip == 0 && obj.style.leakWaterPosition == 0"></div>
        <div class="inforBox" :style="tooltipBox" v-if="obj.style.showTooltip == 0 && obj.style.leakWaterPosition == 0">
            <div>漏水点位置：<span style="color:red;">{{obj.style.warnPoint}}</span> m <br/></div>
            <div>报警区域：<span style="color:red;">{{obj.style.warnPoint - obj.style.warnRange}} ~ {{obj.style.warnPoint + obj.style.warnRange}}</span> m </div>
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
         tooltipBox:{},
         triangleLeft:0,
         inforBoxLeft:0,
         tooltipWidth:200,
         triangleStyle:{},
         mNumber:{}
      }
    },
    computed:{
      boxStyle(){
          this.beforBox = {
            left:0,
            zIndex: 9999
          }

          this.afterBox = {
            right:0,
            zIndex: 9999
          }
        // 提示框在上
          if(this.obj.style.tooltipPosition == 0){

          this.tooltipBox = {
              width:this.tooltipWidth+'px',
              marginTop:'-85px',
              marginLeft:this.inforBoxLeft
          }

          this.triangleStyle = {
            marginLeft:this.triangleLeft,
            transform:'rotate(180deg)'
          }

          return {
            display:'flex',
            flexDirection: 'column-reverse'
          }

        }else{

          this.tooltipBox = {
              width:this.tooltipWidth+'px',
              marginTop:'0px',
              marginLeft:this.inforBoxLeft
          }

          this.triangleStyle = {
              marginLeft:this.triangleLeft,
          }

          return {
            display:'flex',
            flexDirection: 'column'
          }
        }
      },
      lineBox(){
        // 水平放置
          //米数在上
          if(this.obj.style.startEndPosition == 0){

            this.mNumber={
              position:'absolute',
              top:'-30px'
            }
            
            return {
              display:'flex',
              flexDirection: 'column'
            }

          }else{
             this.mNumber = {
              position:'absolute',
              top:this.obj.style.h + 5 +'px'
            }
            
            return {
              display:'flex',
              flexDirection: 'column-reverse'
            }
          }
      },
      warginRangeObj(){
        let allLong = global.accSub(this.obj.style.warnMaxVal,this.obj.style.warnMinVal); //漏水线总长度
        let partLong = Math.abs(global.accSub(this.obj.style.warnPoint,this.obj.style.startPoint == 0?this.obj.style.warnMinVal:this.obj.style.warnMaxVal)); //报警点与起始点距离
        let percentage = global.accDiv(partLong,allLong); //报警点所在百分比
        let Range = global.accMul(this.obj.style.warnRange,2) //报警范围宽度
        let RangePercent = global.accDiv(Range,allLong); //报警范围的百分比
        let halfRangePercent = global.accDiv(RangePercent,2); 
        let widthPercent = global.accSub(percentage,halfRangePercent); //报警点 - 一半的范围

        let halfWidth = global.accDiv(this.tooltipWidth,2); //一半的提示框宽度
        let percentHalfWidth = global.accDiv(halfWidth,this.obj.style.w); //一半提示框所占百分比
        let tooltipLeft = global.accSub(percentage,percentHalfWidth); // 报警点所在百分比 - 一半提示框所占百分比

        this.triangleLeft = percentage > 0 ? global.accMul(percentage,100) + '%' : 0;
        this.inforBoxLeft = tooltipLeft > 0 ? global.accMul(tooltipLeft,100) + '%': 0;

        return{
          width: RangePercent < 1 ? global.accMul(RangePercent,100) + '%' : '100%',
          left: widthPercent > 0 ? global.accMul(widthPercent,100) + '%':"0" ,
          height: this.obj.style.h +'px'
        }
      }

    },
    methods: {
      
    }
  }
</script>

<style>

.lineStyle{
  overflow: hidden;
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
}

.topTriangle.top{
    top: -20px;
    transform: rotate(180deg);
}

.inforBox{
    padding:18px 20px;
    background: #FFF;
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

.inforBox.top{
  top: -82px;
}

.lengthInfor{
  position: relative;
}

.warginRange{
  background-color: tomato;
  position: absolute;
}

.beforBox{
  left:0;
  z-index: 9999;
}

.afterBox{
  right: 0;
  z-index: 9999;
}

</style>

