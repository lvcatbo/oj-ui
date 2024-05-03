interface Register {
  userAccount: string
  userPassword: string
  checkPassword: string
}


interface AddQuestionParams {
  title: string
  tags: string[]
  content: string
  answer: string
  judgeCase: [
    {
      input: string
      output: string
    }
  ]
  judgeConfig: {
    memoryLimit: number
    stackLimit: number
    timeLimit: number
  }
}


