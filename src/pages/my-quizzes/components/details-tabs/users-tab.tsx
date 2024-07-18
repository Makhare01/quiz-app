import { QuizUser } from "@api/quiz";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Table } from "@app/ui/table";
import { Box, Typography } from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";

type Props = {
  users: Array<QuizUser>;
};

export const UsersTab = ({ users }: Props) => {
  const navigate = useNavigate();

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
            key: "Result",
            name: "Result",
            width: 200,
            align: "center",
          },
        ]}
        rows={users.map((user) => {
          return {
            key: user.userId,
            cells: [
              user.username,
              user.email,
              <Button
                variant="outlined"
                disabled={!user.isFinished}
                onClick={() => {
                  if (user.isFinished) {
                    navigate(
                      generatePath(paths.quizResult, {
                        answerId: user.answerId,
                      })
                    );
                  }
                }}
              >
                See result
              </Button>,
            ],
          };
        })}
      />
    </Box>
  );
};
