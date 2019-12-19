import React from 'react';
import { connect } from 'react-redux';
import { Result } from 'antd-mobile';
import './index.scss'
import http from '../../http'


class NewsCon extends React.Component {
    state = {
        details: {}
    }
    getArticle() {
        http.getArticle({
            id: this.props.match.params.id,
            cid: this.props.match.params.cid
        }).then((data) => {
            this.setState({
                details: data.data.article
            })
        })
    }
    componentDidMount() {
        this.getArticle()
    }
    render() {
        return this.details ? (
            <div className="news-con">
                <div className="header">
                    <h5>{this.details.title}</h5>
                    <span>{this.details.introduction}</span>
                </div>
                <div className="con">
                    {this.details.content}
                </div>
            </div>
        ) : <Result
                // img={<img src={src} className="spe am-icon am-icon-md" alt="" />}
                title="无内容"
                message="无内容"
            />
    }
}
export default connect(
    (state) => {
        return {}
    }
)(NewsCon)