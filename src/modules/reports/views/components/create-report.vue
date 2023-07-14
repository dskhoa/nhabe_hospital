<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-gray-200 p-4 rounded-md">
      <el-space wrap>
        <el-card style="width: 40vw !important;">
          <template #header>
            <div class="card-header">
              <h1>
                Thông tin người bệnh
              </h1>
            </div>
          </template>
          <el-form :model="form" label-width="7vw">
            <el-form-item label="Họ và tên">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Số bệnh án">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker
                  v-model="form.date1"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-time-picker
                  v-model="form.date2"
                  placeholder="Pick a time"
                  style="width: 100%"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities" name="type" />
                <el-checkbox label="Promotion activities" name="type" />
                <el-checkbox label="Offline activities" name="type" />
                <el-checkbox label="Simple brand exposure" name="type" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor" />
                <el-radio label="Venue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="width: 50vw !important;">
          <template #header>
            <div class="card-header">
              <h1>
                Báo cáo y khoa
              </h1>
              <el-input v-model="reportId" clearable class="w-1/6" placeholder="Số báo cáo/Mã sự cố"/>
            </div>
            <el-steps :active="active" finish-status="success" class="mt-5">
              <el-step title="Step 1" />
              <el-step title="Step 2" />
              <el-step title="Step 3" />
            </el-steps>
          </template>
          <h3>Mức độ nghiêm trọng</h3>
          <el-checkbox-group v-model="severity" size="large" :max="1" class="mt-4">
            <el-checkbox-button v-for="sv in severities" :key="sv" :label="sv">
              {{ sv }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-card>
      </el-space>
      </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "CreateReport",
  setup() {
    let severity = ref([])
    const severities = ['NC1', 'NC2', 'NC3']

    let reportId = ref('')

    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })

    return {
      severity,
      severities,
      reportId,
      form
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
