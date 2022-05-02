<template>
	<view class="recommends">
		<view class="recommendItem" v-for="(item,index) in recommenditem" :key="index" @click="itemNavto(item.performanceId)">
			<image :src="item.posterUrl" mode="widthFix"></image>
			<view class="recommendItem-title">
				<p class="recommendItem-address">[{{item.cityName}}] {{item.name}}</p>
				<p class="recommendItem-time">{{item.onSaleTime | showTime}} - {{item.serverTime | showTime}}</p>
				<view class="recommendItem-price">
					<span class="price">￥{{item.lowestPrice}}起</span>
					<span class="like"><uni-icons type="star" color="#f79b47" size="15"></uni-icons>{{item.likes}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDate} from '@/common/utils.js'
	export default {
		name:"recommendItem",
		data() {
			return {
				flag:false
			};
		},
		props: {
			recommenditem:{
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
			itemNavto(value) {
				uni.navigateTo({
					url:'/pages/detail/detail?performanceId=' + value
				})
			}
		}
	}
</script>

<style lang="scss">
.recommends {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 22rpx;
	.recommendItem {
		width: 48%;
		padding-bottom: 150rpx;
		position: relative;
		margin: 10rpx 0;
		image {
			width: 100%;
			border-top-left-radius: 12rpx;
			border-top-right-radius: 12rpx;
		}
		.recommendItem-title {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 10rpx;
			padding: 10rpx;
			border: 6rpx solid #f0f0f0;
			border-top: none;
			background-color: #ffffff;
			border-bottom-left-radius: 12rpx;
			border-bottom-right-radius: 12rpx;
			.recommendItem-address {
				width: 100%;
				font-size: 30rpx;
				font-weight: 600;
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
			}
			.recommendItem-time {
				font-size: 22rpx;
				color: #aeaeae;
			}
			p {
				margin: 6rpx 0;
			}
			.recommendItem-price {
				display: flex;
				justify-content: space-between;
				.price {
					font-size: 30rpx;
					color: #f03d37;
				}
				.like {
					font-size: 30rpx;
					color: $index-color;
					font-weight: 600;
					padding-right: 10rpx;
				}
			}
			
		}
	}
}
</style>