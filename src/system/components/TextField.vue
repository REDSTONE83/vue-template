<template>
  <input
    type="text"
    :value="dataValue || modelValue"
    @input="updateValue($event.target.value)"
  />
</template>

<script>
export default {
  props: {
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
      return this.$store.getters[`model/${this.model}/get_data`][this.field];
    },
  },
  created() {
    if (this.value != undefined) this.dataValue = this.value;
  },
  methods: {
    updateValue(newValue) {
      if (this.value != undefined) this.$emit('input', newValue);
      else
        this.$store.commit(`model/${this.model}/set_data`, {
          [this.field]: newValue,
        });
    },
  },
};
</script>

<style></style>
