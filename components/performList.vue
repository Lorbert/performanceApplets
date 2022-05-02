<template>
	<view class="performList">
		<view class="boxList">
			<view class="box-image">
				<image src="../static/login/recommend.png" mode="scaleToFill"></image>
			</view>
			<view class="box-info">
				<view class="performInfo">
					<view class="performInfo-name">
						{{name}}
					</view>
					<view class="performInfo-time">
						<span>{{time}}</span>
						<span>{{cityname}} {{shopname}}</span>
					</view>
				</view>
				<view class="performPrice">
					{{price}}
				</view>
			</view>
		</view>
		<view class="boxList">
			<view class="box-image">
				<image src="../static/login/recommend.png" mode="scaleToFill"></image>
			</view>
			<view class="box-info">
				<view class="performInfo">
					<view class="performInfo-name">
						{{name}}
					</view>
					<view class="performInfo-time">
						<span>{{time}}</span>
						<span>{{cityname}} {{shopname}}</span>
					</view>
				</view>
				<view class="performPrice">
					{{price}}
				</view>
			</view>
		</view>
		<view class="boxList">
			<view class="box-image">
				<image src="../static/login/recommend.png" mode="scaleToFill"></image>
			</view>
			<view class="box-info">
				<view class="performInfo">
					<view class="performInfo-name">
						{{name}}
					</view>
					<view class="performInfo-time">
						<span>{{time}}</span>
						<span>{{cityname}} {{shopname}}</span>
					</view>
				</view>
				<view class="performPrice">
					{{price}}
				</view>
			</view>
		</view>
		<view class="boxList">
			<view class="box-image">
				<image src="../static/login/recommend.png" mode="scaleToFill"></image>
			</view>
			<view class="box-info">
				<view class="performInfo">
					<view class="performInfo-name">
						{{name}}
					</view>
					<view class="performInfo-time">
						<span>{{time}}</span>
						<span>{{cityname}} {{shopname}}</span>
					</view>
				</view>
				<view class="performPrice">
					{{price}}
				</view>
			</view>
		</view>
		<view class="boxList">
			<view class="box-image">
				<image src="../static/login/recommend.png" mode="scaleToFill"></image>
			</view>
			<view class="box-info">
				<view class="performInfo">
					<view class="performInfo-name">
						{{name}}
					</view>
					<view class="performInfo-time">
						<span>{{time}}</span>
						<span>{{cityname}} {{shopname}}</span>
					</view>
				</view>
				<view class="performPrice">
					{{price}}
				</view>
			</view>
		</view>
		<view class="boxList">
			<view class="box-image">
				<image src="../static/login/recommend.png" mode="scaleToFill"></image>
			</view>
			<view class="box-info">
				<view class="performInfo">
					<view class="performInfo-name">
						{{name}}
					</view>
					<view class="performInfo-time">
						<span>{{time}}</span>
						<span>{{cityname}} {{shopname}}</span>
					</view>
				</view>
				<view class="performPrice">
					{{price}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"performList",
		data() {
			return {
				name:"邂逅·陈奕迅烛光音乐会邂逅·陈奕迅烛光音乐会邂逅·陈奕迅烛光音乐会",
				time:'2022.5.1-2022.5.31',
				shopname:"One photo 洞穴简约艺术空间",
				cityname:'广州',
				price:'79-598元'
			};
		}
	}
</script>

<style lang="scss">
.performList {
	width: 100%;
	.boxList {
		box-sizing: border-box;
		display: flex;
		flex-wrap: nowrap;
		height: 336rpx;
		margin-bottom: 60rpx;
		.box-image {
			image {
				width: 246rpx;
				height: 336rpx;
				border-radius: 12rpx;
			}
		}
		.box-info {
			box-sizing: border-box;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.performInfo {
				.performInfo-name {
					font-size: 36rpx;
					padding: 4rpx 0;
					font-weight: 700;
				}
				.performInfo-time {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #888888;
					span {
						display: block;
						padding: 10rpx 0;
					}
				}
			}
			.performPrice {
				font-size: 30rpx;
			}
		}
	}
}
</style>