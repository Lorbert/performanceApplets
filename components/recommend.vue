<template>
	<view class="today-scroll" :style="{width: listenWidth + 'rpx'}">
		<view class="today-content" >
			<view class="today-type">
				音乐会
			</view>
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
		<view class="today-content" >
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
		<view class="today-content" >
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
		<view class="today-content" >
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
		<view class="today-content" >
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
		<view class="today-content" >
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
		<view class="today-content" >
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
		<view class="today-content" >
			<image lazy-load="true" src="../static/login/宫崎骏海报.jpg" mode="widthFix"></image>
			<view class="today-discount">
				6.7折起
			</view>
			<view class="content-title">
				宫崎骏久石让经典动漫视听音乐会
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"recommend",
		data() {
			return {
				
			};
		},
		computed: {
			listenWidth() {
				return 1299
			}
		}
	}
</script>

<style lang="scss">
.today-scroll {
	margin-left: 10rpx;
	.today-content {
		position: relative;
		width: 136rpx;
		display: inline-block;
		padding: 12rpx;
		font-size: 26rpx;
		image {
			width: 100%;
			border-radius: 10rpx;
		}
		.today-type {
			padding: 8rpx;
			color: #ffffff;
			background: rgba(0, 0, 0, 0.6);
			position: absolute;
			right: 18rpx;
			top: 18rpx;
			border-radius: 10rpx;
			font-size: 22rpx;
		}
		.today-discount {
			width: 94rpx;
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 15rpx;
			text-align: center;
			color: #ffffff;
			background-color: #f03d37;
			font-size: 22rpx
		}
		.content-title {
			width: 100%;
			text-overflow: ellipsis;
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2;
			/** 显示的行数 **/
			overflow: hidden;
			/** 隐藏超出的内容 **/
			word-wrap:break-word;
			/*英文强制换行*/   
			color: #000000;
			font-weight: 700;
		}
	}
}
</style>