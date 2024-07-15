import { createRoute } from "./create-route";
import { paths } from "./paths";

export const authRoutes = [
  createRoute({
    path: paths.dashboard,
    factory: () => import("../../pages/dashboard"),
    title: "Dashboard",
  }),
  createRoute({
    path: paths.myQuizzes,
    factory: () => import("../../pages/my-quizzes"),
    title: "My quizzes",
  }),
  createRoute({
    path: paths.myQuizDetails,
    factory: () => import("../../pages/my-quizzes/details"),
    title: "My quiz details",
  }),
  createRoute({
    path: paths.editQuiz,
    factory: () => import("../../pages/my-quizzes/details/edit"),
    title: "Edit quiz",
  }),
  createRoute({
    path: paths.addQuizQuestions,
    factory: () => import("../../pages/my-quizzes/details/add-questions"),
    title: "Add quiz questions",
  }),
  createRoute({
    path: paths.createQuiz,
    factory: () => import("../../pages/create-quiz"),
    title: "Create quiz",
  }),
  createRoute({
    path: paths.profile,
    factory: () => import("../../pages/profile"),
    title: "Profile",
  }),
];

export const unauthRoutes = [
  createRoute({
    path: paths.signIn,
    factory: () => import("../../pages/sign-in"),
    title: "Sign in",
  }),
  createRoute({
    path: paths.signUp,
    factory: () => import("../../pages/sign-up"),
    title: "Sign up",
  }),
];

export const routes = [...authRoutes, ...unauthRoutes];
