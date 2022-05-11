<template>
	<view>
		<view class="detail-top">
			<view class="detail-image">
				<view class="datail-top-image">
					<image :src="detailTopInfo.posterUrl" mode="scaleToFill"></image>
				</view>
				<view class="detail-image-info">
					<span class="info-name">{{detailTopInfo.name}}</span>
					<span class="info-price">{{detailTopInfo.price}} 元起</span>
				</view>
			</view>
			<view class="detail-map">
				<view class="detail-map-title">
					<span>{{detailTopInfo.onSaleTime | showTime}} - {{detailTopInfo.serverTime | showTime}}</span>
					<span class="location-title">{{detailTopInfo.city}} {{detailTopInfo.address}}</span>
				</view>
				<view class="detail-location">
					<map class="location" :scale="7" :latitude="latitude" :longitude="longitude" :markers="covers" :polyline="coverLine"></map>
				</view>
			</view>
			<view class="serve-icon">
				<view class="icon">
					<uni-icons type="clear" color="#b59c8b" size="18"></uni-icons><span>不支持退</span>
				</view>
				<view class="icon">
					<uni-icons type="shop-filled" color="#b59c8b" size="18"></uni-icons><span>官方票</span>
				</view>
				<view class="icon">
					<uni-icons type="mail-open-filled" color="#b59c8b" size="18"></uni-icons><span>电子票</span>
				</view>
				<view class="icon">
					<uni-icons type="staff" color="#b59c8b" size="18"></uni-icons><span>客服开发票</span>
				</view>
			</view>
			<view class="userLike">
				<view class="like" @click="userwant">
					<uni-icons type="heart-filled" :color="likecolor" size="18" ></uni-icons><span>{{wantSee}}</span>
				</view>
				<view class="like" @click="userseen">
					<uni-icons type="star-filled" :color="seencolor" size="18" ></uni-icons><span>{{haveSeen}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDate} from '@/common/utils.js'
	export default {
		name:"detailTop",
		data() {
			return {
				latitude:null,
				longitude:null,
				covers:[],
				coverLine:[],
				seencolor: '#ffffff',
				wantSee:'收藏',
				likecolor:'#ffffff',
				haveSeen:'看过',
				performId:null,
				likes: [],
				seen:[],
				performLikes:null
			}
		},
		props:{
			detailTopInfo: {
				type: Object,
				default:{}
			}
		},
		mounted() {
			setTimeout(() => {
				this.performId = this.detailTopInfo.performanceId;
				this.likes = this.detailTopInfo.wantsee;
				this.seen = this.detailTopInfo.haveseen;
				this.performLikes = this.detailTopInfo.likes;
				if(this.likes.includes(this.performId)) {
					this.likecolor = '#f03d37';
					this.wantSee = '已收藏'
				}
				if(this.seen.includes(this.performId)) {
					this.seencolor = '#ffd01e';
					this.haveSeen = '已看过'
				}
				this.init()
			})
		},
		filters: {
			showTime(value) {
				const DateTime = new Date(value);
				return formatDate(DateTime, 'yyyy-MM-dd')
			}
		},
		methods: {
			init() {
				this.latitude =  (this.detailTopInfo.lat+uni.getStorageSync('location').latitude)/2;
				this.longitude = (this.detailTopInfo.ing+uni.getStorageSync('location').longitude)/2;
				this.covers = [{
						id:0,
						width:30,
						height:30,
				        latitude: this.detailTopInfo.lat,
				        longitude: this.detailTopInfo.ing,
				        iconPath: '../static/icon/location_flag.png',
						title:this.detailTopInfo.address,
						
				    }, {
						id:1,
						width:30,
						height:30,
				        latitude: uni.getStorageSync('location').latitude,
				        longitude: uni.getStorageSync('location').longitude,
				        iconPath: '../static/icon/location_home.png',
						title:'目前的位置',
						}];
				this.coverLine = [{
						points:[{latitude: uni.getStorageSync('location').latitude,longitude: uni.getStorageSync('location').longitude},{latitude: this.detailTopInfo.lat,longitude: this.detailTopInfo.ing}],
						color:'#f79b47',
						arrowLine:true,
						width: 4,
						borderWidth:1
					}];
			},
			async userwant() {
				if(this.likes.includes(this.performId)) {
					const num = this.likes.indexOf(this.performId)
					this.likes.splice(num,1);
					this.likecolor = '#ffffff';
					this.wantSee = '收藏';
					this.performLikes--;
				} else {
					this.likes.push(this.performId)
					this.likecolor = '#f03d37';
					this.wantSee = '已收藏';
					this.performLikes++;
				}
				this.likes = this.likes.join(',')
				const res = await this.sendRequest({
					url:'/my/updatelikes',
					method:'POST',
					data:{likes:this.likes}
				})
				const performres = await this.sendRequest({
					url:'/perform/detail/userlikes',
					method:'POST',
					data:{performanceId:this.performId,likes:this.performLikes}
				})
			},
			async userseen() {
				if(this.seen.includes(this.performId)) {
					const num = this.seen.indexOf(this.performId)
					this.seen.splice(num,1);
					this.seencolor = '#ffffff';
					this.haveSeen = '看过';
				} else {
					this.seen.push(this.performId);
					this.seencolor = '#ffd01e';
					this.haveSeen = '已看过'
				}
				this.seen = this.seen.join(',')
				const res = await this.sendRequest({
					url:'/my/updateseen',
					method:'POST',
					data:{likes:this.seen}
				})
			}
		},
			
	}
</script>

<style lang="scss">
.detail-top {
		box-sizing: border-box;
		padding: 24rpx;
		width: 100%;
		background-image: radial-gradient(#444460, #382d4d, #1c1d3c);
		.detail-image {
			width: 100%;
			display: flex;
			height: 328rpx;
			flex-wrap: nowrap;
			.datail-top-image {
				image {
					height: 328rpx;
					width: 234rpx;
					border-radius: 14rpx;
				}
			}
			.detail-image-info {
				margin-left: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				color: #ffffff;
				.info-name {
					font-size: 38rpx;
				}
				.info-price {
					font-size: 32rpx
				}
			}
			
		}
		.detail-map {
			width: 100%;
			margin: 44rpx 0;
			background-color: #1d1d3b;
			box-sizing: border-box;
			padding: 30rpx;
			border-radius: 22rpx;
			.detail-map-title {
				width: 100%;
				color: #ffffff;
				font-size: 32rpx;
				margin-bottom: 20rpx;
				.location-title {
					margin-top: 10rpx;
					width: 100%;
					font-size: 34rpx;
					text-overflow: ellipsis;
					display: -webkit-box;
					/** 对象作为伸缩盒子模型显示 **/
					-webkit-box-orient: vertical;
					/** 设置或检索伸缩盒对象的子元素的排列方式 **/
					-webkit-line-clamp: 1;
					/** 显示的行数 **/
					overflow: hidden;
				}
			}
			.detail-location {
				.location {
					width: 648rpx;
					height: 357rpx;
				}
			}
		}
		.serve-icon {
			display: flex;
			margin-left: 30rpx;
			.icon {
				display: flex;
				color: #c7a88c;
				justify-content: center;
				font-size: 26rpx;
				margin-right: 22rpx;
				span {
					display: flex;
					align-items: center;
					padding-left: 4rpx;
				}
			}
		}
		.userLike {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-top: 28rpx;
			.like {
				display: flex;
				width: 45%;
				background-color: #2f304d;
				padding: 20rpx 0;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				color: #ffffff;
				border-radius: 12rpx;
				span {
					margin-left: 10rpx;
				}
			}
		}
		
	}
</style>