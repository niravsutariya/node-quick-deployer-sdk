export interface Project {
    id: string;
    name: string;
    description?: string;
    [key: string]: unknown;
}

export interface Server {
    id: string;
    name: string;
    type?: string;
    [key: string]: unknown;
}

export interface ServerStatus {
    id: string;
    status: 'online' | 'offline' | 'pending';
    [key: string]: unknown;
}