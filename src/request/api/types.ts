interface Register {
  userAccount: string
  userPassword: string
  checkPassword: string
}

type AddQuestionParams = Question

interface QuestionParams {
  id?: number;
  title?: string;
  tags?: string[];
  userId?: number;
  sortField?: string;
  sortOrder?: string;
}

type QueryQuestionParams = PageNation & QuestionParams




