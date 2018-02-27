# vuex-demo
teach us how to use vuex 

---

### 前言
最近一直在研究vuex，但是看了官方的解释后，着实感到蛋疼。无奈之下，只好自己去找些demo，尝试理解。

我们先看下官方对于vuex的定义：

>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

此时，你一定是**头皮发麻**，仿佛**石乐志**，那么让我从一个小的例子带你进一步理解。

---

**简单的加减计数器：**

```javascript
//demo1:没有使用vuex的情况下

<script src="https://unpkg.com/vue/dist/vue.js"></script>

<div id="app">
  <p>{{count}}
    <button @click="inc">+</button>
    <button @click="dec">-</button>
  </p>
</div>

<script>

new Vue({
  el:'#app',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    inc () {
      this.count++
    },
    dec () {
      this.count--
    }
  }
})
</script>


//这是我们没有使用vuex的情况下，我们在data中定义了一个count变量，变量初始值为0。我们在methods中定义了两个方法，分别为inc和dec，对count进行加减1操作。
```

同样的例子，让我们看下使用`vuex`，是如何实现的：

```javascript
//demo2:使用vuex实现同样的功能

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vuex@next"></script>

<div id="app">
  <p>{{count}}
    <button @click="inc">+</button>
    <button @click="dec">-</button>
  </p>
</div>

<script>
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
      inc: state => state.count++,
    dec: state => state.count--
  }
})

const app = new Vue({
  el: '#app',
  computed: {
    count () {
        return store.state.count
    }
  },
  methods: {
    inc () {
      store.commit('inc')
    },
    dec () {
        store.commit('dec')
    }
  }
})
</script>

//我们对比下上面没有使用vuex的代码，主要有以下区别
- 新的代码添加了对vuex@next脚本的依赖

- methods数组还是这两个方法，这和demo1是一样的；但是方法内的计算逻辑，不再是在函数内进行，而是提交给store对象！这是一个新的对象！

- count数据也不再是一个data函数返回的对象的属性；而是通过计算字段来返回，并且在计算字段内的代码也不是自己算的，而是转发给store对象。再一次store对象！
```

**通过上面两个demo的对比，我们不难发现，之前在vue实例内做的操作和数据的计算现在都不再自己做了，而是交由对象store来做了。**

这样做有什么好处呢，会不会有部分小伙伴觉得是在脱裤子放屁-找麻烦？

如果对于这些简单的应用，使用`vuex`，确实有此感觉。但是vuex诞生的背景，并不是针对此类简单应用，而是针对很多大型应用，内部可能会有非常繁杂的组件，而这些组件可能又会共同享有某个**状态**，这里的状态我个人理解为共享的变量～

---

### 进阶

看到这里，我相信你头皮发麻的状况应该得到了些许的缓解。

那让我们一鼓作气，用`vue-cli`、`vuex`写一个简单的购物车页面，来彻底地理解vuex究竟是个什么玩意。

**前期准备**

第一步：安装`vuex`

```javascript
cnpm install --save vuex
//这里假定你已经搭好vue的开发环境了
```

第二步：配置`vuex`

1.创建store.js文件
2.在main.js入口文件中引入store.js文件
```javascript

//main.js内部对store.js的配置

//引入store.js文件
import store from '"@/store/store.js' 
new Vue({
    el: '#app',
    store:store //将store暴露出来，也就是把store对象挂载到整个应用中
    template: '<App></App>',
    components: { App }
});

```

**store.js文件中的配置**

```javascript
//store.js

export default new Vuex.Store({
    state: { 
        // state 类似 data
        //这里面写入数据
    },
    getters:{ 
        // getters 类似 computed 
        // 在这里面写个方法
    },
    mutations:{ 
        // mutations 类似methods
        // 写方法对数据做出更改(同步操作)
    },
    actions:{
        // actions 类似methods
        // 写方法对数据做出更改(异步操作)
    }
})
```
---

基本的配置就这些了，接下来让我们看具体的代码

我们看下**store.js**文件中的代码：

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        name:"如何使用vuex",//title名称
        goodsApi:{
            minPrice : "199",//最低起送金额
            deliveryPrice : "39",//配送费
            goods:[//数据，真正的项目中，数据应该从后台获取
                {
                "colorNum": 0,
                "id": 1097011,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/fea36ef2514c904f4f45f1975f37f289.png",//图片
                "name": "原素系列1.8米实木床",
                "newItemFlag": false,
                "pieceNum": 0,//件数
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 3899,
                "primarySkuPreSellStatus": 1,
                "retailPrice": 99,//单价
                "sellVolume": 101,
                "simpleDesc": "【预售】预计12月30日开始发货",//描述
                "status": 2,
                "unitPrice": 0
                },
                {
                "colorNum": 0,
                "id": 1097005,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/e5fd0724a05387615738173fb8f1570d.png",
                "name": "原素系列实木餐椅（两把）",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 1199,
                "primarySkuPreSellStatus": 1,
                "retailPrice": 29,
                "sellVolume": 448,
                "simpleDesc": "【预售】预计12月30日开始发货",
                "status": 2,
                "unitPrice": 0
                },
                {
                "colorNum": 2,
                "id": 1084001,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/07f682d405c1d2ed343c210ac8f8862a.png",
                "name": "纯棉简欧条纹针织盖毯",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 0,
                "primarySkuPreSellStatus": 0,
                "retailPrice": 24,
                "sellVolume": 481,
                "simpleDesc": "纯棉针织，柔软亲肤",
                "status": 2,
                "unitPrice": 0
                },
                {
                "colorNum": 2,
                "id": 1068012,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/9e1eb31c36e6056c3282ab34613ae17f.png",
                "name": "全棉色织绗缝四件套",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 0,
                "primarySkuPreSellStatus": 0,
                "retailPrice": 59,
                "sellVolume": 189,
                "simpleDesc": "可以用一“被”子的四件套",
                "status": 2,
                "unitPrice": 0
                },
                {
                "colorNum": 3,
                "id": 1055024,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/448690d192746b999e87a54505ce30f0.png",
                "name": "60S醇净暖绒AB面四件套",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 0,
                "primarySkuPreSellStatus": 0,
                "retailPrice": 31,
                "sellVolume": 1136,
                "simpleDesc": "全棉缎纹磨毛，温暖你的冬季被窝",
                "status": 2,
                "unitPrice": 0
                },
                {
                "colorNum": 0,
                "id": 1006014,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/2b537159f0f789034bf8c4b339c43750.png",
                "name": "双宫茧桑蚕丝被 子母被",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 0,
                "primarySkuPreSellStatus": 0,
                "retailPrice": 19,
                "sellVolume": 1487,
                "simpleDesc": "子母被设计，四季皆可使用",
                "status": 2,
                "unitPrice": 0
                },
                {
                "colorNum": 4,
                "id": 1009024,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/149dfa87a7324e184c5526ead81de9ad.png",
                "name": "日式和风懒人沙发",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 0,
                "primarySkuPreSellStatus": 0,
                "retailPrice": 24,
                "sellVolume": 3652,
                "simpleDesc": "优质莱卡纯棉，和风家居新体验",
                "status": 2,
                "unitPrice": 0
                },
                {
                "colorNum": 4,
                "id": 1057036,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/8a9ee5ba08929cc9e40b973607d2f633.png",
                "name": "日式纯色水洗亚麻抱枕",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 0,
                "primarySkuPreSellStatus": 0,
                "retailPrice": 21,
                "sellVolume": 689,
                "simpleDesc": "水洗亚麻，透气亲肤",
                "status": 2,
                "unitPrice": 0
                }
        ]
        }
    },
    
    getters: {//getter 接受 state 作为其第一个参数，也可以接受第二个参数
    
		tatolPrice(state){//总金额，通过计算属性得到
			let tatolP = 0;
			state.goodsApi.goods.forEach((val,index) => {
				tatolP+= val.pieceNum * val.retailPrice;
			});

			if(tatolP>0){
				tatolP = parseFloat(tatolP) + parseInt(state.goodsApi.deliveryPrice)
			}else{
				tatolP = 0;
			}

			return tatolP.toFixed(2);
		},
		
		tatolNum(state){//总件数，通过计算属性得到
			let tatolN = 0;
			state.goodsApi.goods.forEach((val,index) => {
				tatolN += val.pieceNum;
			})
			return tatolN;
		}
    },
    
    mutations: {
    
		goodsReduce(state,index){//减少件数方法
			if(state.goodsApi.goods[index].pieceNum > 0){
				state.goodsApi.goods[index].pieceNum-=1;
			}
		},
		goodsAdd(state,index){//增加件数方法
			state.goodsApi.goods[index].pieceNum+=1;
		}
	},
	actions: {

	}
})
```

看下购物车页面Goods.vue中如何使用定义在store中的数据和方法

```javascript
<template>
  <div class="vuex-demo">
    <!-- 头部 -->
    <Header :title="name"></Header> //通过prop属性定义的title，由父组件向子组件传递
    
    <main class="goods-list">
        <Scroll>
          <ul class="good-list">
            <li v-for="(good,index) in goodsApi.goods" :key="good.id" class="goodLi">//循环遍历商品项目
                <div class="left-img">
                  <img :src="good.listPicUrl" alt="">
                </div>
                <div class="right-description">
                    <p class="good-name">{{good.name}}</p>//名称
                    <p class="good-des">{{good.simpleDesc}}</p>//描述
                    <div class="num-click">
                        <span class="good-price">￥{{good.retailPrice}}</span>//价格
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

import Header from "@/components/Header.vue";//引入头部组件
import Scroll from "@/components/Scroll.vue";//引入主体组件
import {mapState,mapGetters,mapMutations} from "vuex";
//通过辅助函数引用store中的定义的方法和数据，不用懂太多，固定写法，不用辅助函数，也可以直接使用store中定义的数据，但是较麻烦。
//并且通过辅助函数引入的方法和数据，都可以在vue实例中通过this获取到


export default {
  name: 'Goods',
  computed:{
    ...mapState(["name","goodsApi"]),//引入store中state中的name和goodsApi
    
    //如果不用辅助函数，可以通过以下代码获取store中state里面的数据
    /* 
    name:function(){
        return this.$store.state.name
    },
    goodsApi:function(){
        return this.$store.state.goodsApi
    }
    */
    //显然通过辅助函数要方便许多
    
    ...mapGetters(['tatolPrice','tatolNum']),
    
    cartStatus(){//通过计算属性得到此时该显示的文案
			let cartStatusInfo = '';
			if(this.tatolPrice == 0){
				cartStatusInfo = `${ this.goodsApi.minPrice}元起送`
			}else if(parseFloat(this.tatolPrice) < this.goodsApi.minPrice && parseFloat(this.tatolPrice) > 0){
				cartStatusInfo = `还差 ${this.goodsApi.minPrice - this.tatolPrice}元起送`;
			}else{
				cartStatusInfo = '去买单'
			}
			return cartStatusInfo
		}
  },

  components:{ //将上面引入的组件，挂载到vue实例上
    Header:Header,
    Scroll:Scroll
  },
  methods:{
  
    ...mapMutations(['goodsReduce','goodsAdd']),
		onReduce(index){
			this.goodsReduce(index);//可以看出通过辅助函数引入的方法已经绑定到this对象上了
		},
		onAdd(index){
			this.goodsAdd(index);
		}
  }
}
</script>
```

