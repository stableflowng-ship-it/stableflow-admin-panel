// 

// 
import { GetRequest } from '@/utils/apiHelper'
import { create } from 'zustand'

type TransStore = {
  transData: any[],
  transLoading: boolean,
  getTransData: () => void
}

export const useTransStore = create<TransStore>((set) => ({
  transData: [],
  transLoading: false,
  getTransData: async () => {
    set({transLoading: true})
    const res = await GetRequest('admin/get-transactions')
    if (res.status === 200) {
      set({transData: res.data.data})
    }
    set({transLoading: false})
  }
}))