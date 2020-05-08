<template>
  <vue-draggable-resizable
    class="draText"
    :class="{pointStyle:active}"
    :onDragStart="onDragStartCallback"
    @dragstop="(x,y) => onDrag(x,y, type)"
    @resizing="(x,y,w,h) => onResize(x,y,w,h, type)"
    @dragging="onDragging"
    @activated="onActivated"
    @deactivated ="onDeactivated"
    :id="detail.id"
    :active="active"
    :parent="true"
    :is-conflict-check="true"
    :snap="true"
    :snap-tolerance="20"
    @refLineParams="getRefLineParams"
    :x="detail.style.x"
    :y="detail.style.y"
    :w="detail.style.w"
    :h="detail.style.h">
    <div @keyup.delete="del(detail)" tabindex="1">
      <div class="view-text" v-if="detail.style!=undefined" :style="{
        fontSize: detail.style.fontSize + 'px',
        fontFamily: detail.style.fontFamily,
        color: detail.style.foreColor,
        textAlign: detail.style.textAlign,
        lineHeight: detail.style.lineHeight + 'px',}">
        {{detail.id}}
      </div>
    </div>
  </vue-draggable-resizable>

</template>

<script>

  import {mapState} from 'vuex'

  import vueDraggableResizable from './vue-draggable-resizable'


  export default {
    name: 'view-text',
    components: {
      vueDraggableResizable
    },
    props: {
      detail: {
        type: Object,
        default: {},
      },
      type: {
        type: String,
        default: 'text',
      }
    },
    data () {
      return {
        lists: {},
        eleObj:{},
        active:true,
      }
    },
     computed: {
      modulesText(){
        return this.$store.getters.getAllComponents;
      },
      selectedStatus(){
        return this.$store.getters.getSelectedStatus;
      }
    },
    watch: {
      'detail.active': {
        handler(newName, oldName) {
          this.active = newName
        },
        immediate: true,
      }
    } ,
    methods: {
      del (n) {
        this.$emit('remove', n)
      },
      getRefLineParams (params) {
        this.$emit('getRefLineParams', params)
      },
      onDragStartCallback (ev) {
        ev.stopPropagation()
      },
      onResize (x, y, w, h, type) {
        this.$store.commit('updateTextStyleResize', {x, y, w, h, type})
      },
      onDrag (x, y, type) {
        this.$store.commit('updateTextStyleDrag', {x, y, type})
      },
      //点击元素外任何地方的时候执行
      onDeactivated(){
         let arr = this.$store.getters.getSelectedStatus;
         //已选只有单个元素的时候清空已选数组
         if(arr.length == 1 && !event.ctrlKey){
            this.$store.commit('selectedStatus', [])
         }
      },
       //被拖动的时候执行
      onDragging (x,y) {
        let arr = this.$store.getters.getSelectedStatus;
        //如果是多选拖拽
        if(arr.length >1){
          //计算当前位置与初始位置差距
          let Xpositon = this.detail.style.x;
          let Yposition = this.detail.style.y;
          let left = x - Xpositon ;
          let top = y - Yposition;
            arr.forEach(ele =>{
              ele.style.x = (ele.style.x + left);
              ele.style.y = (ele.style.y + top);
            })
           this.$store.commit('selectedStatus', arr) 
        }else{
            let obj = { 
              id:this.detail.id,
              type:this.detail.type,
              style:this.detail.style,
              active:true
            };

            obj.style.x = x;
            obj.style.y = y;

            this.$store.commit('selectedStatus', [obj]) 
        }
          
      },
      //失去焦点，再次获得时执行
      onActivated (id) {
        //没有按下ctrl键
        if(!event.ctrlKey){
          let arr = this.$store.getters.getSelectedStatus;
          let flag = false;
          arr.forEach(item => {
            if(item.id == id){
              flag = true;
            }
          })
          
          //点击的元素不属于框选元素的时候执行
          if(!flag){
                let obj = { 
                    id:this.detail.id,
                    type:this.detail.type,
                    style:this.detail.style,
                    active:true
                  };
                this.$store.commit('selectedStatus', [obj]) 
          }
        }else{
          let obj = { 
              id:this.detail.id,
              type:this.detail.type,
              style:this.detail.style,
              active:true
            };
          this.$store.commit('addSelectedStatus', obj) 
        }
         
      },
      ifActive(val){
        //选中状态改变时，修改数组
        this.active = val.ifActive;       
      }
    },
    // computed: {
    //   ContentItem () {
    //     let com = this.$store.state.components
    //     for (let i of com) {
    //       if (this.$store.state.switchElement == i.type) {
    //         return i.style
    //       }
    //     }
    //   },
    // },
    mounted () {
        this.active = this.detail.active
    }
  }
</script>

<style>
  .view-text {
    height: 100%;
    width: 100%;
  }

  .pointStyle{
    cursor:move;
  }

</style>
