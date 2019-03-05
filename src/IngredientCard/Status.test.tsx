import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { Status } from './Status';

beforeEach(cleanup);

describe('Ingredient card status', () => {
  test('hides completion icon when complete', () => {
    const { getByTestId } = render(
      <Status current={1} total={2} isComplete={false} />,
    );

    expect(getByTestId('IngredientCard__status-icon')).toHaveClass('hidden');
  });

  test('shows completion icon when complete', () => {
    const { getByTestId } = render(
      <Status current={2} total={2} isComplete={true} />,
    );

    expect(getByTestId('IngredientCard__status-icon')).toHaveClass('visible');
  });
});
