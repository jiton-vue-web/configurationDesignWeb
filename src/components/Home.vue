<template>
  <div>
    <el-container>
      <el-header>
        <el-row style="line-height: 68px;">
          <el-button size="mini" plain @click="setLeftOrTop(0)">
            <i class="iconfont icon-jurassic-left"></i>
          </el-button>
          <el-button size="mini" plain @click="setRightOrBottom(0)">
            <i class="iconfont icon-jurassic-right"></i>
          </el-button>
          <el-button size="mini" plain @click="setRightOrBottom(1)">
            <i class="iconfont icon-jurassic-bottom"></i>
          </el-button>
          <el-button size="mini" plain @click="setLeftOrTop(1)">
            <i class="iconfont icon-jurassic-top"></i>
          </el-button>
          <el-button size="mini" plain @click="setCenterOrMiddle(0)">
            <i class="iconfont icon-jurassic_horizalign-center"></i>
          </el-button>
          <el-button size="mini" plain @click="setCenterOrMiddle(1)">
            <i class="iconfont icon-jurassic_verticalalign-center"></i>
          </el-button>
        </el-row>
        <el-dropdown size="medium" split-button type="primary" @command="switchLang" class="res-btn">
          选择语言
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="cn">简体中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <basic-list></basic-list>
        </el-aside>
        <el-main>
          <dra-res id="zone"></dra-res>
        </el-main>
        <el-aside>
          <editor-style></editor-style>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import DraRes from './DraRes'
  import EditorStyle from './EditorStyle'
  import BasicList from './BasicList'
  import ViewText from './ViewText'
  import ViewImage from './ViewImage'

  export default {
    components: {
      DraRes,
      EditorStyle,
      BasicList,
      ViewText,
      ViewImage
    },
    data: function () {
      return {
        lists: {},
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
        
        this.$store.commit('selectedStatus', []) 
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
        
        this.$store.commit('selectedStatus', []) 
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

          console.log(minDistanceObj);
          console.log("直线距离");


          //所有元素最小值比较得出最终id
          let minDistanceArr = []
          minDistanceObj.forEach((element,index) =>{
            if(index == 0){
              minDistanceArr.push(element)
            }else{
              element.min < minDistanceArr[0].min ? minDistanceArr.unshift(element) : minDistanceArr.push(element)
            }
          })

          console.log("最小距离id" + minDistanceArr[0].id);
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
                  // arr[n].style.x = arr[n].style.x - (arr[n].style.w / 2) + arr[n].style.x - centerX; 
                }else{
                  // arr[n].style.y = arr[n].style.y - (arr[n].style.h / 2) + arr[n].style.y - centerY;
                    let y = arr[n].style.y + (arr[n].style.h / 2);
                    if(y > centerY){
                      arr[n].style.y = arr[n].style.y - Math.abs( y - centerY);
                    }else{
                      arr[n].style.x = arr[n].style.y + Math.abs( y - centerY);
                    }
                }
             }
              
          }

console.log("数组")
console.log(arr)
          this.$store.commit('selectedStatus', arr) 
      },
      //计算三角形斜边，用于计算选框起始点到选中元素四点之间的距离
      calcLine(pointArr){
        let point = this.$store.getters.getInitialPoint;
        let distanceArr = [];

        pointArr.forEach((item) =>{
          let tdWidth =  Math.abs(item[0] - point.x);
          let tdHeight = Math.abs(item[1] - point.y);
          let tdHr =  Math.sqrt(Math.pow(tdWidth ,2) + Math.pow(tdHeight ,2));
          distanceArr.push(tdHr)
        })

        return Math.min(...distanceArr)
      }

      // setCenterOrMiddle

      // leftJustify () {
      //   let textX = this.$store.state.textStyles.moveX
      //   let imageX = this.$store.state.imageStyles.moveX
      //   if (textX < imageX) {
      //     this.$store.state.imageStyles.moveX = textX
      //   } else {
      //     this.$store.state.textStyles.moveX = imageX
      //   }
      // },
      // rightJustify () {
      //   let textW = this.$store.state.textStyles.width
      //   let imageW = this.$store.state.imageStyles.width
      //   let textX = this.$store.state.textStyles.moveX + textW
      //   let imageX = this.$store.state.imageStyles.moveX + imageW
      //   if (textX > imageX) {
      //     this.$store.state.imageStyles.moveX = textX - imageW
      //   } else {
      //     this.$store.state.textStyles.moveX = imageX - textW
      //   }
      // },
      // bottomJustify () {
      //   let textH = this.$store.state.textStyles.height
      //   let imageH = this.$store.state.imageStyles.height
      //   let textY = this.$store.state.textStyles.moveY + textH
      //   let imageY = this.$store.state.imageStyles.moveY + imageH
      //   if (textY > imageY) {
      //     this.$store.state.imageStyles.moveY = textY - imageH
      //   } else {
      //     this.$store.state.textStyles.moveY = imageY - textH
      //   }
      // },
      // topJustify () {
      //   let textY = this.$store.state.textStyles.moveY
      //   let imageY = this.$store.state.imageStyles.moveY
      //   if (textY < imageY) {
      //     this.$store.state.imageStyles.moveY = textY
      //   } else {
      //     this.$store.state.textStyles.moveY = imageY
      //   }
      // },
      // horizalignCenter () {
      //   let textX = this.$store.state.textStyles.moveX;
      //   let imageX = this.$store.state.imageStyles.moveX;
      //   let tH = this.$store.state.textStyles.height / 2; //text高度的一半
      //   let iH = this.$store.state.imageStyles.height / 2; //image 高度的一半
      //   let icenterY = this.$store.state.imageStyles.moveY + iH; //image 中心线
      //   let tcenterY = this.$store.state.textStyles.moveY + tH;//text 中心线
      //   if (textX < imageX) {
      //     this.$store.state.imageStyles.moveY = tcenterY - iH;
      //   } else {
      //     console.log("图片中心线:"+icenterY+"------文字高度的一半："+tH+"------文字Y轴结果："+(icenterY - tH));
      //     this.$store.state.textStyles.moveY = icenterY - tH;
      //     console.log(this.$store.state.textStyles.moveY);
      //   }
      // },
      // verticalalignCenter(){
      //   let textX = this.$store.state.textStyles.moveX;
      //   let imageX = this.$store.state.imageStyles.moveX;
      //   let tW = this.$store.state.textStyles.width / 2; //text 宽度的一半
      //   let iW = this.$store.state.imageStyles.width / 2; //image 宽度的一半
      //   let icenterX = this.$store.state.imageStyles.moveX + iW; //image 中心线
      //   let tcenterX = this.$store.state.textStyles.moveX + tW; //text 中心线
      //   if (textX < imageX) {
      //     this.$store.state.imageStyles.moveX = tcenterX - iW;
      //   } else {
          // console.log("图片中心线:"+icenterX+"------文字宽度的一半："+tW+"------文字X轴结果："+(icenterX - tW));
          // this.$store.state.textStyles.moveX = icenterX - tW;
          // console.log(this.$store.state.textStyles.moveX);
      //   }
      // }
    },
    computed: {},

  }
</script>


<style scoped>
  .el-header, .el-footer {
    position: relative;
    background-color: #2080d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 200px;
  }

  .el-main {
    height: 865px;
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

  .flex-box {
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    margin-top: 60px;
  }
</style>
