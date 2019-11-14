import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import renderRoutes from '../router';

const authed = true // 如果登陆之后可以利用redux修改该值
const authPath = '' // 默认未登录的时候返回的页面，可以自行设置
//登陆之后返回原先要去的页面login函数
// login(){
//   const { from } = this.props.location.state || { from: { pathname: '/' } }
//    // authed = true // 这部分逻辑自己写吧。。。
//   this.props.history.push(from.pathname)
// }
const App = () => {
  return (
    <BrowserRouter>
      {renderRoutes(authed, authPath)}
    </BrowserRouter>
  )
}
export default App;