<script setup lang="ts">

const props = defineProps({
  lang: {
    type: String,
    default: 'TypeScript'
  }
});

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
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">TypeScript</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">Java</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">C++</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <code-editor></code-editor>
  </div>
</template>

<style lang='scss' scoped></style>
