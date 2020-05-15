<template>
  <div>
   
    <div id="dragArea" class="page" @mousedown="createBlock" @mouseup="stopBlock" @mousewheel="scaleFun($event)" :style="{transform:`scale(${scale})`}">
      <div @drop="onDropText($event)" @dragover.prevent @keyup="keyboardEvent($event)" tabindex="1" class="editorBox">
        <view-text 
          v-for="(item,index) in modulesText" 
          :key="index" 
          :type="item.type"
          :detail="item"
          @getRefLineParams="getRefLineParams"
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

    <div class="sliderStyle">
       <el-slider v-model="scaleVal" :min="20" :max="300" :step="20" show-input @input="changeVal" :format-tooltip="formatTooltip"></el-slider>
    </div>
    
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ViewText from './ViewText'
  import ViewImage from './ViewImage'

  export default {
    components: {
      ViewText,
      ViewImage
    },
    data () {
      return {
        itemText: {},
        modulesImage: {},
        vLine: [],
        hLine: [],
        blockObj:{},
        blockBox:{},
        scale:1,
        scaleVal:100,
        divW:`100%`,
        divH:`100%`
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
    mounted () {
     
    },
    methods: {
      //键盘响应快捷键
      keyboardEvent(e){

          // Delete
          if(e.code == "Delete"){
            this.$store.commit('removeComponents');
          }
          //Ctrl + C
          if(e.ctrlKey && e.keyCode === 67){
            console.log("Ctrl + C")
            this.$store.commit('copyComponents');
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

        console.log(position)
        console.log("多位小数")

        this.$store.commit('viewZoneInfor', position) 
        console.log(position)
          let infoJson = event.dataTransfer.getData('my-info')
          if(infoJson != ""){
              this.itemText = JSON.parse(infoJson)
              this.itemText.style.x = event.clientX - position.x;
              this.itemText.style.y = event.clientY - position.y;
              this.itemText.id = (Math.random()*10000000).toString(16).substr(0,4);
              let component = this.itemText;

              let obj= {
                id:component.id,
                style:component.style,
                type:component.type,
                active:true
                }

              this.$store.commit('selectedStatus', [obj])   
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
                Math.abs((obj.top + obj.height) - (item.style.y + item.style.h)) + Math.abs(obj.top - item.style.y) < (obj.height + item.style.h)) { 
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
         this.scale = this.accDiv(val,100);
      },
      scaleFun(e){
        var _this = this;
        if(e.ctrlKey && _this.scale > 0.2 && _this.scale <3) {
          var direction = e.deltaY>0?'down':'up';
          if(direction == "down"){
            _this.scale = _this.accSub(_this.scale, 0.2);
          }else{
            _this.scale = _this.accAdd(_this.scale , 0.2);
            // _this.divW = _this.accMul(_this.scale,viewZone.height) + "px";
            // _this.divH = _this.accMul(_this.scale,viewZone.height) + "px";
          }

         _this.scaleVal = _this.accMul(_this.scale,100);
        }
      },
       // 两个浮点数求和
      accAdd(num1,num2){
        var r1,r2,m;
        try{
            r1 = num1.toString().split('.')[1].length;
        }catch(e){
            r1 = 0;
        }
        try{
            r2=num2.toString().split(".")[1].length;
        }catch(e){
            r2=0;
        }
        m=Math.pow(10,Math.max(r1,r2));
        return Math.round(num1*m+num2*m)/m;
      },
      // 两个浮点数相减
      accSub(num1,num2){
        var r1,r2,m;
        try{
            r1 = num1.toString().split('.')[1].length;
        }catch(e){
            r1 = 0;
        }
        try{
            r2=num2.toString().split(".")[1].length;
        }catch(e){
            r2=0;
        }
        m=Math.pow(10,Math.max(r1,r2));
        let n=(r1>=r2)?r1:r2;
        return Number((Math.round(num1*m-num2*m)/m).toFixed(n));
      },
      // 两个浮点数相乘
      accMul(num1,num2){
          var m=0,s1=num1.toString(),s2=num2.toString(); 
          try{m+=s1.split(".")[1].length}catch(e){};
          try{m+=s2.split(".")[1].length}catch(e){};
          return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
      },
      // 两个浮点数相除
      accDiv(num1,num2){
          var t1,t2,r1,r2;
          try{
              t1 = num1.toString().split('.')[1].length;
          }catch(e){
              t1 = 0;
          }
          try{
              t2=num2.toString().split(".")[1].length;
          }catch(e){
              t2=0;
          }
          r1=Number(num1.toString().replace(".",""));
          r2=Number(num2.toString().replace(".",""));
          return (r1/r2)*Math.pow(10,t2-t1);
        }
    },
    computed: {
      modulesText(){
        return this.$store.getters.getAllComponents;
      },
      selectdate(){
        return this.$store.getters.getSelectedStatus;
      }
    }
  }
</script>
<style>
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

</style>
