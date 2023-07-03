import { FC, SVGAttributes, memo } from 'react';

const MuteMicrophoneIcon: FC<SVGAttributes<SVGElement>> = (props) => {
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
        d="M17 6C15.4087 6 13.8826 6.55777 12.7574 7.55061C11.6321 8.54345 11 9.89003 11 11.2941V17.7059C11 19.11 11.6321 20.4566 12.7574 21.4494C12.9844 21.6497 13.2277 21.8323 13.4846 21.9962L22.9623 10.7011C22.8108 9.51522 22.2083 8.40265 21.2426 7.55061C20.1174 6.55777 18.5913 6 17 6ZM23 15.3233L16.5699 22.9864C16.7126 22.9954 16.856 23 17 23C18.5913 23 20.1174 22.4422 21.2426 21.4494C22.3679 20.4566 23 19.11 23 17.7059V15.3233ZM12.0102 23.7532C11.778 23.5679 11.5552 23.369 11.3431 23.1569C9.84286 21.6566 9 19.6217 9 17.5C9 16.6716 8.32843 16 7.5 16C6.67157 16 6 16.6716 6 17.5C6 20.4174 7.15893 23.2153 9.22183 25.2782C9.50122 25.5576 9.78381 25.8185 10.0735 26.0613L12.0102 23.7532ZM12.6619 27.6437L14.7353 25.1728C15.4642 25.3879 16.2263 25.5 17 25.5C19.1217 25.5 21.1566 24.6571 22.6569 23.1569C24.1571 21.6566 25 19.6217 25 17.5C25 16.6716 25.6716 16 26.5 16C27.3284 16 28 16.6716 28 17.5C28 20.4174 26.8411 23.2153 24.7782 25.2782C22.9981 27.0582 21.0273 28.1263 18.1916 28.4353C16.9612 28.5694 16.2418 28.5435 15.0242 28.3211C14.147 28.161 13.3697 27.9361 12.6619 27.6437Z"
        fill="#181B1D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.4016 4.83527C27.9516 5.29678 28.0234 6.11676 27.5619 6.66676L7.82723 30.1856C7.36572 30.7356 6.54574 30.8073 5.99574 30.3458C5.44575 29.8843 5.37401 29.0643 5.83551 28.5143L25.5702 4.99551C26.0317 4.44551 26.8516 4.37377 27.4016 4.83527Z"
        fill="#181B1D"
      />
    </svg>
  );
};

export default memo(MuteMicrophoneIcon);