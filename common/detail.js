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
		this.wantsee = userinfo.user_likes;
		this.haveseen = userinfo.user_seen;
		this.interesting = userinfo.user_interesting;
	}
}