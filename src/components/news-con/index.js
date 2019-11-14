import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd-mobile';


class NewsCon extends React.Component {
    render() {
        return (
            <div>
                <Button type="primary">123</Button>
                NewsCon{this.props.number + '1'}
            </div>
        );
    }
}
export default connect(
    (state) => {
        return { number: state.number }
    }
)(NewsCon)