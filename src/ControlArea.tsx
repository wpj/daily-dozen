import React, { FunctionComponent, ReactType } from 'react';

export const ControlArea: FunctionComponent<{ as?: ReactType<any> }> = ({
  as: Component = 'div',
  ...props
}) => {
  return <Component className="bg-near-white ph0 br2" {...props} />;
};
