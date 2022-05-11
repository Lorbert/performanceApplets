<template>
	<view>
		<view class="like">
			<perform-list :recommendList="userLikes"></perform-list>
		</view>
	</view>
</template>

<script>
	import performList from '../../components/performList.vue';
	export default {
		data() {
			return {
				userLikes:[]
			}
		},
		onShow() {
			this.getUserLike()
		},
		components: {
			'perform-list':performList
		},
		methods: {
			async getUserLike() {
				const res = await this.sendRequest({
					url:'/my/userinfo/userseen',
					method:'GET'
				})
				this.userLikes = res.data.data
			}
		}
	}
</script>

<style lang="less">
.like {
	padding: 20rpx;
}
</style>
