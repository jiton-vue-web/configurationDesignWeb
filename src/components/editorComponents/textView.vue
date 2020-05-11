<template>
    <textarea 
        class="textareaStyle"
        type="text"
        :value="obj.id" 
        :style="{
        'z-index':obj.style.zIndex,
        fontSize: obj.style.objfontSize + 'px',
        fontFamily: obj.style.objfontFamily,
        color: obj.style.objforeColor,
        textAlign: obj.style.objtextAlign,
        lineHeight: obj.style.objlineHeight + 'px'}" 
        >
    </textarea>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    // name: 'textArrt',
    props:["obj"],
    data () {
        return {
           
        }
    },
    methods: {
     
    },
    mounted () {

    }
  }
</script>

<style>
.textareaStyle{
  width:100%;
  display:block;
}
</style>

