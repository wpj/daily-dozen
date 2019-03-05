import cc from 'classcat';
import React, { FunctionComponent, HTMLProps } from 'react';

import MinusIcon from '../ds/icons/Minus';
import PlusIcon from '../ds/icons/Plus';

function noopClickHandlerToDisableZoom() {}

const DoubleTapDisableWrapper: FunctionComponent = ({ children }) => {
  return (
    <div
      onClick={noopClickHandlerToDisableZoom}
      className="th-color-none ta-manipulation"
    >
      {children}
    </div>
  );
};

type ButtonProps = HTMLProps<HTMLButtonElement>;

const QuantityButton: FunctionComponent<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cc([
        'ta-manipulation fw-inherit input-reset dib pa3 bn br2',
        props.disabled
          ? ['bg-transparent', 'navy', 'o-30', 'IngredientCard__button--border']
          : ['bg-dark-blue', 'near-white', 'pointer'],
        className,
      ])}
      {...props}
    />
  );
};

export interface Props {
  decrement: () => void;
  decrementEnabled: boolean;
  increment: () => void;
  incrementEnabled: boolean;
}

export const QuantityControl: FunctionComponent<Props> = ({
  decrement,
  decrementEnabled,
  increment,
  incrementEnabled,
}) => {
  return (
    <>
      <DoubleTapDisableWrapper>
        <QuantityButton
          className="mr2"
          disabled={!decrementEnabled}
          aria-label="Decrement"
          data-testid="QuantityControl__decrement-button"
          onClick={decrement}
        >
          <MinusIcon className="f4-ns f6" />
        </QuantityButton>
      </DoubleTapDisableWrapper>
      <QuantityButton
        disabled={!incrementEnabled}
        aria-label="Increment"
        data-testid="QuantityControl__increment-button"
        onClick={increment}
      >
        <PlusIcon className="f4-ns f6" />
      </QuantityButton>
    </>
  );
};
