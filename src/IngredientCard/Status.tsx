import cc from 'classcat';
import React, { FunctionComponent, SVGProps } from 'react';

import Check from '../ds/icons/Check';

const CompleteCheck: FunctionComponent<
  { show: boolean } & SVGProps<SVGSVGElement>
> = ({ show, className, ...props }) => {
  return (
    <Check
      className={cc([className, show ? 'visible' : 'hidden'])}
      {...props}
    />
  );
};

export const Status: FunctionComponent<{
  current: number;
  isComplete: boolean;
  total: number;
}> = ({ current, total, isComplete }) => {
  return (
    <div
      data-testid="IngredientCard__status"
      className={cc([
        'normal lh-copy mr2 v-mid sans-serif f4-ns f6',
        isComplete ? 'light-pink' : 'mid-gray',
      ])}
    >
      <span>{`${current} / ${total}`} </span>
      <CompleteCheck
        data-testid="IngredientCard__status-icon"
        className="v-mid"
        show={isComplete}
      />
    </div>
  );
};
