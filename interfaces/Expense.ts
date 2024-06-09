export interface Expense {
  _id?: string
  userId?: string
  createdAt?: number
  title: string
  category: string
  date: string
  amount: number
  notes: string[]
}
