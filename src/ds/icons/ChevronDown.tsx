import * as React from 'react';

const SvgChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="chevron-down_svg__feather chevron-down_svg__feather-chevron-down"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default SvgChevronDown;
