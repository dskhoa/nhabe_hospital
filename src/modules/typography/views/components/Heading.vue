<template>
  <div class="w-full">
    <!-- Heading 1 -->
    <div class="row medium">
      <div class="md:w-1/4">
        <span class="title block">Heading 1</span>
      </div>
      <div class="md:w-3/4">
        <h1>Nha Be Hospital Dashboard</h1>
      </div>
    </div>
    <!-- Heading 2 -->
    <div class="row medium">
      <div class="md:w-1/4">
        <span class="title block">Heading 2</span>
      </div>
      <div class="md:w-3/4">
        <h2>Nha Be Hospital Dashboard</h2>
      </div>
    </div>
    <!-- Heading 3 -->
    <div class="row medium">
      <div class="md:w-1/4">
        <span class="title block">Heading 3</span>
      </div>
      <div class="md:w-3/4">
        <h3>Nha Be Hospital Dashboard</h3>
      </div>
    </div>
    <!-- Heading 4 -->
    <div class="row medium">
      <div class="md:w-1/4">
        <span class="title block">Heading 4</span>
      </div>
      <div class="md:w-3/4">
        <h4>Nha Be Hospital Dashboard</h4>
      </div>
    </div>
    <!-- Heading 5 -->
    <div class="row medium">
      <div class="md:w-1/4">
        <span class="title block">Heading 5</span>
      </div>
      <div class="md:w-3/4">
        <h5>Nha Be Hospital Dashboard</h5>
      </div>
    </div>
    <!-- Heading 6 -->
    <div class="row medium">
      <div class="md:w-1/4">
        <span class="title block">Heading 6</span>
      </div>
      <div class="md:w-3/4">
        <h6>Nha Be Hospital Dashboard</h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Heading',
})
</script>

<style lang="scss" scoped>
.row {
  @apply py-4 w-full h-auto break-normal;
}
.title {
  @apply uppercase text-80 font-semibold text-muted;
}
.medium {
  @apply flex flex-col md:flex-row md:justify-center md:items-center;
}
.row.medium p {
  @apply mb-4;
}
</style>
