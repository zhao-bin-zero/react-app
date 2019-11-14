import React from 'react';
import './index.scss'
import { Accordion, List } from 'antd-mobile';

export default class NewsSet extends React.Component {
    onChange = (key) => {
        console.log(key);
    }

    render() {
        const list = [{
            title: '跨境贸易人民币结算',
            children: [{
                title: '结算1'
            }]
        }]
        const headerUI = (item, num) => {
            return (
                <div className="news-set-icon"><img alt="" src={num === 1 ? require('../../assets/images/xin.png') : require('../../assets/images/open.png')} /> {item.title}</div>
            )

        }
        return (
            <div className="news-set">
                <Accordion defaultActiveKey="" className="accordion" onChange={this.onChange}>
                    {
                        list.map((item) => {
                            return <Accordion.Panel header={headerUI(item, 1)} key='item' className="accordion-child">
                                {
                                    item.children ?
                                        <List className="list">
                                            {
                                                item.children.map((item2) => <List.Item key='item2' onClick={this.onChange}>{headerUI(item2, 2)}</List.Item>)
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