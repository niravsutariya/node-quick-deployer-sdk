import { Client } from '../src/Client';
import { ServerResource } from '../src/resources/ServerResource';
import { Server, ServerStatus } from '../src/types';

describe('ServerResource', () => {
    let client: Client;
    let serverResource: ServerResource;

    beforeEach(() => {
        client = new Client('test-key', { baseUrl: 'http://localhost/api' });
        serverResource = new ServerResource(client, 'project-123');
    });

    it('should list servers', async () => {
        const mockServers: Server[] = [{ id: 'server-456', name: 'Test Server' }];
        jest.spyOn(client, 'request').mockResolvedValue({ servers: mockServers });

        const servers = await serverResource.list();
        expect(servers).toEqual(mockServers);
        expect(client.request).toHaveBeenCalledWith('GET', 'projects/project-123/servers');
    });

    it('should check server status', async () => {
        const mockStatus: ServerStatus = { id: 'server-456', status: 'online' };
        jest.spyOn(client, 'request').mockResolvedValue(mockStatus);

        const status = await serverResource.checkStatus('server-456');
        expect(status).toEqual(mockStatus);
        expect(client.request).toHaveBeenCalledWith('GET', 'projects/project-123/servers/server-456/status');
    });
});