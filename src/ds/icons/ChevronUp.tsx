import * as React from 'react';

const SvgChevronUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="chevron-up_svg__feather chevron-up_svg__feather-chevron-up"
    {...props}
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

export default SvgChevronUp;
