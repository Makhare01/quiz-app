export const paths = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/",
  myQuizzes: "/my-quizzes",
  myQuizDetails: "/my-quizzes/:quizId",
  addQuizQuestions: "/my-quizzes/:quizId/add-questions",
  profile: "/profile",
  createQuiz: "/create-quiz",
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
