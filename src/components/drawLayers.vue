<template>
  <div class="drawLayersStyle">
   <svg width="100%" height="100%" @click="addPoint($event)" @keyup.prevent="keyupCtrl($event)" tabindex="1"  >
     　<polygon 
        :points="item.pointDate" v-for="(item,index) in polygonArr" :key="index" 
        @mousedown="onMousDown"
        @blur="onBlur(item)"
        tabindex="2"
        @click="item.active = !item.active"
        style="fill:rgb(186, 236, 248);stroke:rgb(14, 131, 159);stroke-width:2;fill-opacity:0.25"
        :style="{stroke:(item.active?`rgb(239, 59, 59)`:`rgb(14, 131, 159)`)}"
        /> 
   </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgIcon',
  data () {
    return{
      pointArr:""
    }
  },
  computed: {
    polygonArr(){
       return this.$store.getters.getAllSvg; 
    },
    activeSvgArr(){
       return this.$store.getters.getActiveSvg; 
    }
  },
  mounted(){
   
  },
  methods:{
    addPoint(event){
      if(event.ctrlKey){
        var layer = event.currentTarget;
        var position = layer.getBoundingClientRect();
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        //第一个点，说明是新图形开始
        if(this.pointArr == ""){
          this.pointArr = this.pointArr + x +"," + y ;
          let pointObj = {
              id:(Math.random()*10000000).toString(16).substr(0,4),
              active:true,
              pointDate:""
          }
          this.$set(this.polygonArr, this.polygonArr.length == 0 ? 0 : this.polygonArr.length, pointObj); 
        }else{
          this.pointArr = this.pointArr +" " +  + x +"," + y ;
          let pointObj = {
              id:this.polygonArr[this.polygonArr.length -1].id,
              active:this.polygonArr[this.polygonArr.length -1].active,
              pointDate:this.pointArr
          }
          this.$set(this.polygonArr, this.polygonArr.length -1 , pointObj); 
        }
        this.$store.commit('addActiveSvg', this.polygonArr)
      }
    },
    onMousDown(event){
        var  _this = this;
        var layer = event.currentTarget;
        var position = layer.getBoundingClientRect();
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        console.log("鼠标初始位置："+ x +","+ y)
        document.onmousemove = (event)=> {
            let moveX = event.clientX - position.x;
            let moveY = event.clientY - position.y;
            _this.moveSvg(moveX - x,moveY - y)
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
    },
    onMouseMove(event){
      console.log(event)
    },
    activeSvg(item){
        item.active != item.active;
        if(item.active){
          this.$store.commit('addActiveSvg', item)
        }
    },
    moveSvg(offeX,offeY){
      console.log("鼠标移动："+ offeX +","+ offeY);
      let arr = [];
      this.activeSvgArr.forEach(element => {
          let pointPosition = element.splice();
          let Obj = {
              id:element.id,
              active:element.active,
              pointDate:this.pointArr
            }
          arr.push(Obj)
      });
    },
    onBlur(item){
      item.active = false;
      this.$store.commit('addActiveSvg', item);
    },
    keyupCtrl(){
       this.pointArr = "";
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.drawLayersStyle{
  width: 100%;
  height:100%;
  width: calc(100vw - 647px);
  height: calc(100% - 30px);

}
</style>