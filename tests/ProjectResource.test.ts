import { Client } from '../src/Client';
import { ProjectResource } from '../src/resources/ProjectResource';
import { Project } from '../src/types';

describe('ProjectResource', () => {
    let client: Client;
    let projectResource: ProjectResource;

    beforeEach(() => {
        client = new Client('test-key', { baseUrl: 'http://localhost/api' });
        projectResource = new ProjectResource(client);
    });

    it('should list projects', async () => {
        const mockProjects: Project[] = [{ id: 'project-123', name: 'Test Project' }];
        jest.spyOn(client, 'request').mockResolvedValue({ projects: mockProjects });

        const projects = await projectResource.list();
        expect(projects).toEqual(mockProjects);
        expect(client.request).toHaveBeenCalledWith('GET', 'projects');
    });
});