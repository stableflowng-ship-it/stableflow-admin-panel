// 
import { GetRequest } from '@/utils/apiHelper'
import { create } from 'zustand'

type UserStore = {
  userData: any[],
  userLoading: boolean,
  getUserData: () => void
}

export const useUsersStore = create<UserStore>((set) => ({
  userData: [],
  userLoading: false,
  getUserData: async () => {
    set({userLoading: true})
    const res = await GetRequest('admin/get-users')
    if (res.status === 200) {
      set({userData: res.data.data})
    }
    set({userLoading: false})
  }
}))