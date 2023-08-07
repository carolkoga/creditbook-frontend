export interface NewBatchParams {
  name: string,
  description: string,
  value: string,
}

export interface UpdateBatchParams {
  description?: string,
  name?: string,
  value?: string,
  status?: string
}

export interface BatchParams {
  id: string,
  description: string,
  name: string,
  value: string,
  userId: string,
  announcementQuantity: number,
  status: string
  announcement: []
}
