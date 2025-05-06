import { Client } from '../src/Client';

describe('Client', () => {
    let client: Client;
    const apiKey = 'test-key';

    beforeEach(() => {
        client = new Client(apiKey, { baseUrl: 'http://localhost/api' });
    });

    it('should initialize with correct base URL', () => {
        expect(client['baseUrl']).toBe('http://localhost/api');
    });

    it('should create Project instance', () => {
        const projectResource = client.projects();
        expect(projectResource).toBeDefined();
    });

    it('should create ServerResource instance', () => {
        const serverResource = client.servers('project-123');
        expect(serverResource).toBeDefined();
    });
});