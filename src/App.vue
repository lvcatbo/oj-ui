<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { useUserStore } from './store';

const userStore = useUserStore();
userStore.getUser();

</script>

<template>
  <a-config-provider :locale="zhCN">
    <a-app>
      <div class="h-screen">
        <RouterView></RouterView>
      </div>
    </a-app>
  </a-config-provider>
</template>
