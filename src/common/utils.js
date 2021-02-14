//对于refresh刷新频繁的问题，进行防抖函数操作
//防抖debounce/节流throttle
//防抖函数起作用的过程： 
//将refresh函数传入到debounce函数中，生成一个新的函数
//之后在调用非常频繁的时候，就使用新生成的函数
//而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉
export function debounce(func, delay) {
  let timer = null
  return function (...args) { 
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
   }
}

//时间为两位 04:04:04 
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
