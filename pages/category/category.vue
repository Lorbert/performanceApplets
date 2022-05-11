<template>
	<view class="category">
		<view class="category-top">
			<view class="category-box">
				<view class="category-item" v-for="(item,index) in categorys" :key="index" :class="{activeColor: cateIndex == index}" @click="getPerformance(index)">
				{{item.cateName}}
				</view>
			</view>
		</view>
	
		<view class="category-body" v-if="!isblank">
			<perform-list :recommendList="performList"></perform-list>
		</view>
		<view class="blank" v-if="isblank">
			暂时还没有演出
		</view>
	</view>
</template>

<script>
	import performList from '@/components/performList.vue'
	export default {
		data() {
			return {
				categorys: [],
				cateIndex: 0,
				performList:[],
				isblank:false
			}
		},
		onLoad() {
			this.getCategory()
			const index = uni.getStorageSync('index')
			if(index) {
				this.getPerformance(index)
			} else {
				this.getPerformance()
			}
		},
		components:{
			'perform-list': performList
		},
		methods: {
			async getCategory () {
				const res = await this.sendRequest({
					url: '/category/getcatename',
					method:'GET'
				})
				this.categorys = res.data.data
			},
			async getPerformance (value=0) {
				this.cateIndex = value;
				const res = await this.sendRequest({
					url:'/category/getperformance',
					method:'POST',
					data:{categoryId:value}
				})
				this.performList = res.data.data
				this.isblank = this.performList.length>0 ? false : true;
			}
		},
	}
</script>

<style lang="scss">
page {
	width: 750rpx;
	height: 100%;
}
::-webkit-scrollbar {
display: none;
}
.category {
	width: 100%;
	height: 100%;
	.category-top {
		width: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		.category-box {
			width: 1762rpx;
			.category-item {
				width: 200rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				display: inline-block;
				padding: 0 10rpx;
				font-size: 30rpx;
				color: #666666;
			}
			.activeColor {
				color: $index-color;
				border-bottom: 4rpx solid orange;
			}
		}
	}
	.category-body {
		padding: 20rpx;
	}
	.blank {
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 38rpx;
		background-color: #eeeeee;
		color: #aeaeae;
		line-height: calc(100vh - 50rpx);
	}
}
</style>
