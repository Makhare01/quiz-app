import { qk } from "@api/query-keys";
import { updateUserFavoriteQuizzes } from "@api/user";
import { IconStar, IconStarFilled } from "@app/assets/icons";
import { IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  quizId: string;
  isFavorite?: boolean;
  isBlocked?: boolean;
  onUpdate?: () => void;
};

export const StarButton = ({
  quizId,
  isFavorite,
  isBlocked,
  onUpdate,
}: Props) => {
  const queryClient = useQueryClient();

  const $updateFavorites = useMutation({
    mutationFn: updateUserFavoriteQuizzes,
  });

  const onChange = () => {
    $updateFavorites.mutate(
      { quizId },
      {
        onSuccess: () => {
          onUpdate?.();
          queryClient.invalidateQueries({
            queryKey: qk.auth.token.refresh.toKey(),
          });
        },
      }
    );
  };

  return (
    <IconButton
      disableRipple
      onClick={(event) => {
        event.stopPropagation();
        onChange();
      }}
      sx={{
        p: 0,
        ...(!isBlocked && {
          position: "absolute",
          top: 10,
          right: 10,
        }),
      }}
    >
      {isFavorite ? (
        <IconStarFilled sx={{ color: "warning.main" }} />
      ) : (
        <IconStar sx={{ color: "warning.main" }} />
      )}
    </IconButton>
  );
};
