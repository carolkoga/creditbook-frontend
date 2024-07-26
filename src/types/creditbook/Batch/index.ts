export interface NewBatchParams {
  name: string;
  description: string;
  value: string;
}

export interface UpdateBatchParams {
  description?: string;
  name?: string;
  value?: string;
  status?: string;
  plan?: string;
  paymentMethodId?: string;
}

export interface BatchParams {
  id: string;
  description: string;
  name: string;
  value: string;
  userId: string;
  announcementQuantity: number;
  status: BatchStatus;
  announcement: [];
}

export type BatchStatus =
  | 'active'
  | 'deleted'
  | 'rejected'
  | 'pending'
  | 'inactive'
  | 'edition_requested'
  | 'payment_failed'
  | 'being_created'
  | 'sold';

export const batchLabel = {
  active: 'aprovado',
  rejected: 'não aprovado',
  deleted: 'deletado',
  pending: 'pendente de aprovação',
  inactive: 'inativo',
  edition_requested: 'edição solicitada',
  payment_failed: 'pagamento falhou',
  being_created: 'em criação ou edição',
  sold: 'vendido',
};
