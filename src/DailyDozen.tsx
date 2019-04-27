import cc from 'classcat';
import React, {
  useEffect,
  useState,
  FunctionComponent,
  HTMLProps,
} from 'react';
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
      className={cc([
        'input-reset pointer color-inherit pa2 bn bg-transparent',
        props.className,
      ])}
    />
  );
};

function DateControl({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const formattedDate = date ? formatDate(date, 'MMMM d, yyyy') : undefined;

  return (
    <div className="flex justify-center pv2 justify-between lh-solid mid-gray sans-serif">
      <Button
        aria-label="go to previous day"
        className="ml5"
        onClick={() => setDate(subDays(date, 1))}
      >
        <ArrowLeft />
      </Button>
      <div className="di pa2">{formattedDate || null}</div>
      <Button
        aria-label="Go to next day"
        className="mr5"
        onClick={() => setDate(addDays(date, 1))}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

function useDate() {
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(new Date());
  }, []);

  return [date, setDate];
}

export const DailyDozen: FunctionComponent<{ ingredients: Ingredient[] }> = ({
  ingredients,
}) => {
  const [date, setDate] = useDate();

  return (
    <>
      <DateControl date={date} setDate={setDate} />
      <ServingForm date={date} ingredients={ingredients} />
    </>
  );
};
