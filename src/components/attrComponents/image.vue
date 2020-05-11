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
    </el-form>

   
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'textArrt',
    props:["obj"],
    data () {
        return {
            formInline:this.obj,
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

