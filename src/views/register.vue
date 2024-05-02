<script setup lang="ts">
import { ref } from 'vue';
import api from '@/request'
import { message } from 'ant-design-vue';
import router from '@/router';


const registerForm = ref({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})
const submit = async () => {
  const [err, res] = await api.register(registerForm.value);
  if (!err && res) {
    message.success('注册成功！')
    router.push('/');
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-full bg-[#e8e8e8]">
    <div class="h-auto bg-[#F8F9FD] w-[350px] rounded-[40px] px-3 py-9 border-solid border-[6px] border-white shadow-light-blue">
      <h1 class="text-3xl font-black text-center text-[#1089D3]">注册</h1>
      <a-form :model="registerForm" class="px-8 mt-8">
        <a-form-item name="username">
          <a-input v-model:value="registerForm.userAccount" placeholder="请输入账号" class="px-5 py-2 rounded-3xl"></a-input>
        </a-form-item>
        <a-form-item name="userPassword">
          <a-input v-model:value="registerForm.userPassword" type="password" placeholder="请输入密码"
            class="px-5 py-2 rounded-3xl"></a-input>
        </a-form-item>
        <a-form-item name="checkPassword">
          <a-input v-model:value="registerForm.checkPassword" type="password" placeholder="请再次输入密码"
            class="px-5 py-2 rounded-3xl"></a-input>
        </a-form-item>
        <a-form-item>
          <a href="#" @click="$router.push('/login')" class="ml-3 text-xs text-blue-400">已有账号? 去登录</a>
        </a-form-item>

        <a-form-item>
          <a-button @click="submit" type="primary" html-type="submit" class="w-full rounded-md">注册</a-button>
        </a-form-item>
      </a-form>

      <div class="text-xs text-center text-gray-400">或 其他方式登录</div>
      <div class="flex justify-center w-full gap-4 mt-2">
        <span class="icon-[ant-design--google-circle-filled] hover:text-blue-500" style="width: 1.5em; height: 1.5em;"></span>
        <span class="icon-[ant-design--wechat-filled] hover:text-blue-500" style="width: 1.5em; height: 1.5em;"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
