import { qk } from "@api/query-keys";
import { getPublicQuizzes } from "@api/quiz";
import { Select } from "@app/ui/select";
import { TextField } from "@app/ui/texfield";
import { PublicQuizCard } from "@components/quiz-card";
import { DashboardSkeleton } from "@components/skeletons";
import { useSearch } from "@lib/hooks";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { recordToOptions } from "@utils/options";
import { quizCategoryOptions } from "@utils/quizzes";
import { useSearchParams } from "react-router-dom";
import { match, P } from "ts-pattern";

export const Dashboard = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const {
    value,
    search,
    onChange: onSearchChange,
  } = useSearch({
    searchParamsKey: "search",
  });

  const category = searchparams.get("category") ?? "ALL";

  const args = {
    category: category === "ALL" ? undefined : category,
    search: search ?? "",
  };

  console.log({ search: search ? "ki" : "ara" });

  const $publicQuizzes = useQuery({
    queryKey: qk.quiz.publicQuizzes.toKeyWithArgs(args),
    queryFn: () => getPublicQuizzes(args),
  });

  return (
    <Box width={1} height={1} px={3} py={1}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          mb: 3,
          pb: 2,
          borderBottom: 1,
          borderColor: "divider",
          gap: 3,
        }}
      >
        <Box>
          <Select
            value={category}
            onChange={(event) => {
              const value = event.target.value as string;
              if (value === "ALL") searchparams.delete("category");
              else searchparams.set("category", value);

              setSearchParams(searchparams);
            }}
            options={[
              { label: "All", value: "ALL" },
              ...recordToOptions(quizCategoryOptions, "label"),
            ]}
            label="Category"
            sx={{
              width: 200,
              borderRadius: 2,
            }}
          />
        </Box>

        <TextField
          value={value}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
          label="Search quiz"
          placeholder="Start typing..."
        />
      </Box>
      {match($publicQuizzes)
        .with({ isLoading: true }, () => <DashboardSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Box>{error.message}</Box>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizzes) => {
          if (quizzes.length === 0) {
            return (
              <Box>
                <Typography
                  variant="h2"
                  fontWeight={700}
                  textAlign="center"
                  mt={5}
                >
                  There are no quizzes to show
                </Typography>
              </Box>
            );
          }

          return (
            <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
              {quizzes.map((quiz) => (
                <PublicQuizCard key={quiz.quizId} {...quiz} />
              ))}
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
