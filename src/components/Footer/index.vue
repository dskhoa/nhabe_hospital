<template>
  <div class='flex flex-wrap items-center md:justify-between w-full'>
    <div class='xl:flex-6 xl:max-w-1/2 mx-auto md:mx-0'>
      <div class='text-center lg:text-left text-muted'>
        © 2023
        <a
          href='#'
          class='font-semibold ml-1 text-indigo-410 hover:text-indigo-410-active'
          target='_blank'
        >Nhà Bè</a
        >
        &amp;
        <a
          href='https://www.tdtu.edu.vn/en'
          class='font-semibold ml-1 text-indigo-410 hover:text-indigo-410-active'
          target='_blank'
        >Đại học Tôn Đức Thắng</a
        >
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { Shop } from '@element-plus/icons-vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Footer',
  components: {
    Shop,
    XIcon,
    MenuIcon,
  },
  setup() {
    return {}
  },
})
</script>
