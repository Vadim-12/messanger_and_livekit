import { FC, SVGAttributes, memo } from 'react';

const CameraIcon: FC<SVGAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 12C3 9.79086 4.79086 8 7 8H20C22.2091 8 24 9.79086 24 12V22C24 24.2091 22.2091 26 20 26H7C4.79086 26 3 24.2091 3 22V12ZM6 12.5C6 11.6716 6.67157 11 7.5 11C8.32843 11 9 11.6716 9 12.5C9 13.3284 8.32843 14 7.5 14C6.67157 14 6 13.3284 6 12.5ZM28.5 11C27.1193 11 26 12.1193 26 13.5V20.5C26 21.8807 27.1193 23 28.5 23C29.8807 23 31 21.8807 31 20.5V13.5C31 12.1193 29.8807 11 28.5 11Z"
        fill="#181B1D"
      />
    </svg>
  );
};

export default memo(CameraIcon);
