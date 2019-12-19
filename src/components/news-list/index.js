import React from 'react';
import { Tabs } from 'antd-mobile';
import './index.scss'
import http from '../../http'


export default class NewsList extends React.Component {
    state = {
        page: 0,
        tabs: [
            {
                title: '直接投资'
            }, {
                title: '金融市场'
            }, {
                title: '跨境融资'
            }, {
                title: '跨境融资2'
            }, {
                title: '跨境融资3'
            },
        ],
    }
    renderContent(tab) {
        if (tab.list) {
            return <ul className="item">
                {
                    tab.list.data.map((t, k) => {
                        return <li key={k} onClick={this.linkNews.bind(this, t)}>
                            <h5>{t.title}</h5>
                            <span>{t.introduction}</span>
                        </li>
                    })
                }
            </ul>
        }else{

        }

    }
    linkNews(item) {
        this.props.history.push({ pathname: `/news-con/${item.id}/${item.cid}` });
    }
    // this.props.match.params.id
    getShowlist(id) {
        http.getShowlist({ cid: id }).then((data) => {
            let children = data.data.children;
            // data.data.article_list.data = [{
            //     title: '中国人名银行' + id,
            //     tip: '银发',
            //     id: 6,
            //     cid: 8
            // }]
            children.map((item, index) => {
                item.title = item.name
                if (item.id === id) {
                    this.setState({
                        page: index
                    })
                    item.list = data.data.article_list
                }
                return item
            })
            this.setState({
                tabs: children
            })
        })
    }
    changeTab(tab, index) {
        http.getShowlist({ cid: tab.id }).then((data) => {
            // data.data.article_list.data = [{
            //     title: '中国人名银行' + tab.id,
            //     tip: '银发'
            // }]
            this.setState({
                page: index
            })
            let list = this.state.tabs
            list.map((item) => {
                if (item.id === tab.id) {
                    item.list = data.data.article_list
                }
                return item
            })
            this.setState({
                tabs: list
            })
        })
    }
    componentDidMount() {
        this.getShowlist(this.props.match.params.id)
    }
    render() {
        return (
            <div className="news-list">
                <Tabs tabs={this.state.tabs} prerenderingSiblingsNumber={false} page={this.state.page} onChange={this.changeTab.bind(this)} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                    {this.renderContent.bind(this)}
                </Tabs>
            </div>
        );
    }
}