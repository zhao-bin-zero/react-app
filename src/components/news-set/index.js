import React from 'react';
import './index.scss'
import { Accordion, List } from 'antd-mobile';
import http from '../../http'

export default class NewsSet extends React.Component {
    state = {
        list: []
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
    componentDidMount() {
        this.getShowlistSet()
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
                <Accordion defaultActiveKey="" className="accordion">
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
                </Accordion>
            </div>
        );
    }
}