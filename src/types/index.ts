
interface Question {
  id?: string
  title: string
  tags: string[]
  content: string
  answer?: string
  judgeCase: {
    input: string
    output: string
  }[]
  judgeConfig: {
    memoryLimit: number
    stackLimit: number
    timeLimit: number
  }
}
/**
 * 題目基本信息以及做題情況
 */
interface QuestionInfo extends Question {
  submitNum?: number; // 题目提交数（可选）
  acceptedNum?: number; // 题目通过数（可选）
  thumbNum?: number; // 点赞数（可选）
  favourNum?: number; // 收藏数（可选）
  userId?: number; // 创建用户的唯一标识符（可选）
  createTime?: Date | string; // 创建时间，可以是Date对象或字符串（可选）
  updateTime?: Date | string; // 更新时间，可以是Date对象或字符串（可选）
  isDelete?: number; // 是否删除（可选）
}

interface JudgeConfig {
  memoryLimit: number; // 内存限制
  stackLimit: number; // 栈限制
  timeLimit: number; // 时间限制
}

interface PageNation {
  current: number
  pageSize: number
  total: number
}

interface Page<T> {
  records: T[];
  total: number;
  current: number;
  size: number;
  orders: OrderItem[];
  optimizeCountSql: boolean;
  searchCount: boolean;
  optimizeJoinOfCountSql: boolean;
  countId?: string;
  maxLimit?: number;
}

interface OrderItem {
  column: string;
  asc: boolean;
}
