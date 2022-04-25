<template>
	<view class="content">
		<view class="content-type">
			<view class="type">
				<image src="../static/icon/话剧音乐剧.png" mode="heightFix"></image>
				<view class="title">
					话剧音乐剧
				</view>
			</view>
			<view class="type">
				<image src="../static/icon/脱口秀.png" mode="heightFix"></image>
				<view class="title">
					脱口秀
				</view>
			</view>
			<view class="type">
				<image src="../static/icon/休闲展览.png" mode="heightFix"></image>
				<view class="title">
					休闲展览
				</view>
			</view>
			<view class="type">
				<image src="../static/icon/演唱会.png" mode="heightFix"></image>
				<view class="title">
					演唱会
				</view>
			</view>
			<view class="type">
				<image src="../static/icon/戏曲.png" mode="heightFix"></image>
				<view class="title">
					戏曲
				</view>
			</view>
			<view class="type">
				<image src="../static/icon/音乐会.png" mode="heightFix"></image>
				<view class="title">
					音乐会
				</view>
			</view>
			<view class="type">
				<image src="../static/icon/音乐节.png" mode="heightFix"></image>
				<view class="title">
					音乐节
				</view>
			</view>
			<view class="type">
				<image src="../static/icon/相声.png" mode="heightFix"></image>
				<view class="title">
					剧本杀
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
				
			};
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
		width: 1075rpx;
		margin: 26rpx 0;
		.type {
			display: inline-block;
			height: 60rpx;
			padding: 0 30rpx;
			text-align: center;
			
			image {
				height: 100%;
			}
			.title {
				font-size: 24rpx
			}
		}
	}
}
</style>