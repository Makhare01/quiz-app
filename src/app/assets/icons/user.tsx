import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const IconUser = ({ ...props }: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M5 20V19C5 17.1435 5.7375 15.363 7.05025 14.0503C8.36301 12.7375 10.1435 12 12 12M12 12C13.8565 12 15.637 12.7375 16.9497 14.0503C18.2625 15.363 19 17.1435 19 19V20M12 12C13.0609 12 14.0783 11.5786 14.8284 10.8284C15.5786 10.0783 16 9.06087 16 8C16 6.93913 15.5786 5.92172 14.8284 5.17157C14.0783 4.42143 13.0609 4 12 4C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8C8 9.06087 8.42143 10.0783 9.17157 10.8284C9.92172 11.5786 10.9391 12 12 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};
