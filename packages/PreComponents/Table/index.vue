<template>
  <div>
    <QueryFrom :queryForm.sync="queryForm" :queryColumns="queryColumns">
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </QueryFrom>
    <el-table :data="data">
      <template v-for="column in tableColumns">
        <!-- 自定义渲染 -->
        <template v-if="column.render">
          <el-table-column :prop="column.prop" :label="column.label" :formatter="formatter">
            <template slot-scope="scope">
              <slot :name="column.prop" v-bind="scope"></slot>
            </template>
          </el-table-column>
        </template>
        <!-- 选项渲染 -->
        <template v-else-if="column.options">
          <el-table-column :prop="column.prop" :label="column.label" :formatter="formatter">
            <template slot-scope="scope">
              <span>{{ getOptionLabel(column.options, scope.row[column.prop]) }}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 默认渲染 -->
        <template v-else>
          <el-table-column :prop="column.prop" :label="column.label" :formatter="formatter">
          </el-table-column>
        </template>
      </template>
    </el-table>
    <!-- 翻页 -->
    <Pagination @change="handlePageChange"></Pagination>
  </div>
</template>

<script>
import Pagination from "../Pagination/index.vue";
import QueryFrom from "../QueryForm/index.vue";

export default {
  components: {
    QueryFrom,
    Pagination,
  },
  props: {
    columns: {
      type: Array,
      default: () => { }
    },
    fetchFun: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      data: [],
      queryForm: {},
    };
  },
  computed: {
    tableColumns() {
      return this.columns.filter(column => !column.hiddenInTable)
    },
    queryColumns() {
      return this.columns.filter(column => column.search)
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      console.log(this.queryForm);
      const res = await this.fetchFun()
      this.data = res.list
    },
    handlePageChange(page) {
      this.search()
    },
    getOptionLabel(options, value) {
      if (!value) {
        return value;
      }
      const target = options.find(option => option.value == value)
      if (target && target.label) {
        return target.label
      }
      return value
    },
    // 格式化,空数据显示-
    formatter(row, column, cellValue) {
      if (cellValue === null || cellValue === undefined || cellValue === "") {
        return "-";
      }
      return cellValue;
    }
  }
};
</script>

<style  scoped></style>