import { Client } from '../Client';
import { Server, ServerStatus } from '../types';

export class ServerResource {
    constructor(private readonly client: Client, private readonly projectId: string) {}

    async list(): Promise<Server[]> {
        const data = await this.client.request<{ servers: Server[] }>('GET', `projects/${this.projectId}/servers`);
        return data.servers ?? [];
    }

    async get(serverId: string): Promise<Server> {
        return this.client.request<Server>('GET', `projects/${this.projectId}/servers/${serverId}`);
    }

    async create(data: Partial<Server>): Promise<Server> {
        return this.client.request<Server>('POST', `projects/${this.projectId}/servers`, data);
    }

    async update(serverId: string, data: Partial<Server>): Promise<Server> {
        return this.client.request<Server>('PUT', `projects/${this.projectId}/servers/${serverId}`, data);
    }

    async delete(serverId: string): Promise<void> {
        await this.client.request<void>('DELETE', `projects/${this.projectId}/servers/${serverId}`);
    }

    async checkStatus(serverId: string): Promise<ServerStatus> {
        return this.client.request<ServerStatus>('GET', `projects/${this.projectId}/servers/${serverId}/status`);
    }
}