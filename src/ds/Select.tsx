import cc from 'classcat';
import React, { FunctionComponent, HTMLProps } from 'react';

import ChevronDown from './icons/ChevronDown';

type Props = HTMLProps<HTMLSelectElement>;

export const Select: FunctionComponent<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cc([
        'flex items-center lh-solid w-100 sans-serif navy',
        className,
      ])}
    >
      <select
        className="input-reset w-100 bg-transparent br1 ba b--moon-gray pv3 pl2 pr5"
        {...props}
      />
      <ChevronDown className="nl4 pen" />
    </div>
  );
};
