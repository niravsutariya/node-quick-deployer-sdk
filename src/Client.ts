import { z } from 'zod';
import { ProjectResource } from './resources/ProjectResource';
import { ServerResource } from './resources/ServerResource';

export interface ClientOptions {
    baseUrl?: string;
}

export class Client {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(apiKey: string, options: ClientOptions = {}) {
        this.apiKey = apiKey;
        this.baseUrl = options.baseUrl || 'https://staging.quickdeployer.com/api';
    }

    async request<T>(method: string, endpoint: string, body?: unknown, schema?: z.ZodType<T>): Promise<T> {
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
        };

        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API request failed: ${response.status} ${error}`);
        }

        const data = await response.json();
        if (schema) {
            return schema.parse(data);
        }
        return data as T;
    }

    projects(): ProjectResource {
        return new ProjectResource(this);
    }

    servers(projectId: string): ServerResource {
        return new ServerResource(this, projectId);
    }
}