import React, {
  createContext,
  useEffect,
  useState,
  FunctionComponent,
} from 'react';

export enum Unit {
  Imperial = 'imperial',
  Metric = 'metric',
}

export interface Options {
  unit: Unit;
}

export interface SetFunc<T> {
  (update: T): void;
}

type OptionsUpdater = SetFunc<Options>;

export const Context = createContext<[State, OptionsUpdater]>([
  { unit: Unit.Imperial },
  () => {},
]);

function initOptions(): Options {
  const unit = (localStorage.getItem('unit') as Unit) || Unit.Imperial;
  return { unit };
}

type State = Options | null;

type Api = [State, OptionsUpdater];

export const Provider: FunctionComponent = ({ children }) => {
  const [updated, setUpdated] = useState(false);
  const [state, setState] = useState<State>(null);

  // fetch options from storage
  useEffect(() => {
    setState(() => initOptions());
  }, []);

  // write changes to storage when updates have been made
  useEffect(() => {
    if (state && updated) {
      Object.keys(state as Options).forEach(key => {
        localStorage.setItem(key, state[key as keyof Options]);
      });
    }
  }, [state, updated]);

  const updateOptions: OptionsUpdater = update => {
    if (!updated) {
      setUpdated(true);
    }

    setState(prevState => ({
      ...prevState,
      ...update,
    }));
  };

  const api: Api = [state, updateOptions];

  return <Context.Provider value={api}>{children}</Context.Provider>;
};
