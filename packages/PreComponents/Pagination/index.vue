<template>
  <div class="pagination">
    <el-pagination background :layout="layout" :total="page.total" :page-size="page.pageSize" :current-page="page.pageNum"
      :page-sizes="[10, 20, 30, 40, 50, 100]" 
      @size-change="handleCurrentChange"
      @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  emits: ["change"],
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      layout: "sizes, prev, pager, next, jumper,->, total",
    };
  },
  methods: {
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.$emit("change", this.page);
    },
    handleCurrentChange(pageSize) {
      this.page.pageSize = pageSize;
      this.$emit("change", this.page);
    },
  }
};
</script>

<style  scoped>
.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>