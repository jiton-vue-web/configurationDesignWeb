<template>
  <div>
   
    <div id="dragArea" class="page" @mousedown="createBlock" @mouseup="stopBlock" @mousewheel="scaleFun($event)" :style="{transform:`scale(${scale})`}">
      <div @drop="onDropText($event)" @dragover.prevent @keyup.delete="del($event)" tabindex="1" class="editorBox">
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
      <!-- <span ><el-slider v-model="scale" :min="0.1" :max="5"></el-slider></span>
      <span style="float:right;">放缩比：{{scaleVal + "%"}}</span> -->
       <el-slider v-model="scaleVal" :min="10" :max="500" :step="20" show-input> %
    </el-slider>
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
      del(e){
         if(e.code == "Delete"){
          this.$store.commit('removeComponents')
        }
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
      // handlActivate (obj) {
      //   console.log("211111")
      //   this.$store.commit('switchStatus', obj)
      // },
      // textRemove (id) {
      //   let items = this.$store.state.switchElement
      //   for (let i in items) {
      //     if (items[i].id === id) {
      //       items.splice(i, 1)
      //     }
      //   }
      // },
      scaleFun(e){
        var _this = this;
        if(e.ctrlKey && _this.scale > 0.1 && _this.scale <5) {
          var direction = e.deltaY>0?'down':'up';
          
          if(direction == "down"){
            _this.scale = _this.accSub(_this.scale, 0.2);
          }else{
            _this.scale = _this.accAdd(_this.scale , 0.2);
          }

         _this.scaleVal = _this.accMul(_this.scale,100)
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
        // return (num1*m+num2*m)/m;
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
      accMul(num1,num2){
          var m=0,s1=num1.toString(),s2=num2.toString(); 
          try{m+=s1.split(".")[1].length}catch(e){};
          try{m+=s2.split(".")[1].length}catch(e){};
          return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
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
    height: calc(100vh - 90px);
    width: 100%;
    background-color:#fff;
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
  }

  .sliderStyle{
    width:300px;
    position: fixed;
    bottom:30px;
  }

</style>
