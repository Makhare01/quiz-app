import { buildModuleCacheKey } from "@lib/react-query-utils";
import { GetCurrentQuestionInput, GetUserAnswerInput } from "./answer";
import { GetQuizQuestionInput } from "./questions";
import {
  GetPublicQuizDetailsInput,
  GetPublicQuizzesInput,
  GetQuizDetailsInput,
} from "./quiz";

/**
 * Same list can be displayed with the standard page pagination in one place (useQuery)
 * and with the infinite scroll pagination in another place (useInfiniteQuery)
 * We want to keep appropriate query cache entries for them separately
 * So we add { infinite: true } to the query key used with useInfiniteQuery
 */
export type InfiniteQueryKey = {
  infinite?: true;
};

/**
 * `qk` stands for "query keys"
 */
export const qk = buildModuleCacheKey({
  auth: {
    token: {
      refresh: null,
    },
  },
  quiz: {
    details: (input: GetQuizDetailsInput) => [input],
    publicQuizDetails: (input: GetPublicQuizDetailsInput) => [input],
    publicQuizzes: (input: GetPublicQuizzesInput) => [input],
    myQuizzes: null,
    quizQuestion: (input: GetQuizQuestionInput) => [input],
  },
  answer: {
    getUserAnswer: (input: GetUserAnswerInput) => [input],
    getCurrentQuestion: (input: GetCurrentQuestionInput) => [input],
  },
});
