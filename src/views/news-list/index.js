import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, SearchBar, Result } from 'antd-mobile';
import './index.scss'
import http from '../../http'
import { debounce } from '../../utils'
import ListComponent from '../../components/listComponent'


export default class NewsList extends React.Component {
    state = {
        height: document.documentElement.clientHeight,
        page: 0, // 当前tab
        tabs: [
        ],
    }
    renderContent(tab) {
        console.log(tab)
        return <div className="news-list-li">
            <div className="zero-search">
                <SearchBar placeholder="搜索新闻" onChange={this.onChange.bind(this, tab)} />
            </div>
            <div ref={el => this.newList = el}>
                <ListComponent height={this.state.height} list={tab.list} getList={this.getList.bind(this)} />
            </div>
        </div>
    }
    // this.props.match.params.id
    getShowlist(id) {
        http.getShowlist({ cid: id }).then((data) => {
            let children = data.data.children.length ? data.data.children : [data.data.current];
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
                    item.list = data.data.article_list;
                    item.search = ''
                }
                return item
            })
            this.setState({
                tabs: children
            }, () => {
                const hei = this.state.height - ReactDOM.findDOMNode(this.newList).offsetTop - 60;  //60是tab标签页的高度，初始化时为空
                // 初始化数据
                this.setState({
                    height: hei,
                });
            })
        })
    }
    changeTab(tab, index) {
        this.setState({
            page: index
        }, () => {
            this.getList(1)
        })
    }
    getList(page) {
        const tab = this.state.tabs[this.state.page];
        http.getShowlist({
            page,
            search: tab.search,
            cid: tab.id
        }).then((data) => {
            let list = this.state.tabs
            if (page == 1) {
                list.map((item) => {
                    if (item.id === tab.id) {
                        item.list = data.data.article_list
                    }
                    return item
                })
                this.setState({
                    tabs: list
                })
            } else {
                list.map((item) => {
                    if (item.id === tab.id) {
                        const newsList = data.data.article_list;
                        newsList.data.unshift(...item.list.data)
                        item.list = newsList
                    }
                    return item
                })

                this.setState({
                    tabs: list
                })
            }
        })
    }
    onChange(tab, value) {
        const tabs = this.state.tabs;
        tabs.map((item) => {
            if (item.id === tab.id) {
                item.search = value;
            }
        })
        this.setState({
            tabs
        }, () => {
            debounce(this.getList.bind(this))(1);
        });
    }
    componentDidMount() {
        this.getShowlist(this.props.match.params.id)
    }
    componentDidUpdate() {
        document.body.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.body.style.overflow = '';
    }
    render() {
        return (
            <div className="news-list">
                {
                    this.state.tabs.length > 0 ?
                        <Tabs tabs={this.state.tabs} prerenderingSiblingsNumber={false} page={this.state.page} onChange={this.changeTab.bind(this)} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                            {this.renderContent.bind(this)}
                        </Tabs>
                        : (<Result
                            img={
                                <img src={require('../../assets/images/no-data.png')} className="" alt="" />
                            }
                            title="无数据"
                        />)
                }
            </div>
        );
    }
}