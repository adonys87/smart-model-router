import { OpenRouter } from "@openrouter/sdk";
import { config , type ModelConfig} from "./config.ts";
import { type ChatGenerationParams } from "@openrouter/sdk/models/chatgenerationparams.js";

//Criando um tipo para ser a resposta do modelo de linguagem natural (LLM) que será retornada para o cliente.
//Ele terá a mensagem (content) gerada pelo modelo e o nome do modelo que gerou a mensagem.
export type LLMResponse = {
    model: string;
    content: string;
};

//Classe que representa o servidor do OpenRouter, responsável por gerenciar as 
//requisições e respostas do modelo de linguagem natural (LLM) e 
// fornecer uma interface para interagir com o modelo.
export class OpenRouterServer{
    private config: ModelConfig;
    private client: OpenRouter;

    constructor(configOveride?: ModelConfig){
        this.config = configOveride ?? config;
        this.client = new OpenRouter({
            apiKey: this.config.apiKey,
            httpReferer: this.config.httpReferer,
            xTitle: this.config.xTitle
        });
    }

    async generate(prompt: string) : Promise<LLMResponse> {
        const response = await this.client.chat.send({
            models: this.config.models,
            messages: [
                { role: "system", content: this.config.systemPrompt },
                { role: "user", content: prompt }
            ],
            stream: false, //Não vai responder em tempo real, mas sim aguardar a resposta completa do modelo antes de enviar a resposta ao cliente.
            temperature: this.config.temperature,
            max_tokens: this.config.maxTokens,
            provider: this.config.provider as ChatGenerationParams["provider"]
        });
        //console.log('Response from OpenRouter:', response);

        const content = String(response.choices.at(0)?.message?.content ?? '');
        return {
            model: response.model,
            content: content
        };
    }
}