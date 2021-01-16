import Vue from 'vue';
import App from '@/system/views/App.vue';
import router from '@/system/router';
import store from '@/system/store';

import Vue2Filters from 'vue2-filters';

import '@/system/styles/common.scss';

Vue.config.productionTip = false;

Vue.use(Vue2Filters);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
