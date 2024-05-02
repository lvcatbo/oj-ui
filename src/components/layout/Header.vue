<script setup lang="ts">
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router'
import { computed } from 'vue';

const userStore = useUserStore();

const username = computed(() => userStore.userName);

const router = useRouter()

const menuClick = (key: string) => {
  router.push(key)
}

</script>

<template>
  <div class="flex justify-between w-9/12">
    <a-menu mode="horizontal" theme="light" :default-selected-keys="['/']" @menu-item-click="(key: string) => menuClick(key)">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '10px' }" disabled>
        <div>OJ系统</div>
      </a-menu-item>
      <a-menu-item key="/">主页</a-menu-item>
      <a-menu-item key="/question">题目</a-menu-item>
      <a-menu-item key="/party">广场</a-menu-item>
    </a-menu>
    <div class="mr-4">
      <strong class=" text-sky-600" v-if="username">{{ username }}</strong>
      <!-- 登录或注册 -->
      <div v-else class="flex items-center">
        <a-button class="login-btn" type="text" @click="() => router.push('/login')">登录</a-button>
        <span>或</span>
        <a-button class="login-btn" type="text" @click="() => router.push('/register')">注册</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.login-btn) {
  color: #8c9196;
}

:deep(.login-btn):hover {
  color: #1890ff;
}
</style>
