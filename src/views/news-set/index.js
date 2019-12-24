import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import { Accordion, List, SearchBar } from 'antd-mobile';
import http from '../../http'
import { debounce } from '../../utils'
import ListComponent from '../../components/listComponent'

export default class NewsSet extends React.Component {
    state = {
        height: document.documentElement.clientHeight,
        list: [],
        value: '',
        newsList: {}
    }
    linklist(item) {
        this.props.history.push({ pathname: `/news-list/${item.id}` });
    }
    getShowlistSet() {
        http.getShowlistSet().then((data) => {
            this.setState({
                list: data.data
            })
        })
    }
    getShowlist(page) {
        http.getShowlist({ page, search: this.state.value }).then((data) => {
            if (page == 1) {
                this.setState({
                    newsList: data.data.article_list
                })
            } else {
                const newsList = data.data.article_list;
                newsList.data.unshift(...this.state.newsList.data)
                this.setState({
                    newsList
                })
            }
        })
    }
    componentDidUpdate() {
        document.body.style.overflow = 'hidden';
    }
    componentWillUnmount(){
        document.body.style.overflow = '';
    }
    onChange(value) {
        // console.log(value)
        this.setState({ value }, () => {
            debounce(this.getShowlist.bind(this))(1);
        });
    }
    componentDidMount() {
        this.getShowlistSet();
        const hei = this.state.height - ReactDOM.findDOMNode(this.newSet).offsetTop;
        // 初始化数据
        this.setState({
            height: hei,
        });
    }
    render() {
        const headerUI = (item, num) => {
            return (
                <div className="news-set-icon">
                    <img alt="" src={num === 1 ? require('../../assets/images/xin.png') : require('../../assets/images/open.png')} />
                    {item.name}
                </div>
            )
        }
        return (
            <div className="news-set">
                <div className="zero-search">
                    <SearchBar placeholder="搜索新闻" value={this.state.value} onChange={this.onChange.bind(this)} />
                </div>
                <div ref={el => this.newSet = el}>
                    {!this.state.value ?
                        <div
                            style={{
                                height: this.state.height,
                                overflow: 'auto',
                            }}
                        ><Accordion defaultActiveKey="" className="accordion">
                                {
                                    this.state.list.map((item) => {
                                        return <Accordion.Panel header={headerUI(item, 1)} key={item.id} className="accordion-child">
                                            {
                                                item.children ?
                                                    <List className="list">
                                                        {
                                                            item.children.map((item2) => <List.Item key={item2.id} onClick={this.linklist.bind(this, item2)}>{headerUI(item2, 2)}</List.Item>)
                                                        }
                                                    </List> : ''
                                            }
                                        </Accordion.Panel>
                                    })
                                }
                            </Accordion></div>
                        : <ListComponent height={this.state.height} list={this.state.newsList} getList={this.getShowlist.bind(this)} />
                    }
                </div>

            </div>
        );
    }
}