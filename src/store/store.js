import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true, //开启了严格模式
  state: {
    switchElement: [], //编辑区所有控件
    selectedComponents:[], //当前选中的控件
    initialPoint:{},//框选起始点
    viewZone:{}, //放置组件的区域范围信息
    scaleVal:1,//编辑区放大倍数
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
    getFormDate:(state)=>{
      return state.switchElement
    },
    getAllComponents:(state)=>{
      return state.switchElement
    },
    getSelectedStatus:(state)=>{
      return state.selectedComponents
    },
    getViewZoneInfor:(state)=>{
      return state.viewZone
    },
    getInitialPoint:(state)=>{
      return state.initialPoint
    }
  },
  mutations: {
    reducePrice: (state, payload) => {
      // setTimeout(function () {
      state.products.forEach(product => {
        product.price += payload
      })
      // }, 3000)
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
          let obj= {
              id:element.id,
              style:element.style,
              type:element.type,
              active:false
            }
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
          arr.push(payload[0])
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
      
      state.switchElement.forEach(item => {
          if(item.id == payload.id){
            item.active = true;
          }
      })

    },
    //删除选中元素
    removeComponents:(state,payload) => {
      let allElementArr = [];

      state.switchElement.forEach(item => {
        if(item.active == false){
            allElementArr.push(item)
        }
      })

      state.selectedComponents = [];
      state.switchElement = allElementArr;

    },
    //保存框选起始点坐标
    setInitialPoint:(state,payload) => {
      state.initialPoint = payload;
    },

    components (state, payload) {
      state.components.push(payload.component)
    },
    updateTextStyleResize (state, payload) {
        state.switchElement.forEach(item => {
          if(item.active == true){
            item.style.w = payload.w
            item.style.h = payload.h
          }
        })
    },
    updateTextStyleDrag (state, payload) {
      //位置变化
      for (let i of state.selectedComponents) {
        if (state.selectedComponents == i.type) {
          i.style.x = payload.x
          i.style.y = payload.y
        }
      }
    },
    //右侧属性值改变时，修改组件属性
    changeAttr(state,payload){
      payload.selectedId.forEach(ele =>{
        state.switchElement.forEach(item => {
          if(payload.selectedId.indexOf(item.id) != -1){
            item.style[payload.attr] = payload.value
          }
        })
      })
    },
    // 保存编辑放大倍数
    scaleVal(state,payload){
      state.scaleVal = payload;
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
