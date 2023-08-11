import { FC, SVGAttributes, memo } from 'react';

const MuteCameraIcon: FC<SVGAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6354 26H20C22.2091 26 24 24.2091 24 22V13.648L13.6354 26ZM23.3286 9.78097C22.6113 8.70719 21.3882 8 20 8H7C4.79086 8 3 9.79086 3 12V22C3 24.2091 4.79086 26 7 26H9.71918L23.3286 9.78097ZM7.5 11C6.67157 11 6 11.6716 6 12.5C6 13.3284 6.67157 14 7.5 14C8.32843 14 9 13.3284 9 12.5C9 11.6716 8.32843 11 7.5 11ZM26 13.5C26 12.1193 27.1193 11 28.5 11C29.8807 11 31 12.1193 31 13.5V20.5C31 21.8807 29.8807 23 28.5 23C27.1193 23 26 21.8807 26 20.5V13.5Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.9959 4.83527C27.5459 5.29678 27.6176 6.11676 27.1561 6.66676L7.42146 30.1856C6.95996 30.7356 6.13998 30.8073 5.58998 30.3458C5.03999 29.8843 4.96824 29.0643 5.42975 28.5143L25.1644 4.99551C25.6259 4.44551 26.4459 4.37377 26.9959 4.83527Z"
      />
    </svg>
  );
};

export default memo(MuteCameraIcon);
