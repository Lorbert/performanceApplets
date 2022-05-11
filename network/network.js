export function request(config) {
	const baseUrl = 'http://127.0.0.1:3007';
	var that = this,
		url = config.url,
		method = config.method,
		data = config.data || {},
		token = "";
		
	//拼接完整请求
	var requestUrl = baseUrl  + url;

	if(requestUrl.indexOf('/api/') == -1) {
		config.headers = {
			'Authorization': uni.getStorageSync('token') || '',
			'content-type':'application/x-www-form-urlencoded'
		}
	}else {
		config.headers = {
			'content-type':'application/x-www-form-urlencoded',
		}
	}
	//GET或POST
	if(config.method){
		config.method = config.method.toUpperCase();//小写改成大写
	}
	console.log(requestUrl,'地址')
	return new Promise((resolve,reject) => {
		uni.request({
			url: requestUrl,
			method: config.method || 'GET',
			data: config.data || {},
			header: config.headers,
			success: (res) => {
				if(res.statusCode !== 200) {
					return uni.showToast({
						title:"获取数据失败",
						icon:'error'
					})
				}
				if(res.data.message) {
					uni.showToast({
						title:res.data.message
					})
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					title:"接口获取失败",
					icon:'error'
				})
				reject(err)
			}
		})
	})
}