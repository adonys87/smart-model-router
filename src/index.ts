import {createServer} from "./server.ts";
import {config} from "./config.ts";
import { OpenRouterServer } from "./openrouterService.ts";

const routerService = new OpenRouterServer(config);

const app = createServer(routerService);

await app.listen({port: 3003, host: '0.0.0.0'})

console.log('Server is running on http://localhost:3003');

// app.inject({
//     method: 'POST',
//     url: '/chat',
//     body: {
//         question: 'What is rate limiting and how does it work?'
//     }
// }).then((response) => {
//     console.log('\nResponse status code:', response.statusCode);
//     console.log('Response body:', response.body);
// })