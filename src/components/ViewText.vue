<template>
  <vue-draggable-resizable
    class="draText"
    :onDragStart="onDragStartCallback"
    @dragstop="(x,y) => onDrag(x,y, type)"
    @resizing="(x,y,w,h) => onResize(x,y,w,h, type)"
    @dragging="onDragging"
    @activated="onActivated"
    @deactivated="onDeactivated"
    :id="detail.id"
    :active="active"
    :parent="true"
    :is-conflict-check="false"
    :snap="true"
    :snap-tolerance="20"
    @refLineParams="getRefLineParams"
    :x="detail.style.x"
    :y="detail.style.y"
    :w="detail.style.w"
    :h="detail.style.h">
    <div @keyup.delete="del($event)" tabindex="1" v-focus style="height:100%;width:100%;">
      <!-- 编辑区加载不同组件的地方，以下 -->    
       <component :is="viewZoneComponent" :obj="detail" ></component>
      <!-- 编辑区加载不同组件的地方，以上-->
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
        viewZoneComponent:""
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
      },
       'detail.type': {
        handler(newName, oldName) {
          this.viewZoneComponent = ()=> import('./editorComponents/'+ newName +'View.vue');
        },
        immediate: true,
      }
    } ,
    directives:{
        focus:{
            inserted: function (el) {
                el.focus()
            }
        }
    },
    methods: {
      //删除选中元素
      del(e) {
        if(e.code == "Delete"){
          this.$store.commit('removeComponents')
        }
      },
      getRefLineParams (params) {
        this.$emit('getRefLineParams', params)
      },
      //拖拽开始
      onDragStartCallback (ev) {
        ev.stopPropagation()
      },
      onResize (x, y, w, h) {
        this.$store.commit('updateTextStyleResize', {x, y, w, h})
      },
      onDrag (x, y, type) {
        this.$store.commit('updateTextStyleDrag', {x, y, type});
      },
      //点击元素外任何地方的时候执行
      onDeactivated(){
          //  let arr = this.$store.getters.getSelectedStatus;
          //已选只有单个元素的时候清空已选数组
          //  if(arr.length == 1 && !event.ctrlKey){
          //     this.$store.commit('selectedStatus', [])
          //  }
      },
       //被拖动的时候执行
      onDragging (x,y) {
        let arr = this.$store.getters.getSelectedStatus;
        let _this = this;
        //如果是多选拖拽
        if(arr.length >1){
          let viewZone = this.$store.getters.getViewZoneInfor;
          //计算当前位置与初始位置差距
          let Xposition = this.detail.style.x;
          let Yposition = this.detail.style.y;
          let left = x - Xposition ;
          let top = y - Yposition;
          
          arr.forEach(ele =>{
              if(ele.id != _this.detail.id){
                // x>左边框 && x+w<右边框
                // y>上边框 && y+h<下边框
                let xRange = (ele.style.x + left) < 0 ? 0 : (ele.style.x + left);
                    xRange = xRange > viewZone.width ? viewZone.width : xRange;
                let yRange = (ele.style.y + top) < 0 ? 0 : (ele.style.y + top);
                    yRange = yRange > viewZone.height ? viewZone.height : yRange;
                    ele.style.x = xRange;
                    ele.style.y = yRange;
              }else{
                ele.style.x = x;
                ele.style.y = y;
              }
          })
          this.$store.commit('selectedStatus', arr) 
        }else{

            let detailObj = this.detail;
            let obj = {}
            for(var i in detailObj){
                obj[i] = detailObj[i];
            }

            obj.style.x = x;
            obj.style.y = y;
            obj.active = true;

            this.$store.commit('selectedStatus', [obj]) 
        }
          
      },
      //失去焦点，再次获得时执行
      onActivated (id) {
        //按下ctrl键
        if(event.ctrlKey){
          let detailObj = this.detail;
          let obj = {}
          for(var i in detailObj){
              obj[i] = detailObj[i];
          }

          obj.active = true;

          this.$store.commit('addSelectedStatus', obj) 

        }else{
          let arr = this.$store.getters.getSelectedStatus;
          let flag = false;
          arr.forEach(item => {
            if(item.id == id){
              flag = true;
            }
          })
          
          //点击的元素不属于框选元素的时候执行
          if(!flag){
              // let obj = { 
              //     id:this.detail.id,
              //     type:this.detail.type,
              //     style:this.detail.style,
              //     active:true
              //   };
              let detailObj = this.detail;
              let obj = {}
              for(var i in detailObj){
                  obj[i] = detailObj[i];
              }

              obj.active = true;
              this.$store.commit('selectedStatus', [obj]) 
          }
        }
         
      },
      ifActive(val){
        //选中状态改变时，修改数组
        this.active = val.ifActive;       
      }
    },
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

  .draText:hover{
    cursor:move;
  }

  .draText{
    display:flex;
  }

 
</style>
