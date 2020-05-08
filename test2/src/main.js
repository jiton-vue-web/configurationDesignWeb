// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n/i18n'
import './assets/style/iconfont/iconfont.css'
import store from './store/store'
import echarts from 'echarts'
import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'



Vue.component('vue-draggable-resizable',VueDraggableResizable)
Vue.prototype.$echarts = echarts

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
