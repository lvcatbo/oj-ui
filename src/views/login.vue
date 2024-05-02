<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/store';

const router = useRouter();
const userStore = useUserStore();

const loginForm = ref({
  userAccount: '',
  userPassword: ''
})

const formRules = {
  userAccount: [
    {required: true,message: '账号不能为空',},
  ],
  userPassword: [
    {required: true,message: '密码不能为空',}
  ]
}

const submit = async () => {
  const user = await userStore.login(loginForm.value)
  if(user) {
    message.success('登录成功！');
    router.push('/')
  }
}

</script>

<template>
  <div class="flex items-center justify-center w-full h-full bg-[#e8e8e8]">
    <div class="h-auto bg-[#F8F9FD] w-80 rounded-[40px] px-3 py-9 border-solid border-[6px] border-white shadow-light-blue">
      <h1 class="text-3xl font-black text-center text-[#1089D3]">登录</h1>
      <a-form :model="loginForm" @finish="submit" :rules="formRules" class="px-8 mt-8">
        <a-form-item name="userAccount">
          <a-input v-model:value="loginForm.userAccount" placeholder="请输入账号" class="px-5 py-2 rounded-3xl"></a-input>
        </a-form-item>
        <a-form-item name="userPassword">
          <a-input v-model:value="loginForm.userPassword" type="password" placeholder="请输入密码"
            class="px-5 py-2 rounded-3xl"></a-input>
        </a-form-item>
        <a-form-item>
          <a href="#" class="ml-3 text-xs text-blue-400">忘记密码 ?</a>
          <span class="ml-3 mr-3">or</span>
          <a href="#" @click="$router.push('/register')" class="text-xs text-blue-400">注册</a>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="w-full rounded-md">登录</a-button>
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
