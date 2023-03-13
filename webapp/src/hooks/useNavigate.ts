import { RouteLocationRaw, useRoute, useRouter } from "vue-router";

export function useNavigate() {
    const $router = useRouter();
    const $route = useRoute();

    const goto = (query: RouteLocationRaw) => {
        $router.push(query);
    };

    const gotoBack = () => {
        $router.back();
    };

    const gotoQuery = (query: RouteLocationRaw) => {
        $router.push(query);
    };

    const getQueryParam = (name: string) => {
        const query = $route.query;
        return query[name];
    };

    const getParam = (name: string): string | null => {
        const param = $route.params[name];
        return param !== undefined ? (param as string) : null;
    };

    const getParamAsNumber = (name: string): number | null => {
        const param = $route.params[name];
        return param !== undefined ? Number(param as string) : null;
    };

    return {
        goto,
        gotoBack,
        gotoQuery,
        getQueryParam,
        getParam,
        getParamAsNumber,
    };
}
