import {
  ButtonProps,
  CircularProgress,
  Button as MuiButton,
} from "@mui/material";
import { forwardRef } from "react";

type Props = ButtonProps & {
  isLoading?: boolean;
  loadingSize?: number;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ isLoading, loadingSize, ...props }: Props, ref) => {
    return (
      <MuiButton {...props} ref={ref}>
        {isLoading ? (
          <CircularProgress size={loadingSize ?? 22} />
        ) : (
          props.children
        )}
      </MuiButton>
    );
  }
);
