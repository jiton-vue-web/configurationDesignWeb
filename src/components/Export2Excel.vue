<template>
  <button @click="downloadFile">导出</button>
</template>

<script>
  import { export_json_to_excel } from '@/vendor/Export2Excel'
  export default {
    name: 'Export2Excel',
    data(){
      return{
        list:[
          {
            id:'5',
            username:'chen',
            truename:'kysue',
            branchName:3423,
            branchId:3423,
            companyTel:55,
            mobile:55,
            email:55,
            comments:55
          },
          {
            id:'6',
            username:'su',
            truename:'sue',
            branchName:3423,
            branchId:3423,
            companyTel:55,
            mobile:55,
            email:55,
            comments:55
          }
        ]
      }
    },
    methods:{
      downloadFile () {
        //list与data的list相对应
        let list = this.list
        let tHeader = [
          'Id',
          '用户名',
          '真实姓名',
          '部门名称',
          '部门id',
          '座机',
          '手机',
          '电子邮箱',
          '备注'
        ]
        let filterVal = [
          'id',
          'username',
          'truename',
          'branchName',
          'branchId',
          'companyTel',
          'mobile',
          'email',
          'comments'
        ]
        let data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '员工列表')
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },


    }
  }
</script>

<style scoped>

</style>
