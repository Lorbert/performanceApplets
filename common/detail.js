export class detailTops {
	constructor(userinfo,detailinfo) {
		this.name = detailinfo.name;
		this.posterUrl = detailinfo.posterUrl;
		this.price = detailinfo.lowestPrice;
		this.onSaleTime = detailinfo.onSaleTime;
		this.serverTime = detailinfo.serverTime;
		this.city = detailinfo.cityName;
		this.address = detailinfo.shopName;
		this.lat = detailinfo.lat;
		this.ing = detailinfo.ing;
		this.wantsee = userinfo.user_likes.split(',').map(item => Number(item));
		this.haveseen = userinfo.user_seen.split(',').map(item => Number(item));
		this.performanceId = detailinfo.performanceId;
		this.likes = detailinfo.likes;
		this.discount = detailinfo.discountRate
	}
}