<script setup lang="ts">
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router'
import { computed } from 'vue';

const userStore = useUserStore();

const username = computed(() => userStore.userName);

const router = useRouter()

const menuClick = ({key} : any ) => {
  router.push(key)
}

const menu = [
  {
    key: '0',
    disabled: true,
    label: '燎原OJ'
  },
  {
    key: '/',
    label: '主页'
  },
  {
    key: '/question',
    label: '题目'
  },
  {
    key: '/addQuestion',
    label: '贡献题目'
  }
]

</script>

<template>
  <div class="flex justify-between w-10/12">
    <a-menu class="menu" :items="menu" mode="horizontal"  :default-selected-keys="['/']" @click="menuClick">

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
.menu {
  background-color: rgba(0, 0, 0, 0);
}
</style>
