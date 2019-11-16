import React from 'react';
import { Tabs } from 'antd-mobile';
import './index.scss'

export default class NewsList extends React.Component {
    renderContent = tab => {
        return <ul className="item">
            {
                tab.list.map((t, k) => {
                    return <li key={k} >
                        <h5>{t.title}</h5>
                        <span>{t.tip}</span>
                    </li>
                })
            }
        </ul>
    }

    render() {
        const tabs = [
            {
                title: '直接投资',
                list: [{
                    title: '中国人名银行',
                    tip: '银发'
                },{
                    title: '中国人名银行',
                    tip: '银发'
                }]
            }, {
                title: '金融市场',
                list: [{
                    title: '中国人名银行2',
                    tip: '银发'
                }]
            }, {
                title: '跨境融资',
                list: [{
                    title: '中国人名银行3',
                    tip: '银发'
                }]
            }, {
                title: '跨境融资2',
                list: [{
                    title: '中国人名银行4',
                    tip: '银发'
                }]
            }, {
                title: '跨境融资3',
                list: [{
                    title: '中国人名银行5',
                    tip: '银发'
                }]
            },
        ];

        return (
            <div className="news-list">
                <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                    {this.renderContent}
                </Tabs>
            </div>
        );
    }
}