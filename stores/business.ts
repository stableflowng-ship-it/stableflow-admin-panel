// 
import { GetRequest, PatchRequest } from '@/utils/apiHelper'
import { create } from 'zustand'
import { toast } from 'sonner';

type BusinessStore = {
  businessData: any[],
  busiLoading: boolean,
  getData: () => void,
  approve: (id: string) => void
}

export const useBusinesStore = create<BusinessStore>((set, get) => ({
  businessData: [],
  busiLoading: false,
  getData: async () => {
    set({busiLoading: true})
    const res = await GetRequest('admin/get-businesses?page=1&limit=100&state=ALL')
    if (res.status === 200) {
      set({businessData: res.data.data})
    }
    set({busiLoading: false})
  },
  approve: async (id) => {
    set({busiLoading: true})
    const res = await   PatchRequest(`/admin/approve-business/${id}`, {})
    if (res.status === 200) {
      set({ businessData: res.data.data })
      toast.success('Business Approved', {position: 'top-center'})
      get().getData()
    }
    set({busiLoading: false})
  }
}))