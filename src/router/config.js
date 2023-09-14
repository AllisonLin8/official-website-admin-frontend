import Home from '../views/home/Home'
import Center from '../views/center/Center'
import UserAdd from '../views/user-manage/UserAdd'
import UserList from '../views/user-manage/UserList'
import NewsAdd from '../views/news-manage/NewsAdd'
import NewsList from '../views/news-manage/NewsList'
import NewsEdit from '../views/news-manage/NewsEdit'
import ProductAdd from '../views/product-manage/ProductAdd'
import ProductList from '../views/product-manage/ProductList'
import NotFound from '../views/notfound/NotFound'

const routesConfig = [
  { path: '/home', component: Home },
  { path: '/center', component: Center },
  { path: '/user-manage/adduser', component: UserAdd, requireRoot: true },
  { path: '/user-manage/userlist', component: UserList, requireRoot: true },
  { path: '/news-manage/addnews', component: NewsAdd },
  { path: '/news-manage/newslist', component: NewsList },
  { path: '/news-manage/editnews/:id', component: NewsEdit },
  { path: '/product-manage/addproduct', component: ProductAdd },
  { path: '/product-manage/productlist', component: ProductList },
  { path: '/', redirect: '/home' },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
]

export default routesConfig
