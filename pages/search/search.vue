<template>
	<view class="search">
		<view class="searchtop">
			<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" placeholder="找演出,场馆" >
				<template v-slot:searchIcon>
						<uni-icons  color="#f79b47" size="20" type="search" />
				</template>
			</uni-search-bar>
		</view>
		<view class="searchbody">
			<perform-list :recommendList="searchList"></perform-list>
		</view>
	</view>
</template>

<script>
	import performList from '../../components/performList.vue';
	export default {
		data() {
			return {
				searchValue:'',
				searchList:[]
			}
		},
		components: {
			'perform-list':performList
		},
		methods: {
			async search() {
				const res = await this.sendRequest({
					url:'/perform/search',
					method:'POST',
					data:{name:this.searchValue}
				})
				this.searchList = res.data.data
			}
		}
	}
</script>

<style lang="scss">
page {
	width: 750rpx;
	height: 100%;
}
.search {
	width: 100%;
	height: 100%;
	.searchtop {
		width: 100%;
		height: 118rpx;
		border-bottom: 2rpx solid #dcdcdc;
	}
	.searchbody {
		padding: 20rpx;
	}
}
</style>
