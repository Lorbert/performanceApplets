<template>
	<view class="detail">
		<detail-top :detailTopInfo="detailTopInfo"></detail-top>
		<view class="detailBody">
			<view class="bodyTitle">
				演出详情
			</view>
			<view class="bodyImage" v-for="(item,index) in detailInfo.pictures" :key="index">
				<image :src="item.picture" mode="widthFix"></image>
			</view>
		</view>
		<view class="detailRecommend">
			<view class="recommendTitle">
				为你推荐
			</view>
			<perform-list></perform-list>
		</view>
	</view>
</template>

<script>
	import detailTop from '../../components/detailTop.vue';
	import performList from '../../components/performList.vue';
	import {detailTops} from '../../common/detail.js';
	export default {
		data() {
			return {
				detailTopInfo:{},
				detailInfo:{}
			}
		},
		onLoad: function (option) { 
			this.getDetail(option.performanceId)
		},
		components: {
			'detail-top':detailTop,
			'perform-list':performList
		},
		methods: {
			async getDetail(value) {
				const res = await this.sendRequest({
					url:'/perform/detail/' + value,
					method:'GET'
				})
				console.log('res',res)
				this.detailInfo = res.data.data
				this.detailTopInfo = new detailTops(uni.getStorageSync('userinfo'),this.detailInfo)
			}
		}
	}
</script>

<style lang="scss">
page {
	width: 750rpx;
	height: 100%;
}
.detail {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	.detailBody {
		width: 100%;
		box-sizing: border-box;
		padding: 24rpx;
		background-color: #ffffff;
		.bodyTitle {
			font-size: 36rpx;
			font-weight: 700;
			margin-bottom: 24rpx;
		}
		.bodyImage {
			width: 100%;
			image {
				width: 100%;
			}
		}
	}
	.detailRecommend {
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		padding: 24rpx;
		background-color: #ffffff;
		.recommendTitle {
			font-size: 36rpx;
			font-weight: 700;
			margin-bottom: 34rpx;
		}
		
	}
}
</style>
