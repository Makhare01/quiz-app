import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const IconCategoryFashion = ({ ...props }: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M3.74201 20.555C4.94201 22 7.17401 22 11.64 22H12.36C16.826 22 19.059 22 20.259 20.555M3.74201 20.555C2.54201 19.109 2.95401 16.915 3.77701 12.525C4.36201 9.405 4.65401 7.844 5.76501 6.922M20.259 20.555C21.459 19.109 21.047 16.915 20.224 12.525C19.639 9.405 19.346 7.844 18.235 6.922M18.235 6.922C17.125 6 15.536 6 12.361 6H11.639C8.46401 6 6.87601 6 5.76501 6.922"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M9 6V5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  );
};
