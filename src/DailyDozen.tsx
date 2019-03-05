import React, { useState, FunctionComponent, HTMLProps } from 'react';
import { addDays, format as formatDate, subDays } from 'date-fns';

import ArrowLeft from './ds/icons/ArrowLeft';
import ArrowRight from './ds/icons/ArrowRight';
import { ServingForm } from './ServingForm';
import { Ingredient } from './types';

type ButtonProps = HTMLProps<HTMLButtonElement>;

const Button: FunctionComponent<ButtonProps> = props => {
  return (
    <button
      {...props}
      className="input-reset pointer color-inherit pa2 bn bg-transparent"
    />
  );
};

export const DailyDozen: FunctionComponent<{ ingredients: Ingredient[] }> = ({
  ingredients,
}) => {
  const [date, setDate] = useState(new Date());

  const formattedDate = formatDate(date, 'MMMM d, yyyy');

  return (
    <>
      <div className="flex justify-center pv2">
        <div className="lh-solid mid-gray sans-serif flex items-start">
          <Button
            aria-label="go to previous day"
            onClick={() => setDate(subDays(date, 1))}
          >
            <ArrowLeft />
          </Button>
          <div className="di pa2">{formattedDate}</div>
          <Button
            aria-label="Go to next day"
            onClick={() => setDate(addDays(date, 1))}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <ServingForm date={date} ingredients={ingredients} />
    </>
  );
};
