import moduleTemplate from './template';
import store from '../index';

const createModelObject = function(model) {
  return Object.keys(model).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});
};

const createModelInstance = function(instanceId, model) {
  if (!store.hasModule(['model', instanceId])) {
    store.registerModule(['model', instanceId], moduleTemplate);
  }
};

const createSingleModelInstance = function(instanceId, model) {
  createModelInstance(instanceId, model);
  store.commit(`model/${instanceId}/put_data`, createModelObject(model));
  store.commit(`model/${instanceId}/set_focus`, 0);
};

const deleteModelInstance = function(instanceId) {
  store.unregisterModule(['model', instanceId]);
};

export { createModelInstance, createSingleModelInstance, deleteModelInstance };
