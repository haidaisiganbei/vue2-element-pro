// 初始化
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css"
import PreComponents from '@yj_lin/vue2-element-pro'
import '@yj_lin/vue2-element-pro/lib/vue2-element-pro.css'
console.log(PreComponents);
Vue.use(PreComponents)
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')

