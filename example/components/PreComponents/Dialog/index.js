import Vue from "vue";
import { cloneDeep } from "lodash-es";

export async function createDialog(data = {}) {
  return new Promise((resolve, reject) => {
    console.log(data);
    //  过滤掉hiddenInForm为true的字段
    const columns = cloneDeep(data.columns.filter(item => item.hiddenInForm !== true))
    // 获取rules
    const rules = {}
    columns.forEach(item => {
      if (item.rules) {
        rules[item.prop] = item.rules
      }
    })
    const Dialog = Vue.extend({
      data() {
        return {
          visible: true,
          form: {},
          ...data,
          columns,
          rules
        }
      },
      template: `
        <el-dialog
          :visible.sync="visible"
          width="30%"
          :before-close="onClose"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :destroy-on-close="true"
        >
          <span slot="title">提示</span>
          <el-form :model="form" :rules="rules" label-width="80px" ref="form">
            <el-form-item v-for="column in columns" :label="column.label" :key="column.prop" :prop="column.prop">
              <template v-if="column.options">
                <el-select  v-model="form[column.prop]" :placeholder='column.placeholder||"请选择"'>
                  <el-option
                    v-for="item in column.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
              <el-input v-else v-model="form[column.prop]" :placeholder='column.placeholder||"请输入"'></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      `,
      methods: {
      }
    })
    const dialog = new Dialog()
    // 确认按钮
    let _onConfirm = dialog.$options.methods.confirm
    dialog.confirm = function () {
      try {
        _onConfirm && _onConfirm()
        // 验证表单
        dialog.$refs.form.validate(valid => {
          if (!valid) {
            return false
          }
          resolve(dialog.form)
          dialog.$destroy()
          _onClose && _onClose.call(dialog)
          document.body.removeChild(dialog.$el)
        })
      } catch (e) {
        console.log(e)
        reject(e)
      }
    }
    // 关闭按钮
    let _onClose = dialog.$options.methods.onClose
    dialog.onClose = function () {
      dialog.$destroy()
      _onClose && _onClose.call(dialog)
      document.body.removeChild(dialog.$el)
    }
    // 点击关闭按钮时会改变visible
    dialog.$watch('visible', function (n, o) {
      dialog === false && dialog.onClose()
    })
    dialog.$mount()
    document.body.appendChild(dialog.$el)
  })
}


