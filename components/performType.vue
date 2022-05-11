<template>
	<view class="content">
		<view class="content-type" >
			<view class="type" v-for="(item,index) in performType" :key="index" @click="navtoType(index)">
				<image :src="item.src" mode="scaleToFill"></image>
				<view class="title">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"perform-type",
		data() {
			return {
				performType:[
					{name:'话剧音乐剧',src:'../static/icon/话剧音乐剧.png'},
					{name:'脱口秀',src:'../static/icon/脱口秀.png'},
					{name:'休闲展览',src:'../static/icon/休闲展览.png'},
					{name:'演唱会',src:'../static/icon/演唱会.png'},
					{name:'戏曲',src:'../static/icon/戏曲.png'},
					{name:'音乐会',src:'../static/icon/音乐会.png'},
					{name:'音乐节',src:'../static/icon/音乐节.png'},
					{name:'剧本杀',src:'../static/icon/相声.png'}
				]
			};
		},
		methods: {
			navtoType(value) {
				uni.setStorageSync('index',value);
				uni.switchTab({
					url:'/pages/category/category'
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	width: 750rpx;
}
.content {
	width: 100%;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	.content-type {
		display: inline-block;
		width: 1120rpx;
		margin: 26rpx 0;
		margin-left: 30rpx;
		.type {
			display: inline-block;
			height: 60rpx;
			width: 120rpx;
			padding: 0 10rpx;
			text-align: center;
			image {
				width: 60rpx;
				height: 60rpx;
			}
			.title {
				font-size: 24rpx
			}
		}
	}
}
</style>