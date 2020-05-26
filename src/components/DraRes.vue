<template>
  <svg @click="addPoint($event)" @keyup.prevent="keyupShift($event),littileMoveFun($event)"  tabindex="1" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
      <div div id="dragArea" class="page" @mousedown="createBlock" @mouseup="stopBlock" @mousewheel="scaleFun($event)" :style="{transform:`scale(${scale})`}" xmlns="http://www.w3.org/1999/xhtml">
        <div @drop="onDropText($event)" @dragover.prevent @keyup="keyboardEvent($event)" tabindex="1" class="editorBox">
          <view-text 
          v-for="(item,index) in modulesText" 
          :key="index" 
          :type="item.type"
          :detail="item"
          @getRefLineParams="getRefLineParams"
          :class="{disableStyle:item.disabled}"
          :style="{transform:'rotate('+item.style.rotate+'deg)',transformOrigin:0}"
           >
        </view-text>
        <div id="bgBlock"></div>
        
        </div>
        <span class="ref-line v-line" 
            v-for="(item,index) in vLine" 
            :key="'vLine'+index" v-show="item.display" 
            :style="{ left: item.position, top: item.origin, height: item.lineLength}">
        </span>

        <span class="ref-line h-line"
            v-for="(item,index) in hLine"
            :key="'hLine'+index"
            v-show="item.display"
            :style="{ top: item.position, left: item.origin, width: item.lineLength}">
        </span>
      </div>
    </foreignObject>
</svg>

</template>

<script>
  import {mapState} from 'vuex'
  import ViewText from './ViewText'
  import global from './common.vue'

  export default {
    components: {
      ViewText
    },
    data () {
      return {
        itemText: {},
        modulesImage: {},
        vLine: [],
        hLine: [],
        blockObj:{},
        blockBox:{},
        scaleVal:100,
        pointArr:"",
        oldY:null,
        isdown:false,
        deg:0
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
      modulesText(){
        return this.$store.getters.getAllComponents;
      },
      selectdate(){
        return this.$store.getters.getSelectedStatus;
      },
      scale(){
        let scaleNum = this.$store.getters.getScaleVal;
        this.scaleVal = global.accMul(scaleNum, 100);
        return scaleNum;
      }
    },
    mounted () {

    },
    methods: {

      addPoint(event){
        if(event.altKey){
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

      },
      littileMoveFun(event){
        //快捷键前后左右移动 
         // 下
        if(event.keyCode==40){
          this.$store.commit('littileMove', {x:0,y:1});
        }
        // 右
        if(event.keyCode==39){
          this.$store.commit('littileMove', {x:1,y:0});
        }

        // 上
        if(event.keyCode==38){
          this.$store.commit('littileMove', {x:0,y:-1});
        }
        // 左
        if(event.keyCode==37){
          this.$store.commit('littileMove', {x:-1,y:0});
        }
      },
      keyupShift(){
        let pointArr = this.pointArr.split(' ');
        // //大于两个点再生成控件
        if(pointArr.length == 2){
          this.$store.commit('createLine', this.pointArr);
        }
        this.pointArr = "";
      },
      //键盘响应快捷键
      keyboardEvent(e){

          // Delete
          if(e.code == "Delete"){
            this.$store.commit('removeComponents');
          }
          //Ctrl + C
          if(e.ctrlKey && e.keyCode === 67){
            console.log("Ctrl + C")
            this.$store.commit('setCopyComponents');
          }
          //Ctrl + V
          if(e.ctrlKey && e.keyCode === 86){
            console.log("Ctrl + V")
            this.$store.commit('pasteComponents');
          }

          //Ctrl + Z
          if(e.ctrlKey && e.keyCode === 90){
            console.log("Ctrl + Z")
            this.$store.commit('preState');
          }

          //Ctrl + S
          // if(e.ctrlKey && e.keyCode === 83){
          //   // this.$store.commit('saveData');
          //   // this.$message({
          //   //   message: '保存成功',
          //   //   type: 'success'
          //   // });
          //   console.log("Ctrl + S")
          //   return false;
          // }
      },
      getRefLineParams (params) {
        const {vLine, hLine} = params
        this.vLine = vLine
        this.hLine = hLine
      },
      
      //第一次加入编辑区
      onDropText (event) {
        event.preventDefault()
        var layer = event.currentTarget;
        var position = layer.getBoundingClientRect();

        this.$store.commit('viewZoneInfor', position);

        let infoJson = event.dataTransfer.getData('my-info')
        if(infoJson != ""){
            // this.$store.commit('saveCopyArr'); //通知复制副本
            this.itemText = JSON.parse(infoJson)
            this.itemText.style.x = event.clientX - position.x;
            this.itemText.style.y = event.clientY - position.y;
            this.itemText.id = (Math.random()*10000000).toString(16).substr(0,4);
            this.$store.commit('selectedStatus', [this.itemText])   
        }
      },
      createBlock(e) {
        this.$store.commit('selectedStatus', [])
        let bgBlock = document.getElementById('bgBlock');
        let dragArea = document.getElementById("dragArea");
        let initL = e.clientX;
        let initT = e.clientY;

        bgBlock.style.opacity = '0.3';
        bgBlock.style.width = 0 +'px';
        bgBlock.style.height = 0 + 'px';
        
        //存入框选起点，用于计算框选第一个选中的元素
        let viewZone = this.$store.getters.getViewZoneInfor;
 
        if(viewZone.x){
          this.$store.commit('setInitialPoint',{x:(initL-viewZone.x) , y:(initT - viewZone.y)});
          console.log("起始坐标 : ("+(initL-viewZone.x)+","+(initT - viewZone.y)+ ")")
        }

        document.onmousemove = (e)=> {
          let w = e.clientX - initL;
          let h = e.clientY - initT;
          bgBlock.style.width = Math.abs(w) + 'px';
          bgBlock.style.height = Math.abs(h) + 'px';

          this.blockObj.width = Math.abs(w);
          this.blockObj.height = Math.abs(h);

          if(e.clientX - initL > 0) {
            this.setPosition(bgBlock,initT- dragArea.offsetTop, initL-dragArea.offsetLeft);
          } else {
            this.setPosition(bgBlock,initT- dragArea.offsetTop+h, initL-dragArea.offsetLeft+w);
          }
        };

        document.onmouseup = () => {
          bgBlock.style.width = 0 +"px";
          bgBlock.style.height = 0 +"px";
          bgBlock.style.top = 0 +"px";
          bgBlock.style.left = 0 +"px";

          document.onmousemove = null;
          document.onmouseup = null;
          
        };

      },
      setPosition(obj, top, left) {
        if(top !== -1){
            obj.style.top = top + 'px';
            this.blockObj.top = top;
        } 
        if(left !== -1){
            obj.style.left = left + 'px';
            this.blockObj.left = left;
        } 
      },
      //停止框选
      stopBlock(e){
        if(this.blockObj.width){
          let obj = this.blockObj;
          let items = this.modulesText;
          let objArr = [];
          items.forEach(item => {
            if (Math.abs((obj.left + obj.width) - (item.style.x + item.style.w)) + Math.abs(obj.left - item.style.x) < (obj.width + item.style.w) &&
                Math.abs((obj.top + obj.height) - (item.style.y + item.style.h)) + Math.abs(obj.top - item.style.y) < (obj.height + item.style.h) && item.disabled == false) { 
                    item.active = true;
                    objArr.push(item)
                }
          });
          this.$store.commit('selectedStatus', objArr) 
        }
        
        this.blockObj = {}
      },
      remove () {
        this.modulesImage = {}
      },
      formatTooltip(val) {
        return val + "%";
      },
      changeVal(val){
        this.$store.commit('scaleVal', global.accDiv(val,100)) 
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
        }
      }
    }
  }
</script>
<style>
  .rectangle {fill: red;}

  .page {
    height: 100%;
    width: 100%;
    background-color:rgba(234, 159, 159, 0.2);
    /* background-color:#f5f5f5; */
    box-sizing: content-box;
    position: relative;
    transform-origin:0 0 0;
  }

  #bgBlock {
    display: block;
    position: absolute;
    background-color: rgba(161, 161, 161, 0.88);
    opacity: 0.3;
  }

  [tabindex] {
    outline: none !important;
  }

  .editorBox{
      height:100%;
      width: 100%;
      transform-origin:0 0 0;
  }

  .sliderStyle{
    width:310px;
    position: fixed;
    bottom:50px;
    right:350px;
  }

   .disableStyle{
    cursor: not-allowed;
    pointer-events: none; /*禁止鼠标点击事件*/
  }


</style>
