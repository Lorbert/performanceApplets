<template>
	<view class="performList">
		<view class="boxList" v-for="(item,index) in recommendList" @click="navtoDetail(item.performanceId,item.categoryId)">
			<view class="box-image">
				<image :src="item.posterUrl" mode="scaleToFill"></image>
			</view>
			<view class="box-info">
				<view class="performInfo">
					<view class="performInfo-name">
						{{item.name}}
					</view>
					<view class="performInfo-time">
						<span>{{item.onSaleTime | showTime}} - {{item.serverTime | showTime}}</span>
						<span>{{item.cityName}} {{item.shopName}}</span>
					</view>
				</view>
				<view class="performPrice">
					{{item.lowestPrice}}元起
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDate} from '@/common/utils.js'
	export default {
		name:"performList",
		data() {
			return {
			};
		},
		props: {
			recommendList: {
				type:Array,
				default:[]
			}
		},
		filters: {
			showTime(value) {
				const DateTime = new Date(value);
				return formatDate(DateTime, 'yyyy-MM-dd')
			}
		},
		methods: {
			navtoDetail(value1,value2) {
				uni.navigateTo({
					url:'/pages/detail/detail?performanceId=' + value1 + '&categoryId=' + value2
				})
			}
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
				color: #f03d37;
			}
		}
	}
}
</style>