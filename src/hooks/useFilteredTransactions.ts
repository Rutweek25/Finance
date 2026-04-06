import { useMemo } from 'react'
import { Transaction, TransactionFilter } from '../types/transaction.types'
import { parse } from 'date-fns'

export const useFilteredTransactions = (
  transactions: Transaction[],
  filter: TransactionFilter
): { filtered: Transaction[]; total: number; pages: number } => {
  const filtered = useMemo(() => {
    let result = transactions

    // Search filter
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase()
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(query) ||
          tx.category.toLowerCase().includes(query) ||
          tx.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Type filter
    if (filter.type !== 'all') {
      result = result.filter((tx) => tx.type === filter.type)
    }

    // Category filter
    if (filter.category !== 'all') {
      result = result.filter((tx) => tx.category === filter.category)
    }

    // Date range filter
    if (filter.startDate) {
      const startDate = parse(filter.startDate, 'yyyy-MM-dd', new Date())
      result = result.filter((tx) => {
        const txDate = parse(tx.date, 'yyyy-MM-dd', new Date())
        return txDate >= startDate
      })
    }

    if (filter.endDate) {
      const endDate = parse(filter.endDate, 'yyyy-MM-dd', new Date())
      result = result.filter((tx) => {
        const txDate = parse(tx.date, 'yyyy-MM-dd', new Date())
        return txDate <= endDate
      })
    }

    // Sort
    result = result.sort((a, b) => {
      let comparison = 0

      if (filter.sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (filter.sortBy === 'amount') {
        comparison = a.amount - b.amount
      }

      return filter.sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [transactions, filter])

  const ITEMS_PER_PAGE = 10
  const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return {
    filtered,
    total: filtered.length,
    pages,
  }
}
