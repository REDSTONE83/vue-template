export default {
  namespaced: true,
  state: () => ({
    data: Object.preventExtensions({
      name: '',
      age: '',
      gender: '',
    }),
    version: 1,
  }),
  mutations: {
    set_data(state, data) {
      Object.keys(data).forEach(key => (state.data[key] = data[key]));
      state.version++;
    },
  },
  getters: {
    get_data: state => state.version && state.data,
  },
};
