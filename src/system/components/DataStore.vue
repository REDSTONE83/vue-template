<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    namespace: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    name: {
      get() {
        return this.$store.state['about']['condition']['name'];
      },
      set(value) {
        this.$store.commit('about/condition/set_name', value);
      },
    },
  },
  render() {
    return this.$scopedSlots.default({
      data: this,
    });
  },
};
</script>
