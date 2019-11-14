import axios from 'axios'
import api from './api'
import { setUrlParam } from '@/common/utils'

axios.defaults.baseURL = ''
// let isCheckLoginGet = true;

//请求
function http(url, method, params = {}) {
	url = setUrlParam(url);
	if (method === 'GET') {
		return axios({
			method,
			url,
			params
		});
	}
	return axios({
		method,
		url,
		data: params
	});
}

//http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
	config => {

		return config;
	},
	err => {
		return Promise.reject(err);
	});
// http response 拦截器 ,拦截401状态（token过期），重新登录
axios.interceptors.response.use(
	response => {
		if (response.data.is_succ) {
			return response.data;
		}
		// if (response.data.code >= 100100 && response.data.code <= 100199) {
		// 	setCookie({ name: "token", value: "", expires: -1 });
		// 	return response.data;
		// }
		return response.data;
	},
	error => {
		console.log('网络错误，请稍后重试')
		if (error.response) {
			switch (error.response.status) {
				case 401: // 返回 401 

			}
		}
		return Promise.reject(error.response.data) // 返回接口返回的错误信息
	}
);


const _http = {
	/** 获取国家列表
	 * params
	 * lang
	 * type 1为区号
	*/
	getWorlds(params) {
		return http(api.getWorldsApi, 'GET', params)
	},

}
//把整个项目的网络请求都写在这个文件中用export导出
export default _http;
