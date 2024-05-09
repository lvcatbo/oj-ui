<script setup lang="ts">
import { onMounted, nextTick, watch } from 'vue';


const props = defineProps<{
  value: QuestionInfo;
}>();

watch(() => props.value, async () => {
  await nextTick();
  if (props.value) {
    const shadowHost = document.getElementById('shadow-host');
    if (shadowHost) {
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = props.value.content;
    } else {
      console.error('Element #shadow-host not found');
    }
  }
});
</script>

<template>
  <div class="h-full mx-2 bg-[#FAFAFA] rounded-md flex flex-col">
    <div class="flex items-center gap-2 py-1 ml-2">
      <div class="flex items-center p-1 rounded cursor-pointer hover:bg-gray-200">
        <span class="icon-[ant-design--file-text-outlined] text-blue-500"></span>
        <span>题目描述</span>
      </div>
      <div class="w-[1px] h-4 bg-gray-300"></div>

      <span class="icon-[fontisto--laboratory] text-blue-500"></span>
      <span>题目解析</span>
      <div class="w-[1px] h-4 bg-gray-300"></div>

      <span class="icon-[clarity--history-line] text-blue-500"></span>
      <span class="-ml-1">提交记录</span>
    </div>

    <div class="flex-1 p-2 overflow-auto bg-white" v-if="value">
      <h2 class="ml-2 text-xl font-bold">{{ value.title }}</h2>
      <a-divider style="margin: 1em 0;" />
      <div id="shadow-host" />
    </div>
  </div>
</template>

<style scoped></style>
