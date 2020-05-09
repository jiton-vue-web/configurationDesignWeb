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
    components: [ //页面上所有使用的组件
      // {
      //   id:"0000",
      //   type: 'text',
      //   action: [],
      //   dataBind: {},
      //   style: {
      //     x: 50,
      //     y: 50,
      //     w: 100,
      //     h: 100,
      //     backColor: 'transparent',
      //     foreColor: '#FF0000',
      //     zIndex: 1,
      //     transform: 0,
      //     text: 'Test',
      //     textAlign: 'center',
      //     fontSize: 30,
      //     fontFamily: 'Arial',
      //     lineHeight: 100
      //   }
      // }
    ],
    
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

      state.selectedComponents.push(payload)
      console.log("已选中")
      console.log(state.selectedComponents)
      console.log("----")

    },
    //删除选中元素
    removeComponents:(state,payload) => {
      let flag = [];
      state.switchElement.forEach((item,index) =>{
          if(item.active == false){
              flag.push(item)
          }
      })
      
      state.switchElement = flag;
      state.selectedComponents = [];

    },
    //保存框选起始点坐标
    setInitialPoint:(state,payload) => {
      state.initialPoint = payload;
    },
    /*updateImgStyleResize(state,payload){
      state.imageStyles.moveX = payload.moveX;
      state.imageStyles.moveY = payload.moveY;
      state.imageStyles.width = payload.width;
      state.imageStyles.height = payload.height;
    },

    updateImgStyleDrag(state,payload){
      state.imageStyles.moveX = payload.moveX;
      state.imageStyles.moveY = payload.moveY;
    },*/

    updateTextStyleResize (state, payload) {
      debugger;
      for (let i of state.components) {
        if (state.components == i.type) {
          i.style.x = payload.x
          i.style.y = payload.y
          i.style.w = payload.w
          i.style.h = payload.h
        }
      }
    },

    updateTextStyleDrag (state, payload) {
      //已选的元素中同类型元素批量操作
      for (let i of state.selectedComponents) {
        if (state.selectedComponents == i.type) {
          i.style.x = payload.x
          i.style.y = payload.y
        }
      }
    },

    components (state, payload) {
      state.components.push(payload.component)
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
