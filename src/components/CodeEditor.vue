<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from 'vue';
// @ts-ignore
import monaco from '@/plugins/monaco';


const props = withDefaults(defineProps<{
  width?: string | number
  height?: string | number
  language?: string
  options?: monaco.editor.IStandaloneEditorConstructionOptions
}>(), {
  width: '100%',
  height: '100%',
  language: 'javascript',
  value: '',
  options: () => ({})
})


const codeValue = defineModel({ type: String, default: '' });

const codeEditor = ref<monaco.editor.IStandaloneCodeEditor>()
onMounted(() => {
  const editor = monaco.editor.create(document.getElementById('codeEditor')!, {
    value: codeValue.value,
    language: props.language,
    theme: 'vs-dark',
    tabSize: 2,
    automaticLayout: true,
    ...props.options
  })
  editor.onDidChangeModelContent(() => {
    codeValue.value = editor.getValue();
  });
  codeEditor.value = editor;
})

watch(() => props.language, () => {
  monaco.editor.setModelLanguage(toRaw(codeEditor.value!).getModel()!, props.language)
})


</script>

<template>
  <div id="codeEditor" class="w-full h-full"></div>
</template>
