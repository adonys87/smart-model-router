import Fastify from "fastify";
import { OpenRouterServer } from "./openrouterService.ts";

export const createServer = (routerService: OpenRouterServer) => {
    const app = Fastify({logger: false  });

    app.post("/chat", {
        schema: {
            body: {
                type: "object",
                required: ["question"],
                properties: {
                    question: { type: "string", minLength: 5 }
                }
            }
        }
    }, async (request, reply) => {
        try {

            const { question } = request.body as { question: string };
            const response = await routerService.generate(question);
            reply.send(response);

        }catch (error) {
            console.error('Error handling request:', error);
            return reply.status(500);
        }
    }); 
    return app;  
}