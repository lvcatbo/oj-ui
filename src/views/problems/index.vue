<script setup lang="ts">
// @ts-ignore
import { Splitpanes, Pane } from 'splitpanes'
import ProblemPanel from './ProblemPanel.vue'
import CodePanel from './CodePanel.vue'
import 'splitpanes/dist/splitpanes.css'
import { onBeforeMount, ref } from 'vue';
import Api from '@/request'
import { useRoute, useRouter } from 'vue-router';
import { App } from 'ant-design-vue';

const { message } = App.useApp();

const problemInfo = ref<QuestionInfo>();


const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  const [e,r] = await Api.getQuestionById(route.params.name as string);
  if(!e && r) {
    problemInfo.value = r.data;
  }
})

const anwserForm = ref<AnswerParams> ({
  language: 'typescript',
  code: '',
  questionId: route.params.name as string
})

const submit = async () => {
  const [e,r] = await Api.submitAnswer(anwserForm.value);
  if(!e && r) {
    message.success('提交成功');
    router.push('/');
  }
}

</script>

<template>
  <div class="w-screen h-screen min-w-[700px] min-h-[500px] bg-[#F0F0F0] py-2 px-1 box-border">
    <nav class="z-10 relative flex h-[48px] w-full shrink-0 items-center px-5 pr-2.5">
      <div class="relative flex items-center justify-between w-full">
        <!-- 左边 -->
        <div class="flex items-center justify-between gap-2">
          <picture class="flex h-5 cursor-pointer dark:hidden">
            <source
              srcset="https://static.leetcode.cn/cn-frontendx-assets/production/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png?x-oss-process=image%2Fformat%2Cwebp"
              type="image/webp">
            <img
              src="https://static.leetcode.cn/cn-frontendx-assets/production/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png"
              class="h-full" alt="LeetCode Logo">
          </picture>
          <div class="flex items-center gap-1">
            <span class="icon-[ant-design--menu-unfold-outlined]"></span>
            <span>题库</span>
          </div>
        </div>
        <!-- 右边 -->
        <div class="flex items-center gap-2">
          <a-tooltip placement="bottom" :arrow="false" color="blue" title="设置">
            <span class="icon-[ant-design--setting-twotone] text-xl cursor-pointer"></span>
          </a-tooltip>
          <div class="w-5 h-5 cursor-pointer">
            <img class="object-cover w-full h-full rounded-full"
              src="https://assets.leetcode.cn/aliyun-lc-upload/users/chong-hua-f/avatar_1714623832.png" alt="avatar">
          </div>
          <div
            class="cursor-pointer bg-[#ffa1161f] px-3 py-1.5 text-[#ffa116] text-sm transition-colors hover:bg-[#ffa11633] rounded">
            Plus 会员</div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="absolute top-0 z-20 flex h-full py-2 -translate-x-1/2 left-1/2">
        <div class="bg-[#0000000a] flex items-center">
          <div class="flex px-2 items-center cursor-pointer hover:bg-[#00000005]">
            <span class="icon-[ant-design--caret-right-outlined] text-[#0000008c] text-xl"></span>
            <span>运行</span>
          </div>
          <div class="w-[2px] h-full flex-none bg-[#F0F0F0]"></div>
          <div class="flex gap-2 items-center px-2 cursor-pointer hover:bg-[#00000005] text-green-500" @click="submit">
            <span class="icon-[ant-design--cloud-upload-outlined]"></span>
            <span>提交</span>
          </div>
        </div>
      </div>
    </nav>

    <main class="w-full h-[calc(100%-48px)] box-border mb-4">
      <Splitpanes class="default-theme">
        <Pane size="50" min-size="20">
          <problem-panel :value="problemInfo"></problem-panel>
        </Pane>
        <Pane size="50">
          <Splitpanes horizontal>
            <Pane size="80">
              <code-panel v-model:lang="anwserForm.language" v-model="anwserForm.code"></code-panel>
            </Pane>
            <Pane size="20" min-size="5">3</Pane>
          </Splitpanes>
        </Pane>
      </Splitpanes>
    </main>
  </div>
</template>

<style scoped></style>
