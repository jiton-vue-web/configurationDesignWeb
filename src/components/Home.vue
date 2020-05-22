<template>
  <div>
    <el-container tabindex="1">
      <el-header>
        <el-row class="navStyle">
          <div @click="setLeftOrTop(0)">
            <i class="iconfont icon-jurassic-left"></i>
            <div class="iconText">左对齐</div>
          </div>
          <div @click="setRightOrBottom(0)">
            <i class="iconfont icon-jurassic-right"></i>
            <div class="iconText">右对齐</div>
          </div>
          <div @click="setRightOrBottom(1)">
            <i class="iconfont icon-jurassic-bottom"></i>
            <div class="iconText">下对齐</div>
          </div>
          <div @click="setLeftOrTop(1)">
            <i class="iconfont icon-jurassic-top"></i>
            <div class="iconText">上对齐</div>
          </div>
          <div @click="setCenterOrMiddle(0)">
            <i class="iconfont icon-jurassic_horizalign-center"></i>
            <div class="iconText">垂直对齐</div>
          </div>
          <div @click="setCenterOrMiddle(1)">
            <i class="iconfont icon-jurassic_verticalalign-center"></i>
            <div class="iconText">水平对齐</div>
          </div>
           <div @click="setJustify(1)">
            <i class="el-icon-more inconStyle"></i>
            <div class="iconText">水平等间距</div>
          </div>
          <div @click="setJustify(0)">
            <i class="el-icon-more inconStyle"></i>
            <div class="iconText">垂直等间距</div>
          </div>
          <div @click="ctrlZEvent()">
            <i class="el-icon-back inconStyle" ></i>
            <div class="iconText">撤销</div>
          </div>
          <div @click="openData()">
            <i class="el-icon-folder-opened inconStyle"></i>
            <div class="iconText">打开</div>
          </div>
          <div @click="save()">
            <i class="el-icon-folder-checked inconStyle"></i>
            <div class="iconText">保存</div>
          </div>
          <div @click="lockElement()">
            <i class="el-icon-circle-close inconStyle"></i>
            <div class="iconText">锁定</div>
          </div>
          <div @click="unLockElement()">
            <i class="el-icon-circle-check inconStyle"></i>
            <div class="iconText">解除锁定</div>
          </div>
          <div>
            <el-switch
              active-color="#13ce66"
              v-model="drawModel"
              @change="changeMode()">
            </el-switch>
            <div class="iconText">描图模式</div>
          </div>
          
        </el-row>
        
        <el-dropdown size="medium" split-button type="primary" @command="switchLang" class="res-btn">
          选择语言
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="cn">简体中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container style="position:relative;">
        <el-aside>
          <basic-list></basic-list>
        </el-aside>
        <el-main>
          <dra-res id="zone" style="height:100%;width:100%;"></dra-res>
        </el-main>
        <el-aside>
          <editor-style></editor-style>
        </el-aside>
        <drawLayers class="drawLayersStyle" v-if="drawLayersModel"></drawLayers>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import DraRes from './DraRes'
  import EditorStyle from './EditorStyle'
  import BasicList from './BasicList'
  import drawLayers from './drawLayers'
  import global from './common.vue'


  export default {
    components: {
      DraRes,
      EditorStyle,
      BasicList,
      drawLayers
    },
    data: function () {
      return {
        lists: {},
        drawModel:false
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      switchLang (lang) {
        this.$i18n.locale = lang
        localStorage.setItem('lang', lang)
      },
      //左对齐or 上对齐
      setLeftOrTop(val){
          let arr = this.$store.getters.getSelectedStatus;
          let numberArr = [];
          let sortObjArr = [];
          arr.forEach(item => {
            if(val == 0){
              numberArr.push(item.style.x)
            }else{
              numberArr.push(item.style.y)
            }
              
          })

          arr.forEach(item => {
              let obj = { 
                  id:item.id,
                  type:item.type,
                  style:item.style,
                  active:true
                };
              if(val == 0){
                obj.style.x = Math.min(...numberArr)
              }else{
                obj.style.y = Math.min(...numberArr)
              }
              sortObjArr.push(obj);
          })
        
        // this.$store.commit('selectedStatus', []) 
      },
      //右对齐or下对齐
      setRightOrBottom(val){
          let arr = this.$store.getters.getSelectedStatus;
          let numberArr = [];
          let sortObjArr = [];
          arr.forEach(item => {
            if(val == 0){
              numberArr.push(item.style.x + item.style.w)
            }else{
              numberArr.push(item.style.y + item.style.h)
            }
          })

          arr.forEach(item => {
              let obj = { 
                  id:item.id,
                  type:item.type,
                  style:item.style,
                  active:true
                };
              if(val == 0){
                obj.style.x = (Math.max(...numberArr) - obj.style.w)
              }else{
                obj.style.y = (Math.max(...numberArr) - obj.style.h)
              }
              sortObjArr.push(obj);
          })
        
        // this.$store.commit('selectedStatus', []) 
      },
      //水平，垂直等间距
      setJustify(val){
        let arr = this.$store.getters.getSelectedStatus;
        if(arr.length >2){
          if(val == 0){
            //水平等间距
            this.alignFun(arr,"x","w");
          }else{
            //垂直等间距
            this.alignFun(arr,"y","h");
          }
           
        }else{
           this.$message({
              message: '请选择两个以上元素',
              type: 'warning'
            });
        }
      },
      // 水平或垂直等间距
      alignFun(arr,n,m){
        let copyArr = [];

        let pointNum = [];
        let arrNum = [];

        arr.forEach((item,index)=>{
            pointNum.push(item.style[n]);
            arrNum.push(item.style[m]);

            let newArrt = {};
            let newStyle = {};

            for(var k in item.style){
              newStyle[k] = item.style[k];
            }

            for(var i in item){
              if(i == "style"){
                newArrt.style = newStyle;
              }else{
                newArrt[i] = item[i];
              }
            }
            copyArr.push(newArrt);
        })
          
          let minX = Math.min(...pointNum);
          let maxX = Math.max(...pointNum);
          let justifyWidth  = maxX - (minX + arrNum[pointNum.indexOf(minX)]);

          if(justifyWidth>0){
            //除首尾外元素外其他元素宽度求和
            let sumWidth = 0;
            arrNum.forEach((item,index) =>{
              if(index != pointNum.indexOf(minX) && index != pointNum.indexOf(maxX)){
                 sumWidth = sumWidth + item;
              }
            })

            //元素宽度小于或等于间距
            if(sumWidth <= justifyWidth){
              //元素间的间距,取整
              let everyWidth = parseInt(global.accDiv(global.accSub(justifyWidth,sumWidth),(arr.length - 1)));
              let newObjArr = [];

              var sortArr = function(a,b){ return a - b }
              pointNum.sort(sortArr);
               
              copyArr.forEach((item)=>{
                for(var i= 0 ,len = pointNum.length ;i<len;i++){
                    if(item.style[n] == pointNum[i]){
                      newObjArr[i] = item;
                    }
                }
              })

              for(var k = 1,len = newObjArr.length-1 ; k < len; k++){
                let perW = global.accAdd(newObjArr[k-1].style[n],newObjArr[k-1].style[m]);
                newObjArr[k].style[n] = global.accAdd(perW,everyWidth);
              }

              this.$store.commit('selectedStatus', newObjArr)

            }else{
              this.$message({
                message: '中间元素宽度之和大于首尾元素间距',
                type: 'warning'
              });
            }
            
          }else{
            this.$message({
              message: '元素水平间距小于或等于0',
              type: 'warning'
            });
          }

      },
      //居中or垂直对齐，基于框选元素的最左值和最右值，最上值和最下值
      setCenterOrMiddle(val){
          let _this = this;
          let arr = this.$store.getters.getSelectedStatus;
          let point = this.$store.getters.getInitialPoint;

          //计算选中控件的四个角坐标
          var elementPoint={};
          for(let i = 0, len = arr.length; i<len;i++){
               let ele = arr[i];
               elementPoint[ele.id] = 
               [[ele.style.x, ele.style.y] , 
               [(ele.style.x + ele.style.w), (ele.style.y + ele.style.h)] , 
               [(ele.style.x + ele.style.w), ele.style.y] , 
               [ele.style.x, (ele.style.y + ele.style.h)]];
          }

          // 计算框选初始点与被选元素之间的距离
          
          let minDistanceObj = [];
          for (let k in elementPoint){
            let minDistance = "";
            elementPoint[k].forEach((item,index) =>{
              //如果元素x,或y坐标与框选初始点相同，直线距离
              if(item[0].x == point.x || item[1].y == point.y){
                  minDistance = item[0].x == point.x ? Math.abs(item[1].y - point.y) : Math.abs(item[0].x - point.x);
              }
            })

            //循环之后如果没有得到直线值，则计算四点之间的距离
            if(minDistance == ""){
                minDistance = _this.calcLine(elementPoint[k]);
            }

            minDistanceObj.push({id:k,min:minDistance})
          }

          //所有元素最小值比较得出最终id
          let minDistanceArr = []
          minDistanceObj.forEach((element,index) =>{
            if(index == 0){
              minDistanceArr.push(element)
            }else{
              element.min < minDistanceArr[0].min ? minDistanceArr.unshift(element) : minDistanceArr.push(element)
            }
          })

          // minDistanceArr[0].id 即距离最近的控件
          let minObj = {};
          for(let i = 0, len = arr.length; i<len;i++){
              if(arr[i].id == minDistanceArr[0].id){
                  minObj = arr[i];
                  break;
              }
          }

           console.log(minDistanceArr[0]);
           console.log("最小距离对象");

          //计算距离，将其余组件中轴线与最近组件中轴线对齐
          let centerX = (minObj.style.x + (minObj.style.w / 2));
          let centerY = (minObj.style.y + (minObj.style.h / 2));

           for(let n = 0; n<arr.length; n++){
             //水平居中0，设置Y属性；垂直居中1，设置x属性
             //最近元素本身不需要移动
             if(arr[n].id != minObj.id){
               if(val == 0){
                    let x = arr[n].style.x + (arr[n].style.w / 2);
                    if(x > centerX){
                      arr[n].style.x = arr[n].style.x - Math.abs( x - centerX);
                    }else{
                      arr[n].style.x = arr[n].style.x + Math.abs( x - centerX);
                    }
                }else{
                    let y = arr[n].style.y + (arr[n].style.h / 2);
                    if(y > centerY){
                      arr[n].style.y = arr[n].style.y - Math.abs( y - centerY);
                    }else{
                      arr[n].style.y = arr[n].style.y + Math.abs( y - centerY);
                    }
                }
             }
              
          }

          console.log("数组")
          console.log(arr)
          // this.$store.commit('selectedStatus', arr) 
          // this.$store.commit('selectedStatus', []) 
      },
      //计算三角形斜边，用于计算选框起始点到选中元素四点之间的距离
      calcLine(pointArr){
        let point = this.$store.getters.getInitialPoint;
        console.log("fun起始坐标 : ("+point.x+","+point.y+ ")")
        let distanceArr = [];

        pointArr.forEach((item) =>{
          let tdWidth =  Math.abs(item[0] - point.x);
          let tdHeight = Math.abs(item[1] - point.y);
          let tdHr =  Math.sqrt(Math.pow(tdWidth ,2) + Math.pow(tdHeight ,2));
          distanceArr.push(tdHr)
        })

        return Math.min(...distanceArr)
      },
      ctrlZEvent(){
        this.$store.commit('preState');
      },
      saveData(e){
         console.log("Ctrl + S")
          //Ctrl + S
          if(e.ctrlKey && e.keyCode === 83){
            console.log("Ctrl + S")
            this.save();
            e.preventDefault();  
            return false;
          }
      },
      //保存已有数据
      save(){
        this.$store.commit('saveData');
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      },
      //显示保存的数据
      openData(){
          this.$store.commit('showData');
      },
      //锁定元素
      lockElement(){
          this.$store.commit('lockElement');
      },
      //解除元素锁定
      unLockElement(){
          this.$store.commit('unLockElement');
      },
      changeMode(){
        this.$store.commit('setDrawLayersModel',! this.drawLayersModel);
      }
    },
    computed: {
      drawLayersModel() {
        this.drawModel = this.$store.getters.getNowModel;
        return this.$store.getters.getNowModel; 
      }
    }
  }
</script>


<style scoped>
  .el-header, .el-footer {
    position: relative;
    background-color: #333;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 200px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .res-btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .head-font {
    margin: 10px 0;
    color: #3a8ee6;
  }

  .el-main{
     border:1px solid #ccc;
     padding:0;
     margin:15px;
  }

  .flex-box {
    margin-top: 60px;
  }

  .inconStyle{
    font-weight: bold;
    font-size: 16px;
  }

  .navStyle{
      display:flex;
      margin-top:5px;
  }

  .navStyle>div{
      padding:0 15px;
      color:#ccc;
      font-size: 24px;
      font-weight:100;
  }

  

  .navStyle div i{
      font-size: 24px;
      font-weight:100;
  }

  .navStyle div.iconText{
    font-size: 12px;
  }

   .navStyle div:hover{
      color:#fff;
  }

  .drawLayersStyle{
    width:calc(100vw - 647px);
    height:calc(100% - 30px);
    position: absolute;
    z-index:9999;
    background:rgba(0,0,0,0);
    top:15px;
    left:315px;
  }




</style>
