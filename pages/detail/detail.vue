<template>
	<view class="detail">
		<detail-top :detailTopInfo="detailTopInfo"></detail-top>
		<view class="detailBody">
			<view class="bodyTitle">
				演出详情
			</view>
			<view class="bodyImage" v-for="(item,index) in detailInfo.pictures" :key="index">
				<image :src="item.picture" mode="widthFix" lazy-load="true"></image>
			</view>
		</view>
		<view class="detailRecommend">
			<view class="recommendTitle">
				为你推荐
			</view>
			<perform-list :recommendList="detailRecommend"></perform-list>
		</view>
		<view class="bottom">
			-----内容到底了-----
		</view>
		<view class="detailPay">
			<button type="default" @click="navToPay">立即购票</button>
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
				detailInfo:{},
				detailRecommend:[],
				payInfo:{}
			}
		},
		onLoad: function (option) { 
			this.getDetail(option.performanceId);
			this.getDetailRecommend(option.performanceId,option.categoryId)
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
				this.detailInfo = res.data.data
				this.detailTopInfo = new detailTops(uni.getStorageSync('userinfo'),this.detailInfo)
			},
			async getDetailRecommend(value1,value2) {
				const res = await this.sendRequest({
					url:'/perform/detail/recommend',
					method:'POST',
					data:{performanceId:value1,categoryId:value2}
				})
				this.detailRecommend = res.data.data;
			},
			navToPay() {
				uni.navigateTo({
					url:'/pages/pay/pay?price='+this.detailTopInfo.price+'&name='+this.detailTopInfo.name+'&shopname='+this.detailTopInfo.shopname+'&city='+this.detailTopInfo.city+'&time='+this.detailTopInfo.serverTime+'&discount='+this.detailTopInfo.discount
				})
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
	.detailPay {
		position: fixed;
		bottom: 60rpx;
		width: 100%;
		button {
			width: 82%;
			height: 100rpx;
			border-radius: 50rpx;
			font-size: 32rpx;
			font-weight: bolder;
			color: #FFFFFF;
			margin-top: 65rpx;
			background: #f79b47;
			&:active {
			    opacity: .8;
			}
		}
	}
	.bottom {
		width: 100%;
		padding: 28rpx 0;
		height: 200rpx;
		text-align: center;
		font-size: 30rpx;
		color: #aeaeae;
		background-color: #eeeeee;
	}
}
</style>
