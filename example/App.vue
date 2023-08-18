<template>
  <div class="app">
    <PreComponents :columns="columns" :fetchFun="fetchFun">

    </PreComponents>
  </div>
</template>

<script>
import PreComponents from './components/PreComponents';
export default {
  components: {
    PreComponents
  },
  data() {
    return {
      columns: [
        {
          prop: "name",
          label: "姓名",
          search: true,
        }
      ],
    };
  },
  methods: {
    async fetchFun() {
      return {
        total: 0,
        list: [{
          name: '张三'
        }]
      }
    }
  }
};
</script>

<style  scoped>
.app {
  padding: 20px;
}
</style>