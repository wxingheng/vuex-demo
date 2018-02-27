import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        name:"如何使用vuex",

        goodsApi:{
            minPrice : "199",
            deliveryPrice : "99",
            goods:[
                {
                "colorNum": 0,
                "id": 1097011,
                "limitedFlag": false,
                "listPicUrl": "http://yanxuan.nosdn.127.net/fea36ef2514c904f4f45f1975f37f289.png",
                "name": "原素系列1.8米实木床",
                "newItemFlag": false,
                "pieceNum": 0,
                "pieceUnitDesc": "件",
                "primarySkuPreSellPrice": 3899,
                "primarySkuPreSellStatus": 1,
                "retailPrice": 99,
                "sellVolume": 101,
                "simpleDesc": "【预售】预计12月30日开始发货",
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
    getters: {
		tatolPrice(state){
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
		tatolNum(state){
			let tatolN = 0;
			state.goodsApi.goods.forEach((val,index) => {
				tatolN += val.pieceNum;
			})
			return tatolN;
		}
    },
    mutations: {
		goodsReduce(state,index){
			if(state.goodsApi.goods[index].pieceNum > 0){
				state.goodsApi.goods[index].pieceNum-=1;
			}
		},
		goodsAdd(state,index){
			state.goodsApi.goods[index].pieceNum+=1;
		}
	},
	actions: {

	}
})