
<template class="dark">
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
          <el-menu-item index="0">LOGO</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">Processing Center</el-menu-item>

        </el-menu>
      </el-header>


      <section class="form">

      </section>
      <el-main>
        <el-form

            label-width="100px"
            :model="formLabelAlign"
            style="max-width: 460px"
        >
          <el-form-item label="Name">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="formLabelAlign.region" />
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary" @click="submitForm(ruleFormRef)"
            >Submit</el-button
            >

          </el-form-item>

        </el-form>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>

</template>

<style>
.flex-grow {
  flex-grow: 1;
}
.el-main{

  justify-content: center;
  align-items: center;
  background-color: red;
}
</style>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {FormInstance} from "element-plus";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
const ruleFormRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
