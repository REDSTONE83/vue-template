import Vue from 'vue';
import Vuex from 'vuex';
import moduleTemplate from './module/template';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    model: {
      namespaced: true,
      modules: {
        condition: moduleTemplate,
        users: moduleTemplate,
      },
    },
  },
});
