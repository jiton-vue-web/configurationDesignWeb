<template>
    <svg xmlns="http://www.w3.org/2000/svg" >
      <foreignobject width="120" height="50">
    <div id="dragArea" class="page" @mousedown="createBlock" @mouseup="stopBlock" @mousewheel="scaleFun($event)" :style="{transform:`scale(${scale})`}" xmlns="http://www.w3.org/1999/xhtml">
      <!-- <div @drop="onDropText($event)" @dragover.prevent @keyup="keyboardEvent($event)" tabindex="1" class="editorBox">
        <view-text 
          v-for="(item,index) in modulesText" 
          :key="index" 
          :type="item.type"
          :detail="item"
          @getRefLineParams="getRefLineParams"
          :class="{disableStyle:item.disabled}"
          :style="{transform:'rotate('+item.style.rotate+'deg)'}"
           >
        </view-text>
        <div id="bgBlock"></div>

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

      </div> -->
      <p>hello</p>
    </div>
      </foreignobject>
              <path d="M0,380C90,30 90,380 300,38" stroke='#ccc' stroke-width='1.5px' fill='none'></path>

    <!-- <div class="sliderStyle">
       <el-slider v-model="scaleVal" :min="20" :max="300" :step="20" show-input @input="changeVal" :format-tooltip="formatTooltip"></el-slider>
    </div> -->
    
  </svg>
    
</template>

<script>
  /* eslint-disable */

  export default {
    name: "HomePage",
    data() {
      return {
          vLine: [],
          hLine: [],
          width:0,
          height:0,
          x:0,
          y:0
      }
    },
    methods: {
      drag(e) {
        e.stopPropagation();
        let odiv = e.target;
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;
        let dragArea = document.getElementById("dragArea");
        document.onmousemove = (e)=>{
          let left = e.clientX - disX;
          let top = e.clientY - disY;
          left = Math.min(Math.max(0, left),dragArea.offsetWidth-odiv.offsetWidth);
          top = Math.min(Math.max(0, top),dragArea.offsetHeight-odiv.offsetHeight);
          this.setPosition(odiv, top, left);
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      },
      setPosition(obj, top, left) {
        console.log(obj.style.top,obj.style.left)
       if(top !== -1) obj.style.top = top + 'px';
        if(left !== -1) obj.style.left = left + 'px';
      },
      setSize(obj, width, height) {
        obj.style.width = width + 'px';
        obj.style.height = height + 'px';
      },
      getMaxWH(obj) {
        var maxWidth=0,maxHeight=0;
        obj.forEach(item=> {
          if(item.offsetWidth>maxWidth) maxWidth = item.offsetWidth;
          if(item.offsetHeight>maxHeight) maxHeight = item.offsetHeight;
        })
        return {maxWidth, maxHeight};
      },
      getChooseObj(obj,minL,maxL,minT,maxT) {
        let choose = [];
        obj.forEach(item=>{
          let left = item.offsetLeft;
          let top = item.offsetTop;
          if(left > minL && left < maxL-item.offsetWidth && top > minT && top < maxT-item.offsetHeight) {
            choose.push(item);
          }
        });
        return choose;
      },
      setAlign(direction) {
        let dragArea = document.getElementById("dragArea");
        let divArr = document.querySelectorAll('#dragArea>div');
        let bgBlock = document.getElementById('bgBlock');
        let minT = bgBlock.offsetTop,maxT = minT + bgBlock.offsetHeight,
          minL = bgBlock.offsetLeft, maxL = minL + bgBlock.offsetWidth;
        if(bgBlock.offsetWidth)  {
          divArr = this.getChooseObj(divArr,minL,maxL,minT,maxT);
        }
        let maxInfo = this.getMaxWH(divArr);
        divArr.forEach((item) => {
          switch (direction) {
            case 'top':
              this.setPosition(item, 0, -1); break;
            case 'left':
              this.setPosition(item, -1, 0); break;
            case 'right':
              this.setPosition(item, -1, dragArea.offsetWidth - item.offsetWidth); break;
            case 'bottom':
              this.setPosition(item, dragArea.offsetHeight - item.offsetHeight, -1); break;
            case 'vertical':
              this.setPosition(item,  parseInt((dragArea.offsetHeight - item.offsetHeight)/2), -1); break;
            case 'horizonal':
              this.setPosition(item,  -1, parseInt((dragArea.offsetWidth - item.offsetWidth)/2)); break;
            case 'size':
              this.setSize(item, maxInfo.maxWidth, maxInfo.maxHeight);
          }

        });
        bgBlock.style.opacity = '0';
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
          bgBlock.style.height =Math.abs(h) + 'px';
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
        onResize(x,y,width,height){
            this.x=x;
            this.y=y;
            this.width=width;
            this.height=height
        },
        onDrag(x,y){
            this.x=x;
            this.y=y
        },
        // 辅助线回调事件
        getRefLineParams (params) {
            const { vLine, hLine } = params
            this.vLine = vLine
            this.hLine = hLine
        }
    },
  }
</script>

<style scoped>

   #dragArea {
        width: 900px;
        height: 400px;
        background-color: #e1e1e1;
        opacity:0.5;
        position: relative;
        margin-top: 30px;
    }
    #dragArea > div {
        width:100px;
        height:100px;
        /*background-color: green;*/
        position: absolute;
    }
    #dragArea > div:nth-of-type(2) {
        width:120px;
        height:120px;
        background-color: darkred;
    }
    #dragArea > div:nth-of-type(3) {
        width:140px;
        height:140px;
        background-color: orange;
    }
    #dragArea > div:nth-of-type(4) {
        width:50px;
        height:50px;
        background-color: aqua;
    }
    #bgBlock {
        display: block;
        position: absolute;
        background-color: rgba(161, 161, 161, 0.88);
        opacity: 0.3;
    }

</style>