<template>
  <div class="app">
    <ProTable :columns="columns" :fetchFun="fetchFun">

    </ProTable>
  </div>
</template>

<script>
export default {
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