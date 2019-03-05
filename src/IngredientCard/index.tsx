import cc from 'classcat';
import React, {
  useContext,
  useState,
  FunctionComponent,
  HTMLProps,
} from 'react';

import ChevronDown from '../ds/icons/ChevronDown';
import ChevronUp from '../ds/icons/ChevronUp';
import ExternalLinkIcon from '../ds/icons/ExternalLink';
import { IngredientDetails } from './IngredientDetails';
import { QuantityControl } from './QuantityControl';
import { checkBounds } from './shared';
import { Status } from './Status';
import { Ingredient } from '../types';
import { Context as OptionsContext } from '../UserOptions';

type ButtonProps = HTMLProps<HTMLButtonElement>;

const ExternalLink: FunctionComponent<HTMLProps<HTMLAnchorElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a
      {...props}
      rel="noopener"
      target="_blank"
      className={cc([className, 'dib link color-inherit pa3-ns pr2 pv3 pl1'])}
    >
      {children} <ExternalLinkIcon className="v-mid" />
    </a>
  );
};

const InfoButton: FunctionComponent<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      aria-label="More info"
      className={cc([
        'ta-manipulation input-reset pa3-ns pr2 pv3 pl1 dib bn fw-inherit navy bg-transparent pointer',
        className,
      ])}
      {...props}
    />
  );
};

type ChangeQuantity = () => void;

export const IngredientCard: FunctionComponent<
  Ingredient & {
    completed: number;
    decrement: ChangeQuantity;
    increment: ChangeQuantity;
    showCompleted: boolean;
  }
> = ({
  completed,
  decrement,
  displayName,
  increment,
  infoUrl,
  servingSuggestions,
  showCompleted,
  total,
  types,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [userOptions] = useContext(OptionsContext);

  const toggleShowDetails = () => {
    setShowDetails(prevShowDetails => !prevShowDetails);
  };

  const [isLowerBound, isComplete] = checkBounds({
    current: completed,
    max: total,
  });

  const InfoIcon = showDetails ? ChevronUp : ChevronDown;

  return (
    <div data-testid="IngredientCard" className="pv2 ph1 pa3-ns">
      <div className="flex justify-between items-center bg-near-white top-0 sticky">
        <h2 className="sans-serif ma0 navy f4-ns f6">
          {infoUrl ? (
            <ExternalLink href={infoUrl}>{displayName}</ExternalLink>
          ) : (
            <InfoButton
              data-testid="IngredientCard__info-button"
              onClick={toggleShowDetails}
            >
              {displayName} <InfoIcon className="v-mid" />
            </InfoButton>
          )}
        </h2>
        <div className="flex items-center">
          {showCompleted && (
            <Status current={completed} isComplete={isComplete} total={total} />
          )}
          <QuantityControl
            decrement={decrement}
            decrementEnabled={showCompleted && !isLowerBound}
            increment={increment}
            incrementEnabled={showCompleted}
          />
        </div>
      </div>

      {userOptions ? (
        <IngredientDetails
          className={cc({ dn: !showDetails })}
          servingSuggestions={servingSuggestions}
          types={types}
          unit={userOptions.unit}
        />
      ) : null}
    </div>
  );
};
