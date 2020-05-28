<template>
  <section class="sectionStyle">
    <div class="imgStyle" :style="{width:obj.style.w+'px',height:obj.style.h+'px',opacity:obj.style.opactiy}"> 
        <img :src="require('@/assets/images/tableBg.jpg')" width="100%" height="100%"/>
    </div>
    
    <div class="tableStyle">
      <el-table
        :data="tableData"
        :width="obj.style.w"
        :height="obj.style.h"
        slot="empty"
        :row-class-name="tableRowClassName"
        >
        <el-table-column
          prop="date"
          label="日期"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="date"
          label="值"
          width="180"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="name"
          label="单位"
          width="180"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </div>
     
  </section>
  
</template>

<script>
  export default {
    props:["obj"],
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      
      }
    },
   
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table th, .el-table tr,.el-table th, .el-table tr,.el-table, .el-table__expanded-cell  {
    background-color: rgba(0,0,0,0);
  }

  .sectionStyle{
    position: relative;
  }

  .imgStyle,.tableStyle{
    position: absolute;
    left: 0;
    top:0;
    width:100%;
    height:100%;    
  }

  .imgStyle{
      overflow: hidden;
  }

</style>