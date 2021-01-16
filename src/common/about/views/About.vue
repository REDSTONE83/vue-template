<template>
  <div>
    <h1>About Page</h1>
    <div class="condition">
      <div class="item">
        <label for="name">NAME</label>
        <text-field model="about/condition" field="name" />
      </div>
      <div class="item">
        <label for="name">AGE</label>
        <text-field model="about/condition" field="age" />
      </div>
      <div class="item">
        <label for="gender">GENDER</label>
        <dropdown
          model="about/condition"
          field="gender"
          :items="[
            { value: '', text: 'All' },
            { value: 'M', text: 'Male' },
            { value: 'F', text: 'Female' },
          ]"
        />
      </div>
      <button>Search</button>
    </div>
    <data-table
      model="about/users"
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

export default {
  components: { TextField, Dropdown, DataTable },
  created() {
    const range = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step,
      );

    const NAMES = ['Kim', 'Lee', 'Park', 'Kang', 'Seo'];
    const GENDER = ['M', 'F'];

    this.$store.commit(
      'about/users/set_list',
      range(1, 1000000, 1).map(value => {
        return {
          firstname: NAMES[Math.floor(Math.random() * 3)],
          lastname: NAMES[Math.floor(Math.random() * 3)],
          age: String(Math.floor(Math.random() * 50)),
          gender: GENDER[Math.floor(Math.random() * 2)],
          email: '',
          address: '',
          nation: '',
          phone: '',
          salary: '',
          department: '',
          nickname: '',
        };
      }),
    );
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
