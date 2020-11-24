<template>
	<view class="input">
		<input type="text" value="" :placeholder="placeholder" @click="click" @blur="blur"
		 @input="input" :type="type" :style="{'border-color':color}"  />
	</view>
		

</template>

<script>
	export default {
		props:['placeholder','type'],
		data() {
			return {
				color:'#999'
			};
		},
		methods:{
			click(){
				
				this.color='#fff'
				this.$emit("click")
			},
			blur(){
				this.color='#999'
				this.$emit("blur")
			},
			input(e){
				this.$emit("input",e)
			}
		}
	}
</script>

<style lang="scss">
	.input{
		box-sizing: border-box;
		height: 90rpx;
		
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		input{
			height: 100%;
			width: 100%;
			padding-left: 20rpx;
			color: #fff;
			border:2rpx solid ;
			border-radius: 90rpx;
			font-size: 32rpx;
			padding-left: 40rpx;
			font-size: 28rpx;
			
		}
		
	}
	
</style>
