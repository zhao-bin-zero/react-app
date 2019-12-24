import React from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom'
import renderRoutes from '../router';
import LoadingComponent from '../components/loadingComponent'

const authed = true // 如果登陆之后可以利用redux修改该值
const authPath = '' // 默认未登录的时候返回的页面，可以自行设置
//登陆之后返回原先要去的页面login函数
// login(){
//   const { from } = this.props.location.state || { from: { pathname: '/' } }
//    // authed = true // 这部分逻辑自己写吧。。。
//   this.props.history.push(from.pathname)
// }
class App extends React.Component {
  state = {
    excess: true
  }
  setExcess(bol){
    this.setState({
      excess: bol
    })
  }
  render() {
    return (
      this.state.excess ? <LoadingComponent setExcess={this.setExcess.bind(this)}/> : 
      <HashRouter>
        {renderRoutes(authed, authPath)}
      </HashRouter>
      
    )
  }
}
export default App;