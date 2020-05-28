<template>
  <div class="drawLayersStyle">
   <svg width="100%" height="100%" @click="addPoint($event)" @keyup.prevent="keyupCtrl($event)" tabindex="1" @mousewheel="scaleFun($event)" :style="{transform:`scale(${scale})`}" >
     　<polygon 
        v-for="(item,index) in pointObj"
        :key="index"
        :points="item"
        style="fill:rgb(186, 236, 248);stroke:rgb(14, 131, 159);stroke-width:2;fill-opacity:0.25"
        /> 
        <polygon 
        :points="pointArr"
        style="fill:rgb(186, 236, 248);stroke:rgb(14, 131, 159);stroke-width:2;fill-opacity:0.25"
        /> 
   </svg>
   <input type="hidden" :value="clearDate">
  </div>
</template>

<script>
import global from './common.vue'
export default {
  name: 'SvgIcon',
  data () {
    return{
      pointArr:"",
      pointObj:[]
    }
  },
  created(){
    window.addEventListener('mousewheel', function(event){
        if (event.ctrlKey === true || event.metaKey) {
              event.preventDefault();
        }
    },{ passive: false});

    //firefox
    window.addEventListener('DOMMouseScroll', function(event){
        if (event.ctrlKey === true || event.metaKey) {
              event.preventDefault();
        }
    },{ passive: false});
  },
  computed: {
    clearDate(){
      let model = this.$store.getters.getNowModel;
      if(!model){
          this.pointArr = "";
          this.pointObj = [];
      }
       return model;
    },
    scale(){
      return this.$store.getters.getScaleVal;
    }
  },
  created(){
      document.onselectstart = function(){return false;};
  },
  methods:{
    addPoint(event){
      // ctrKey键画任意角度多边形
      if(event.ctrlKey){
        var layer = event.currentTarget;
        var position = layer.getBoundingClientRect();
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        //第一个点，说明是新图形开始
        if(this.pointArr == ""){
          this.pointArr = this.pointArr + x +"," + y ;
        }else{
          this.pointArr = this.pointArr +" " + x +"," + y ;
        }
      }

      // shift键画水平垂直线
      if(event.shiftKey){
          var layer = event.currentTarget;
          var position = layer.getBoundingClientRect();
          let x = event.clientX - position.x;
          let y = event.clientY - position.y;
          //第一个点，说明是新图形开始
          if(this.pointArr == ""){
            this.pointArr = this.pointArr + x +"," + y ;
          }else{
            //只能与前一个点水平或垂直
            let pointArr = this.pointArr.split(' ');
            let xPoint = [];
            let yPoint = [];

            pointArr.forEach(item =>{
              let point = item.split(",");
              xPoint.push(Number(point[0]));
              yPoint.push(Number(point[1]));
            })

            if(Math.abs(x - xPoint[xPoint.length - 1]) <  Math.abs(y - yPoint[xPoint.length - 1])){
              this.pointArr = this.pointArr +" " + xPoint[xPoint.length - 1] +"," + y ;
            }else{
              this.pointArr = this.pointArr +" " + x +"," + yPoint[xPoint.length - 1];
            }
          }
      }
      if(!event.shiftKey && !event.ctrlKey){
         this.$message({
            message: '描图模式，无法对元素进行更多操作',
            type: 'warning'
          });
      }
    },
    keyupCtrl(){
        let pointArr = this.pointArr.split(' ');
        //大于两个点再生成控件
        if(pointArr.length>2){
          this.$store.commit('newSvgElement', this.pointArr);
          this.pointObj.push(this.pointArr)
        }

        this.pointArr = "";
    },
     scaleFun(e){
        var _this = this;
        if(e.ctrlKey && _this.scale > 0.2 && _this.scale <3) {
          var direction = e.deltaY>0?'down':'up';
          if(direction == "down"){
            this.$store.commit('scaleVal', global.accSub(_this.scale, 0.2))
          }else{
            this.$store.commit('scaleVal', global.accAdd(_this.scale, 0.2))
          }
         _this.scaleVal = global.accMul(_this.scale, 100);
        }
      }   
  },
  beforeDestroy() {
      document.onselectstart = function(){return true;};
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.drawLayersStyle{
  width: 100%;
  height:100%;
  width: calc(100vw - 647px);
  height: calc(100% - 30px);
  background-color:rgba(0,0,0,.45)
}

.drawLayersStyle>svg{
  transform-origin:0 0 0;
}
body{
  user-select:none;
}

</style>