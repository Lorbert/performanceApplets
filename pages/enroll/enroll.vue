<template>
	<view class="enroll">
		<image class="enroll-bg" src="../../static/login/bz.png" ></image>
		<view class="enroll-content" v-if="isEnroll">
			<view class="enroll-input">
				<input v-model="useremail" type="text" placeholder="邮箱">
				<input v-model="username" type="text" placeholder="用户名">
				<input v-model="password" password="true" type="text" placeholder="密码">
				<input v-model="passwordagain" password="true" type="text" placeholder="确认密码" @blur="verify">
				<view class="enroll-email">
					<input v-model="mail" class="email" type="text" placeholder="验证码">
					<button :class="{isActive: send}" :disabled="isSend"  @click="sendemail" class="enroll-sendmail" type="default">{{code}}</button>
				</view>
				<button :disabled="isSendEnroll" @click="enroll" class="enroll-login" type="default">注册</button>
			</view>
		</view>
		<view class="interest" v-if="!isEnroll">
			<view class="interest-title">
				<view class="interest-title-main">
					选择感兴趣的演出
				</view>
				<view class="interest-title-deputy">
					根据兴趣，生成私人订制的演出小程序
				</view>
			</view>
			<view class="interest-content">
				<view class="interest-radio" v-for="(item,index) in selectData" :key="index" :class="{selectColor:item.isSelect}" @click="selectInteres(item.value,index)">
					{{item.label}}
				</view>
			</view>
			<view class="interest-button">
				<button type="default" :disabled="!isSelect" @click="sendInterest" :class="{buttonActive: !isSelect}">已选择{{interesting.length}}个兴趣</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEnroll:true,
				isSendEnroll:true,
				isSend:true,
				isSelect:false,
				send: true,
				code:'发送验证码',
				useremail:'b13437627544@163.com',
				password:null,
				username:'前端小罗',
				passwordagain:null,
				mail:null,
				timeCounter:null,
				userinfo:{},
				selectData:[{label:'话剧音乐剧',value:0,isSelect:false},{label:'脱口秀',value:1,isSelect:false},{label:'休闲展览',value:2,isSelect:false},{label:'演唱会',value:3,isSelect:false},{label:'戏曲',value:4,isSelect:false},{label:'音乐会',value:5,isSelect:false},{label:'音乐节',value:6,isSelect:false},{label:'剧本杀',value:7,isSelect:false}],
				interesting:[]
			}
		},
		methods: {
			async sendemail() {
				const res = await this.sendRequest({
					url: '/api/sendmail',
					method: 'POST',
					data:{email:this.useremail}
				})
				console.log('验证',res);
				this.send = true;
				this.isSend = true;
				this.code = 60;
				setTimeout(()=>{
					this.send = false;
					this.isSend = false;
				},60000)
				this.timeCounter = setInterval(()=>{
					if(this.code == 1) {
						clearInterval(this.timeCounter)
						this.code = '发送验证码';
					} else {
						this.code--;
					}
				},1000)
			},
			verify() {
				if(this.password != this.passwordagain) {
					uni.showToast({
						title:'密码不一致',
						icon:'error'
					})
					this.isSend = true;
					this.isSendEnroll = true;
					this.send = true
				} else {
					this.isSend = false;
					this.isSendEnroll = false;
					this.send = false
				}
			},
			async enroll() {
				const res = await this.sendRequest({
					url:'/api/reguser',
					method:'POST',
					data:{username:this.username,email:this.useremail,password:this.password,mail: Number(this.mail)}
				})
				if(res.data.code == 200) {
					uni.setStorageSync('token',res.data.token);
					uni.setStorageSync('useremail',this.useremail);
					uni.setStorageSync('password',this.password);
					this.isEnroll = false;
				}
				
			},
			selectInteres(value,index) {
				const num = this.interesting.indexOf(value)
				if(num == -1) {
					this.interesting.push(value);
					this.selectData[index].isSelect = true
				} else {
					this.interesting.splice(num,1)
					this.selectData[index].isSelect = false
				}
				this.isSelect = this.interesting.length>0 ? true : false;
				console.log(this.interesting)
			},
			async sendInterest() {
				const res = await this.sendRequest({
					url:'/my/userinfo/interest',
					method:'POST',
					data:{interest:this.interesting}
				})
				if(res.data.code == 200) {
					uni.switchTab({
						url:'/pages/index/index'
					})
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
.enroll {
	width: 100%;
	height: 100%;
	.enroll-bg {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
	}
	.enroll-content {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 75%;
		background-color: rgba($color: #ffffff, $alpha: 0.7);
		border-radius: 57rpx 57rpx 0 0 ;
		.enroll-input {
			margin-top: 70rpx;
			input, button {
				width: 82%;
				height: 90rpx;
				margin: 40rpx auto;
				line-height: 90rpx;
				border-radius: 20rpx;
				background-color: #f3f5f7;
				border: 2rpx solid #f3f5f7;
				font-size: 30rpx;
				padding-left: 35rpx;
			}
			button {
				font-size: 32rpx;
				color: #ffffff;
				background-color: $index-color;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 2rpx solid $index-color;
			}
			.enroll-email {
				display: flex;
				width: 87%;
				font-size: 30rpx;
				height: 90rpx;
				margin: 40rpx auto;
				line-height: 90rpx;
				justify-content: center;
				align-items: center;
				.email {
					width: 60%;
					border-radius: 20rpx;
					background-color: #f3f5f7;
					border: 2rpx solid #f3f5f7;
				}
				.enroll-sendmail {
					width: 40%;
					color: #ffffff;
					background-color: $index-color;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.isActive {
					background-color: #d3d3d3;
					color: #000000;
					border: 2rpx solid #d3d3d3 ;
				}
			}
		}
	}
	.interest {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 65%;
		background-color: rgba($color: #ffffff, $alpha: 0.7);
		border-radius: 57rpx 57rpx 0 0 ;
		.interest-title {
			width: 100%;
			text-align: center;
			margin-top: 30rpx;
			.interest-title-main {
				color: #000000;
				font-size: 45rpx;
				margin: 20rpx 0;
			}
			.interest-title-deputy {
				color: #969696;
				font-size: 35rpx;
			}
		}
		.interest-content {
			display: flex;
			padding: 0 34rpx;
			margin-top: 62rpx;
			justify-content: space-between;
			flex-wrap: wrap;
			.interest-radio {
				height: 50rpx;
				line-height: 50rpx;
				padding: 10rpx 20rpx;
				color: #696969;
				border: 2rpx solid #f3f5f7;
				border-radius: 20rpx;
				margin: 24rpx 0;
			}
			.selectColor {
				color: #ffffff;
				background-color: $index-color;
			}
		}
		.interest-button {
			padding: 0 34rpx;
			font-size: 32rpx;
			margin-top: 40rpx;
			button {
				background-color: $index-color;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 2rpx solid $index-color;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 20rpx;
				color: #ffffff;
			}
			.buttonActive {
				opacity: 0.7;
			}
		}
		
	}
}
</style>
