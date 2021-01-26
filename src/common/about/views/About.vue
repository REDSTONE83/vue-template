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

    <div class="loading" v-if="isLoading" />
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
    // 이미 만들어진 Vuex Module의 내부 데이터를 초기화 하는 과정 (Single인 경우 1개 Row 추가 + Focus Index 세팅, 기본은 빈 배열 생성)
    createSingleModelInstance('condition', userSearchConditionModel);
    createModelInstance('users', userModel);
  },
  destroyed() {
    // 이미 만들어진 Vuex Module의 내부 데이터를 초기화 하는 과정 (동일한가? 아예 비우는 거긴 하다.)
    // Mixin을 활용하여 페이지에 종속된 Module ID 목록을 관리하고, 자동으로 Lifecycle hook에서 호출하는 방식은??
    deleteModelInstance('condition');
    deleteModelInstance('users');
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      // 로딩 인디케이터 시작
      this.isLoading = true;

      // Request 속성 추가 > Query Param, Path Param, Request Body
      // Model의 속성을 선택하여 추가할 수 있어야 한다. (기본적으로는 모든 속성을 추가)
      // Query Param은 각 속성에 배열/객체를 포함할 수 없음 (Request Body로 처리)
      // GET 프로토콜에 Request Body를 허용할 지는 사이트 마다 다를 수 있음 (허용 안하면 사용 안하면 됨)
      const condition = this.$store.getters['model/condition/get_data'];

      // HTTP Request를 여러 건 할 수 있어야 될까? 우선 단 건만 처리해 보자.
      // URL을 이 지점에 세팅하는 게 맞을까?
      const { data } = await fetchUsers(condition);

      // Response의 데이터는 배열/객체 모두 가능
      // 단순하게 해당 데이터의 특정 속성을 배열로 추가하던지, 아니면 객체를 put 하던지 할 수 있음
      // 매핑을 쉽게 정의할 수 있을까? Ex. users = model1.set_list, condition = model2.set_data
      // 또는 항목별로 정의? Ex. condition.name = model2.name, condition.age = model2.age, addInfo.nickname = model2.nickname
      this.$store.commit('model/users/set_list', data.users);

      // 로딩 인디케이터 종료
      this.isLoading = false;
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
.loading {
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
