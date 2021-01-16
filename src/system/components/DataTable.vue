<template>
  <div class="data-wrapper">
    <div class="data-info">
      <span class="total"><b>Total</b> {{ items.length | number('0,0') }}</span>
      <span class="page"><b>Page</b></span>
      <input
        type="number"
        v-model="page"
        :min="1"
        :max="Math.ceil(items.length / sizePerPage)"
      />
    </div>
    <table class="data-table">
      <thead>
        <th>No.</th>
        <th v-for="(column, index) in columns" :key="index">
          {{ column.text }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="item in pageItems"
          :key="item.index"
          :class="{
            focused: $store.getters[`${model}/get_focus_index`] == item.index,
          }"
          @click="$store.commit(`${model}/set_focus`, item.index)"
        >
          <td>{{ (item.index + 1) | number('0,0') }}</td>
          <td
            v-for="(column, index) in columns"
            :key="`${item.index}_${index}`"
          >
            <template
              v-if="$store.getters[`${model}/get_focus_index`] == item.index"
            >
              <text-field
                v-if="column.edit === 'text'"
                :model="model"
                :field="column.field"
              />
              <dropdown
                v-else-if="column.edit === 'select'"
                :model="model"
                :field="column.field"
                :items="[
                  { value: '', text: 'All' },
                  { value: 'M', text: 'Male' },
                  { value: 'F', text: 'Female' },
                ]"
              />
              <template v-else>{{ item[column.field] }}</template>
            </template>
            <template v-else>{{ item[column.field] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TextField from './TextField';
import Dropdown from './Dropdown';

export default {
  components: {
    TextField,
    Dropdown,
  },
  props: {
    model: {
      type: String,
      default: '',
    },
    columns: {
      type: Array,
      default: () => [],
    },
    sizePerPage: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    items() {
      return this.$store.getters[`${this.model}/get_list`];
    },
    pageItems() {
      let startIndex = (this.page - 1) * this.sizePerPage;
      if (startIndex >= this.items.length)
        startIndex = (this.page - 2) * this.sizePerPage;
      else if (startIndex < 0) startIndex = 0;

      return this.items
        .slice(startIndex, startIndex + this.sizePerPage - 1)
        .map((item, index) => {
          return {
            ...item,
            index: startIndex + index,
          };
        });
    },
  },
};
</script>

<style>
.data-wrapper {
  width: 100%;
}
.data-table {
  width: 100%;
}
.data-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 24px;
}
.data-info .total {
  margin-right: 24px;
}
.data-info .page {
  margin-right: 12px;
}
.data-table tr:hover {
  background-color: #efefef;
  cursor: pointer;
}
.data-table tr.focused {
  background-color: #dbdbdb;
}
</style>
