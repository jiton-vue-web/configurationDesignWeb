<template>
  <section class="sectionStyle">
    <div class="imgStyle" :style="{width:obj.style.w+'px',height:obj.style.h+'px',opacity:obj.style.opactiy}"> 
        <img :src="require('@/assets/images/tableBg.jpg')" width="100%" height="100%"/>
    </div>
    
    <div class="tableStyle">
      <el-tabs :tab-position="obj.style.tabPosition" @tab-click="handleClick">
          <el-tab-pane label="参数" name="0" v-if="obj.style.analogsInfor == 0">
              <el-table
                :data="tableData"
                 width="100%"
                :height="obj.style.tabPosition == 'top'|| obj.style.tabPosition == 'bottom'? obj.style.h - 55 :obj.style.h"
                empty-text="暂无数据"
                :row-class-name="tableRowClassName"
                >
                <el-table-column
                    prop="address"
                    label="参数名"
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
            </el-tab-pane>
          <el-tab-pane label="状态" name="1" v-if="obj.style.stateInfor == 0">
             <el-table
                :data="tableData"
                width="100%"
                :height="obj.style.tabPosition == 'top'|| obj.style.tabPosition == 'bottom'? obj.style.h - 55 :obj.style.h"
                empty-text="暂无数据"
                :row-class-name="tableRowClassName"
                >
                <el-table-column
                    prop="address"
                    label="参数名"
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
          </el-tab-pane>
          <el-tab-pane label="报警" name="2" v-if="obj.style.wanringEvent == 0">
             <el-table
                :data="tableData"
                width="100%"
                :height="obj.style.tabPosition == 'top'|| obj.style.tabPosition == 'bottom'? obj.style.h - 55 :obj.style.h"
                empty-text="暂无数据"
                :row-class-name="tableRowClassName"
                >
                <el-table-column
                    prop="address"
                    label="参数名"
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
          </el-tab-pane>
          <el-tab-pane label="资产详情" name="3" v-if="obj.style.propertyInfor == 0">
             <el-table
                :data="tableData"
                 width="100%"
                :height="obj.style.tabPosition == 'top'|| obj.style.tabPosition == 'bottom'? obj.style.h - 55 :obj.style.h"
                 empty-text="暂无数据"
                :row-class-name="tableRowClassName"
                >
                <el-table-column
                    prop="address"
                    label="参数名"
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
          </el-tab-pane>
      </el-tabs>
    </div>
  </section>
  
</template>

<script>

  export default {
    props:["obj"],
    data() {
      return {
         tableData:[],
         tableData0: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }],
          tableData1: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
           tableData2: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }],

      }
    },

    mounted(){
        this.tableData = this.tableData0;
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        }
        return '';
      },
       handleClick(tab, event) {
         switch(tab.name){
           case "0": this.tableData = this.tableData0; break;
           case "1": this.tableData = this.tableData1; break;
           case "2": this.tableData = this.tableData2; break;
           case "3": this.tableData = this.tableData3; break;
         }
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: rgba(248, 115, 115, 0.72);
  }

  .el-table .success-row {
    background: rgba(107, 190, 77, 0.56);
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