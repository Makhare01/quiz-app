import { changeQuizStatus, QuizStatus } from "@api/quiz";
import { Button } from "@app/ui/button";
import { Dialog } from "@app/ui/dialog";
import { ToastContent } from "@app/ui/toast";
import { useBoolean } from "@lib/hooks";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { quizStatusOptions } from "@utils/quizzes";
import { toast } from "react-toastify";

type Props = {
  quizId: string;
  status: QuizStatus;
  onChange: () => void;
};

export const QuizStatusButton = ({ quizId, status, onChange }: Props) => {
  const isOpen = useBoolean();

  const $changeStatus = useMutation({
    mutationFn: changeQuizStatus,
  });

  const oppositeStatus: QuizStatus = status === "DRAFT" ? "READY" : "DRAFT";

  return (
    <Box>
      <Button variant="outlined" onClick={isOpen.setTrue}>
        Mark as: {quizStatusOptions[oppositeStatus]}
      </Button>

      <Dialog
        title="Delete quiz"
        open={isOpen.isTrue}
        onClose={isOpen.setFalse}
        onConfirm={() => {
          $changeStatus.mutate(
            { quizId, status: oppositeStatus },
            {
              onSuccess: () => {
                onChange();
                isOpen.setFalse();
                toast.success(
                  <ToastContent title="Success">
                    <Typography variant="body2">
                      Quiz status changed successfully
                    </Typography>
                  </ToastContent>
                );
              },
            }
          );
        }}
        confirmText="Change"
      >
        <Typography variant="body1">
          Are you sure that you want to change quiz status to:{" "}
          <Typography component="span" variant="body1" fontWeight={700}>
            {quizStatusOptions[oppositeStatus]}
          </Typography>
          ?
        </Typography>
      </Dialog>
    </Box>
  );
};
