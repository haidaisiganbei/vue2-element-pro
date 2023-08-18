<template>
  <el-dialog :visible="visible">
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
  }
};
</script>

<style  scoped></style>