<template>
	<view class="container">
		
		<view class="form">
			<view class="top">
				<view v-if="reg==false">LOGIN</view>
				<view v-else>
					<view style="float: left;" @click="goToReg"><uni-icons type="arrowleft" color="#999"></uni-icons></view>
					REGISTER
				</view>
				<view class="sep"></view>
			</view>
			<myInput  placeholder="请输入手机号" @input="inputName" type="text" ></myInput>
			<myInput  placeholder="请输入密码" @input="inputPsw" type="password"></myInput>
			<myInput placeholder="请确认密码" v-if="reg==true" @input="rePas" type="password"></myInput>
			<loginBtn text="注册" v-if="reg==true" @click="register" ></loginBtn>
			<loginBtn @click="login" text="登录"  v-else></loginBtn>
			
			<view class="bottom" v-if="reg==false">
				<view class="bottom-l" @click="goToReg">注册</view>
				<view class="bottom-r">
					
					<!-- <view class="tip" >允许与设备绑定</view>
					<switch color="#11998e" style="transform: scale(0.6,0.6);" @change="eventHandler"></switch> -->
					
				</view>
				
			</view>
		</view>
		
	</view>
	

</template>

<script>
	
	export default {
		data() {
			return {
				title: 'Hello',
				username:'',
				// switch:false,//是否允许读取设备码
				password:'',
				repas:'',
				reg:false,//是否点击注册
				
			}
		},
	
		
		
		methods:{
			inputName(e){
				// console.log(e.target.value)
				this.username=e.target.value
			},
			inputPsw(e){
				this.password = e.target.value
			},
			rePas(e){
				this.repas=e.target.value
			},
			onLoad(){
			
			},
			bind(){
				//获取设备识别码
				
					let that = this
					let username = this.username
					 this.$api.get_bind({
						 uuid:uni.getStorageSync("clientid"),
						
						 username:username
					 }).then(res=>{
						 console.log("绑定："+res.code)
						 if(res.code==200){
							 uni.setStorageSync("username",username)
							 uni.showToast({
							 	title:"绑定成功",
							 	icon:"success",
							 	duration:1500,
								success(){
									uni.redirectTo({
										url:"../main/main"
									})
								}
							 })
							 
						 }
					 })
				
			},
			judge(username,password,clientid){
				
				this.$api.get_login({
					username:username,
					password:password,
					uuid:clientid
				}).then(res=>{
					console.log(res.code)
					switch(res.code){
						case 200:
							//跳转到主页
							uni.setStorageSync("username",username)
							setTimeout(function(){
								uni.hideLoading()
								uni.redirectTo({
									url:'../main/main'
								})
							},1500)
							break;
						case 501:
							uni.showToast({
								title:"账号或密码输入错误",
								icon:"none",
								duration:1500
							})
							break;
						case 500:
							uni.showToast({
								title:"该用户不存在，请先注册！",
								icon:"none",
								duration:1500
								
							})
							break;
						case 400:
							//设备停用
							uni.showToast({
								title:"此设备已停用！",
								icon:"none",
								duration:1500
							})
							break;
						case 201:
							let that = this
							uni.showModal({
								title:"您还未绑定设备，是否与此设备绑定？",
								success(res){
									if(res.confirm){
										that.bind()
									}
									
								}
							})
							break;
						case 202:
							uni.showToast({
								title:"账号已在另一个设备上绑定，请先解绑",
								icon:"none",
								duration:1500
							})
					}
					
					
					
				})
			},
			login(){
				
				let that =this
				let username = this.username.replace(/\s*/g,"")//去除空格
				let password =this.password
				this.getClientId()
				let clientid = uni.getStorageSync("clientid")
				//判断格式
				//判断是否填写完整
				if(username.length==0||password==""){
					uni.showToast({
						title:"请填写完整的登录信息！",
						icon:"none",
						
						duration:1500
					})
					return
				}
				//判断手机号是否格式正确
				if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(username))){
					
					uni.showToast({
						title:"请输入正确格式的手机号！",
						icon:"none",
						duration:1500,
						
					})
					return
				}
				
				
				uni.showLoading({
					title:"登陆中"
				})
				this.judge(username,password,clientid)
				
				
				
				
				
				
					
			},
			//注册部分
			register(){
				//判断输入内容是否为空
				let that = this
				if(this.username==''||this.password==''){
					uni.showToast({
						title:"请填写完整的注册信息！",
						icon:"none",
						duration:1500,
						
					})
					return
				}
				//判断手机号是否格式正确
				if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.username))){
					
					uni.showToast({
						title:"请输入正确格式的手机号！",
						icon:"none",
						duration:1500,
						
					})
					return
				}
				//判断密码是否相同
				if(this.repas!=this.password){
					
					uni.showToast({
						title:"两次输入密码不一致！",
						icon:"none",
						duration:1500
					})
					return
				}
				//请求添加到数据库
				// console.log("注册成功")
				
				this.$api.add_user({
					username:that.username,
					password:that.password
				}).then(res=>{
					console.log(res.code)
					if(res.code==200){
						//注册成功
						uni.showToast({
							icon:"success",
							title:"注册成功",
							duration:1500,
							success(){
								setTimeout(function(){
									that.goToReg()//跳转到登录
								},2000)
							}
						})
					}else{
						uni.showToast({
							icon:"none",
							title:"用户已存在，请直接登录",
							duration:1500
						})
					}
				})
			},
			goToReg(){
				this.reg=!this.reg
			},
			//获取设备识别码
			getClientId(){
				//获取客户端ID和版本号
				let clientid = '';
				// #ifdef APP-PLUS
				// 苹果系统
				plus.device.getInfo({
					success: function(e) {
						clientid = e.uuid;
						uni.setStorageSync('clientid', clientid);
						
					},
					fail: function(e) {
						console.log(e);
					}
				});
				// 安卓系统
				plus.device.getAAID({
					success: function(e) {
						clientid = e.aaid;
						// console.log(clientid);
						uni.setStorageSync('clientid', clientid);
						
					},
					fail: function(e) {
						console.log(e);
					}
				});
				
				// #endif
				return clientid;
			}
		},
		onLoad() {
			
		}
			
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		width: 100%;
		
	}
	.container{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(-34deg,#4568DC 0%,#B06AB3 100%);
		.form{
		
			width: 85%;
			// height: 50%;
			background-color: rgba(0,0,0,0.4);
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			border-radius: 20rpx;
			.top{
				margin-top: 20rpx;
				flex: 1;
				height: 100%;
				width: 100%;
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				display: flex;
				color: #fff;
				flex-direction: column;
				.sep{
					margin-top: 20rpx;
					height: 2rpx;
					width: 100%;
					background-color: #999;
				}
				
			}
			.bottom{
				flex: 1;
				width: 100%;
				padding: 40rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #999;
				
				.bottom-r{
					
					
					display: flex;
					align-items: center;
					justify-content: center;
					
				}
				
				
			}
		
		}
		
	}
	

	
</style>
