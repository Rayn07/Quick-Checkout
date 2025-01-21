import { Item } from '../types/bill';

export const funcBillGenerator = (length: number = 9): string => {
  const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let billnum: string = '';
  
  for (let i = 0; i < length; i++) {
    const random: number = Math.floor(Math.random() * chars.length);
    billnum += chars[random];
  }
  return billnum;
};

export const calculateTotal = (items: Item[]): number => {
  return items.reduce((total, item) => total + (item.quantity * item.price), 0);
};