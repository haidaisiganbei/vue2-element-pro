import PreComponents from './Table/index.vue'

const components = [
  PreComponents
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
  ...components
}