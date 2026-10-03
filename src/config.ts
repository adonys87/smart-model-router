// Arquivo que vai ler as variáveis de ambiente e exportar a configuração do projeto.

//Indicará problema caso a variável de ambiente não esteja definida no arquivo .env
console.assert(process.env.OPENROUNTER_API_KEY, 'OPENROUNTER_API_KEY não está definido no arquivo .env');


// Definindo os tipos de configuração do projeto
export type ModelConfig = {
    apiKey: string; 
    httpReferer: string;
    xTitle:string;
    port: number;
    models:string[];
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
    provider:{
        sort:{
            by: string;
            partition: string;
        }
    }
    
}

export const config : ModelConfig = {
    apiKey: process.env.OPENROUNTER_API_KEY as string,
    httpReferer:'http://localhost:3000', //referer que será utilizado para autenticar a requisição, caso não seja definido, será utilizado o referer padrão do OpenRouter
    xTitle:'Smart Model Router', //título da aplicação
    port:  3000, //porta que será utilizada para rodar o servidor, caso não seja definido, será utilizado a porta padrão do OpenRouter
    models:[  //modelos de LLMs que serão utilizados, caso não seja definido, será utilizado o modelo padrão do OpenRouter
        "apodex/apodex-1.1-mini:free","liquid/lfm-2.5-2.6b:free"],
    temperature: 0.2, //temperatura de geração de texto, quanto menor o valor, mais conservador será o modelo, quanto maior o valor, mais criativo será o modelo
    maxTokens: 50, //quantidade máxima de tokens que serão gerados na resposta do modelo, quanto maior o valor, mais longa será a resposta do modelo
    systemPrompt: 'your are a helpful assistant', //prompt do sistema que será utilizado para guiar o comportamento do modelo, caso não seja definido, será utilizado o prompt padrão do OpenRouter
    provider:{ //configuração do provedor de LLMs que será utilizado, caso não seja definido, será utilizado o provedor padrão do OpenRouter
        sort:{//configuração de ordenação dos provedores de LLMs que serão utilizados, caso não seja definido, será utilizado a ordenação padrão do OpenRouter
            //by: 'price', //ordenar os provedores de LLMs pelo preço, caso não seja definido, será utilizado a ordenação padrão do OpenRouter
            //by: 'latency', //ordenar os provedores de LLMs pela latência, caso não seja definido, será utilizado a ordenação padrão do OpenRouter
            by: 'throughput', //ordenar os provedores de LLMs pelo throughput, caso não seja definido, será utilizado a ordenação padrão do OpenRouter
            partition: 'none' //partição dos provedores de LLMs que serão utilizados, caso não seja definido, será utilizado a partição padrão do OpenRouter
        }
    }

}