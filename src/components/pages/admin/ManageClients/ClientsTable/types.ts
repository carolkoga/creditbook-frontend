import { Address } from '@type/creditbook';

export interface DataType {
  id: string,
  fullName: string,
  email: string,
  amountAnnouncements: number,
  isActive: boolean,

  cellphone: string,
  type: 'person' | 'corporation',
  address: Address,
  inactivationReason: string | null,
}
