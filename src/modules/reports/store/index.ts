import { extractStore } from 'utils/extractStore'
import { defineStore } from 'pinia'
// import { useActions } from './actions'
// import { useGetters } from './getters'
import { reportState } from './state'

export const useReport = defineStore('report', () => {
  return {
    ...extractStore(reportState()),
    // ...extractStore(useGetters()),
    // ...extractStore(useActions()),
  }
})
