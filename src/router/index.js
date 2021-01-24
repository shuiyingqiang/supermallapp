import Vue from "vue"
import VueRouter from "vue-router"

//懒加载
const Home = () => import("../views/home/Home.vue")
const Cart = () => import("../views/cart/Cart.vue")
const Category = () => import("../views/category/Category.vue")
const Profile = () => import("../views/profile/Profile.vue")
const Detail = () => import("../views/detail/Detail.vue")

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [
   {
       path: "/",
       redirect: "/home"
   },
   {
       path: "/home",
       component: Home
   },
   {
       path: "/cart",
       component: Cart
   },
   {
       path: "/category",
       component: Category
   },
   {
       path: "/profile",
       component: Profile
   },
   {
    path: "/detail/:iid",
    component: Detail
}
]
const router = new VueRouter({
    routes,
    mode: "history"
})

export default router