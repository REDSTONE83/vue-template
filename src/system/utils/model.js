import store from '@/system/store';

const modelBind = function(model, field) {
  return {
    get: function() {
      return store.getters[`${model}/get_data`][field];
    },
    set: function(value) {
      store.commit(`${model}/set_${field}`, value);
    },
  };
};

export { modelBind };
