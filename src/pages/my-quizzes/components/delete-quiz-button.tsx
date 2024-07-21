import { deleteQuiz } from "@api/quiz";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Dialog } from "@app/ui/dialog";
import { ToastContent } from "@app/ui/toast";
import { useBoolean } from "@lib/hooks";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  quizId: string;
  quizName: string;
};

export const DeleteQuizButton = ({ quizId, quizName }: Props) => {
  const navigate = useNavigate();
  const isOpen = useBoolean();

  const $deleteQuiz = useMutation({
    mutationFn: deleteQuiz,
  });

  return (
    <Box sx={{ width: { xs: 1, sm: "auto" } }}>
      <Button
        variant="outlined"
        color="error"
        onClick={isOpen.setTrue}
        fullWidth
      >
        Delete
      </Button>

      <Dialog
        title="Delete quiz"
        open={isOpen.isTrue}
        onClose={isOpen.setFalse}
        onConfirm={() => {
          $deleteQuiz.mutate(
            { quizId },
            {
              onSuccess: () => {
                toast.success(
                  <ToastContent title="Success">
                    <Typography variant="body2">
                      Quiz deleted successfully
                    </Typography>
                  </ToastContent>
                );
                navigate(paths.myQuizzes);
              },
            }
          );
        }}
        confirmText="Delete"
        confirmButtonColor="error"
      >
        <Typography variant="body1">
          Are you sure that you want to delete quiz:{" "}
          <Typography component="span" variant="body1" fontWeight={700}>
            {quizName}
          </Typography>
          ?
        </Typography>
      </Dialog>
    </Box>
  );
};
