const testId = id => `[data-testid="${id}"]`;

describe('Ingredient card', () => {
  beforeEach(() => {
    cy.visit('/');
    indexedDB.deleteDatabase('daily-dozen');
  });

  it(`doesn't decrement quantity below 0`, () => {
    cy.get(testId('QuantityControl__decrement-button'))
      .first()
      .click({ force: true });

    cy.get(testId('IngredientCard__status'))
      .first()
      .contains('0 /');
  });

  it('should have openable details for each ingredient', () => {
    cy.get(testId('IngredientCard'))
      .as('ingredientCard')
      .find(testId('IngredientCard__info-button'))
      .click({ multiple: true });

    cy.get('@ingredientCard')
      .find(testId('IngredientDetails'))
      .should('be.visible');
  });

  it('shows completion icon when complete', () => {
    cy.get(testId('IngredientCard'))
      .first()
      .as('ingredientCard')
      .find(testId('QuantityControl__increment-button'))
      .click()
      .click()
      .click()
      .get('@ingredientCard')
      .find(testId('IngredientCard__status-icon'))
      .should('be.visible');
  });
});
