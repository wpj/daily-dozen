import { format as formatDate } from 'date-fns';
import React, { useEffect, useReducer, FunctionComponent } from 'react';

import { ControlArea } from '../ControlArea';
import { IngredientCard } from '../IngredientCard';
import { StoredEntry, Ingredient } from '../types';
import getDb from '../database';

import './ServingForm.css';

export interface CompletedState {
  completed: number;
  total: number;
}

export interface KeyedIngredients {
  [name: string]: CompletedState;
}

export type Props = {
  date: Date;
  ingredients: Ingredient[];
};

const DATE_FORMAT = 'yyyy-MM-dd';

async function loadEntry(date: Date): Promise<StoredEntry | null> {
  const { Entry } = getDb();
  const key = formatDate(date, DATE_FORMAT);

  const stored = await Entry.getByDate(key);

  if (!stored) {
    return null;
  }

  return stored;
}

async function saveState({
  date,
  state,
}: {
  date: Date;
  state: KeyedIngredients;
}): Promise<boolean> {
  const { Entry } = getDb();
  const key = formatDate(date, DATE_FORMAT);

  const entry = {
    completed: Object.keys(state).reduce((acc, key) => {
      const { completed } = state[key];
      return {
        ...acc,
        [key]: completed,
      };
    }, {}),
    date: key,
  };

  await Entry.save(entry);

  return true;
}

const INCREMENT = 'INC';
const DECREMENT = 'DEC';
const LOAD_COMPLETED = 'LOAD';

interface CounterAction {
  type: 'INC' | 'DEC';
  name: string;
}

interface LoadAction {
  type: 'LOAD';
  stored: StoredEntry | null;
}

type Action = CounterAction | LoadAction;

const reducers = {
  changed(state: boolean, action: Action) {
    switch (action.type) {
      case INCREMENT:
      case DECREMENT:
        return true;
      default:
        return state;
    }
  },
  ingredients(state: KeyedIngredients, action: Action) {
    switch (action.type) {
      case INCREMENT:
      case DECREMENT: {
        const { name } = action;
        const ingredient = state[name];

        if (ingredient == null) {
          return state;
        }

        if (action.type === DECREMENT && ingredient.completed === 0) {
          return state;
        }

        const delta = action.type === INCREMENT ? 1 : -1;

        return {
          ...state,
          [name]: {
            completed: ingredient.completed + delta,
            total: ingredient.total,
          },
        };
      }

      case LOAD_COMPLETED: {
        const { stored } = action;

        return Object.keys(state).reduce((acc, key) => {
          const { total } = state[key];
          const completed = stored ? stored.completed[key] : 0;
          return {
            ...acc,
            [key]: { total, completed },
          };
        }, {});
      }

      default:
        return state;
    }
  },
  loaded(state: boolean, action: Action) {
    switch (action.type) {
      case LOAD_COMPLETED:
        return true;
      default:
        return state;
    }
  },
};

type State = {
  changed: boolean;
  ingredients: KeyedIngredients;
  loaded: boolean;
};

function reducer(state: State, action: Action) {
  return {
    changed: reducers.changed(state.changed, action),
    ingredients: reducers.ingredients(state.ingredients, action),
    loaded: reducers.loaded(state.loaded, action),
  };
}

export const ServingForm: FunctionComponent<Props> = ({
  date,
  ingredients,
}) => {
  const [
    { ingredients: ingredientStates, changed, loaded },
    dispatch,
  ] = useReducer(reducer, {
    changed: false,
    ingredients: ingredients.reduce(
      (acc, ingredient) => ({
        ...acc,
        [ingredient.name]: { total: ingredient.total },
      }),
      {},
    ),
    loaded: false,
  });

  async function loadEntryEffect() {
    const stored = await loadEntry(date);

    dispatch({ type: LOAD_COMPLETED, stored });
  }

  // load data from database
  useEffect(() => {
    loadEntryEffect();
  }, [date]);

  // save data to database
  useEffect(() => {
    if (changed) {
      saveState({ date, state: ingredientStates });
    }
  }, [ingredientStates]);

  return (
    <ControlArea>
      <ul className="list pl0 ma0">
        {ingredients.map((ingredient: Ingredient, index: number) => {
          const completed = loaded
            ? ingredientStates[ingredient.name].completed
            : 0;

          const increment = () =>
            dispatch({ type: INCREMENT, name: ingredient.name });
          const decrement = () =>
            dispatch({ type: DECREMENT, name: ingredient.name });

          return (
            <li className="bb b--moon-gray ServingForm__list-item" key={index}>
              <IngredientCard
                {...ingredient}
                completed={completed}
                decrement={decrement}
                increment={increment}
                showCompleted={loaded}
              />
            </li>
          );
        })}
      </ul>
    </ControlArea>
  );
};
