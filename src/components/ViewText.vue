<template>
  <vue-draggable-resizable
    class="draText"
    :class="{pointStyle:detail.active}"
    :onDragStart="onDragStartCallback"
    @dragstop="(x,y) => onDrag(x,y, type)"
    @resizing="(x,y,w,h) => onResize(x,y,w,h, type)"
    @dragging="onDragging"
    @activated="onActivated"
   
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
        <!-- -{{detail.active}} -->
        <!-- <div style="font-size:14px">{{detail.style.x}}-{{detail.style.y}}</div> -->
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
      }
    },
    watch: {
      'detail.active': {
        handler(newName, oldName) {
          this.active = newName
        },
        immediate: true,
        // deep: true
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
        // this.$store.commit('selectedStatus', {operate:1,obj:null}) 
      },
       //被拖动的时候执行
      onDragging (x,y) {
        
        let obj = { 
            id:this.detail.id,
            type:this.detail.type,
            style:this.detail.style,
          };

        obj.style.x = x;
        obj.style.y = y;

        this.eleObj = obj;
        // this.$store.commit('switchStatus', {operate:1,obj:obj}) 
        // this.$store.commit('selectedStatus', {operate:0,obj:obj}) 
      },
      //失去焦点，再次获得时执行
      onActivated (id) {
      
        console.log(id)
        // let  _this = this;
        // //从未选删除，加入已选
        //   let obj = null;

        //   modulesText.forEach(element => {
        //     if(element.id == _this.detail.id){
        //       obj = element;
        //     }
        //   });

           
          // this.$store.commit('selectedStatus', {operate:1,obj:this.detail}) 
          // this.$store.commit('selectedStatus', {operate:0,obj:this.detail}) 
          // this.$store.commit('switchStatus', {operate:1,obj:this.detail})
        
      },
      ifActive(val){
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
