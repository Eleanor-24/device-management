<template>
	<div class="banner" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend">
	        <div class="image"><img :style="{'filter':blur+'('+data_image[0].b+'px)',transform:translate+'('+data_image[0].x+'px)'}" style="transition: .2s linear;" src="static/bg.png" width="3000" height="250"></div>
	        <div class="image"><img :style="{'filter':blur+'('+data_image[1].b+'px)',transform:translate+'('+data_image[0].x+'px)'}" style="transition: .2s linear;" :src="src" width="1800" height="165"></div>
	        <div class="image"><img :style="{'filter':blur+'('+data_image[2].b+'px)',transform:translate+'('+data_image[0].x+'px)'}" style="transition: .2s linear;" src="static/grassland.png" width="3000" height="250"></div>
	        <div class="image"><img :style="{'filter':blur+'('+data_image[3].b+'px)',transform:translate+'('+data_image[0].x+'px)'}" style="transition: .2s linear;" src="static/mushroom.png" width="1800" height="160"></div>
	        <div class="image"><img :style="{'filter':blur+'('+data_image[4].b+'px)',transform:translate+'('+data_image[0].x+'px)'}" style="transition: .2s linear;" src="static/spirit.png" width="1800" height="165"></div>
	        <div class="image"><img :style="{'filter':blur+'('+data_image[5].b+'px)',transform:translate+'('+data_image[0].x+'px)'}" style="transition: .2s linear;" src="static/leaf.png" width="1950" height="178"></div>
	    </div>
</template>

<script>
	let x=0;
	let x_new=0;
	let x_offset=0;
	let blink_index=0;
	let timeout=2000;
	export default {
		data() {
			return {
				
				blur:'blur',
				translate:'translate',
				data_image:[
					{x:0,b:4},
					{x:0,b:0},
					{x:0,b:1},
					{x:0,b:4},
					{x:0,b:5},
					{x:0,b:6},
				],
				src:'static/girl1.png',
				windowWidth:0
			};
		},
		created(){
			uni.getSystemInfo({
				success:(res)=>{
					this.windowWidth=res.windowWidth
				}
			});
			this.blink();
		},
		methods:{
			blink(){
				
				
				if(blink_index==4){
					blink_index=1;
					timeout=2000;
				}else{
					blink_index+=1;
					timeout=30;
				}
				
				this.src='static/girl'+blink_index+'.png';
				// console.log(this.src)
				setTimeout(()=>{
					this.blink();
				},timeout)
				
			},
			touchstart(e){
				x= e.changedTouches[0].pageX;
				// console.log(e)
			},
			touchend(e){
				x_new=e.changedTouches[0].pageX;
			},
			
			touchmove(e){
				// console.log(e.touches[0])
				// x_new=e.touches[0].pageX;
				
				x_offset=x-x_new;
				let data_image=this.data_image
				// console.log(x_offset)
				for(const key in data_image){
					let windowWidth = this.windowWidth;
					let step = windowWidth/0.1;
					 let level=(6-parseInt(key))*10;
					let b_new = Math.abs(data_image[key].b+(x_offset/step))
					let l_new=0-(x_offset/level);
					// console.log(b_new)
					data_image[key].b=b_new;
					data_image[key].x=l_new;
					this.data_image=data_image
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.banner{
	    height: 155px;
	    width: 980px;
	    position: relative;
	    overflow: hidden;
	    background-color: pink;
	}
	.image{
	    position: absolute;
	    height: 100%;
	    width: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
		
	}
</style>
