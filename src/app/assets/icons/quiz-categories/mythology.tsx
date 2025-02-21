import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const IconCategoryMythology = ({ ...props }: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M3 6L5 4V7C5 8.85652 5.7375 10.637 7.05025 11.9497C8.36301 13.2625 10.1435 14 12 14C13.8565 14 15.637 13.2625 16.9497 11.9497C18.2625 10.637 19 8.85652 19 7V4L21 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 21V3M12 3L10 5M12 3L14 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};
