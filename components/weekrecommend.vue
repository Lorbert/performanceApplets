<template>
	<view class="week-scroll" :style="{width: listenWidth + 'rpx'}">
		<view class="week-content" v-for="(item,index) in recommends" :key="index" @click="navtos(item.performanceId,item.categoryId)">
			<view class="week-type">
				{{item.cateName}}
			</view>
			<image lazy-load="true" :src="item.posterUrl" mode="scaleToFill"></image>
			<view class="content-title">
				{{item.name}}
			</view>
			<view class="week-price">
				￥{{item.lowestPrice}}起
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
		props: {
			recommends: {
				type: Array,
				default: []
			}
		},
		computed: {
			listenWidth() {
				return this.recommends.length*172 + 5
			},
		},
		methods: {
			navtos(value1,value2) {
				uni.navigateTo({
					url:'/pages/detail/detail?performanceId=' + value1 + '&categoryId=' + value2
				})
			}
		}
	}
</script>

<style lang="scss">
.week-scroll {
	margin-left: 10rpx;
	.week-content {
		position: relative;
		width: 148rpx;
		display: inline-block;
		padding: 12rpx;
		font-size: 26rpx;
		image {
			width: 100%;
			height: 184rpx;
			border-radius: 10rpx;
		}
		.week-type {
			padding: 8rpx;
			color: #ffffff;
			background: rgba(0, 0, 0, 0.6);
			position: absolute;
			right: 18rpx;
			top: 18rpx;
			border-radius: 10rpx;
			font-size: 22rpx;
		}
		.week-price {
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #f03d37;
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