import { Post } from "../request";

export const addQuestion = (data: AddQuestionParams) => {
  return Post<number>('/question/add', {...data});
}


export default {
  addQuestion,
}

