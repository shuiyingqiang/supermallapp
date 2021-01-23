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