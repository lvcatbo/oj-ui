<script setup lang="ts">
import { createVNode, onMounted, ref } from 'vue';
import api from '@/request';
import { App } from 'ant-design-vue'
import { useUserStore } from '@/store';
const { message, modal } = App.useApp();


const dataSource = ref<Question[]>([])

const columns = ref([
  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '提交数',
    dataIndex: 'submitNum',
    key: 'submitNum',
    align: 'center',
  },
  {
    title: '通过数',
    dataIndex: 'acceptedNum',
    key: 'acceptedNum',
    align: 'center',
  },
]);

const useUser = useUserStore();
if (useUser.userRole?.some((role) => role === 'admin')) {
  columns.value.push({
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
  })
}


const colors = ['processing', 'volcano', 'geekblue', 'purple', 'green', 'red', 'orange', 'gold'];

const tagsOptions = [
  { label: '困难', value: '困难' },
  { label: '中等', value: '中等' },
  { label: '简单', value: '简单' },
]

const queryParams: QueryQuestionParams = {
  current: 1,
  pageSize: 10,
  total: 0,
}

const getQuestionList = async () => {
  const [e, res] = await api.getQuestionList(queryParams);
  if (!e && res) {
    dataSource.value = res.data.records;
  }
}

const toPlayground = (id: number) => {
  console.log(id);
}

const search = () => {
  queryParams.current = 1;
  getQuestionList();
}

const handleDelete = (id: string, title: string) => {
  modal.confirm({
    title: '确定要删除本题目吗',
    content: `即将删除题目：${title}`,
    async onOk() {
      const [err, res] = await api.deleteQuestion(id);
      if (!err) {
        message.success('删除成功');
        getQuestionList();
      }
    },
  });
}

const changeData = (pagination: any, filters: any, sorter: any) => {
  queryParams.current = pagination.current;
  queryParams.pageSize = pagination.pageSize;
  getQuestionList();
}

onMounted(async () => {
  await getQuestionList();
})


</script>

<template>
  <div class="px-2 py-5 bg-white rounded-md">
    <div class="flex gap-4">
      <a-form-item label="题目名称">
        <a-input v-model:value="queryParams.title" placeholder="搜索题目" />
      </a-form-item>
      <a-form-item label="标签" class="w-">
        <a-select v-model:value="queryParams.tags" mode="multiple" style="min-width: 200px; ">
          <a-select-option v-for="tag in tagsOptions" :key="tag.value" :value="tag.value">
            {{ tag.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item class="w-">
        <a-button type="primary" @click="search">搜索</a-button>
      </a-form-item>

    </div>
    <a-table :dataSource="dataSource" :columns="columns" @change="changeData"
      :pagination="{ hideOnSinglePage: true, size: queryParams.pageSize, total: queryParams.total }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          <a @click="toPlayground(record.id)">
            {{ record.title }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="(tag, index) in record.tags" :key="tag" :color="colors[index % colors.length]">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="space-x-2">
            <a-button size="small" @click="$router.push(`/updateQuestion/${record.id}`)">编辑</a-button>
            <a-button type="primary" size="small" danger @click="handleDelete(record.id, record.title)">删除</a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped></style>
