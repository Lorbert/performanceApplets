<template>
	<view class="content">
		<view class="index-top">
			<view class="index-picker">
				<uni-icons class="index-location" color="#f79b47" type="location-filled" size="20"></uni-icons>
				<uni-data-picker class="data-picker"  popup-title="请选择城市" collection="opendb-city-china" field="code as value, name as text" :step-searh="true" self-field="code" parent-field="parent_code" 
				 @change="onchange" @nodeclick="onnodeclick">
				 <span>{{addressName}}</span>
				 <uni-icons type="bottom" size="15" class="icon-buttom"></uni-icons>
				</uni-data-picker>
			</view>
			<view class="index-search">
				<uni-icons class="index-searchicon" color="#f79b47" type="search" size="20"></uni-icons>
				<input class="index-input" name="input" placeholder="找演出,场馆" />
			</view>
		</view>
		<perform-type></perform-type>	
		<view class="index-today">
			<view class="today-title">
				<image src="../../static/login/今日.png" lazy-load="true" mode="heightFix"></image>
			</view>
			<view class="today-box">
				<recommend></recommend>
			</view>
		</view>
		<view class="index-week">
			<view class="week-title">
				<span :class="{textcolor: isActive}">七天快乐</span> |
				<span :class="{textcolor: !isActive}">月度看点</span>
			</view>
			<view class="today-box">
				<recommend></recommend>
			</view>
		</view>
		<view class="index-recommend">
			<view class="recommend-title">
				为你推荐
			</view>
			<recommend-item></recommend-item>
		</view>
	</view>
</template>

<script>
	import amap from '../../common/amap-wx.130.js';  
	import performType from '../../components/performType.vue';
	import recommend from '../../components/recommend.vue';
	import recommendItem from '../../components/recommendItem.vue'
	export default {  
	    data() {  
	        return {  
	            amapPlugin: null,  
	            key: '61122e76da9b3a304c058587de18ae49',  
	            addressName: '',   
				isActive: true,
	        }  
	    },  
		components:{
			'perform-type': performType,
			'recommend': recommend,
			'recommend-item': recommendItem
		},
	    onLoad() {  
	        this.amapPlugin = new amap.AMapWX({  
	            key: this.key  
	        });  
			this.getRegeo(); 
	    },  
	    methods: {  
	        getRegeo() {  
	            uni.showLoading({  
	                title: '获取信息中'  
	            });  
	            this.amapPlugin.getRegeo({  
	                success: (data) => {  
	                    console.log(data,'看这里')  
	                    this.addressName = data[0].regeocodeData.addressComponent.district;  
	                    uni.hideLoading();  
	                }  
	            });  
	        },
			onchange(e) {
			        const value = e.detail.value;
					console.log('选择值：',value);
					this.addressName = value[2].text
					console.log(this.addressName)
			},
			onnodeclick(node) {}
	    },
		computed: {
			
		},
		
	}
</script>

<style lang="scss">
page {
	width: 750rpx;
}
.content {
	width: 100%;
	height: 100%;
	.index-top {
		margin-top: 10rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.index-picker {
			display: flex;
			width: 30%;
			
			.index-location {
				display: flex;
				align-items: center;
				margin-right: 10rpx;
			}
			.input-value-border {
				border: 0rpx;
				border-radius: 0rpx;
			}
			.input-value {
				font-size: 30rpx;
				color: #000000;
			}
			.data-picker {
				text-align: center;
				font-weight: 700;
				.icon-buttom {
					margin-left: 10rpx;
				}
			}
		}
		.index-search {
			position: relative;
			width: 62%;
			.index-input {
				display: block;
				border: 4rpx solid #f5f5f5;
				height: 40rpx;
				font-size: 30rpx;
				background-color: #f5f5f5;
				color: #999999;
				border-radius: 10rpx;
				padding-left: 56rpx;
			}
			.index-searchicon {
				position: absolute;
				left: 4rpx;
				top: 4rpx;
			}
		}
	}
	.index-today {
		width: 100%;	
		.today-title {
			width: 100%;
			padding-left: 6rpx;
			image {
				height: 50rpx;
				line-height: 50rpx;
			}
		}
		.today-box {
			width: 100%;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}
		
	}
    .index-week {
		width: 100%;
		margin-top: 10rpx;
		color: #999999;
		font-size: 35rpx;
		span {
			padding: 0 10rpx;
		}
		.week-title {
			margin-left: 12rpx;
		}
		.textcolor {
			color: #000000;
			font-weight: 700;
		}
		.today-box {
			width: 100%;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}
	}
	.index-recommend {
		width: 100%;
		margin-top: 10rpx;
		.recommend-title {
			margin-left: 22rpx;
			font-size: 34rpx;
			color: #000000;
			font-weight: 700;
		}
	}
}
</style>
