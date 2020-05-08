<template>
  <vue-draggable-resizable
    id="draImage"
    :x="moveX"
    :y="moveY"
    :w="iwidth"
    :h="iheight"
    :onDragStart="onDragStartCallback"
    @dragging="onDrag"
    @resizing="onResize"
    @activated="onActivated('image')"
    :parent="true"
    :is-conflict-check="true"
    :snap="true"
    :snap-tolerance="20"
    @refLineParams="getRefLineParams">
    <div class="view-image" v-if="detail.style!=undefined" @keyup.delete="del(detail)">
      <template v-if="imageURL !== ''">
        <img :width="iwidth" :height="iheight" :src="detail.style.url" @dragstart.prevent @dragover.prevent @drop.prevent/>
      </template>
      <template v-else>
        <!--        <i :style="{fontSize:detail.style.fontSize+'rem'}" class="iconfont" :class="detail.style.icon"></i>-->
        <img :width="iwidth+'px'" :height="iheight+'px'" src="../assets/images/logo.png"/>
      </template>

    </div>
  </vue-draggable-resizable>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'view-image',
    data () {
      return {
        url:require('../assets/images/logo.png'),
        vLine: [],
        hLine: [],
        iwidth:100,
        iheight:100,
        moveX:200,
        moveY:200
      }
    },
    props: {
      detail: {
        type: Object,
        default: {}
      },
      editMode: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      imageURL: function () {
        if (this.detail.style.url == undefined || this.detail.style.url == '') {
          return '';
        } else {
          return this.detail.style.url
        }
      },
      /*...mapState ([
        "imageStyles"
      ])*/
    },
    components: {},
    data () {
      return {}
    },
    mounted () {
      let draImage = document.getElementById('draImage')
      draImage.style.left = 0
      draImage.style.top = 0
    },
    methods: {
      del(n){
        console.log(n)
        this.$emit('remove',n);
      },
      onDragStartCallback (ev) {
        ev.stopPropagation()
      },
      getRefLineParams (params) {
        const {vLine, hLine} = params
        this.vLine = vLine
        this.hLine = hLine
      },
      onResize (moveX, moveY, width, height) {
        this.moveX = moveX;
        this.moveY = moveY;
        this.iwidth = width;
        this.iheight = height;
      },
      onDrag (moveX, moveY) {
        this.moveX = moveX;
        this.moveY = moveY;
      },
      onActivated (id) {
        // state.switchElement = payload
      },
    }

  }
</script>

<style>
  .view-image {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
