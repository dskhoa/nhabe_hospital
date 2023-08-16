<template>
  <el-scrollbar
    class="relative w-full bg-default overflow-y-auto h-screen "
  >
    <el-form :model="form" label-width="7vw" label-position="top" class="report-section" v-if="isAnalytic">
      <el-row>
        <el-col :span="12">
          <div class="content-center grid align-middle justify-center items-center w-1/2 fixed h-screen">
            <span class="text-3xl font-black align-bottom text-white">MẪU TÌM HIỂU VÀ PHÂN TÍCH SỰ CỐ</span>
            <span class="text-1.1 italic font-thin text-white">(Ban hành kèm theo Quy trình số 01/QT-QLCL ngày 25/05/2020 của Bệnh viện huyện Nhà Bè)</span>
          </div>
        </el-col>
        <el-col :span="12">
          <el-tabs v-model="analyticTab" class="mt-2" type="border-card">
            <el-tab-pane label="A. Cấp nhân viên" name="employee">
              <div class="bg-gray-200 p-4 rounded-md space-y-2 mt-5 mb-5">
                <el-card>
                  <template #header>
                    <div class="card-header flex justify-between">
                      <h1>
                        I. Mô tả chi tiết sự cố
                      </h1>
                      <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                        <el-input v-model="analyticForm.analysis_id" clearable class="w-full" placeholder="Số báo cáo"/>
                      </div>
                    </div>
                  </template>
                  <div class="card-header-description mt-2">
                    <el-form-item label="Mô tả chi tiết sự cố">
                      <el-input v-model="analyticForm.performed_treatment" type="textarea" class="mt-4 mb-4"
                                placeholder="(Mô tả cả xử lý tức thời và hậu quả. Đối với loét tỳ đè, chỉ ra cụ thể vị trí, bên, phạm vi và tình trạng lúc nhập viện. Đối với sai sót về thuốc, liệt kê rõ tất cả thuốc (đính kèm thêm 1 tờ liệt kê nếu cần)"/>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <div class="card-header flex justify-between">
                      <h1>
                        II. Phân loại sự cố theo nhóm sự cố (Incident type)
                      </h1>
                    </div>
                  </template>
                  <div v-for="(incident, id) in finalIncidentTypeList" :key="incident">
                    <el-form-item :label="`${id+1}. ${incident.title}`">
                      <el-checkbox-group v-model="analyticForm.incident_type" :max="1" class="flex flex-col">
                        <el-checkbox v-for="incident in incident.list" :label="incident"/>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <h1>
                      III. Điều trị/y lệnh đã được thực hiện
                    </h1>
                  </template>
                  <div class="card-header-description mt-2">
                    <el-form-item label="Điều trị/y lệnh đã được thực hiện">
                      <el-input v-model="analyticForm.treatment_executed" type="textarea" class="mt-4 mb-4"/>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <div class="card-header flex justify-between">
                      <h1>
                        IV. Phân loại sự cố theo nhóm nguyên nhân gây ra sự cố
                      </h1>
                    </div>
                  </template>
                  <div v-for="(incident, id) in finalReasonList" :key="incident">
                    <el-form-item :label="`${id+1}. ${incident.title}`">
                      <el-checkbox-group v-model="analyticForm.incident_type" :max="1" class="flex flex-col">
                        <el-checkbox v-for="incident in incident.list" :label="incident"/>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <h1>
                      V. Hành động khắc phục sự cố
                    </h1>
                  </template>
                  <div class="card-header-description mt-2">
                    <el-form-item label="Mô tả hành động xử lý sự cố">
                      <el-input v-model="analyticForm.solution_executed" type="textarea" class="mt-4 mb-4"/>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <h1>
                      VI. Đề xuất khuyến cáo phòng ngừa sự cố
                    </h1>
                  </template>
                  <div class="card-header-description mt-2">
                    <el-form-item label="Ghi đề xuất khuyến cáo phòng ngừa">
                      <el-input v-model="analyticForm.solution_executed" type="textarea" class="mt-4 mb-4"/>
                    </el-form-item>
                  </div>
                </el-card>
                <div class="flex justify-items-end">
                  <el-form-item class="justify-end">
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button>Cancel</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="B. Cấp quản lý" name="manager">
              <div class="bg-gray-200 p-4 rounded-md space-y-2 mt-5 mb-5">
                <el-card>
                  <template #header>
                    <div class="card-header flex justify-between">
                      <h1>
                        I. Đánh giá của Trưởng nhóm chuyên gia
                      </h1>
                    </div>
                  </template>
                  <div class="card-header-description mt-2">
                    <el-form-item label="Mô tả chi tiết sự cố">
                      <el-input v-model="analyticForm.group_leader_evaluation" type="textarea" class="mt-4 mb-4"
                                placeholder="Mô tả kết quả phát hiện được (không lặp lại các mô tả sự cố)"/>
                    </el-form-item>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-card>
                          <template #header class="sp">
                            <div class="card-header">
                              <h3>
                                Đã thảo luận đưa khuyến cáo/hướng xử lý với người báo cáo
                              </h3>
                            </div>
                          </template>
                          <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                            <el-form-item>
                              <el-checkbox-group v-model="analyticForm.is_aligned_with_reporter" :max="1">
                                <el-checkbox label="Có"/>
                                <el-checkbox label="Không"/>
                                <el-checkbox label="Không ghi nhận"/>
                              </el-checkbox-group>
                            </el-form-item>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span="12">
                        <el-card>
                          <template #header class="sp">
                            <div class="card-header">
                              <h3>
                                Phù hợp với các khuyến cáo chính thức được ban hành Ghi cụ thể khuyến cáo:
                              </h3>
                            </div>
                          </template>
                          <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                            <el-form-item>
                              <el-checkbox-group v-model="analyticForm.is_accorded" :max="1">
                                <el-checkbox label="Có"/>
                                <el-checkbox label="Không"/>
                                <el-checkbox label="Không ghi nhận"/>
                              </el-checkbox-group>
                            </el-form-item>
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <div class="card-header flex justify-between">
                      <h1>
                        II. Đánh giá mức độ tổn thương
                      </h1>
                    </div>
                  </template>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="Trên người bệnh">
                        <el-cascader-panel
                          v-model="analyticForm.client_level"
                          :options="clientLevelOptions"
                          placeholder="Mức độ tổn thương của người bệnh"
                          class="mt-4 mb-4"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                      <el-form-item label="Trên tổ chức">
                        <el-checkbox-group v-model="analyticForm.organization_level" :max="1" class="flex flex-col">
                          <el-checkbox v-for="level in organizationLevels" :label="level"/>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="Họ và tên">
                        <el-input v-model="analyticForm.reported.name"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Chức danh">
                        <el-input v-model="analyticForm.reported.title"> </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="justify-between">
                    <span class="self-center">Báo cáo được tao vào lúc <span class="font-bold">{{currentTime}}</span></span>
                    <el-form-item class="w-1/2">
                      <el-input v-model="analyticForm.reported.signature" placeholder="Kí tên" clearable></el-input>
                    </el-form-item>
                  </el-row>
                </el-card>
                <el-divider></el-divider>
                <div class="flex justify-items-end">
                  <el-form-item class="justify-end">
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button>Cancel</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
    <el-form :model="form" label-width="7vw" label-position="top" class="report-section" v-else>
      <el-row>
        <el-col :span="12">
          <div class="content-center grid align-middle justify-center items-center w-1/2 fixed h-screen">
            <span class="text-3xl font-black align-bottom text-white">MẪU BÁO CÁO SỰ CỐ Y KHOA</span>
            <span class="text-1.1 italic font-thin text-white">(Ban hành kèm theo Quy trình số 01/QT-QLCL ngày 25/05/2020
              của
              Bệnh viện huyện Nhà Bè)
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bg-gray-200 p-4 rounded-md space-y-2 mt-5 mb-5">
            <el-card>
              <template #header>
                <div class="card-header flex">
                  <h1 class="w-2/4">
                    Thông tin người bệnh
                  </h1>
                  <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                    <el-input v-model="reportId" clearable class="w-2/4" placeholder="Số báo cáo"/>
                    <el-input v-model="form.num_medical" clearable class="w-2/4" placeholder="Số bệnh án"/>
                  </div>
                </div>
              </template>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Last Name">
                    <el-input
                      v-model="form.name"
                      label="Last Name"
                      placeholder="Last Name"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Giới tính">
                    <el-select v-model="form.region" placeholder="Vui lòng chọn giới tính">
                      <el-option label="Nam" value="male"/>
                      <el-option label="Nữ" value="female"/>
                      <el-option label="Khác" value="other"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Ngày sinh">
                    <el-date-picker
                      v-model="form.birthdate"
                      type="date"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="Đối tượng xảy ra sự cố">
                <el-checkbox-group v-model="form.subject_incident" :max="1">
                  <el-checkbox label="Người bệnh"/>
                  <el-checkbox label="Người nhà/khách đến thăm"/>
                  <el-checkbox label="Nhân viên y tế"/>
                  <el-checkbox label="Trang thiết bị/cơ sở hạ tầng"/>
                </el-checkbox-group>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>
                <div class="card-header">
                  <h1>
                    Thông tin người báo cáo
                  </h1>
                </div>
              </template>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Họ và tên">
                    <el-input v-model="form.report.name"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Số điện thoại">
                    <el-input type="tel" v-model="form.report.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Email">
                    <el-input type="email" v-model="form.report.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="Chức danh">
                  <el-checkbox-group v-model="form.title" :max="1">
                    <el-checkbox label="Điều dưỡng"/>
                    <el-checkbox label="Bác sĩ"/>
                    <el-checkbox label="Người bệnh"/>
                    <el-checkbox label="Người nhà/khách đến thăm"/>
                    <el-checkbox label="Khác"/>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <el-row class="flex space-x-4">
                <el-form-item label="Người chứng kiến 1" class="w-1/3">
                  <el-input v-model="form.observer_1"></el-input>
                </el-form-item>
                <el-form-item label="Người chứng kiến 2" class="w-1/3">
                  <el-input v-model="form.observer_2"></el-input>
                </el-form-item>
              </el-row>
            </el-card>
            <el-card>
              <template #header>
                <div class="card-header flex">
                  <h1 class="w-2/3">
                    Nơi xảy ra sự cố
                  </h1>
                  <div class="flex flex-row-reverse space-x-4 space-x-reverse w-2/3">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.issued_date"
                        type="datetime"
                        placeholder="Ngày giờ xảy ra sự cố"
                      />
                    </el-form-item>
                  </div>
                </div>
              </template>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Khoa/phòng/vị trí xảy ra sự cố">
                    <el-input v-model="form.incident_location" type="textarea" class="mt-4 mb-4"
                              placeholder="Ví dụ: khoa ICU, khuôn viên bệnh viện"/>
                  </el-form-item>
                  <el-form-item label="Mô tả ngắn gọn về sự cố">
                    <el-input v-model="form.short_description" type="textarea" class="mt-4 mb-4"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Vị trí cụ thể">
                    <el-input v-model="form.exact_location" type="textarea" class="mt-4 mb-4"
                              placeholder="ví dụ: nhà vệ sinh, bãi đậu xe...."/>
                  </el-form-item>
                  <el-form-item label="Đề xuất giải pháp ban đầu">

                    <el-input v-model="form.proposal_solution" type="textarea" class="mt-4 mb-4"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="Điều trị/xử lí ban đầu đã được thực hiện">
                  <el-input v-model="form.performed_treatment" type="textarea" class="mt-4 mb-4"/>
                </el-form-item>
              </el-row>
            </el-card>
            <el-card>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-card>
                    <template #header class="sp">
                      <div class="card-header">
                        <h3>
                          Phân loại ban đầu về sự cố
                        </h3>
                      </div>
                    </template>
                    <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                      <el-form-item>
                        <el-checkbox-group v-model="form.incident_classification" :max="1">
                          <el-checkbox label="Chưa xảy ra"/>
                          <el-checkbox label="Đã xảy ra"/>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class="mt-2">
                    <template #header class="sp">
                      <div class="card-header">
                        <h3>
                          Thông báo cho người nhà/người bảo hộ
                        </h3>
                      </div>
                    </template>
                    <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                      <el-form-item>
                        <el-checkbox-group v-model="form.is_family_noticed" :max="1">
                          <el-checkbox label="Có"/>
                          <el-checkbox label="Không"/>
                          <el-checkbox label="Không ghi nhận"/>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class="mt-2">
                    <template #header class="sp">
                      <div class="card-header">
                        <h3>
                          Thông báo cho Bác sĩ điều trị/người có trách nhiệm
                        </h3>

                      </div>
                    </template>
                    <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                      <el-form-item>
                        <el-checkbox-group v-model="form.is_informed" :max="1">
                          <el-checkbox label="Có"/>
                          <el-checkbox label="Không"/>
                          <el-checkbox label="Không ghi nhận"/>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card>
                    <template #header class="sp">
                      <div class="card-header">
                        <h3>
                          Ghi nhận vào hồ sơ bệnh án/giấy tờ liên quan
                        </h3>
                      </div>
                    </template>
                    <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                      <el-form-item>
                        <el-checkbox-group v-model="form.is_recorded" :max="1">
                          <el-checkbox label="Có"/>
                          <el-checkbox label="Không"/>
                          <el-checkbox label="Không ghi nhận"/>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class="mt-2">
                    <template #header class="sp">
                      <div class="card-header">
                        <h3>
                          Thông báo cho người bệnh
                        </h3>
                      </div>
                    </template>
                    <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                      <el-form-item>
                        <el-checkbox-group v-model="form.is_client_noticed" :max="1">
                          <el-checkbox label="Có"/>
                          <el-checkbox label="Không"/>
                          <el-checkbox label="Không ghi nhận"/>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>

                  <el-card class="mt-2">
                    <template #header class="sp">
                      <div class="card-header">
                        <h3>
                          Đánh giá ban đầu về mức độ ảnh hưởng của sự cố
                        </h3>
                      </div>
                    </template>
                    <div class="flex flex-row-reverse space-x-4 space-x-reverse">
                      <el-form-item>
                        <el-checkbox-group v-model="form.impact_classification" :max="1">
                          <el-checkbox label="Nặng"/>
                          <el-checkbox label="Trung bình"/>
                          <el-checkbox label="nhẹ"/>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>

            <div class="flex justify-items-end">
              <el-form-item class="justify-end">
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-scrollbar>
</template>

<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "CreateReport",
  setup() {
    let severity = ref([])
    const severities = ['NC1', 'NC2', 'NC3']
    const router = useRoute()
    const isAnalytic = computed(() => router.query.reportForm === 'analytic')
    const analyticTab = ref('employee')

    let reportId = ref('')

    const analyticForm = reactive(
      {
        analysis_id: '',
        detailed_description: '',
        incident_type: ref([]),
        treatment_executed: '',
        incident_reason: '',
        solution_executed: '',
        recommendation_incident_prevention: '',
        group_leader_evaluation: '',
        is_aligned_with_reporter: '',
        is_accorded: '',
        client_level: '',
        organization_level: ref([]),
        reported: reactive({
          name: '',
          title: '',
          signature: '',
        }),
        created_at: new Date(),
      }
    )

    const form = reactive({
      name: '',
      num_medical: '',
      gender: '',
      birthdate: '',
      subject_incident: ref([]),
      incident_location: '',
      exact_location: '',
      issued_date: '',
      short_description: '',
      proposal_solution: '',
      performed_treatment: '',
      is_informed: ref([]),
      is_recorded: ref([]),
      is_family_noticed: ref([]),
      is_client_noticed: ref([]),
      report: reactive({
        name: '',
        phone: '',
        email: '',
      }),
      incident_classification: ref([]),
      impact_classification: ref([]),
      title: ref([]),
      observer_1: '',
      observer_2: '',
    })

    const technicalProcess = [
      'Không có sự đồng ý của người bệnh/người nhà (đối với những kỹ thuật, thủ thuật quy định phải ký cam kết)',
      'Không thực hiện khi có chỉ định',
      'Thực hiện sai người bệnh',
      'Thực hiện sai thủ thuật/quy trình/ phương pháp điều trị',
      'Thực hiện sai vị trí phẫu thuật/thủ thuật',
      'Bỏ sót dụng cụ, vật tư tiêu hao trong quá trình phẫu thuật',
      'Tử vong trong thai kỳ',
      'Tử vong khi sinh',
      'Tử vong sơ sinh'
    ]

    const hospitalInfections = [
      'Nhiễm khuẩn huyết',
      'Viêm phổi',
      'Nhiễm khuẩn vết mổ',
      'Nhiễm khuẩn tiết niệu',
      'Các loại nhiễm khuẩn khác'
    ]

    const medicinesAndFluids = [
      'Cấp phát sai thuốc, dịch truyền',
      'Thiếu thuốc',
      'Sai liều, sai hàm lượng',
      'Sai thời gian',
      'Sai y lệnh',
      'Bỏ sót thuốc/liều thuốc',
      'Sai thuốc',
      'Sai người bệnh',
      'Sai đường dùng'
    ]

    const BloodAndBloodProducts = [
      'Phản ứng phụ, tai biến khi truyền máu',
      'Truyền nhầm máu, chế phẩm máu',
      'Truyền sai liều, sai thời điểm',
    ]

    const medicalDevices = [
      'Thiếu thông tin hướng dẫn sử dụng',
      'Lỗi thiết bị',
      'Thiết bị thiếu hoặc không phù hợp'
    ]

    const behaviorList = [
      'Khuynh hướng tự gây hại, tự tử',
      'Quấy rối tình dục bởi nhân viên',
      'Quấy rối tình dục bởi người bệnh/ khách đến thăm',
      'Xâm hại cơ thể bởi người bệnh/khách đến thăm',
      'Có hành động tự tử',
      'Trốn viện'
    ]

    const clientAccidents = [
      'Té ngã'
    ]

    const infrastructure = [
      'Bị hư hỏng, bị lỗi',
      'Thiếu hoặc không phù hợp'
    ]

    const resourceManagement = [
      'Tính phù hợp, đầy đủ của dịch vụ khám bệnh, chữa bệnh',
      'Tính phù hợp, đầy đủ của nguồn lực',
      'Tính phù hợp, đầy đủ của chính sách, quy định, quy trình, hướng dẫn chuyên môn'
    ]

    const documents = [
      'Tài liệu mất hoặc thiếu',
      'Tài liệu không rõ ràng, không hoàn chỉnh',
      'Thời gian chờ đợi kéo dài',
      'Cung cấp hồ sơ tài liệu chậm',
      'Nhầm hồ sơ tài liệu',
      'Thủ tục hành chính phức tạp'
    ]

    const others = [
      'Các sự cố không đề cập trong các mục từ 1 đến 10'
    ]

    const finalIncidentTypeList = ref([
      {
        id: 1,
        title: 'Thực hiện quy trình kỹ thuật, thủ thuật chuyên môn',
        list: technicalProcess
      },
      {
        id: 2,
        title: 'Nhiễm khuẩn bệnh viện',
        list: hospitalInfections
      },
      {
        id: 3,
        title: 'Thuốc và dịch truyền',
        list: medicinesAndFluids
      },
      {
        id: 4,
        title: 'Máu và các chế phẩm máu',
        list: BloodAndBloodProducts
      },
      {
        id: 5,
        title: 'Thiết bị y tế',
        list: medicalDevices
      },
      {
        id: 6,
        title: 'Hành vi',
        list: behaviorList
      },
      {
        id: 7,
        title: 'Tai nạn đối với người bệnh',
        list: clientAccidents
      },
      {
        id: 8,
        title: 'Hạ tầng cơ sở',
        list: infrastructure
      },
      {
        id: 9,
        title: 'Quản lý nguồn lực, tổ chức',
        list: resourceManagement
      },
      {
        id: 10,
        title: 'Hồ sơ, tài liệu, thủ tục hành chính',
        list: documents
      },
      {
        id: 11,
        title: 'Khác',
        list: others
      }
    ])

    const employees = [
      'Nhận thức (kiến thức, hiểu biết, quan niệm)',
      'Thực hành (kỹ năng thực hành không đúng quy định, hướng dẫn chuẩn hoặc thực hành theo quy định, hướng dẫn sai)',
      'Thái độ, hành vi, cảm xúc',
      'Giao tiếp',
      'Tâm sinh lý, thể chất, bệnh lý',
      'Các yếu tố xã hội'
    ]

    const clients = [
      'Nhận thức (kiến thức, hiểu biết, quan niệm) - Người bệnh',
      'Thực hành (kỹ năng thực hành không đúng quy định, hướng dẫn chuẩn hoặc thực hành theo quy định, hướng dẫn sai) - Người bệnh',
      'Thái độ, hành vi, cảm xúc - Người bệnh',
      'Giao tiếp - Người bệnh',
      'Tâm sinh lý, thể chất, bệnh lý - Người bệnh',
      'Các yếu tố xã hội - Người bệnh',
    ]

    const environment = [
      'Cơ sở vật chất, hạ tầng, trang thiết bị',
      'Khoảng cách đến nơi làm việc quá xa',
      'Đánh giá về độ an toàn, các nguy cơ rủi ro của môi trường làm việc',
      'Nội quy, quy định và đặc tính kỹ thuật',
    ]

    const organizationService = [
      'Các chính sách, quy trình, hướng dẫn chuyên môn',
      'Tuân thủ quy trình thực hành chuẩn',
      'Văn hóa tổ chức',
      'Làm việc nhóm'
    ]

    const outsider = [
      'Môi trường tự nhiên',
      'Sản phẩm, công nghệ và cơ sở hạ tầng',
      'Quy trình, hệ thống dịch vụ'
    ]

    const reasonOthers = [
      'Các yếu tố không đề cập trong các mục từ 1 đến 5'
    ]

    const finalReasonList = ref([
      {
        id: 1,
        title: 'Nhân viên',
        list: employees
      },
      {
        id: 2,
        title: 'Người bệnh',
        list: clients
      },
      {
        id: 3,
        title: 'Môi trường làm việc',
        list: environment
      },
      {
        id: 4,
        title: 'Tổ chức, dịch vụ',
        list: organizationService
      },
      {
        id: 5,
        title: 'Yếu tố Bên ngoài',
        list: outsider
      },
      {
        id: 6,
        title: 'Khác',
        list: reasonOthers
      }
    ])

    const clientLevelOptions = [
      {
        value: 'nc0',
        label: '1. Chưa xảy ra (NC0)',
        children: [
          {
            value: 'A',
            label: 'A'
          }
        ]
      },
      {
        value: 'nc1',
        label: '2. Tổn thương nhẹ (NC1)',
        children: [
          {
            value: 'B',
            label: 'B'
          },
          {
            value: 'C',
            label: 'C'
          },
          {
            value: 'D',
            label: 'D'
          }
        ]
      },
      {
        value: 'nc2',
        label: 'Tổn thương trung bình (NC2)',
        children: [
          {
            value: 'E',
            label: 'E'
          },
          {
            value: 'F',
            label: 'F'
          }
        ]
      },
      {
        value: 'nc3',
        label: 'Tổn thương nặng (NC3)',
        children: [
          {
            value: 'G',
            label: 'G'
          },
          {
            value: 'H',
            label: 'H'
          },
          {
            value: 'I',
            label: 'I'
          }
        ]
      },
    ]

    const organizationLevels = [
      'Tổn hại tài sản',
      'Tăng nguồn lực phục vụ cho người bệnh',
      'Quan tâm của truyền thông',
      'Khiếu nại của người bệnh',
      'Tổn hại danh tiếng',
      'Can thiệp của pháp luật',
      'Khác'
    ]

    const currentTime = ref('');

    // Function to update the current time
    const updateCurrentTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleString();
    };

    // Call the updateCurrentTime function on component mount
    onMounted(() => {
      // Update the time every second
      setInterval(updateCurrentTime, 1000);
    });

    return {
      severity,
      severities,
      reportId,
      form,
      analyticForm,
      isAnalytic,
      analyticTab,
      finalIncidentTypeList,
      finalReasonList,
      clientLevelOptions,
      organizationLevels,
      currentTime
    }
  }
})
</script>
