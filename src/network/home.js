import {request, newrequest} from "./request";

export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

export function getHomeGoods(type, page) {
  return newrequest({
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}