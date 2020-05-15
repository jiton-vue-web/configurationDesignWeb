<template>
  <div>
    <div class="title-style">{{$t('message.style')}}</div>
    <el-form :model="arrObj" label-position="left" label-width="80px" class="formStyle">
        <el-form-item :label="item.label" v-for="(item,index) in arrObj" :key="index">
            <el-input 
              v-if="item.component == 'input'" 
              v-model="item.value" 
              placeholder="请输入内容" 
              :type="item.inputType" 
              @change="changeAttr(item.attr,item.value)">
            </el-input>

            <el-input-number  
              v-if="item.component == 'inputNumber'" 
              v-model="item.value" 
              :min="item.min"  
              :disabled="item.disabled" 
              :step="item.step"
              :controls-position="item.position"
              :precision="item.precision"
              @change="changeAttr(item.attr,item.value)"
            ></el-input-number>

            <el-select 
              v-if="item.component == 'select'" 
              v-model="item.value" 
              placeholder="请选择" 
              @change="changeAttr(item.attr,item.value)">
                <el-option
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>

            <el-color-picker 
              v-if="item.component == 'colorPicker'" 
              v-model="item.value" 
              show-alpha
              @change="changeAttr(item.attr,item.value)"
            ></el-color-picker>

        </el-form-item>
        <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item> -->
        <input type="hidden" :value="obj"/>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import str from './../../static/json/label.js'
  
  export default {
    name: 'EditorStyle',
    data () {
      return {
          showForm:false,
          arrObj:{},
          selectedId:[]
      }
    },
    created () {

    },
    mounted () {

    },
    computed: {
      obj() {
          let _this = this;
          let seletedComponent = this.$store.getters.getSelectedStatus;
          let allObj = this.$store.getters.getAllComponents;
          console.log(allObj)
          // 所有组件为零,则为删除所有组件，清空右侧属性界面
          if(allObj.length == 0 ){
              _this.arrObj = {}
          }
          // 单选的时候
          if(seletedComponent.length == 1 || seletedComponent.length == 0 && allObj.length == 1){
              let obj = seletedComponent.length == 1?seletedComponent[0] : allObj[0]
              _this.selectedId.length = [];
              _this.selectedId.push(obj.id);
              _this.arrObj = {};
              let ele = obj.style;

              for(var i in ele){
                let attrObj = {};
                for(var k in str[i]){
                  attrObj[k] = str[i][k];
                }
                attrObj.value = ele[i];
                this.$set(_this.arrObj,i,attrObj)
              }
          }

          //多选，判断哪些属性为所有组件共同属性，存为style对象，传入子组件显示
          if(seletedComponent.length>1){
              _this.arrObj = {}
              _this.selectedId.length = [];
              _this.selectedId.push(seletedComponent[0].id);
              let arr = []; //存储共同属性
              //第一个选中元素属性为参照
              let sameAttr = Object.keys(seletedComponent[0].style);
              for(let i = 1, len = seletedComponent.length; i<len;i++){
                  _this.selectedId.push(seletedComponent[i].id);
                  let eleAttr = Object.keys(seletedComponent[i].style);
                  arr = eleAttr.filter(function(v){
                      return sameAttr.indexOf(v)!==-1 
                  })
                  sameAttr = arr;
              }
              
              let arrtData = {};
              
              for(var k = 0 ,lenK = sameAttr.length; k<lenK; k++){
                  let attrArray = []
                  for(var i = 0, len = seletedComponent.length; i<len; i++){
                    attrArray.push(seletedComponent[i].style[sameAttr[k]])
                 }

                 attrArray = Array.from(new Set(attrArray));

                if(attrArray.length == 1){
                  str[sameAttr[k]].value = attrArray[0];
                }
                this.$set(_this.arrObj,sameAttr[k],str[sameAttr[k]])
              }
          }
      }
    },
    methods: {
      // 更改属性
      changeAttr(attr,value){
        this.$store.commit('changeAttr',{attr:attr,value:value,selectedId:this.selectedId}) 
      }
    }
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

  .formStyle{
    height:calc(100vh - 110px);
    padding:0 20px;
  }
</style>
