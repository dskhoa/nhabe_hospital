<template>
  <div class='w-full'>
    <el-table ref='tableRef' :class='`is-${theme}`' :data='tableData' row-key='date' stripe style='width: 100%'>
      <el-table-column
        :filter-method='filterHandler'
        :filters=filterDateList
        column-key='date'
        fixed
        label='Date'
        prop='date'
        sortable
        width='180'
      />
      <el-table-column label='BÁO CÁO' min-width='280'>
        <template #default='scope'>
          <div class='flex items-center'>
            <span class='pl-5 mb-0 text-0.875 font-semibold cursor-auto'>{{
                scope.row.report
              }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :filter-method=filterHandler :filters=filterFormList column-key='form' label='LOẠI BÁO CÁO'
                       prop='form'
                       min-width='130'>
        <template #default='scope'>
          <div class='px-4 cursor-auto'>
            <span class='text-0.8125 font-normal'>{{ scope.row.form }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :filter-method='filterHandler' :filters=filterStatusList column-key='status' prop='status'
                       filter-placement='bottom-end'
                       label='TRẠNG THÁI'
                       min-width='167'>
        <template #default='scope'>
          <el-tag :type="
                  scope.row.status === 'từ chối'
                  ? 'danger'
                  : scope.row.status === 'đang xử lý'
                  ? 'warning'
                  : 'success'
              " effect='plain'>
            <div class='px-4 flex items-center'>
              <i
                :class="[
                  scope.row.status === 'từ chối'
                  ? 'bg-danger'
                  : scope.row.status === 'đang xử lý'
                  ? 'bg-warning'
                  : 'bg-success',
              ]"
                aria-hidden='true'
                class='w-2.5 h-2.5 rounded-full'
              ></i>
              <span class='ml-2 pb-0.5 text-0.875 font-normal'>{{ scope.row.status }}</span>
            </div>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :filter-method=filterHandler :filters='filterReporterList' column-key='reporter'
                       label='NGƯỜI BÁO CÁO'
                       prop='reporter'
                       min-width='155'>
        <template #default='scope'>
          <div class='px-4 flex items-center'>
            <div class='flex justify-center -space-x-3'>
              {{ scope.row.reporter }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed='right' label='THAO TÁC' width='200'>
        <template #default='scope'>
          <el-button link size='small' type='primary'>Chi tiết
          </el-button
          >
          <el-button v-show="scope.row.form === 'Bắt buộc'" link size='small' type='primary' @click='openAnalyticForm'>
            Tạo phân
            tích
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { DotsVerticalIcon } from '@heroicons/vue/outline'
import { ElLoading, TableColumnCtx, TableInstance } from 'element-plus'
import { ReportDashboard } from '../index.vue'
import { transformList } from 'utils/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ProjectTable',
  components: {
    DotsVerticalIcon,
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'light',
    },
  },
  setup(props) {
    const theme = ref([
      { status: 'on schedule', color: '#11CDEF' },
      { status: 'delayed', color: '#F5365C' },
      { status: 'pending', color: '#FB6340' },
    ])
    const customColorMethod = (status: string) => {
      return theme.value.find((el: any) => el.status == status)?.color ?? '#2DCE89'
    }
    const router = useRouter()
    const tableRef = ref<TableInstance>()

    const clearFilter = () => {
      tableRef.value!.clearFilter()
    }

    const filterDateList = transformList(props.tableData, 'date')
    console.log(`filterDateList`, filterDateList)
    const filterStatusList = transformList(props.tableData, 'status')
    const filterFormList = transformList(props.tableData, 'form')
    const filterReporterList = transformList(props.tableData, 'reporter')

    const filterHandler = (
      value: string,
      row: ReportDashboard,
      column: TableColumnCtx<ReportDashboard>,
    ) => {
      console.log(column)
      const property = column['property']
      // @ts-ignore
      return row[property] === value
    }

    const openAnalyticForm = () => {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
      })

      setTimeout(() => {
        loading.close()
        router.push({ name: 'CreateReport', query: { reportForm: 'analytic' } })
      }, 1500)
    }

    return {
      customColorMethod,
      filterDateList,
      filterStatusList,
      filterFormList,
      filterReporterList,
      clearFilter,
      filterHandler,
      openAnalyticForm,
    }
  },
})
</script>
