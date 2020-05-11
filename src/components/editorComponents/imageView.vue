<template>
    <div class="imgBox">
        <img :src="imgsrc" class="imgStyle" />
        {{obj.id}}
    </div>
   
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'imagesArrt',
    props:["obj"],
    data () {
        return {
           imgsrc: require("@/assets/images/logo.png")
        }
    },
    methods: {
     
    },
    mounted () {

    }
  }
</script>

<style>
    .imgStyle{
        width:100%;
        height:100%;
    }
</style>

