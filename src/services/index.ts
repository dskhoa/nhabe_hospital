import FetchRequest from '../utils/request_builder/request'

export const limit = 10

export const request = new FetchRequest({
  prefix: '',
  headers: {
    'Content-Type': 'application/json',
  },
})
