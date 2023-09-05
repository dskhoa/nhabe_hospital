<template>
  <div class='w-full'>
    <el-card
      class='text-center border-slate-100 border-0'
      :body-style="{ padding: '0px', position: 'relative' }"
    >
      <div class='justify-center'>
        <el-link :underline='false' class='card-avatar-profile'>
          <el-avatar
            :size='!isHover ? 140 : 146'
            @mouseover='hoverCheck(true)'
            @mouseleave='hoverCheck(false)'
            :src='avatarImg'
            class='transition-all border-white border-4'
          />
        </el-link>
      </div>
      <div class='p-8'>
        <div class='text-center text-primary-dark'>
          <h3 class='font-semibold pb-2'>
            {{ name }}<span class='font-thin'>, {{ age }}</span>
          </h3>
          <h5 class='font-light'>
            <el-icon :size='12'>
              <Location />
            </el-icon>
            {{ location }}
          </h5>
        </div>
        <div class='text-center text-primary-dark'>
          <h3 class='text-0.813 mt-6 font-semibold pb-2'>
            {{ job }}
          </h3>
          <h5 class='text-base text-dark-lighter font-normal'>{{ degree }}</h5>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { Location } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ProfileCard',
  components: {
    Location,
  },
  props: {
    avatarImg: {
      type: String,
    },
    backgroundImg: {
      type: String,
    },
    friends: {
      type: Number,
      default: 0,
    },
    photos: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    job: {
      type: String,
      default: '',
    },
    degree: {
      type: String,
      default: '',
    },
  },
  setup() {
    const isHover = ref(false)
    const hoverCheck = (b: boolean) => {
      isHover.value = b
    }
    return {
      isHover,
      hoverCheck,
    }
  },
})
</script>
