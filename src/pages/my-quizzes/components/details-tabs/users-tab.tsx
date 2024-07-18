import { QuizUser } from "@api/quiz";
import { Table } from "@app/ui/table";
import { Box, Typography } from "@mui/material";

type Props = {
  users: Array<QuizUser>;
};

export const UsersTab = ({ users }: Props) => {
  return (
    <Box>
      <Typography variant="body1" fontWeight={700} mb={1}>
        Users list
      </Typography>

      <Table
        columns={[
          {
            key: "username",
            name: "Username",
          },
          {
            key: "email",
            name: "Email",
          },
          {
            key: "score",
            name: "Score",
          },
        ]}
        rows={users.map((user) => {
          return {
            key: user.userId,
            cells: [user.username, user.email, user.answer.score],
          };
        })}
      />
    </Box>
  );
};
