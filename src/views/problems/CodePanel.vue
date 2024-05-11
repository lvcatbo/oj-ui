<script setup lang="ts">

const lang = defineModel<string>('lang',{default: 'TypeScript'});
const code = defineModel<string>({default: ''});

const changeLang = (item: any) => {
  lang.value = item.key;
}

const languages = [
  {
    key: 'javascript',
    label: 'javascript'
  },
  {
    key: 'html',
    label: 'html'
  },
  {
    key: 'java',
    label: 'java'
  }
]

</script>

<template>
  <div class="h-full mx-2 bg-white rounded-md">
    <div class="w-full p-2">
      <a-dropdown>
        <a class="inline-flex items-center" @click.prevent>
          <span class="mr-1">{{ lang }}</span>
          <span class="icon-[ant-design--down-outlined]"></span>
        </a>
        <template #overlay>
          <a-menu @click="changeLang" :items="languages" />
        </template>
      </a-dropdown>
    </div>
    <code-editor v-model="code" :language="lang"></code-editor>
  </div>
</template>

<style lang='scss' scoped></style>
