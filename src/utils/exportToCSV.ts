import { Transaction } from '../types/transaction.types'
import { format } from 'date-fns'

export const exportToCSV = (transactions: Transaction[]): string => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Tags', 'Created By', 'Updated At']
  const rows = transactions.map((tx) => [
    tx.date,
    tx.description,
    tx.category,
    tx.type,
    tx.amount,
    tx.tags?.join(';') || '',
    tx.createdBy,
    tx.updatedAt,
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  return csv
}

export const downloadCSV = (transactions: Transaction[], filename = 'transactions.csv'): void => {
  const csv = exportToCSV(transactions)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToJSON = (transactions: Transaction[]): string => {
  return JSON.stringify(transactions, null, 2)
}

export const downloadJSON = (transactions: Transaction[], filename = 'transactions.json'): void => {
  const json = exportToJSON(transactions)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const generateReportSummary = (transactions: Transaction[]): string => {
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = income - expenses

  const summary = `
Zorvyan Financial Report
Generated: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}
Total Transactions: ${transactions.length}
Total Income: $${income.toFixed(2)}
Total Expenses: $${expenses.toFixed(2)}
Net Balance: $${balance.toFixed(2)}
  `.trim()

  return summary
}
