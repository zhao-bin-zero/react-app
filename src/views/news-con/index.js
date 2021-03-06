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
        return this.state.details.id ? (
            <div className="news-con">
                <div className="header">
                    <h5>{this.state.details.title}</h5>
                    <span>{this.state.details.introduction}</span>
                </div>
                <div className="con" dangerouslySetInnerHTML={{__html: this.state.details.content}}>
                </div>
            </div>
        ) : (<Result
                img={<img src={require('../../assets/images/no-content.png')} className="" alt="" />}
                title="无内容"
            />)
    }
}
export default connect(
    (state) => {
        return {}
    }
)(NewsCon)