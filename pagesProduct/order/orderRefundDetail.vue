<template>
	<view class="container">
		<view class="goods-section">
			<view class="g-header b-b">
				<text class="name">商品信息</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-for="(product,pi) in orderInfo.orderChildInfoList" :key='pi'>
				<image :src="product.productInfo.imgPath||`https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=298298368,1308836146&fm=26&gp=0.jpg`"></image>
				<view class="right">
					<text class="title clamp">{{product.productInfo.brand}}{{product.productInfo.productName}}{{product.productInfo.largeCategory}}{{product.productInfo.littleCategory}}</text>
					<text class="spec">{{product.productInfo.color}}</text>
					<view class="price-box">
						<text class="price">￥{{product.unitPrice}}</text>
						<text class="number">x {{product.productNum}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单状态</text>
				<text class="cell-tip red">{{orderInfo.stateTip}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="orderInfo.orderState != 0">
				<text class="cell-tit clamp">订单总计</text>
				<text class="cell-tip red">￥{{orderInfo.orderPrice}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单编号</text>
				<text class="cell-tip">{{orderInfo.orderNo}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">申请退款日期</text>
				<text class="cell-tip">{{orderInfo.applicationDate}}</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">退款理由</text>
				<text class="cell-tip">{{orderInfo.refundReason}}</text>
			</view>
			<view class="yt-list-cell desc-cell" v-if="orderInfo.approvalDate">
				<text class="cell-tit clamp">审核日期</text>
				<text class="cell-tip">{{orderInfo.approvalDate}}</text>
			</view>
			<view class="yt-list-cell desc-cell" v-if="orderInfo.refundConclusion">
				<text class="cell-tit clamp">审核结论</text>
				<text class="cell-tip">{{orderInfo.refundConclusion}}</text>
			</view>
			<view class="yt-list-cell desc-cell" v-if="orderInfo.auditorOpinion">
				<text class="cell-tit clamp">审核意见</text>
				<text class="cell-tip">{{orderInfo.auditorOpinion}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		data() {
			return {
				id:'',
				orderInfo:{},//订单信息
				submitDisabled:false,
			}
		},
		onLoad(option){
			this.id=option.id
			this.initData()
		},
		methods: {
			initData(){
				this.$api.httpPost('orderMainInfo/api/detail',{id:this.id}).then(r=>{
					console.log("请求结果：",r)
					this.orderInfo=r.data
					this.orderInfo = Object.assign(this.orderInfo, this.orderExp(this.orderInfo));
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//订单状态文字和颜色
			orderExp(item){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+item.orderState){
					case 0:
						stateTip = '已取消'; 
						stateTipColor = '#909399';
						break;
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 3:
						stateTip = '待收货'; break;
					case 4:
						stateTip = '已完成'; break;
					case 5:
						stateTip = '待确认'; break;
					case 9:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
					default:
						stateTip = '待付款';
					//更多自定义
				}
				let submitDisabled=false
				return {stateTip, stateTipColor,submitDisabled};
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}
	.container{
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}
				.number{
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 50upx;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}

		&.desc-cell {
			display: flex;
			justify-content: space-between;
			.desc {
				flex: 3;
				font-size: $font-base;
				color: $font-color-dark;
				border: 1px solid #ccc;
				border-radius: 10rpx;
				padding: 10rpx;
				height: 240rpx;
			}
		}

		
	}
	
	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;	
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.confirm-btn{
			width: 630upx;
			height: 76upx;
			line-height: 76upx;
			border-radius: 50px;
			background: $uni-color-primary;
			color: #fff;
			font-size: $font-lg;
			&:after{
				border-radius: 100px;
			}
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
