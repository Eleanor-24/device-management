import request from '../common/request.js'

const api = {}
api.get_login=(data)=>{
	return request({
		url:'login',
		data:data,
		method:'GET'
	})
}
api.add_user=(data)=>{
	return request({
		url:'register',
		data:data,
		method:'POST'
	})
},
api.get_bind=(data)=>{
	return request({
		url:'bind',
		data:data,
		method:'POST'
	})
}
api.update_bind=(data)=>{
	return request({
		url:'deleteUuid',
		data:data,
		method:'POST'
	})
}
export default api
