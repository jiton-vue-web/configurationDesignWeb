<template>
    <div>
      <h4 class="head-font">Vuex 示例演示</h4>
      <div class="flex-box">
        <p>{{ count }}</p>
        <p>{{$store.state.msg}}</p>
        <product-list-one></product-list-one>
        <product-list-two></product-list-two>
      </div>
    </div>
</template>

<script>
  import ProductListOne from './ProductListOne'
  import ProductListTwo from './ProductListTwo'
  export default {
    name: 'VuexExample',
    components:{
      ProductListOne,
      ProductListTwo
    }
  }
</script>

<style scoped>

</style>
