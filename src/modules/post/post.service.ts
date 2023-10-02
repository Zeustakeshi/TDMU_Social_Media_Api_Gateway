import { RegistryService, ServiceName } from '@/registry/registry.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IPostService } from './post.service.interface';

@Injectable()
export class PostService implements IPostService {
    private baseURL: string;
    constructor(private registryService: RegistryService) {
        this.baseURL = this.registryService.get(
            ServiceName.POST_SERVICE,
        ).options.host;
    }

    async getAllPost(): Promise<any[]> {
        try {
            const res = await axios({
                url: `${this.baseURL}/get/all`,
                method: 'GET',
            });
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async getPostById(id: string): Promise<any> {
        try {
            const res = await axios({
                url: `${this.baseURL}/get/id/${id}`,
                method: 'GET',
            });
            console.log({ data: res?.data });
            return res.data;
        } catch (error) {
            console.log(error?.response);
            return error.response.data;
        }
    }

    async createPost(data: any): Promise<any> {
        try {
            const res = await axios({
                url: `${this.baseURL}/create`,
                method: 'POST',
                data: {
                    ...data,
                },
            });
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async removePost(id: string): Promise<boolean> {
        try {
            const res = await axios({
                url: `${this.baseURL}/delete/${id}`,
                method: 'DELETE',
            });
            console.log({ data: res.data });
            return res.data;
        } catch (error) {
            console.log(error?.response);
            return error.response.data;
        }
    }
}
