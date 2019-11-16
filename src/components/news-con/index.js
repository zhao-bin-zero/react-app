import React from 'react';
import { connect } from 'react-redux';
import './index.scss'


class NewsCon extends React.Component {
    render() {
        const newCon = {
            title: '中国人民银行',
            tip: '银发',
            content: '中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行中国人民银行'
        }
        return (
            <div className="news-con">
                <div className="header">
                    <h5>{newCon.title}</h5>
                    <span>{newCon.tip}</span>
                </div>
                <div className="con">
                    {newCon.content}
                </div>
            </div>
        );
    }
}
export default connect(
    (state) => {
        return {}
    }
)(NewsCon)