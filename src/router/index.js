import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import UpdateContent from '../components/update-content';
import NewsSet from '../components/news-set';
import NewsList from '../components/news-list';
import NewsCon from '../components/news-con';
// import NotFound from '../components/not-found';


// requiresAuth需要登陆后才能跳转的页面
const routes = [
    { path: '/update-content',
        exact: true,
        component: UpdateContent,
        requiresAuth: false,
    },
    {
        path: '/news-set',
        component: NewsSet,
        requiresAuth: false,
    },
    {
        path: '/news-list/:id',
        component: NewsList,
        requiresAuth: false,
    },
    {
        path: '/news-con/:id/:cid',
        component: NewsCon,
        requiresAuth: false,
    },
    {
        path: '*',
        component: NewsSet, // NotFound
        requiresAuth: false,
    }
]
// 可判断权限authed（权限），authPath（不判断权限页）
const renderRoutes = (authed, authPath = '/login', extraProps = {}, switchProps = {}) => (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          if (!route.requiresAuth || authed || route.path === authPath) {
            return <route.component {...props} {...extraProps} route={route} />
          }
          return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
        }}
      />
    ))}
  </Switch>
)

export default renderRoutes