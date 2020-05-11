<template>
  <div>
    <div class="title-style">{{$t('message.style')}}</div>
    <component :is="boxType" :obj="obj"></component>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  
  export default {
    name: 'EditorStyle',
    data () {
      return {
        boxType:""
      }
    },
    created () {

    },
    mounted () {

    },
    computed: {
        obj() {
            let seletedComponent = this.$store.getters.getSelectedStatus;
            // 如果已选已为零，判断所有组件为零则清空右侧属性界面
            if(seletedComponent.length == 0){
              let allObj = this.$store.getters.getAllComponents;
              if(allObj.length == 0){
                this.boxType = "";
              }
            }
            //只有一个已选中，直接显示已定义好的各个类型组件模板
            if(seletedComponent.length == 1){
              this.boxType = ()=> import('./attrComponents/'+ seletedComponent[0].type +'.vue');
              return seletedComponent[0].style;
            }

            //多个已选中，判断哪些属性为所有组件共同属性，存为style对象，传入子组件显示

        }
    },
    methods: {}
  }
</script>

<style scoped>
  .title-style {
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    background-color: #4a4944;
    text-align: left;
    margin-bottom: 15px;
    padding-left: 15px;
  }

  .padding-2 {
    padding: 20px;
  }
</style>
