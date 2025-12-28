import request from '@/utils/request'


export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}

export const artAddChannelsService = (data) => {
  return request.post('/my/cate/add', data)
}


export const artEditChannelsService = (data) => {
  return request.post('/my/cate/add', data)
}


export const artDelChannelsService = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}


export const artGetListService = (params) =>
  request.get('/my/article/list', { params })


export const artAddListService = (data) => {
  request.post('/my/article/add', data)
}


export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })


export const artEditService = (data) => request.put('my/article/info', data)


export const artDelService = (id) => request.delete('my/article/info', { params: { id } })
