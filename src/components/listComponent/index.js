import React from 'react';
import { withRouter } from "react-router-dom";
import { Result, ListView, PullToRefresh } from 'antd-mobile';
import './index.scss'

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            list: {},
            dataSource,
            refreshing: true,
            isLoading: true,
            hasMore: true
            // useBodyScroll: false,
        };
    }
    linkNews(item) {
        this.props.history.push({ pathname: `/news-con/${item.id}/${item.cid}` });
    }
    // props更新后重置state
    componentWillReceiveProps(nextProps) {
        if (nextProps.list && nextProps.list.data && nextProps.list.data.length > 0 && JSON.stringify(nextProps.list.data) !== JSON.stringify(this.state.list.data)) {
            console.log(nextProps,2)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.list.data),
                list: nextProps.list,
                total: nextProps.list.total,
                per_page: nextProps.list.per_page,
                current_page: nextProps.list.current_page,
                last_page: nextProps.list.last_page,

            });
            this.setState({
                hasMore: !(nextProps.list.total === nextProps.list.data.length)
            })
        }
        this.setState({
            refreshing: false,
            isLoading: false,
        })
    }
    componentDidUpdate() {
        // document.body.style.overflow = 'hidden';
    }
    componentDidMount() {
        // 初始化数据
        this.setState({
            refreshing: false,
            isLoading: false,
        });
    }
    onRefresh = () => {
        // 下拉刷新
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        this.props.getList(1);
    };
    onEndReached = (event) => {
        // 上拉加载
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        let page = (this.state.current_page + 1);
        this.props.getList(page);
    };
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="zero-list-item" onClick={this.linkNews.bind(this, rowData)}>
                    <h5>{rowData.title}</h5>
                    <span>{rowData.introduction}</span>
                </div>
            );
        };
        return (
            (this.props.list && this.props.list.data && this.props.list.data.length > 0) ?
                <div className="zero-list">
                    <ListView
                        key={'1'}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (
                            <div style={{ padding: 10, textAlign: 'center' }}>
                                {this.state.hasMore ? (this.state.isLoading ? '正在加载。。。' : '加载完成') : '没有更多了哟'}
                            </div>
                        )
                        }
                        renderRow={row}
                        useBodyScroll={false}
                        style={{
                            height: this.props.height,
                        }}
                        pullToRefresh={<PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                        onEndReached={this.onEndReached}
                    />
                </div>
                // {
                //     this.props.list.data.map((t, k) => {
                //         return <li className="zero-list-item" key={k} onClick={this.linkNews.bind(this, t)}>
                //             <h5>{t.title}</h5>
                //             <span>{t.introduction}</span>
                //         </li>
                //     })
                // }
                : (<Result
                    img={
                        <img src={require('../../assets/images/no-data.png')} className="" alt="" />
                    }
                    title="无数据"
                />)
        )
    }
}
export default withRouter(ListComponent);



// const NUM_ROWS = 20;
// let pageIndex = 0;

// function genData(pIndex = 0) {
//     const dataArr = [];
//     for (let i = 0; i < NUM_ROWS; i++) {
//         dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
//     }
//     return dataArr;
// }

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         const dataSource = new ListView.DataSource({
//             rowHasChanged: (row1, row2) => row1 !== row2,
//         });

//         this.state = {
//             dataSource,
//             refreshing: true,
//             isLoading: true,
//             height: document.documentElement.clientHeight,
//             // useBodyScroll: false,
//         };
//     }


//     componentDidUpdate() {
//         document.body.style.overflow = 'hidden';
//     }

//     componentDidMount() {
//         const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

//         setTimeout(() => {
//             this.rData = genData();
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(genData()),
//                 height: hei,
//                 refreshing: false,
//                 isLoading: false,
//             });
//         }, 1500);
//     }

//     onRefresh = () => {
//         // 下拉刷新
//         this.setState({ refreshing: true, isLoading: true });
//         // simulate initial Ajax
//         setTimeout(() => {
//             this.rData = genData();
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(this.rData),
//                 refreshing: false,
//                 isLoading: false,
//             });
//         }, 600);
//     };

//     onEndReached = (event) => {
//         // 上拉加载
//         // load new data
//         // hasMore: from backend data, indicates whether it is the last page, here is false
//         if (this.state.isLoading && !this.state.hasMore) {
//             return;
//         }
//         console.log('reach end', event);
//         this.setState({ isLoading: true });
//         setTimeout(() => {
//             this.rData = [...this.rData, ...genData(++pageIndex)];
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(this.rData),
//                 isLoading: false,
//             })
//         }, 1000);
//     };

//     render() {
//         // let index = data.length - 1;
//         const row = (rowData, sectionID, rowID) => {
//             // if (index < 0) {
//             //     index = data.length - 1;
//             // }
//             // const obj = data[index--];
//             return (
//                 // <div key={rowID}
//                 //     style={{
//                 //         padding: '0 15px',
//                 //         backgroundColor: 'white',
//                 //     }}
//                 // >
//                 //     <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
//                 //         {obj.title}
//                 //     </div>
//                 //     <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
//                 //         <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
//                 //         <div style={{ display: 'inline-block' }}>
//                 //             <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
//                 //             <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
//                 //         </div>
//                 //     </div>
//                 // </div>
//             );
//         };
//         return (<div>
//             <ListView
//                 key={'1'}
//                 ref={el => this.lv = el}
//                 dataSource={this.state.dataSource}
//                 renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
//                     {this.state.isLoading ? 'Loading...' : 'Loaded'}
//                 </div>)}
//                 renderRow={row}
//                 useBodyScroll={false}
//                 style={{
//                     height: this.state.height,
//                 }}
//                 pullToRefresh={<PullToRefresh
//                     refreshing={this.state.refreshing}
//                     onRefresh={this.onRefresh}
//                 />}
//                 onEndReached={this.onEndReached}
//             />
//         </div>);
//     }
// }