<template>
	<view class="detailPay">
		<view class="pay-top">
			<view class="name">
				{{payInfos.name}}
			</view>
			<view class="shopname">
				{{payInfos.city}}·{{payInfos.shopname}}
			</view>
		</view>
		<view class="pay-body">
			<view class="chang">
				<view class="title">
					场次
				</view>
				<view class="btn">
					<view class="btn-title" :class="{activecolor:ischang}">
						{{payInfos.time | showTime}}
					</view>
				</view>
			</view>
			<view class="chang">
				<view class="title" >
					票档
				</view>
				<view class="btn">
					<view class="btn-title" @click="selectpeice" :class="{activecolor:isprice}">
						单人票 ￥{{payInfos.price}}
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="num" v-if="isprice">
					<view class="title">
						数量
					</view>
					<view class="numbtn">
						<view class="algobtn" @click="subnum">
							-
						</view>
						<view>
							{{num}}份
						</view>
						<view class="algobtn" @click="addnum">
							+
						</view>
					</view>
				</view>
				<view class="bottom1" >
					<view class="bottom-btn" v-if="!isprice">
						请选择票档
					</view>
					<view class="bottom-btn1" v-if="isprice">
						确认
					</view>
					<view class="bottom-title" v-if="isprice">
						总计：<span class="total">{{totalPrice}}</span><span class="discount" v-if="iscount">打{{payInfos.discount}}折</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDate} from '@/common/utils.js'
	export default {
		data() {
			return {
				payInfos:{},
				ischang:true,
				isprice:false,
				select:null,
				num:1
			}
		},
		onLoad:function(option){
			this.payInfos = {
				name:option.name,
				price:option.price,
				time:JSON.parse(option.time),
				city:option.city,
				shopname:option.shopname,
				discount:option.discount
			}
		},
		methods: {
			selectpeice() {
				this.select = this.price;
				this.isprice = !this.isprice
				if(this.isprice) {
					this.num = 1;
				}
			},
			addnum() {
				if(this.num >= 10) {
					uni.showToast({
						title:'不能再增加啦~',
						icon:"none"
					})
				} else {
					this.num++
				}
			},
			subnum() {
				if(this.num <= 1) {
					uni.showToast({
						title:'至少1张票哦~',
						icon:"none"
					})
				} else {
					this.num--;
				}
			}
			
		},
		filters: {
			showTime(value) {
				const DateTime = new Date(value);
				return formatDate(DateTime, 'yyyy年MM月dd日 hh:mm:ss')
			}
		},
		computed: {
			totalPrice() {
				return '￥'+ (this.num * this.payInfos.price * this.payInfos.discount/10).toFixed(2)
			},
			iscount() {
				if(this.payInfos.discount == 10) {
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style lang="scss">
page {
	width: 750rpx;
	height: 100%;
}
.detailPay {
	width: 100%;
	height: 100%;
	.pay-top {
		box-sizing: border-box;
		width: 100%;
		padding:  36rpx 36rpx 0 36rpx;
		background: linear-gradient(to bottom, #2f2e4e,#434166);
		color: #ffffff;
		height: 200rpx;
		.name {
			font-size: 32rpx;
			font-weight: 700;
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
		.shopname {
			font-size: 28rpx;
			text-overflow: ellipsis;
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 1;
			/** 显示的行数 **/
			overflow: hidden;
			/** 隐藏超出的内容 **/
			word-wrap:break-word;
			/*英文强制换行*/   
		}
	}
	.pay-body {
		position: relative;
		background: #fafafa;
		width: 100%;
		top: -14rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		bottom: 0;
		height: calc(100vh - 200rpx);
		.chang {
			padding: 40rpx;
			.title {
				font-size: 30rpx;
				font-weight: 700;
				color: #000000;
			}
			.btn {
				display: flex;
				margin-top: 20rpx;
				flex-wrap: wrap;
				.btn-title {
					padding: 18rpx;
					background-color: #fff;
					border-radius: 12rpx;
					border: 2rpx solid #e3e3e3;
				}
				.activecolor {
					color: $index-color;
					border: 2rpx solid $index-color;
				}
			}
		}
		.bottom {
			.bottom1 {
				box-sizing: border-box;
				position: absolute;
				width: 100%;
				bottom: 0;
				height: 114rpx;
				background-color: #ffffff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: row-reverse;
				padding: 0 40rpx;
				border-top: 4rpx solid #f1f1f1;
				.bottom-btn {
					width: 214rpx;
					height: 68rpx;
					border-radius: 36rpx;
					background-color: #cccccc;
					color: #ffffff;
					text-align: center;
					line-height: 68rpx;
				}
				.bottom-btn1 {
					background-color: $index-color;
					color: #ffffff;
					width: 200rpx;
					height: 68rpx;
					border-radius: 36rpx;
					text-align: center;
					line-height: 68rpx;
				}
				.bottom-title {
					font-size: 28rpx;
					.total {
						font-size: 30rpx;
						color: $index-color;
						font-weight: 700;
					}
					.discount {
						margin-left: 10rpx;
						color: #f03d37;
						font-style: oblique;
					}
				}
			}
			.num {
				box-sizing: border-box;
				position: absolute;
				width: 100%;
				bottom: 118rpx;
				height: 106rpx;
				background-color: #ffffff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 40rpx;
				border-top: 4rpx solid #f1f1f1;
				font-size: 30rpx;
				.title {
					font-weight: 700;
				}
				.numbtn {
					width: 214rpx;
					display: flex;
					justify-content: space-between;
					.algobtn {
						border-radius: 50%;
						border: 2rpx solid $index-color;
						color: $index-color;
						width: 40rpx;
						border: 2rpx solid $index-color;
						text-align: center;
					}
				}
			}
		}	
	}
		
}

</style>
