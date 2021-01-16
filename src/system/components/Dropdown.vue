<template>
  <select
    :value="dataValue || modelValue"
    @change="updateValue($event.target.value)"
  >
    <option v-for="item in items" :key="item.value" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
    },
    model: {
      type: String,
      default: '',
    },
    field: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataValue: '',
    };
  },
  computed: {
    modelValue() {
      return this.$store.getters[`${this.model}/get_data`][this.field];
    },
  },
  created() {
    if (this.value != undefined) this.dataValue = this.value;
  },
  methods: {
    updateValue(newValue) {
      if (this.value != undefined) this.$emit('input', newValue);
      else
        this.$store.commit(`${this.model}/set_data`, {
          [this.field]: newValue,
        });
    },
  },
};
</script>

<style></style>
