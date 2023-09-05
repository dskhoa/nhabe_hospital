import { request } from '../index'
import { ReportState } from 'modules/reports/store/types'

interface AuthorizationToken {
  access_token: string
  token_type: string
}

interface ListResponse {

}
export function getProducts(offset = 0, categoryId: number = 0): Promise<ReportState> {

  const host: string = ''
  //@ts-ignore
  const params = <Params>{
    currentItem: offset,
    pageSize: 20,
  }

  if (categoryId != 0) {
    params['categoryId'] = categoryId
  }

  let token: AuthorizationToken = JSON.parse(localStorage.getItem('tokens') as string)

  request.setOptions({
    prefix: '/report/list',
    headers: {
      'Authorization': 'Bearer ' + token.access_token,
    },
  })

  // @ts-ignore
  return request.get<ReportState>(host, { params })
}

export function getListReport(page: number = 1, limit: number = 20): Promise<unknown> {
  const host: string = ''
  let prefix_url: string = ''
  if (page && limit) {
    prefix_url += `/report/list/?page=${page}&limit=${limit}`;
  } else if (page) {
    prefix_url += `/report/list/?page=${page}`;
  } else if (limit) {
    prefix_url += `/report/list/?limit=${limit}`;
  }

  console.log(prefix_url)

  request.setOptions({
    prefix: prefix_url
  })
  return request.get(host)
}

export function createReport(data: unknown): Promise<unknown> {

  const host: string = ''
  request.setOptions({
    prefix: '/report/create/',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return request.post(host, data)
}
