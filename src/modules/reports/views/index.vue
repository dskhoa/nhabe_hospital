<template>
  <div class="report-page">
    <div class="centered-container">
      <el-image :src="MedicalReportBanner" fit="contain"/>
      <el-dropdown split-button type="primary" @click="openReportForm" size="large" class="mt-12"
                   @command="setReportType">
        Tạo báo cáo sự cố y khoa
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="Tự nguyện">Báo cáo tự nguyện</el-dropdown-item>
            <el-dropdown-item command="Bắt buộc">Báo cáo bắt buộc</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
import MedicalReportBanner from '@/assets/images/medical_report_banner.png'
import {DocumentAddIcon} from '@heroicons/vue/outline'
import {ElMessage, ElLoading} from 'element-plus'
import {useRouter} from "vue-router";

export default {
  name: "Reports",
  setup() {
    const router = useRouter()

    const openReportForm = () => {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
      })

      setTimeout(() => {
        loading.close()
        router.push({name: 'Create Report'})
      }, 1500)
    }

    const setReportType = (command: string | number | object) => {
      ElMessage(`Đã chọn loại báo cáo ${command}`)
    }

    return {
      MedicalReportBanner,
      DocumentAddIcon,
      openReportForm,
      setReportType
    }
  }
}
</script>

<style>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
