<template>
  <div class="hello">
    <h3>环形排列</h3>
    <svg class="svg">
        <g>
          <circle :cx="first.cx" :cy="first.cy" :r="first.r"
          @click="circleClick"
          @mousedown="firstMousDown"
          @mouseup="firstMousUp"
          @mousemove="firstMousMove"
          class="first"
          fill= "#A4D3EE"></circle>
          <circle :key="index" v-for="(item, index) in ends" :cx="item.cx" :cy="item.cy" :r="item.r"
          class="first"
          fill= "blue"></circle>
          <line :key="index*100+100" v-for="(relation, index) in relations" :x1="relation.x1" :y1="relation.y1" :x2="relation.x2" :y2="relation.y2" style="stroke:rgb(99,99,99);stroke-width:2"/>
        </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      width: 5,
      num: 0,
      relations: [],
      first: {},
      firstDx: 0,
      firstDy: 0,
      ends: [],
      firstClickDown: {
        screenX: 0,
        screeny: 0
      },
      firstMouseState: false
    }
  },
  created () {
      debugger;
    this.first.cx = 400
    this.first.cy = 250
    this.first.r = 50
    let length = 8
    for (let i = 0; i < length; i++) {
      this.ends.push({
        cx: Math.sin((Math.PI * 2 / length) * i) * this.first.r * 3 + this.first.cx,
        cy: Math.cos((Math.PI * 2 / length) * i) * this.first.r * 3 + this.first.cy,
        r: this.first.r * 0.7
      })
    }
    let that = this
    this.ends.forEach(function (val, i) {
      that.relations.push({
        x1: Math.sin((Math.PI * 2 / length) * i) * that.first.r + that.first.cx,
        y1: Math.cos((Math.PI * 2 / length) * i) * that.first.r + that.first.cy,
        x2: Math.sin((Math.PI * 2 / length) * i) * val.r * -1 + val.cx,
        y2: Math.cos((Math.PI * 2 / length) * i) * val.r * -1 + val.cy
      })
    })
    console.log(this.ends)
  },
  methods: {
    circleClick () {
      console.log(222)
    },
    moseMovePath () {
      this.width = 10
    },
    firstMousDown (e) {
      console.log(e)
      console.log(this.first)
      this.firstClickDown.screenX = e.screenX
      this.firstClickDown.screenY = e.screenY
      this.firstMouseState = true
    },
    firstMousUp (e) {
      console.log(e)
      this.firstMouseState = false
    },
    firstMousMove (e) {
      if (this.firstMouseState) {
        let dx = e.screenX - this.firstClickDown.screenX
        let dY = e.screenY - this.firstClickDown.screenY
        this.first.cx = this.first.cx + dx
        this.first.cy = this.first.cy + dY
        this.endComputed()
        if (this.width > 10) {
          this.width--
        } else {
          this.width++
        }
        this.firstClickDown.screenX = e.screenX
        this.firstClickDown.screenY = e.screenY
      }
    },
    moseOutPath () {
      this.width = 4
    },
    endComputed () {
      let length = 8
      let that = this
      this.ends.forEach((val, i) => {
        val.cx = Math.sin((Math.PI * 2 / length) * i) * this.first.r * 3 + this.first.cx
        val.cy = Math.cos((Math.PI * 2 / length) * i) * this.first.r * 3 + this.first.cy
        val.r = this.first.r * 0.7
        that.relations[i].x1 = Math.sin((Math.PI * 2 / length) * i) * that.first.r + that.first.cx
        that.relations[i].y1 = Math.cos((Math.PI * 2 / length) * i) * that.first.r + that.first.cy
        that.relations[i].x2 = Math.sin((Math.PI * 2 / length) * i) * val.r * -1 + val.cx
        that.relations[i].y2 = Math.cos((Math.PI * 2 / length) * i) * val.r * -1 + val.cy
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .svg{
   height: 500px;
   width: 800px;
   border: 1px solid #ccc;
 }
 .first{
  stroke:red;
  stroke-width:2px
 }
 .relation-line{
   stroke:rgb(99,99,99);
   stroke-width:2px
 }
</style>