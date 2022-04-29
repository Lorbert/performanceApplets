<template>
	<view class="login">
		<image class="bg-login" src="../../static/login/bz.png"></image>
		<view class="login-title">
			欢迎来到演出小程序
		</view>
		<view class="login-content">
			<view class="login-input">
				<input type="text" v-model="useremail" placeholder="邮箱"/>
				<input type="text" password="true" v-model="password" placeholder="密码"/>
			</view>
			<view class="login-enroll">
				<navigator  url="../enroll/enroll">注册账号</navigator>
				<navigator url="./forgetPassword/forgetPassword">忘记密码</navigator>
			</view>
			<button class="login-btn" type="default" @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				useremail:'',
				password:''
			}
		},
		mounted() {
			const email = uni.getStorageSync('useremail');
			if(email) {
				this.useremail = email
			}
			const passwords = uni.getStorageSync('passwrod');
			if(passwords) {
				this.password = passwords;
			}
		},
		methods: {
			async login() {
				const res = await this.sendRequest({
					url:'/api/login',
					method:'POST',
					data:{email:this.useremail,password:this.password}
				});
				console.log(res)
				if(res.data.code == 200) {
					uni.setStorageSync('token',res.data.token);
					uni.setStorageSync('useremail',this.useremail);
					uni.setStorageSync('password',this.password);
					uni.switchTab({
						url:'/pages/index/index'
					})
					console.log('跳转')
				} else {
					uni.showToast({
						title:res.data.message,
						icon:"error"
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
	.login {
		display: flex;
		width: 100%;
		height: 100%;
		.bg-login {
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			top: 0;
			bottom: 0;
		}
		.login-title {
			position: absolute;
			font-size: 60rpx;
			color: #f79b47;
			text-align: center;
			left: 48%;
			top: 11%;
			transform: translateX(-50%);
		}
		.login-content {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 55%;
			background-color: rgba($color: #ffffff, $alpha: 0.7);
			border-radius: 57rpx 57rpx 0 0 ;
			.login-input {
				margin-top: 120rpx;
				input {
					width: 82%;
					height: 100rpx;
					margin: 40rpx auto;
					line-height: 100rpx;
					border-radius: 50rpx;
					background-color: #f3f5f7;
					border: 2rpx solid #f3f5f7;
					font-size: 30rpx;
					padding-left: 35rpx;
				}
			}
			.login-btn {
				width: 82%;
				height: 100rpx;
				border-radius: 50rpx;
				font-size: 32rpx;
				font-weight: bolder;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				margin-top: 65rpx;
				background: #f79b47;
				&:active {
				    opacity: .8;
				}
			}
			.login-enroll {
				font-size: 32rpx;
				display: flex;
				width: 82%;
				color: #f79b47;
				justify-content: space-between;
				margin: 0 auto;
				font-weight: 500;
			}
		}
	}
</style>
