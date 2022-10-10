import { Address } from '@type/creditbook';

export interface DataType {
  key: string,
  name: string,
  email: string,
  amountAnnouncements: number,
  leads: number,
  status: 'active' | 'inactive',

  cellPhone: string,
  type: 'person' | 'corporation',
  address: Address,
  reasonForInactivation: string | null,
}
