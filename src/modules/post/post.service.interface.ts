export interface IPostService {
    getAllPost(): Promise<any[]>;
    createPost(data: any): Promise<any>;
    getPostById(id: string): Promise<any>;
    removePost(id: string): Promise<boolean>;
}
