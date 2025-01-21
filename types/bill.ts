export interface Item {
    description: string;
    quantity: number;
    price: number;
  }
  
  export interface BillData {
    billNumber: string;
    date: string;
    customerName: string;
    items: Item[];
    total?: number;
  }
  
  export interface SendBillRequestBody {
    email: string;
    billData: string;
  }