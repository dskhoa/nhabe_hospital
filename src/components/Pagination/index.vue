<template>
  <div class='w-full'>
    <div class='flex justify-end mb-0'>
      <el-pagination
        v-model:current-page='currentPage1'
        v-model:page-size='pageSize4'
        :page-sizes='[20, 30, 40, 50]'
        :small='small'
        :disabled='disabled'
        :background='background'
        layout='total, sizes, prev, pager, next, jumper'
        :total='15'
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const currentPage1 = ref(1)
const pageSize4 = ref(20)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
