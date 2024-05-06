<script setup lang="ts">
import { createVNode, onBeforeMount, ref } from 'vue';
import MdEditer from '@/components/MdEditer.vue';
import api from '@/request';
import { useRouter, useRoute } from 'vue-router';
import { App } from 'ant-design-vue'
const { message, modal } = App.useApp();

const router = useRouter();
const route = useRoute();

const form = ref<Question>({
  title: '',
  content: '',
  tags: [],
  answer: '',
  judgeCase: [
    {
      input: '',
      output: ''
    }
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 10000,
    timeLimit: 1000
  }
})
const rules = ref({
  title: [
    { required: true, message: '请输入标题' },
  ]
})

const tagOptions = [
  { value: '简单', label: '简单' },
  { value: '一般', label: '一般' },
  { value: '困难', label: '困难' }
]


const addCase = () => {
  form.value.judgeCase.unshift({
    input: '',
    output: ''
  })
}

const submit = async () => {
  if (form.value.id === undefined) {
    const [e, r] = await api.addQuestion(form.value);
    if (!e && r) {
      message.success('添加成功');
      router.push('/')
    }
  } else {
    const [e, r] = await api.updateQuestion(form.value);
    if (!e && r) {
      message.success('更新成功');
    }
  }
}

const handleDelete = () => {
  modal.confirm({
    title: '确定要删除本题目吗',
    content: createVNode('div', { style: 'color:red;' }, '删除后不可恢复哦'),
    async onOk() {
      if (form.value.id) {
        const [err, res] = await api.deleteQuestion(form.value.id);
        if (!err) {
          message.success('删除成功');
          router.push('/')
        }
      }
    },
    onCancel() {
      console.log('Cancel');
    },
    class: 'test',
  });
}

onBeforeMount(async () => {
  const id = route.params.id as string;
  if (id) {
    const [e, res] = await api.getQuestionById(id);
    debugger
    if (!e && res) {
      const val = res.data;
      form.value.id = val.id;
      form.value.title = val.title;
      form.value.tags = val.tags;
      form.value.content = val.content;
      form.value.answer = val.answer;
      form.value.judgeCase = val.judgeCase;
      form.value.judgeConfig = val.judgeConfig;
    }
  }
})



</script>

<template>
  <div class="w-full min-h-full mx-auto">
    <a-card class="w-full h-full" hoverable>
      <a-form :rules="rules" :model="form" style="height: 100%;" @finish="submit">
        <div class="flex flex-wrap gap-4">
          <a-form-item label="标题" name="title">
            <a-input v-model:value="form.title" id="warning2" placeholder="题目标题" />
          </a-form-item>
          <a-form-item label="标签" name="tags" class="w-56">
            <a-select v-model:value="form.tags" mode="tags" placeholder="自定义标签" :options="tagOptions" />
          </a-form-item>
          <a-form-item name="judgeConfig.memoryLimit" class="w-40">
            <a-input-number v-model:value="form.judgeConfig.memoryLimit" addonBefore="内存" addonAfter="K" />
          </a-form-item>
          <a-form-item class="w-40">
            <a-input-number v-model:value="form.judgeConfig.timeLimit" addonBefore="超时" addonAfter="ms" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="mr-4">提交</a-button>
            <a-button danger @click="handleDelete" v-if="form.id">删除</a-button>
          </a-form-item>
        </div>
        <a-row :gutter="[10, 10]">
          <a-col :xl="10" :lg="24" class="w-full overflow-auto resize-x">
            <h2 class="p-1 font-bold rounded bg-slate-200">编辑题目</h2>
            <MdEditer id="v1" v-model="form.content" :options="{ height: '500px' }"></MdEditer>
          </a-col>
          <a-col :xl="10" :lg="24">
            <h2 class="p-1 font-bold rounded bg-slate-200">编辑题解</h2>
            <MdEditer id="v2" v-model="form.answer" :options="{ height: '500px' }"></MdEditer>
          </a-col>
          <a-col :xl="4" :lg="24">
            <h2 class="p-1 font-bold rounded bg-slate-200">测试用例</h2>
            <div class="h-[500px] overflow-y-auto">
              <a-button type="dashed" block @click="addCase" class="flex items-center justify-center my-2">
                <template #icon>
                  <span class="icon-[ant-design--plus-outlined]"
                    style="width: 1.2em; height: 1.2em; color: black;"></span>
                </template>
                添加用例
              </a-button>
              <a-card v-for="(item, index) in form.judgeCase" :key="index" size="small"
                :title="`用例${form.judgeCase.length - index}`" class="case-card">
                <template #extra><a-button type="text" danger @click="form.judgeCase.splice(index, 1)">
                    <template #icon>
                      <span class="icon-[ant-design--close-outlined]"
                        style="width: 1.2em; height: 1.2em; color: palevioletred;"></span>
                    </template>
                  </a-button></template>
                <span>输入：</span>
                <a-textarea autoSize v-model:value="item.input" addon-before="输入"></a-textarea>
                <span>输出：</span>
                <a-textarea autoSize v-model:value="item.output" addon-before="输出"></a-textarea>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.case-card {
  margin-bottom: 10px;
  background-color: aliceblue;
}

:deep(.case-card .ant-card-body) {
  padding: 10px 5px;
}
</style>
