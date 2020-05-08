<template>
  <div>
    <div class="title-style">{{$t('message.style')}}</div>
    <!-- <el-form label-position="left" label-width="80px" class="padding-2">
      <el-form-item label="X" size="mini">
        <el-input v-model.number="initContent.x" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Y">
        <el-input v-model.number="initContent.y" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Width" size="mini">
        <el-input v-model.number="initContent.w" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Height">
        <el-input v-model.number="initContent.h" type="number"></el-input>
      </el-form-item>
    </el-form> -->

    <!-- <component :is="componentType"></component> -->

    <textView :obj="obj"></textView>
    <input type="hidden" :value="obj">
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import textView from './attrComponents/text.vue'
  
  export default {
    name: 'EditorStyle',
    data () {
      return {
        componentType:()=> import('./attrComponents/text.vue')
      }
    },
    created () {

    },
    mounted () {

    },
    components:{
      textView
    },
    computed: {
        obj() {
            return this.$store.getters.getAllComponents
        }
    },
    // watch:{
    //   obj: {
    //      handler(newVal, oldVal){
    //         if(oldVal.length == 0){
    //           this.componentType = ()=> import('./attrComponents/' + newVal[0].type + '.vue')
    //         }
    //     },
    //     deep: true
    //   }
    // },
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
