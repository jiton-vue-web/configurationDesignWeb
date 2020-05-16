import Vue from 'vue'
import Vuex from 'vuex'

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
    attrObj:{} //右侧需要显示的属性信息
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
    //当前选中的控件
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
    //按下CTRL键时，直接添加到已选数组
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
        // state.copySwitchElement = JSON.stringify(state.switchElement);

        //多选拖拽
        if(state.selectedComponents.length>1){
            state.switchElement.forEach(item => {
              if(item.active == true){
                item.style.x = payload.x
                item.style.y = payload.y
                item.style.w = payload.w
                item.style.h = payload.h
              }
            }) 
        }else{
          //单选赋值，匹配选中元素，赋值
          state.switchElement.forEach(item => {
            if(item.id == state.selectedComponents[0].id){
                item.style.x = payload.x
                item.style.y = payload.y
                item.style.w = payload.w
                item.style.h = payload.h
            }
          })
        }

    },
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
    saveCopyArr(state,payload){
      state.copySwitchElement = JSON.stringify(state.switchElement);
    },
    // 保存编辑放大倍数
    scaleVal(state,payload){
      state.scaleVal = payload;
    },
    //删除选中元素
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
     copyComponents:(state) =>{
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
       console.log("上一状态");
       console.log(state.copySwitchElement)
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
