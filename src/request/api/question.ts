import { Get, Post } from "../request";

export const addQuestion = (data: AddQuestionParams) => {
  return Post<number>('/question/add', {...data});
}

/**
 * 查询题目列表，自动同步分页参数
 * @param queryParams 分页查询参数
 */
export const getQuestionList = (queryParams: QueryQuestionParams) => {
  return Post<Page<Question>>('/question/list/page/vo', {...queryParams}, (res) => {
    let data = res.data;
    queryParams.current = data.current;
    queryParams.pageSize = data.size;
    queryParams.total = data.total;
    // data.records?.forEach(item => {
    //   item.tags = JSON.parse(item.tags as unknown as string);
    //   item.judgeConfig = JSON.parse(item.judgeConfig as unknown as string);
    //   item.judgeCase = JSON.parse(item.judgeCase as unknown as string);
    // })
    return res;
  });
}

/** 通过id查询题目 */
export const getQuestionById = (id: string) => {
  return Get<QuestionInfo>('/question/get/vo', {id});
}

/** 修改題目 */
export const updateQuestion = (data: AddQuestionParams) => {
  return Post<number>('/question/update', {...data});
}

/** 刪除題目 */
export const deleteQuestion = (id: string) => {
  return Post<number>('/question/delete', {id});
}

export const submitAnswer = (data: AnswerParams) => {
  return Post <Number>('/question/question_submit/do', {...data})
};

export default {
  addQuestion,
  getQuestionList,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
}

