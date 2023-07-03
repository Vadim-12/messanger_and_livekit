import { FC, SVGAttributes, memo } from 'react';

const HideChatIcon: FC<SVGAttributes<SVGElement>> = ({ fill, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L13.5858 12L10.2929 8.70711C9.90237 8.31658 9.90237 7.68342 10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289L16.4142 12L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071Z"
        fill={fill}
      />
    </svg>
  );
};

export default memo(HideChatIcon);
