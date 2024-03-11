import { getTopCategoryAPI } from "@/apis/category";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useCategory = () => {
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async () => {
        const res = await getTopCategoryAPI(route.params.id);
        categoryData.value = res.result;
    };
    onMounted(() => getCategory());
    watch(route, () => getCategory());

    return {
        categoryData
    }
}