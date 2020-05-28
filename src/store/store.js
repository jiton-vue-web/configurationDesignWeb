import Vue from 'vue'
import Vuex from 'vuex'
import jsonBase from '../../static/json/basic.json';

Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true, //开启了严格模式
  state: {
    switchElement: [], //编辑区所有控件
    copySwitchElement: "", //保存上一次状态转化为json作为副本保存，撤销操作时使用此状态
    copyFlag:0,//是否使用上一状态 0：否 1：是
    selectedComponents:[], //当前选中的控件
    copyComponents:[],
    initialPoint:{},//框选起始点
    viewZone:{}, //放置组件的区域范围信息
    scaleVal:1,//编辑区放大倍数
    attrObj:{}, //右侧需要显示的属性信息
    drawLayersModel:false,//是否描图模式
    dragStartData:[], //图形区域最初大小备份
  },
  getters: {
    saleProducts: (state) => {
      let saleProducts = state.products.map(item => {
        return {
          name: item.name + '**',
          price: item.price
        }
      })
      return saleProducts
    },
    getAllComponents:(state)=>{
      return state.switchElement;
    },
    getSelectedStatus:(state)=>{
      return state.selectedComponents
    },
    getViewZoneInfor:(state)=>{
      return state.viewZone
    },
    getInitialPoint:(state)=>{
      return state.initialPoint
    },
    getAttrObj:(state)=>{
      return state.attrObj;
    },
    getActiveSvg:(state)=>{
      return state.activeSvg;
    },
    getAllSvg:(state)=>{
      return state.allSvg;
    },
    getNowModel:(state)=>{
      return state.drawLayersModel;
    },
    getScaleVal:(state)=>{
      return state.scaleVal;
    }
  },
  mutations: {
    reducePrice: (state, payload) => {
      state.products.forEach(product => {
        product.price += payload
      })
    },
    //保存编辑区面积信息
    viewZoneInfor:(state,payload)=>{
        state.viewZone = payload;
    },
    //单条数据，插入当前选中的控件or更新现有控件
    selectedStatus:(state, payload) => {
        // 去重
        let flag = [];
        let arr = [];

        //所有状态设为false
        state.switchElement.forEach((element,j) =>{
            let detailObj = element;
            let obj = {}
            for(var i in detailObj){
                obj[i] = detailObj[i];
            }
            obj.active = false;
            arr.push(obj);
        })

        //已选加入到所有组件中
        payload.forEach((ele,i)=>{
              state.switchElement.forEach((item,index) =>{
                if(item.id == ele.id){
                    arr.splice(index,1,ele);
                    flag.push(index)
                }
            })
        });
        
        //无重复说明是新增元素
        if(flag.length == 0 && payload.length == 1){
          arr.push(payload[0]);
          state.copySwitchElement = JSON.stringify(state.switchElement);
        }

        state.selectedComponents = payload;
        state.switchElement = arr;

      console.log("已选中")
      console.log(state.selectedComponents)
      console.log("----")

    },
    //单个插入，添加到已选数组
    addSelectedStatus:(state, payload) => {
      // 框选之后直接ctrl多选，需要去重
      let repeatIndex = "";
      let arr = [];
      state.selectedComponents.forEach((item,index) =>{
        if(item.id == payload.id){
            repeatIndex = payload.id;
        }else{
            arr.push(item)
        }
      })
       
      // 没有重复直接插入，有则无需操作
      if(repeatIndex == ""){
        state.selectedComponents.push(payload);
      }
      state.copySwitchElement = JSON.stringify(state.switchElement);
      state.switchElement.forEach(item => {
          if(item.id == payload.id){
            item.active = true;
          }
      })
    },
    //保存框选起始点坐标
    setInitialPoint:(state,payload) => {
      state.initialPoint = payload;
    },

    components (state, payload) {
      state.components.push(payload.component)
    },
    updateTextStyleResize (state, payload) {
      //某个对象宽高变化
        //多选拖拽
        if(state.selectedComponents.length>1){
            state.switchElement.forEach(item => {
              if(item.active == true){                
                if('rotate' in payload){
                  item.style.rotate = payload.rotate
                }else{
                  item.style.w = payload.w
                  item.style.h = payload.h
                }
              } 
                
            }) 
        }else{
          //单选赋值，匹配选中元素，赋值
          state.switchElement.forEach(item => {
            if(item.id == state.selectedComponents[0].id){
              if('rotate' in payload){
                item.style.rotate = payload.rotate
              }else{
                item.style.x = payload.x
                item.style.y = payload.y
                item.style.w = payload.w
                item.style.h = payload.h
              }
            }
          })
        }

    },
    //数据停止拖拽时执行
    updateTextStyleDrag (state, payload) {
      state.switchElement.forEach(item => {
        if(item.id == payload.id){
          item.style.x = payload.x
          item.style.y = payload.y
        }
      })
    },
    //右侧属性值改变时，修改组件属性
    changeAttr(state,payload){
      state.copySwitchElement = JSON.stringify(state.switchElement);
      payload.selectedId.forEach(ele =>{
        state.switchElement.forEach(item => {
          if(payload.selectedId.indexOf(item.id) != -1){
            item.style[payload.attr] = payload.value
          }
        })
      })
    },
    //响应上下左右位移
     littileMove (state, payload) {
      state.switchElement.forEach(item => {
        if(item.active == true){
          item.style.x = item.style.x + payload.x
          item.style.y = item.style.y + payload.y
        }
      })
    },
    saveCopyArr(state,payload){
      state.copySwitchElement = JSON.stringify(state.switchElement);
    },
    // 保存编辑放大倍数
    scaleVal(state,payload){
      state.scaleVal = payload;
    },
    //删除正常模式选中元素
    removeComponents:(state) => {
      let allElementArr = [];

      state.copySwitchElement = JSON.stringify(state.switchElement);

      state.switchElement.forEach(item => {
        if(item.active == false){
            allElementArr.push(item)
        }
      })

      state.selectedComponents = [];
      state.switchElement = allElementArr;

    },
     //复制选中元素
     setCopyComponents:(state) =>{

      state.copyComponents = [];
       //引用类型数据需要给副本循环赋值
      state.selectedComponents.forEach(item => {

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
        state.copyComponents.push(newArrt);
      })

    },
     //粘贴元素，复制元素数组与所有元素数组合并
     pasteComponents:(state) =>{
        let newcopyComponents = [];
        state.copyComponents.forEach(item => {

          let newStyle = {};
          let newArrt = {};
  
          for(var i in item.style){
            switch(i) {
                case "x": newStyle.x = item.style.x + 5; break;
                case "y": newStyle.y = item.style.y + 5; break;
                case "zIndex": newStyle.zIndex = item.style.zIndex + 1; break;
                default: newStyle[i] = item.style[i];
            } 
          }

          for(var k in item){
            switch(k) {
              case "style": newArrt.style = newStyle; break;
              case "id": newArrt.id = (Math.random()*10000000).toString(16).substr(0,4); break;
              default: newArrt[k] = item[k];
            }
          }
          newcopyComponents.push(newArrt)
        })
        state.copyComponents = newcopyComponents;
        state.selectedComponents = newcopyComponents;

        state.copySwitchElement = JSON.stringify(state.switchElement);

        state.switchElement.forEach(item =>{
          item.active = false;
        })

        state.switchElement = state.switchElement.concat(newcopyComponents);
     },
     //返回上一状态
     preState:(state) =>{
        if(state.copySwitchElement != ""){
            state.switchElement = JSON.parse(state.copySwitchElement);
        }else{
            state.switchElement = []
        }
     },
    
     //保存数据
     saveData:(state) =>{
       if(state.switchElement.length>0){
          window.localStorage.setItem('graphData', JSON.stringify(state.switchElement));
       }
     },
     //显示保存的数据
     showData:(state) =>{
        state.switchElement = JSON.parse(window.localStorage.getItem('graphData'));
     },
     //锁定元素
     lockElement:(state) =>{
        state.copySwitchElement = JSON.stringify(state.switchElement);
        state.switchElement.forEach((item) =>{
          if(item.active == true){
             item.disabled = true;
             item.active = false;
          }
        })
     },
     //元素锁定
     unLockElement:(state) =>{
      state.copySwitchElement = JSON.stringify(state.switchElement);
      state.switchElement.forEach((item) =>{
        if(item.disabled == true){
           item.disabled = false;
        }
      })
    },
    setDrawLayersModel:(state,val)=>{
        state.drawLayersModel = val;
    },
    //描图模式新建svg图形
    newSvgElement:(state,payload)=>{
      //新建svg图形对象
      let svgObj = {};
      let allTypeObj = jsonBase.items;
      for(var i = 0 ,len = allTypeObj.length;i<len;i++){
          if(allTypeObj[i].type == "svgGraph"){
            for(var k in allTypeObj[i]){
              if(k == "style"){
                svgObj.style = {}
                for(var j in allTypeObj[i].style){
                  svgObj.style[j] = allTypeObj[i].style[j]
                }
              }else{
                svgObj[k] = allTypeObj[i][k];
              }
            }
            break;
          }
      }

      let pointArr = payload.split(' ');
      let xPoint = [];
      let yPoint = [];

      pointArr.forEach(item =>{
        let point = item.split(",");
        xPoint.push(Number(point[0]));
        yPoint.push(Number(point[1]));
      })

     let xMinPoint = Math.min(...xPoint);
     let yMinPoint = Math.min(...yPoint);
     let xMaxPoint = Math.max(...xPoint);
     let yMaxPoint = Math.max(...yPoint);


      svgObj.id = (Math.random()*10000000).toString(16).substr(0,4);
      
      svgObj.style.x = xMinPoint;
      svgObj.style.y = yMinPoint;
      svgObj.style.w = xMaxPoint - xMinPoint;
      svgObj.style.h = yMaxPoint - yMinPoint;

      svgObj.style.pointArr = payload;

      let newPointString = "";
      xPoint.forEach((item,index) =>{
        newPointString = newPointString +" "+ (xPoint[index] - xMinPoint) +"," + (yPoint[index] - yMinPoint); 
      })

      svgObj.style.pointArr = newPointString.trim();

      state.copySwitchElement = JSON.stringify(state.switchElement);
      state.switchElement.push(svgObj);
    },
    createLine:(state,payload)=>{
         //新建直线，其实是矩形
         let svgObj = {};
         let allTypeObj = jsonBase.items;
         
         for(var i = 0 ,len = allTypeObj.length;i<len;i++){
             if(allTypeObj[i].type == "line"){
               for(var k in allTypeObj[i]){
                 if(k == "style"){
                   svgObj.style = {}
                   for(var j in allTypeObj[i].style){
                     svgObj.style[j] = allTypeObj[i].style[j]
                   }
                 }else{
                   svgObj[k] = allTypeObj[i][k];
                 }
               }
               break;
             }
         }

      let pointArr = payload.split(' ');
      let xPoint = [];
      let yPoint = [];

      pointArr.forEach(item =>{
        let point = item.split(",");
        xPoint.push(Number(point[0]));
        yPoint.push(Number(point[1]));
      })
   
      svgObj.style.x = xPoint[0];
      svgObj.style.y = yPoint[0];
      
      
      if(yPoint[1] == yPoint[0]){
        svgObj.style.w = Math.abs(xPoint[1] - xPoint[0]);
      }

       if(xPoint[1] == xPoint[0]){
        svgObj.style.w = Math.abs(yPoint[1] - yPoint[0]);
        svgObj.style.rotate = 90;
        svgObj.style.positionType = 1;
        
      }
      

      // if(xPoint[1] == xPoint[0]){
      //   svgObj.style.rotate = 90;
      //   // svgObj.style.positionType = 1;
      // }
      


      svgObj.id = (Math.random()*10000000).toString(16).substr(0,4);
      svgObj.active = true;

      state.switchElement.push(svgObj);
      state.selectedComponents.push(svgObj)

    }

  },
  actions: {
    reducePrice: (context, payload) => {
      setTimeout(function () {
        context.commit('reducePrice', payload)
      }, 2000)
    },

  }
})

function accDiv(num1,num2){
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

  // 两个浮点数相乘
  function accMul(num1,num2){
    var m=0,s1=num1.toString(),s2=num2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){};
    try{m+=s2.split(".")[1].length}catch(e){};
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
