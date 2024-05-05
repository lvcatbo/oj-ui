<script setup lang="ts">
import Header from '@/components/layout/Header.vue';


</script>

<template>
  <a-layout class="w-full min-h-full bg-theme-gradient">
    <a-layout-header style="
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;"
    >
      <Header></Header>
    </a-layout-header>
    <a-layout-content class="p-8">
      <RouterView></RouterView>
    </a-layout-content>
    <a-layout-footer style="font-size: 12px; padding: 16px 50px; background-color: rgba(255, 255, 255, 0.7);" class="flex items-center justify-center gap-2 text-xs text-nowrap">
      <img src="/beian.png" alt="" srcset="" width="16px">
      <a href="https://beian.miit.gov.cn/" target="_blank">黔ICP备2024021781号</a>
      <a target="_blank" href="https://beian.miit.gov.cn/">黔ICP备2024021781号-1</a>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped></style>
