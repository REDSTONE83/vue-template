<template>
  <div>
    <h1>About Page</h1>
    <div class="condition">
      <div class="item">
        <label for="name">NAME</label>
        <text-field model="condition" field="name" />
      </div>
      <div class="item">
        <label for="name">AGE</label>
        <text-field model="condition" field="age" />
      </div>
      <div class="item">
        <label for="gender">GENDER</label>
        <dropdown
          model="condition"
          field="gender"
          :items="[
            { value: '', text: 'All' },
            { value: 'M', text: 'Male' },
            { value: 'F', text: 'Female' },
          ]"
        />
      </div>
      <button @click="fetchData">Search</button>
    </div>
    <data-table
      model="users"
      :columns="[
        {
          text: 'NAME',
          field: 'firstname',
          edit: 'text',
        },
        {
          text: 'AGE',
          field: 'age',
          edit: 'text',
        },
        {
          text: 'GENDER',
          field: 'gender',
          edit: 'select',
        },
      ]"
    />
  </div>
</template>

<script>
import TextField from '@/system/components/TextField.vue';
import Dropdown from '@/system/components/Dropdown.vue';
import DataTable from '@/system/components/DataTable.vue';

import { userModel, userSearchConditionModel } from '../model';
import {
  createModelInstance,
  createSingleModelInstance,
  deleteModelInstance,
} from '@/system/store/module';

import { fetchUsers } from '../api';

export default {
  components: { TextField, Dropdown, DataTable },
  beforeCreate() {
    createSingleModelInstance('condition', userSearchConditionModel);
    createModelInstance('users', userModel);
  },
  destroyed() {
    deleteModelInstance('condition');
    deleteModelInstance('users');
  },
  computed: {
    selectedUser() {
      return this.$store.getters['model/users/get_data'];
    },
    condition() {
      return this.$store.getters['model/condition/get_data'];
    },
  },
  methods: {
    async fetchData() {
      const condition = this.$store.getters['model/condition/get_data'];
      const { data } = await fetchUsers({ params: condition });
      this.$store.commit('model/users/set_list', data.users);
    },
  },
};
</script>

<style>
.condition {
  display: flex;
  padding: 24px;
}
.condition .item + .item {
  margin-left: 24px;
}
.item label {
  margin-right: 8px;
}
.condition button {
  margin-left: auto;
}
</style>
