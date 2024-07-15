export const paths = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/",
  myQuizzes: "/my-quizzes",
  myQuizDetails: "/my-quizzes/:quizId",
  editQuiz: "/my-quizzes/:quizId/edit",
  addQuizQuestions: "/my-quizzes/:quizId/:questionsId/add-questions",
  profile: "/profile",
  createQuiz: "/create-quiz",
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
