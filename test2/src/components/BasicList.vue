<template>
  <div>
    <div class="title-style">{{$t('message.ComponentList')}}</div>
    <el-collapse class="list-box">
      <el-collapse-item v-for="(item,index) in toolbox" :key="index">
        <template slot="title">
          <i class="icon iconfont" :class="item.icon"></i>
          <p class="box-name">{{item.title}}</p>
        </template>
        <div class="item-flex">
            <div class="flex-item" v-for="(value,index) in item.items" :key="index" draggable="true" @dragstart="onDragstart($event,value)">
              <i class="iconfont" :class="value.icon"></i>
              <p>{{value.text}}</p>
            </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import jsonBase from '../../static/json/basic.json';
  import jsonChart from '../../static/json/chart.json';
  export default {
    name:"BasicList",
    data(){
      return {
        toolbox:[],
        count:0,
      }
    },
    mounted () {
      this.toolbox = [];
      this.toolbox.push(jsonBase);
      this.toolbox.push(jsonChart);
    },
    methods:{
      onDragstart(event, info){
        // let type = info.info.type;
        // this.count++;
        // if(this.count>1){
        //   info.info.type = type.substring(0, type.length - 1)+this.count;
        // }else {
        //   info.info.type =info.info.type+this.count;
        // }
        let infoJson = JSON.stringify(info.info);
        event.dataTransfer.setData('my-info', infoJson);
      },

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
    border: 1px solid #B3C0D1;
    padding-left: 15px;
  }

  .list-box {
    margin: 5px;
  }
  .icon {
    font-size: 3rem;
    margin: 5px;
  }
  .box-name {
    margin-left: 15px;
    font-size: 1rem;
    font-weight: bold;
  }
  .item-flex {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-around;
  }
  .flex-item {
    width: 80px;
    height: 50px;
  }
  .flex-item:hover {
    width: 80px;
    height: 50px;
    background-color: #cccccc;
    color: #2b7de6;
    cursor: pointer;
  }
</style>
