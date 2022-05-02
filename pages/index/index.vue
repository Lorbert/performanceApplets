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
		<view class="whitePage" v-if="isWhite">
			暂时没有演出信息，敬请关注！
		</view>
		<view class="abundantPage" v-if="!isWhite">
			<perform-type></perform-type>	
			<view class="index-today">
				<view class="today-title">
					<image src="../../static/login/今日.png" lazy-load="true" mode="heightFix"></image>
				</view>
				<view class="today-box">
					<recommend :recommends="todayRecommend"></recommend>
				</view>
			</view>
			<view class="index-week">
				<view class="week-title">
					<span :class="{textcolor: isActive}" @click="selectData(true)">七天快乐</span> |
					<span :class="{textcolor: !isActive}" @click="selectData(false)">月度看点</span>
				</view>
				<view class="today-box">
					<weekrecommend :recommends="dataRecommend"></weekrecommend>
				</view>
			</view>
			<view class="index-recommend">
				<view class="recommend-title">
					为你推荐
				</view>
				<recommend-item :recommenditem="recommendItem"></recommend-item>
				<view class="bottom" v-if="flag">
					-----内容到底了-----
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import amap from '../../common/amap-wx.130.js';  
	import performType from '../../components/performType.vue';
	import recommend from '../../components/recommend.vue';
	import weekrecommend from '../../components/weekrecommend.vue'
	import recommendItem from '../../components/recommendItem.vue'
	export default {  
	    data() {  
	        return {  
	            amapPlugin: null,  
	            key: '61122e76da9b3a304c058587de18ae49',  
	            addressName: '',   
				isActive: true,
				code:'',
				userinteres:[],
				recommendItem:[],
				flag:false,
				isWhite:false,
				todayRecommend:[],
				weekRecommend:[],
				monthRecommend:[],
				dataRecommend: [],
	        }  
	    },  
		components:{
			'perform-type': performType,
			'recommend': recommend,
			'recommend-item': recommendItem,
			'weekrecommend': weekrecommend
		},
	    onLoad() {  
	        this.amapPlugin = new amap.AMapWX({  
	            key: this.key  
	        });  
			this.getRegeo(); 
			this.getUserinfo();
	    }, 
		 mounted() {
		 	
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
						const location = {latitude:data[0].latitude,longitude:data[0].longitude};
						uni.setStorageSync('location',location);
						console.log('存储的地理位置',uni.getStorageSync('location'));
	                    uni.hideLoading();  
						this.code = data[0].regeocodeData.addressComponent.adcode.split('')
						this.code.splice(4,2,0,0)
						this.code = this.code.join('')
						this.getPerforminfo(this.code)
	                }  
	            });  
	        },
			async getUserinfo() {
				const res = await this.sendRequest ({
					url:'/my/userinfo',
					method:'GET',
				})
				uni.setStorageSync('userinfo',res.data.data);
				this.userinteres = res.data.data.user_interesting.split(',').map(v => Number(v))
			},
			async getPerforminfo(value) {
				this.recommendItem = [];
				this.todayRecommend = [];
				const res = await this.sendRequest ({
					url:'/perform/information',
					method:'POST',
					data:{code:value}
				})
				const datas = res.data.data
				console.log('演出信息',datas);
				if(datas.length == 0) {
					this.isWhite = true
				} else {
					this.isWhite = false
				}
				datas.forEach((item) => {
					if(this.userinteres.indexOf(item.categoryId) !== -1) {
						this.recommendItem.push(item)
					}
					if(item.discountRate < 10 ) {
						this.todayRecommend[item.categoryId] = item
					}
					const time = Date.now()
					const timeSub = (item.onSaleTime - time)/(1000*60*60*24)
					if(timeSub < 7 && timeSub > 0 && this.weekRecommend.length <= 8) {
						this.weekRecommend.push(item)
					} else if (timeSub > 7 && this.monthRecommend.length <=8) {
						this.monthRecommend.push(item)
					}
				})
				this.todayRecommend = this.todayRecommend.filter((elem) => elem != undefined)
				this.todayRecommend.sort((a,b) => b.performanceId - a.performanceId)
				this.weekRecommend.sort((a,b) => a.onSaleTime - b.onSaleTime)
				this.dataRecommend = this.weekRecommend;
				console.log(this.todayRecommend,'今日必选')
				if(this.recommendItem.length < 12) {
					datas.forEach((item) => {
						if(this.recommendItem.length < 12 && this.userinteres.indexOf(item.categoryId) == -1) {
							this.recommendItem.push(item)
						}
					})
				}
				console.log('为你推荐',this.recommendItem)
			},
			onchange(e) {
			        const value = e.detail.value;
					console.log('选择值：',value);
					this.addressName = value[2].text
					const code = value[1].value
					console.log(this.addressName,'位置',value[1].value,'code值')
					this.getPerforminfo(code)
			},
			onnodeclick(node) {},
			selectData(value) {
				this.isActive = value ? true : false;
				this.dataRecommend = value ? this.weekRecommend : this.monthRecommend
			}
			
	    },
		computed: {
			
		},
		onReachBottom() {
			this.flag = true
		}
	}
</script>

<style lang="scss">
page {
	width: 750rpx;
}
.content {
	width: 100%;
	height: 100%;
	.whitePage {
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 38rpx;
		background-color: #eeeeee;
		color: #aeaeae;
		line-height: calc(100vh - 50rpx);
	}
	.index-top {
		height: 50rpx;
		margin: 20rpx 0;
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
	.abundantPage {
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
			.bottom {
				width: 100%;
				padding: 28rpx 0;
				text-align: center;
				font-size: 30rpx;
				color: #aeaeae;
				background-color: #eeeeee;
			}
		}
	}
}
</style>
