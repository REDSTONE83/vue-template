import moduleTemplate from './template';
import store from '../index';

const createModelObject = function(model) {
  return Object.keys(model).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});
};

const createModelInstance = function(instanceId, model) {
  if (store.hasModule(['model', instanceId])) {
    // store.registerModule(['model', instanceId], moduleTemplate);
    store.commit(`model/${instanceId}/set_list`, []);
    store.commit(`model/${instanceId}/set_focus`, -1);
  }
};

const createSingleModelInstance = function(instanceId, model) {
  if (store.hasModule(['model', instanceId])) {
    store.commit(`model/${instanceId}/set_list`, []);
    store.commit(`model/${instanceId}/put_data`, createModelObject(model));
    store.commit(`model/${instanceId}/set_focus`, 0);
  }
};

const deleteModelInstance = function(instanceId) {
  store.commit(`model/${instanceId}/set_list`, []);
  store.commit(`model/${instanceId}/set_focus`, -1);
};

export { createModelInstance, createSingleModelInstance, deleteModelInstance };
