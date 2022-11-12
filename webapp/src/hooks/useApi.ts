import { Api } from "src/services/api/api.service";

const api = new Api();

export function useApi() {
    return api;
}
