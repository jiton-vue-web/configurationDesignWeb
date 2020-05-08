import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true, //开启了严格模式
  state: {
    switchElement: [], //编辑区所有控件
    selectedComponents:[], //当前选中的控件
    /*textStyles: {
      type: '',
      moveX: 0,
      moveY: 0,
      width: 100,
      height: 100
    },*/
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
    ]
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
      return state.switchElement.concat(state.selectedComponents)
    },
    getSelectedStatus:(state)=>{
      return state.selectedComponents
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

    //编辑区未选中控件
    switchStatus: (state, payload) => {
      if(payload.operate == 0){
        payload.obj.active = false;
        state.switchElement.push(payload.obj)
      }else{
        let flagIndex = [];
        state.switchElement.forEach((item,index) =>{
          if(item.id == payload.obj.id){
            flagIndex.push(index);
          }
        });
        state.switchElement.splice(flagIndex[0], 1);
      }

      console.log("未选中")
      console.log(state.switchElement)
      console.log("----")

    },
    //多选当前选中的控件
    selectedStatus:(state, payload) => {
      if(payload.operate == 0){
            
            let flag = [];
            // 去重
            state.selectedComponents.forEach((item,index) =>{
              if(item.id == payload.obj.id){
                  flag.push(index);
              }
            });

            if(flag.length>0){
              state.selectedComponents.splice(flag[0], 1,payload.obj);
              // state.selectedComponents[flag[0]]= payload.obj;

            }else{
              debugger;
              payload.obj.active = true;
              state.selectedComponents.push(payload.obj)
            }

      }else{
        state.selectedComponents.forEach((item)=>{
          item.active = false;
          state.switchElement.push(item)
        })

        state.selectedComponents = []
      }

      console.log("已选中")
      console.log(state.selectedComponents)
      console.log("----")

    },
    //框选移动直接存值
    setselectedComponents:(state, payload) => {
       state.selectedComponents = payload;
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
      for (let i of state.components) {
        if (state.switchElement == i.type) {
          i.style.x = payload.x
          i.style.y = payload.y
          i.style.w = payload.w
          i.style.h = payload.h
        }
      }
    },

    updateTextStyleDrag (state, payload) {
      for (let i of state.components) {
        if (state.switchElement == i.type) {
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
