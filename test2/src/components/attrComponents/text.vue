<template>
    <el-form :model="formInline" label-position="left" label-width="80px" class="padding-2">
        <el-form-item label="X" size="mini">
            <el-input v-model.number="formInline.x" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Y">
            <el-input v-model.number="formInline.y" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Width" size="mini">
            <el-input v-model.number="formInline.w" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Height">
            <el-input v-model.number="formInline.h" type="number"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
        <input type="hidden" :value="obj">
    </el-form>

   
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'textArrt',
    prop:["obj"],
    data () {
        return {
            formInline:{}
        }
    },
    computed: {
      obj() {
           let arr = this.$store.getters.getSelectedStatus;
            if(arr.length == 1){
                this.formInline = arr[0].style;
            }
            return this.$store.getters.getAllComponents
        }
    },
    methods: {
     onSubmit() {
        console.log('submit!');
      }
    },
    mounted () {

    }
  }
</script>

