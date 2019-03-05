import cc from 'classcat';
import num2fraction from 'num2fraction';
import React, { FunctionComponent, ReactType } from 'react';

import {
  Quantity,
  Range,
  IngredientType,
  ServingSuggestion as ServingSuggestionType,
} from '../types';
import { Unit } from '../UserOptions';

function toSentence(array: string[], lastSeparator: string = ' or ') {
  const { length } = array;

  if (length == 2) {
    return array.join(lastSeparator);
  }

  return array
    .slice(0, length - 1)
    .concat(`${lastSeparator} ${array.slice(length - 1)}`)
    .join(', ');
}

function isRange(quantity: Quantity): quantity is Range {
  if (typeof quantity !== 'object') {
    return false;
  }

  return 'min' in quantity && 'max' in quantity;
}

function formatQuantity(quantity: Quantity): string {
  if (isRange(quantity)) {
    return `${quantity.min} - ${quantity.max}`;
  } else if (quantity < 1) {
    return num2fraction(quantity);
  }

  return quantity.toString();
}

function formatServing(
  quantity: Quantity,
  suggestion: string,
  unit?: string,
): string {
  const formattedQuantity = formatQuantity(quantity);
  return unit
    ? `${formattedQuantity} ${unit} ${suggestion}`
    : `${formattedQuantity} ${suggestion}`;
}

function formatImperialServing(
  quantity: Quantity,
  suggestion: string,
  unit: string,
): string {
  const formattedQuantity = formatQuantity(quantity);
  return `${formattedQuantity} ${unit} ${suggestion}`;
}

function formatMetricServing(
  quantity: Quantity,
  suggestion: string,
  unit: string,
): string {
  return `${formatQuantity(quantity)} ${unit} ${suggestion}`;
}

const ServingSuggestion: FunctionComponent<
  ServingSuggestionType & { unit: Unit }
> = ({ suggestion, serving, metricServing, imperialServing, unit }) => {
  let formatted;

  const suggestionString =
    typeof suggestion === 'string' ? suggestion : toSentence(suggestion);
  if (!imperialServing || !metricServing) {
    if (!serving) {
      return null;
    }

    formatted = formatServing(serving.quantity, suggestionString, serving.unit);
  } else if (unit === Unit.Imperial) {
    formatted = formatImperialServing(
      imperialServing.quantity,
      suggestionString,
      imperialServing.unit,
    );
  } else if (unit === Unit.Metric) {
    formatted = formatMetricServing(
      metricServing.quantity,
      suggestionString,
      metricServing.unit,
    );
  }

  return <div>{formatted}</div>;
};

const Heading: FunctionComponent<{ as?: ReactType<any> }> = ({
  children,
  as: Component = 'h2',
  ...props
}) => {
  return (
    <Component className="navy sans-serif f4-ns f5 mb2" {...props}>
      {children}
    </Component>
  );
};

function ServingSuggestions({
  servingSuggestions,
  unit,
}: {
  servingSuggestions: ServingSuggestionType[];
  unit: Unit;
}) {
  return (
    <>
      <Heading data-testid="ServingSuggestions__heading">
        Serving suggestions
      </Heading>

      <ul
        data-testid="ServingSuggestions__list"
        className="lh-copy sans-serif f5-ns f6"
      >
        {servingSuggestions.map((servingSuggestion, i) => (
          <li key={i}>
            <ServingSuggestion {...servingSuggestion} unit={unit} />
          </li>
        ))}
      </ul>
    </>
  );
}

function IngredientTypes({ types }: { types: IngredientType[] }) {
  return (
    <>
      <Heading data-testid="IngredientTypes__heading">Types</Heading>

      <ul
        data-testid="IngredientTypes__list"
        className="lh-copy sans-serif f5-ns f6"
      >
        {types.map(({ name }, i) => (
          <li key={i}>
            <div>{name}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export const IngredientDetails: FunctionComponent<{
  className: string;
  servingSuggestions?: ServingSuggestionType[];
  types?: IngredientType[];
  unit: Unit;
}> = ({ className, servingSuggestions, types, unit }) => {
  return (
    <div data-testid="IngredientDetails" className={cc(['mt3', className])}>
      {servingSuggestions ? (
        <div className="mb2">
          <ServingSuggestions
            servingSuggestions={servingSuggestions}
            unit={unit}
          />
        </div>
      ) : null}
      {types ? (
        <div>
          <IngredientTypes types={types} />
        </div>
      ) : null}
    </div>
  );
};
