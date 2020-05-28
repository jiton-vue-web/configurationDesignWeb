<template>
  <section class="sectionStyle">
    <div class="imgStyle" :style="{width:obj.style.w+'px',height:obj.style.h+'px',opacity:obj.style.opactiy}"> 
        <img :src="require('@/assets/images/tableBg.jpg')" width="100%" height="100%"/>
    </div>
    
    <div class="tableStyle" >
      <div class="tableTitle" :style="{color:obj.style.color}">{{obj.style.text}}</div>
      <section>
        <el-table
          :data="tableData"
          :width="obj.style.w"
          :max-height="obj.style.h - 51"
           slot="empty"
          :row-class-name="tableRowClassName"
           v-loading="loading">
          <el-table-column
            prop="date"
            label="区域"
            :show-overflow-tooltip="true"
            :filters="filtersData"
            :filter-method="filterHandler">
          </el-table-column>
          <el-table-column
            prop="address"
            label="设备名称"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            v-for="(item,index) in NameArr"
            :key="index"
            :prop="item.arr"
            :label="item.label"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备状态"
            :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </section>
    </div>

  </section>
  
</template>

<script>
  export default {
    props:["obj"],
    data() {
      return {
        loading:true,
        filtersData:[
          {text: '2016-05-01', value: '2016-05-01'}, 
          {text: '2016-05-02', value: '2016-05-02'}, 
          {text: '2016-05-03', value: '2016-05-03'}, 
          {text: '2016-05-04', value: '2016-05-04'}
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }]
      }
    },
    computed:{
      NameArr(){
        let _this = this;
        let titleArr = [];
        let argumentsName = this.obj.style.argumentsName.split("%"); //获取到新属性表头
        for(var k=0; k < argumentsName.length; k++){
          _this.tableData.forEach((item,index)=>{
            item['arr'+k] = "属性值" + index;
          })
        }

        for(var i in this.tableData[0]) {
            if(i.indexOf("arr") != -1){
              titleArr.push({arr:i,label:""})
            }
        }

        titleArr.forEach((ele,j)=>{
            ele.label = argumentsName[j]
        })
        this.loading = false;
        return titleArr;
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
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
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

  .tableTitle{
    padding:15px 10px;
  }

</style>