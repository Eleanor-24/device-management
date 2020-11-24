const baseUrl='http://10.10.244.233:8087/main/'
export default function request(options){
	const{
		url,
		data,
		method
	}=options
	
	let header = {'Content-Type': 'application/json'}
	if(method=='POST'){
		header ={'content-type': 'application/x-www-form-urlencoded'}
	}
	return new Promise((resolve,reject)=>{
		
		uni.request({
			url:baseUrl+url,
			data:data,
			method:method,
			header:header,
			success(res){
				uni.hideLoading()
				
				resolve(res.data)
			},
			fail(err){
				reject(err)
			},
			
		})
	})
}

