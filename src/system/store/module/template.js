export default {
  namespaced: true,
  state: () => ({
    data: [],
    focusIndex: -1,
    version: 1,
  }),
  mutations: {
    set_focus(state, index) {
      if (index < state.data.length) {
        state.focusIndex = index;
        state.version++;
      }
    },
    set_list(state, list) {
      state.data = list.map(data => Object.preventExtensions(data));
      state.focusIndex = -1;
      state.version++;
    },
    put_data(state, data) {
      state.data.push(Object.preventExtensions(data));
      state.version++;
    },
    delete_data(state) {
      if (state.focusIndex > -1) {
        state.data.splice(state.focusIndex, 1);
        state.version++;
      }
    },
    set_data(state, data) {
      if (state.focusIndex > -1) {
        Object.keys(data).forEach(
          key => (state.data[state.focusIndex][key] = data[key]),
        );
        state.version++;
      }
    },
  },
  getters: {
    get_data: state => {
      if (state.focusIndex > -1) {
        return state.version && state.data[state.focusIndex];
      } else {
        return {};
      }
    },
    get_list: state => state.version && state.data,
    get_focus_index: state => state.focusIndex,
  },
};
