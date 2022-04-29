<template>
	<view class="enroll">
		<image class="enroll-bg" src="@/static/login/bz.png" ></image>
		<view class="enroll-content">
			<view class="enroll-input">
				<input v-model="useremail" type="text" placeholder="邮箱">
				<input v-model="password" password="true" type="text" placeholder="更改密码">
				<input v-model="passwordagain" password="true" type="text" placeholder="确认密码" @blur="verify">
				<view class="enroll-email">
					<input v-model="mail" class="email" type="text" placeholder="验证码">
					<button :class="{isActive: send}" :disabled="isSend"  @click="sendemail" class="enroll-sendmail" type="default">{{code}}</button>
				</view>
				<button :disabled="isSendEnroll" @click="forget" class="enroll-login" type="default">更改密码</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSendEnroll:true,
				isSend:true,
				send: true,
				code:'发送验证码',
				useremail:'',
				password:null,
				passwordagain:null,
				mail:null,
				timeCounter:null
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
			async forget() {
				const res = await this.sendRequest({
					url:'/api/forgetpassword',
					method:'POST',
					data:{email:this.useremail,password:this.password,mail: Number(this.mail)}
				})
				console.log(res,'注册效果')
				if(res.data.code == 200) {
					uni.redirectTo({
						url:'/pages/login/login'
					})
					console.log('跳转')
				}
			},
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
		height: 63%;
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
}
</style>
