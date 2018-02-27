
<template>
  <div class="vuex-demo">
    <!-- 头部 -->
    <Header :title="name"></Header>
    
    <main class="goods-list">
        <Scroll>
          <ul class="good-list">
            <li v-for="(good,index) in goodsApi.goods" :key="good.id" class="goodLi">
                <div class="left-img">
                  <img :src="good.listPicUrl" alt="">
                </div>
                <div class="right-description">
                    <p class="good-name">{{good.name}}</p>
                    <p class="good-des">{{good.simpleDesc}}</p>
                    <div class="num-click">
                        <span class="good-price">￥{{good.retailPrice}}</span>
                        <div class="click-area">
                          <span class="less click-icon" :class="{'goods-disable': good.pieceNum == 0}" @click="onReduce(index)">-</span>
                         <input class="good-num" type="text" v-model="good.pieceNum" readonly="readonly" />
                          <span class="more click-icon" @click="onAdd(index)">+</span>
                        </div>
                    </div>
                </div>
            </li>
          </ul>
        </Scroll>
    </main>

    <footer>
        <div class="foot-area money"><span class="money-des">合计:</span>￥{{ tatolPrice || 0 }}</div>
        <div class="foot-area peisong">配送费:￥{{goodsApi.deliveryPrice}}</div>
        <div class="foot-area goods-submit" :class="{'goods-submit-active' :tatolPrice >= parseFloat(goodsApi.minPrice) }">
          {{ cartStatus }}({{ tatolNum }})
        </div>
    </footer>
  </div>
</template>

<script>

import Header from "@/components/Header.vue";
import Scroll from "@/components/Scroll.vue";
import {mapState,mapGetters,mapMutations} from "vuex";
export default {
  name: 'Goods',

  computed:{
    ...mapState(["name","goodsApi"]),
    ...mapGetters(['tatolPrice','tatolNum']),
    cartStatus(){
			let cartStatusInfo = '';
			if(this.tatolPrice == 0){
				cartStatusInfo = `${ this.goodsApi.minPrice}元起送`
			}else if(parseFloat(this.tatolPrice) < this.goodsApi.minPrice && parseFloat(this.tatolPrice) > 0){
				cartStatusInfo = `还差 ${this.goodsApi.minPrice - this.tatolPrice}元起送`;
			}else{
				cartStatusInfo = '去买单'
			}
			return cartStatusInfo
    },
   
  },

  components:{
    Header:Header,
    Scroll:Scroll
  },
  methods:{
    ...mapMutations(['goodsReduce','goodsAdd']),
		onReduce(index){
      
			this.goodsReduce(index);
		},
		onAdd(index){
			this.goodsAdd(index);
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{
  height: 45px;
  display: flex;
  color: #fff;
  background: #000;
  line-height: 45px;
}
.foot-area{
  flex-grow: 1;
}
.money{
  padding-left: 10px;
  color:red;
}
.money-des{
  font-size: 12px;
  padding-right: 10px;
  color:#fff;
}
.peisong{
    font-style: italic;
    color: gray;
    font-size: 14px;
}
	.goods-submit{
		height: 45px;
		padding: 0 10px;
		background: #999;
		color: #fff;
	}
	.goods-submit-active{
		background: #008000;
	}

.goods-list{
		height: calc(100vH - 90px);
		overflow: hidden;
  }
  
.goodLi{
  padding: 10px 0;
  border-bottom: 1px solid black;
}
.goodLi:first-of-type{
  border-top: 1px solid black;;
}
.goodLi:last-of-type{
  border-bottom: none;
}
.goodLi:after{
    content: "";
    display: block;
    clear: both;
}
.left-img{
  float: left;
  width: 40%;
}
.left-img img{
  width:100%;
}
.right-description{
  padding-top: 40px;
  float: left;
  width:60%;
}
.good-name{
  margin-bottom: 5px;
}
.good-des{
  font-size: 12px;
  font-style: italic;
}

.good-price{
  color: #b4282d;
  display: inline-block;
  float: left;
}
.num-click{
  overflow: hidden;
  padding-top: 10px;
}
.click-area{
  float: right;
}
.click-icon{
    display: inline-block;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #2bbbd4;
    color: #fff;
    background: #2bbbd4;
}
.good-num{
    width: 20px;
    text-align: center;
    font-size: 16px;
    outline: none;
    border: 0;
}
.goods-disable{
		background: #DDD;
		border-color: #ddd;
		cursor: not-allowed;
	}
</style>
