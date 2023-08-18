import preComponents from './PreComponents/index.js'
const components = [
  preComponents
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