<template>
    <div>
      <h4 class="head-font">多语言 示例演示</h4>
      <div class="flex-box">
        <p>{{$t('message.hello')}}</p>
        <p>{{$t('el.datepicker.now')}}</p>
        <p>{{$t('message.cat')}}</p>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'I18nExample'
  }
</script>

<style scoped>

</style>
