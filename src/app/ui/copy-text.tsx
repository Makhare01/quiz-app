import { IconLink } from "@app/assets/icons";
import { useBoolean } from "@lib/hooks";
import { Box, SxProps, Theme, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  text: string;
  copyText?: string;
  iconSx?: SxProps<Theme>;
};

export const CopyText = ({ text, copyText, iconSx }: Props) => {
  const isCopied = useBoolean();

  useEffect(() => {
    if (isCopied.isTrue) {
      setTimeout(() => {
        isCopied.setFalse();
      }, 3000);
    }
  }, [isCopied]);

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <CopyToClipboard text={text} onCopy={isCopied.setTrue}>
        <Tooltip
          title={isCopied.isTrue ? "Copied" : copyText ?? "Copy"}
          arrow
          placement="top"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <IconLink
              sx={{
                color: isCopied.isTrue ? "success.main" : "text.disabled",
                ...iconSx,
              }}
            />
          </Box>
        </Tooltip>
      </CopyToClipboard>
    </Box>
  );
};
