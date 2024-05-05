<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from 'vue';

import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

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


const codeValue = defineModel({type: String, default:''});

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
