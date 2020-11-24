<template>
	<view class="page">
		<view class="body" v-if="show1==true">
			
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			<loginBtn text="刷新" @click="clickBtn"></loginBtn>
			
		</view>
		<view class="body" v-if="show2==true">
			<uni-icons type="contact"size="40"></uni-icons>
			<view class="tel" style="margin: 20rpx 0 40rpx 0;">{{username}}</view>
			<loginBtn text="解绑" @click="logout"></loginBtn>
		</view>
		<view class="bottom">
			<view class="bottom-l" @click="click" :style="{color:color1}" id="left">盘点</view>
			<view class="bottom-r" @click="click" id="right":style="{color:color2}">我的</view>
		</view>
		
	</view>
</template>

<script>
	import uQRCode from '../../js_sdk/Sansnn-uQRCode/uqrcode.js'
	export default {
		data() {
			return {
				color1:'#11998E',
				color2:'#000',
				clientid:'',
				username:'',
				qrcodeText: '',
				qrcodeSize: uni.upx2px(590),
				show1:true,
				show2:false
			}
		},
		onLoad(){
			this.clientid = uni.getStorageSync("clientid")
			this.username =uni.getStorageSync("username")
			console.log(this.clientid,this.username)
			this.qrcodeText = '设备识别码： '+this.clientid+'\n绑定手机号： '+this.username
			this.make()
			
		},
		methods: {
			clickBtn(){
				this.make()
			},
			make() {
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
			
				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 10
				}).then(res => {
					// console.log(res)
					// this.qrcodeSrc = res
				}).finally(() => {
					uni.hideLoading()
				})
			},
			click(e){
				if(e.target.id=="left"){
					this.color1='#11998E'
					this.color2='#000'
					this.show1=true
					this.show2=false
				}
				if(e.target.id=="right"){
					this.color2='#11998E'
					this.color1='#000'
					this.show1=false
					this.show2=true
				}
			},
			deBind(){
				let that = this
				this.$api.update_bind({
					username:uni.getStorageSync("username")
				}).then(res=>{
					console.log(res)
					if(res.code==200){
						uni.showToast({
							title:"解绑成功",
							icon:"success",
							duration:1500,
							success(){
								setTimeout(function(){
									uni.redirectTo({
										url:"../login/login"
									})
								},2000)
							}
						})
					}
				})
			},
			logout(){
				let that = this
				uni.showModal({
					title:"确定与此设备解绑？",
					success(res){
						if(res.confirm){
							that.deBind()
							
						}
						
					}
				})
				
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		width: 100%;
	}
	.page{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.body{
		flex: 1;
		height: 100%;
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.bottom{
		width: 100%;
		height: 140rpx;
		padding: 40rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FAFAFA;
		border-top:2rpx solid #e0e0e0;
		// position: absolute;
		// bottom: 0;
		font-size: 28rpx;
		.bottom-l,
		.bottom-r{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		

	}
</style>
