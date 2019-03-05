export interface Range {
  min: number;
  max: number;
}

export type Quantity = number | Range;

export interface OptionalUnitServingQuantity {
  quantity: Quantity;
  unit?: string;
}

export interface ServingQuantity {
  quantity: Quantity;
  unit: string;
}

export interface ServingSuggestion {
  suggestion: string | string[];
  serving?: OptionalUnitServingQuantity;
  imperialServing?: ServingQuantity;
  metricServing?: ServingQuantity;
}

export interface IngredientType {
  name: string;
}

export interface Ingredient {
  displayName: string;
  infoUrl?: string;
  name: string;
  servingSuggestions?: ServingSuggestion[];
  total: number;
  types?: IngredientType[];
}

export interface Completed {
  [ingredientName: string]: number;
}

export interface StoredEntry {
  completed: Completed;
}

export interface Entry extends StoredEntry {
  date: string;
}
