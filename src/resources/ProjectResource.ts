import { Client } from '../Client';
import { Project } from '../types';

export class ProjectResource {
    constructor(private readonly client: Client) {}

    async list(): Promise<Project[]> {
        const data = await this.client.request<{ projects: Project[] }>('GET', 'projects');
        return data.projects;
    }

    async get(projectId: string): Promise<Project> {
        return this.client.request<Project>('GET', `projects/${projectId}`);
    }

    async create(data: Partial<Project>): Promise<Project> {
        return this.client.request<Project>('POST', 'projects', data);
    }

    async update(projectId: string, data: Partial<Project>): Promise<Project> {
        return this.client.request<Project>('PUT', `projects/${projectId}`, data);
    }

    async delete(projectId: string): Promise<void> {
        await this.client.request<void>('DELETE', `projects/${projectId}`);
    }
}