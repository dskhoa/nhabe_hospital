<template>
  <div class='w-full block mx-auto h-auto py-2'>
    <div class='flex flex-wrap flex-col bg-white shadow mb-7 mx-auto rounded-md'>
      <div class='py-5 px-6 border-b border-primary-white'>
        <h3 class='cursor-auto'>BÁO CÁO Y KHOA</h3>
      </div>
      <div class='block overflow-x-auto w-full'>
        <ProjectTable :tableData='tableData' />
      </div>
      <div class='p-4'>
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

import ProjectTable from './components/ProjectTable.vue'
import Pagination from 'components/Pagination/index.vue'

export interface ReportDashboard {
  date: string,
  report: string
  form: string
  status: string
  reporter: string
}

export default defineComponent({
  name: 'Tables',
  components: {
    Pagination,
    ProjectTable,
  },
  setup() {
    const tableData: ReportDashboard[] = [
      {
        date: '2023-09-01',
        report: 'Nha Be Hospital Report 1',
        form: 'Tự nguyện',
        status: 'đang xử lý',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-09-01',
        report: 'Nha Be Hospital Report 2',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-08-26',
        report: 'Nha Be Report 3',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-08-30',
        report: 'Nha Be Hospital Report 4',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-08-31',
        report: 'Nha Be Hospital Report 5',
        form: 'Bắt buộc',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-08-06',
        report: 'Nha Be Hospital Report 6',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-30',
        report: 'Nha Be Hospital Report 7',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-28',
        report: 'Nha Be Hospital Report 8',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-15',
        report: 'Nha Be Hospital Report 9',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-06-15',
        report: 'Nha Be Hospital Report 10',
        form: 'Tự nguyện',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-13',
        report: 'Nha Be Hospital Report 11',
        form: 'Tự nguyện',
        status: 'từ chối',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-12',
        report: 'Nha Be Hospital Report 12',
        form: 'Bắt buộc',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-13',
        report: 'Nha Be Hospital Report 13',
        form: 'Bắt buộc',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-16',
        report: 'Nha Be Hospital Report 14',
        form: 'Bắt buộc',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
      {
        date: '2023-07-17',
        report: 'Nha Be Hospital Report 15',
        form: 'Bắt buộc',
        status: 'đã duyệt',
        reporter: 'Chương Thành Long',
      },
    ]

    return {
      tableData,
    }
  },
})
</script>
