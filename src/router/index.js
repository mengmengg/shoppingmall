import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/components/tabbar/HomeContainer.vue'
import MemberContainer from '@/components/tabbar/MemberContainer.vue'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer.vue'
import SearchContainer from '@/components/tabbar/SearchContainer.vue'
import newslist from '@/components/news/newslist.vue'
import newslnfo from '@/components/news/NewsInfo.vue'
import photolist from '@/components/photos/PhotoList.vue'
import goodslist from '@/components/goods/goodslist.vue'
import messageInfo from '@/components/messageInfo/MessageInfo.vue'
import member from '@/components/tabbar/MemberContainer.vue'
import login from '@/components/tabbar/login.vue'
import reg from '@/components/tabbar/reg.vue'
import contactus from '@/components/contactus/Contactus.vue'
import livebro from '@/components/livebros/livebro.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path:'/search/newslist',component:newslist},
    {path:'/search/newslnfo/:id',component:newslnfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/goodslist',component:goodslist},
    {path:'/member',component: MemberContainer},
    {path:'/shopcar',component: ShopcarContainer},
    {path:'/home/messageInfo',component: messageInfo},
    {path:'/home/contactus',component: contactus},
    {path:'/home/member',component: member},
    {path:'/home/livebro',component:livebro}
    ,
    {path:'/member/login',component: login},
    {path:'/member/reg',component:reg}

  ], linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
