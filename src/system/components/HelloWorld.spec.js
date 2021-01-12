import { shallowMount } from '@vue/test-utils';
import HelloWorld from '~/src/common/frame/components/node_modules/@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
