<template>
  <el-form :inline="true" :model="queryForm" class="demo-form-inline">
    <el-form-item v-for="(column, index) in queryColumns" :key="column.prop" :label="column.label">
      <!-- 自定义渲染 -->
      <template v-if="queryForm.searchRender">
        <slot :name="queryForm.prop"></slot>
      </template>
      <!-- select -->
      <template v-else-if="column.type == 'select'">
        <el-select v-model="queryForm[column.prop]" placeholder="请选择" filterable clearable>
          <template v-for="option in queryColumns[index].options">
            <el-option :key="option.value" :label="option.label" :value="option.value"></el-option>
          </template>
        </el-select>
      </template>
      <!-- date -->
      <template v-else-if="column.type == 'date'">
        <el-date-picker v-model="queryForm[column.prop]" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
          clearable style="width: 100%;"></el-date-picker>
      </template>
      <!-- input -->
      <template v-else>
        <el-input v-model="queryForm[column.prop]" placeholder="请输入" clearable></el-input>
      </template>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>

export default {
  name: "QueryForm",
  props: {
    // 根据columns生成查询表单
    queryColumns: {
      type: Array,
      default: () => [],
    },
    queryForm: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {};
  },
};
</script>

<style  scoped></style>