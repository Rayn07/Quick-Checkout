import { Item } from '../types/bill';

export const validateItems = (items: Item[]): { valid: boolean; message: string } => {
  if (!Array.isArray(items)) {
    return { valid: false, message: 'Items must be an array' };
  }
  
  if (items.length > 3) {
    return { valid: false, message: 'Maximum of 3 products allowed' };
  }
  
  if (items.length === 0) {
    return { valid: false, message: 'At least one product is required' };
  }

  return { valid: true, message: 'Valid' };
};
