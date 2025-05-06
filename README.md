# Node QuickDeployer TypeScript SDK

The QuickDeployer TypeScript SDK enables developers to interact with the QuickDeployer API in both Node.js (backend) and browser (frontend) environments. It provides a type-safe interface for managing projects and servers, with robust error handling and modern JavaScript features.

## Features
- Manage projects (list, get, create, update, delete).
- Manage servers within projects (list, get, create, update, delete, check status).
- TypeScript support for type safety and IDE autocompletion.
- Compatible with Node.js and browser environments.
- Unit tests with Jest for reliability.

## Requirements
- Node.js >= 18.0.0 (for native `fetch` support)
- TypeScript >= 5.4.5
- A QuickDeployer API key

## Installation

Install the SDK via npm:

```bash
npm install node-quick-deployer-sdk
```

If the SDK is not published, clone the repository and install locally:

```bash
git clone https://github.com/niravsutariya/node-quick-deployer-sdk.git
cd node-quick-deployer-sdk
npm install
npm run build
```

## Usage

### Initializing the Client

```typescript
import { Client } from 'node-quick-deployer-sdk';

const apiKey = 'your-api-token';
const client = new Client(apiKey, { baseUrl: 'https://api.quickdeployer.com/api' });
```

### Managing Projects

#### List Projects

```typescript
const projects = await client.projects().list();
console.log(projects); // [{ id: 'project-123', name: 'Test Project' }, ...]
```

#### Get a Project

```typescript
const project = await client.projects().get('project-123');
console.log(project.name); // Test Project
```

#### Create a Project

```typescript
const newProject = await client.projects().create({ name: 'New Project' });
console.log(newProject.id); // project-456
```

#### Update a Project

```typescript
const updatedProject = await client.projects().update('project-123', { name: 'Updated Project' });
console.log(updatedProject.name); // Updated Project
```

#### Delete a Project

```typescript
await client.projects().delete('project-123');
console.log('Project deleted');
```

### Managing Servers

#### List Servers

```typescript
const servers = await client.servers('project-123').list();
console.log(servers); // [{ id: 'server-456', name: 'Test Server' }, ...]
```

#### Get a Server

```typescript
const server = await client.servers('project-123').get('server-456');
console.log(server.name); // Test Server
```

#### Create a Server

```typescript
const newServer = await client.servers('project-123').create({ name: 'New Server', type: 'web' });
console.log(newServer.id); // server-789
```

#### Update a Server

```typescript
const updatedServer = await client.servers('project-123').update('server-456', { name: 'Updated Server' });
console.log(updatedServer.name); // Updated Server
```

#### Delete a Server

```typescript
await client.servers('project-123').delete('server-456');
console.log('Server deleted');
```

#### Check Server Status

```typescript
const status = await client.servers('project-123').checkStatus('server-456');
console.log(status.status); // online
```

### Error Handling

Use try-catch for API errors:

```typescript
try {
    const projects = await client.projects().list();
} catch (error) {
    console.error('Error:', error.message);
}
```

## Configuration

- **API Key**: Obtain from the QuickDeployer dashboard.
- **Base URL**: Defaults to `https://staging.quickdeployer.com/api`. Override via `Client` options.

## Building for Frontend

For browser usage, bundle the SDK with a module bundler (e.g., Webpack, Vite):

```bash
npm run build
```

Ensure your bundler targets ES Modules and includes `fetch` (available in modern browsers).

## Testing

Run unit tests with Jest:

```bash
npm test
```

Tests are located in the `tests/` directory and cover `Client`, `ProjectResource`, and `ServerResource`.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add feature"').
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Include tests and follow TypeScript/ESLint coding standards.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

Open issues on [GitHub](https://github.com/niravsutariya/node-quick-deployer-sdk) or contact support@quickdeployer.com.