import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user';
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    const cartList = ref([]);
    const updateCartList = async ()=>{
        const res = await findNewCartListAPI();
        cartList.value = res.result;
    }
    const addCart = async (goods) => {
        const { skuId, count } = goods;
        if (isLogin.value) {
            await insertCartAPI({ skuId, count });
            updateCartList();
            // const res = await findNewCartListAPI();
            // cartList.value = res.result;
        } else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId);
            if (item) {
                item.count++;

            } else {
                cartList.value.push(goods);
            }
        }

    }
    const delCart = async (id) => {
        if (isLogin.value) {
            await delCartAPI([id]);
            updateCartList()
            // const res = await findNewCartListAPI();
            // cartList.value = res.result;
        } else {
            const idx = cartList.value.findIndex((item) => id === item.skuId);
            cartList.value.splice(idx, 1);
            // cartList.value = cartList.value.filter((item)=>item.skuId !== id);
        }
    }

    const clearCart = ()=>{
        cartList.value = [];
    }

    const singleCheck = (id, selected) => {
        const item = cartList.value.find((item) => id === item.skuId);
        item.selected = selected;
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0));
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0));

    const isAll = computed(() => cartList.value.every((item) => item.selected));

    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected);
    }
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        clearCart,
        updateCartList
    }
}, {
    persist: true
})