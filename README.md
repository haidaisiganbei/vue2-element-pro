# vue2-element-pro

> 使用示例
```vue
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

```

