<template>
	<view class="btn">
		<view class="button" @click="click">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		props:['text'],
		data() {
			return {
				
			};
		},
		methods:{
			click(){
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss">
	.btn{
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
		
		padding: 40rpx;
		box-sizing: border-box;
		.button{
			height: 100%;
			width: 100%;
			background-color: #11998e;
			// background-image: linear-gradient(90deg,#11998e 0%, #38ef7d 100%);
			// border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 30rpx 0;
			border-radius: 90rpx;
			color: #fff;
			font-size: 28rpx;
			
		}
	}
</style>
