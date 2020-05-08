<template>
  <div>
    <div id="dragArea" class="page" @mousedown="createBlock" @mouseup="stopBlock">

      <!--<div @drop="onDropImg($event)" @dragover.prevent style="height:100%;width: 100%;">
        <view-image :detail="modulesImage" @remove="remove" tabindex="1"></view-image>
      </div>-->
   <!-- <div v-for="(ele,i) in modulesText" :key="i" style="margin-bottom:10px;border-bottom:1px solid red;">
        {{ele.id}} -- {{ele.active}}
   </div> -->

      <div @drop="onDropText($event)" @dragover.prevent style="height:100%;width: 100%;">
 
        <view-text 
          v-for="(item,index) in modulesText" 
          :key="index" 
          :type="item.type"
          :detail="item"
          @getRefLineParams="getRefLineParams"
          @remove="textRemove(item.id)"
           >
        </view-text>
        <!-- @activated="handlActivate(item)" -->
         <!-- <div id="selectedZone" >
            
        </div> -->

        <div id="bgBlock" @dragstart="ondragstart($event)" @dragend.prevent="ondragend($event)" draggable="true" @mousedown="onmousedown($event)"></div>
        <!-- <div id="bgBlock"></div> -->

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
        blockBox:{}
      }
    },
    created(){
    // $nextTick  //page
    },
    mounted () {
    },
    methods: {
      getRefLineParams (params) {
        const {vLine, hLine} = params
        this.vLine = vLine
        this.hLine = hLine
      },
      onDropImg (event) {
        event.preventDefault()
        let infoJson = event.dataTransfer.getData('my-info')
        this.modulesImage = JSON.parse(infoJson)
      },
      //第一次加入编辑区
      onDropText (event) {
        event.preventDefault()
        // 如果是移动框选区域
        // if(event.dataTransfer.getData("clockBox")== "clockBox"){
        //     console.log(event);
        // }else{
          let infoJson = event.dataTransfer.getData('my-info')
          if(infoJson != ""){
              this.itemText = JSON.parse(infoJson)
              var layer = event.currentTarget;
              var position = layer.getBoundingClientRect();
              this.itemText.style.x = event.clientX - position.x;
              this.itemText.style.y = event.clientY - position.y;
              this.itemText.id = (Math.random()*10000000).toString(16).substr(0,4);
              let component = this.itemText;
              // this.$store.commit('components', {component})
              let obj= {
                id:component.id,
                style:component.style,
                type:component.type
                }
              this.$store.commit('selectedStatus', {operate:1,obj:null}) 
              this.$store.commit('selectedStatus', {operate:0,obj:obj})   

          }
         
      // }
      },
      createBlock(e) {
        let bgBlock = document.getElementById('bgBlock');
        let dragArea = document.getElementById("dragArea");
        let initL = e.clientX;
        let initT = e.clientY;
        bgBlock.style.opacity = '0.3';
        bgBlock.style.width = 0 +'px';
        bgBlock.style.height = 0 + 'px';
        document.onmousemove = (e)=> {
          let w = e.clientX - initL;
          let h = e.clientY - initT;
          bgBlock.style.width = Math.abs(w) + 'px';
          bgBlock.style.height = Math.abs(h) + 'px';

          this.blockObj.width = Math.abs(w);
          this.blockObj.height = Math.abs(h);
          // this.blockObj = {
          //   width:Math.abs(w),
          //   height:Math.abs(h)
          // }

          if(e.clientX - initL > 0) {
            this.setPosition(bgBlock,initT- dragArea.offsetTop, initL-dragArea.offsetLeft);
          } else {
            this.setPosition(bgBlock,initT- dragArea.offsetTop+h, initL-dragArea.offsetLeft+w);
          }
        };
        document.onmouseup = () => {
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
      stopBlock(){
        if(this.blockObj.width){
          console.log(this.blockObj)
          let obj = this.blockObj;
          let items = this.modulesText;
          this.$store.commit('selectedStatus',  {operate:1,obj:null})  
    
          items.forEach(item => {
            if (Math.abs((obj.left + obj.width) - (item.style.x + item.style.w)) + Math.abs(obj.left - item.style.x) < (obj.width + item.style.w) &&
                Math.abs((obj.top + obj.height) - (item.style.y + item.style.h)) + Math.abs(obj.top - item.style.y) < (obj.height + item.style.h)) { 
                    this.$store.commit('switchStatus', {operate:1,obj:item}) 
                    this.$store.commit('selectedStatus',  {operate:0,obj:item}) 
                }
          });
        }
        
        this.blockObj = {}
      },
      onmousedown(ev){
        ev.stopPropagation()
      },
      ondragstart(ev){
        ev.dataTransfer.setData("blockBox",ev.target.id);
        this.blockBox = {
          left:ev.clientX,
          top:ev.clientY
        }
      },
      ondragend(ev){
          let bgBlock = document.getElementById('bgBlock');
          bgBlock.style.top = (ev.clientX - this.blockBox.left);
          bgBlock.style.left = (ev.clientY - this.blockBox.top );
          let left = (ev.clientX - this.blockBox.left);
          let top = (ev.clientY - this.blockBox.top );
          this.elementDrag(top,left);
          
      },
      elementDrag(top,left){
          let arr = this.$store.getters.getSelectedStatus;
          arr.forEach(ele =>{
            ele.style.x = (ele.style.x + left);
            ele.style.y = (ele.style.y + top)
          })

          this.$store.commit('setselectedComponents', this.selectdate) 
      },
      remove () {
        this.modulesImage = {}
      },
      // handlActivate (obj) {
      //   console.log("211111")
      //   this.$store.commit('switchStatus', obj)
      // },
      textRemove (id) {
        let items = this.$store.state.switchElement
        for (let i in items) {
          if (items[i].id === id) {
            items.splice(i, 1)
          }
        }
      },

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
    height: 800px;
    width: 100%;
    border: 1px solid red;
    box-sizing: content-box;
    position: relative;
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

</style>
