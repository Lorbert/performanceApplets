<template>
	<view class="today-scroll" :style="{width: listenWidth + 'rpx'}">
		<view class="today-content" v-for="(item,index) in recommends" :key="index" @click="navto(item.performanceId)">
			<view class="today-type">
				{{item.cateName}}
			</view>
			<image lazy-load="true" :src="item.posterUrl" mode="scaleToFill"></image>
			<view class="today-discount">
				{{item.discountRate}}折起
			</view>
			<view class="content-title">
				{{item.name}}
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
				return this.recommends.length*172
			},
		},
		methods: {
			navto(value) {
				uni.navigateTo({
					url:'/pages/detail/detail?performanceId=' + value
				})
			}
		}
	}
</script>

<style lang="scss">
.today-scroll {
	margin-left: 10rpx;
	.today-content {
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