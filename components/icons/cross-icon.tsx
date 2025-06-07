import { type SVGProps, type FC } from 'react';

const CrossIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF6637" {...props} >
      <path
        d="M14.875 5.625L6.125 14.375M6.125 5.625L14.875 14.375"
        stroke="inherit"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { CrossIcon };
