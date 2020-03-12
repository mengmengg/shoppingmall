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
import messageInfo from '@/components/tabbar/MessageInfoContainer.vue'

import contactus from '@/components/tabbar/ContactusContainer.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path:'/home/newslist',component:newslist},
    {path:'/home/newslnfo/:id',component:newslnfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/goodslist',component:goodslist},
    {path:'/member',component: MemberContainer},
    {path:'/shopcar',component: ShopcarContainer},
    {path:'/search',component: SearchContainer},
    {path:'/home/messageInfo',component: messageInfo},
    {path:'/home/contactus',component: contactus},

  ], linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
