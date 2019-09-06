import { Service } from "../framework/Annotations";

@Service()
export class HttpService {
    request(request: RequestInfo, init?: RequestInit): Promise<Response> {
        return fetch(request, init);
    }

    get(url: string, init?: RequestInit): Promise<Response> {
        return fetch(url, init);
    }

    post(url: string, body: any, init?: RequestInit): Promise<Response> {
        return fetch(url, Object.assign({}, init, { body }));
    }
}