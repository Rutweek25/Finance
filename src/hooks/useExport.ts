import { useCallback } from 'react'
import { Transaction } from '../types/transaction.types'
import { downloadCSV, downloadJSON } from '../utils/exportToCSV'

export const useExport = () => {
  const exportAsCSV = useCallback((transactions: Transaction[]) => {
    const filename = `transactions-${new Date().toISOString().split('T')[0]}.csv`
    downloadCSV(transactions, filename)
  }, [])

  const exportAsJSON = useCallback((transactions: Transaction[]) => {
    const filename = `transactions-${new Date().toISOString().split('T')[0]}.json`
    downloadJSON(transactions, filename)
  }, [])

  return {
    exportAsCSV,
    exportAsJSON,
  }
}
