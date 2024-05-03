<script setup lang="ts">
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { onMounted, onUnmounted, ref, unref } from 'vue';
import type { EditorOptions } from '@/types/editor.type';

const vditor = ref<Vditor | null>(null);

const value = defineModel({type: String, default: ''});

const props = defineProps<{id: string, options:EditorOptions}>();

defineExpose({vditor});

const emit = defineEmits<{
  input: [val: string]
  focus: [val: string]
  blur: [val: string]
  ctrlEnter: [val: string]
}>();

onMounted(() => {
  Object.assign(defaultOptions, props.options);
  vditor.value = new Vditor(props.id, {
    ...defaultOptions,
    after: () => {
      vditor.value!.insertValue(value.value);
    },
    input: val => {
      emit('input', val);
      value.value = val;
    },
    focus: val => {
      emit('focus', val);
    },
    blur: val => {
      emit('blur', val);
    },
    ctrlEnter: val => {
      emit('ctrlEnter', val);
    },
  });
});


const defaultOptions: EditorOptions = {
  height: '100%',
  width: '100%',
  mode: "ir",
  preview: {
    actions:[]
  },
};

onUnmounted(() => {
  const editorInstance = unref(vditor);
  if (!editorInstance) return;
  try {
    editorInstance?.destroy?.();
  } catch (error) {
    console.log(error);
  }
});



</script>

<template>
  <div class="block m-auto overflow-y-auto">
    <div :id="props.id"></div>
  </div>
</template>
