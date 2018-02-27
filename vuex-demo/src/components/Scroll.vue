<template>
	<section id="goods" class="goods-box" ref="scroll">
		<slot></slot>
	</section>
</template>
<script>
import BScroll from 'better-scroll';

export default{
	name: 'Scroll',
	mounted(){
		this.$nextTick(() => {
			let scrollBox = this.$refs.scroll;
			this.scroll = new BScroll(scrollBox,{
				probeType: 3,
				click: true,//不添加这个属性 原生的click事件没有效果
				scrollbar : true,//表示滚动的时候 是否需要滚动条
				scrollfree : true,
				bounce:true,//到底或者到顶部 是否有动画效果
			});
		});
	}
}
</script>
<style>
	.goods-box{
        padding: 0 20px;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
