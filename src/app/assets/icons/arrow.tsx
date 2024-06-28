import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const IconArrow = ({
  direction = "down",
  ...props
}: SvgIconProps & {
  direction?: "right" | "left" | "up" | "down";
}) => {
  let rotateValue;

  switch (direction) {
    case "up": {
      rotateValue = "rotate(0deg)";
      break;
    }
    case "down": {
      rotateValue = "rotate(180deg)";
      break;
    }
    case "left": {
      rotateValue = "rotate(-90deg)";
      break;
    }
    case "right": {
      rotateValue = "rotate(90deg)";
      break;
    }
  }

  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      sx={{ transform: rotateValue, ...props.sx }}
    >
      <path
        d="M2.99999 19H21C21.1822 18.9994 21.3609 18.9492 21.5167 18.8546C21.6725 18.7601 21.7995 18.6248 21.8842 18.4634C21.9688 18.3021 22.0079 18.1206 21.9971 17.9387C21.9863 17.7568 21.9261 17.5813 21.823 17.431L12.823 4.431C12.45 3.892 11.552 3.892 11.178 4.431L2.17799 17.431C2.07382 17.5809 2.01273 17.7566 2.00136 17.9388C1.98999 18.121 2.02878 18.3029 2.11351 18.4646C2.19824 18.6263 2.32567 18.7618 2.48196 18.8561C2.63825 18.9505 2.81741 19.0003 2.99999 19Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
