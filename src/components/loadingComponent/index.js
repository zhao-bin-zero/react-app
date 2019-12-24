import React from 'react';
import './index.scss';

class LoadingComponent extends React.Component {
    state = {
        timer: 3,
    }
    timerReckon = '';
    componentDidMount() {
        this.reckonTime()
    }
    componentWillUnmount(){
        clearInterval(this.timerReckon)
    }
    reckonTime(){
        this.timerReckon = setInterval(() => {
            let time = this.state.timer
            if(time > 1){
                time--
                this.setState({
                    timer: time
                })
            }else{
                this.props.setExcess(false)
            }
        }, 1000)
    }
    render() {
        return (
            <div className="zero-excess">
                <div className="zero-excess-jump" onClick={this.props.setExcess.bind(this, false)}>{this.state.timer}秒<span>跳过</span></div>
            </div>
        )
    }

}
export default LoadingComponent;