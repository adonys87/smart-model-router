import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/server.ts';
import { config } from '../src/config.ts';
import { type LLMResponse, OpenRouterServer } from '../src/openrouterService.ts';

//Indicará problema caso a variável de ambiente não esteja definida no arquivo .env
console.assert(process.env.OPENROUNTER_API_KEY, 'OPENROUNTER_API_KEY não está definido no arquivo .env');


test('router to cheapes model by default', async () => {
    const customConfig = {
        ...config, //um forma de usar um objeto como base para criar outro objeto, 
        //copiando todas as propriedades do objeto original para o novo objeto. E modificando somente os campos desejados
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'price'
            }
        }
    }

    const routerService = new OpenRouterServer(customConfig);
    const app = createServer(routerService);

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: {
            question: 'What is rate limiting and how does it work?'
        }
    });
    assert.equal(response.statusCode, 200);
    const body = response.json() as LLMResponse;
    assert.equal(body.model, 'inclusionai/ling-3.1-flash');

})


test('router to highest throughput model by default', async () => {
    const customConfig = {
        ...config, //um forma de usar um objeto como base para criar outro objeto, 
        //copiando todas as propriedades do objeto original para o novo objeto. E modificando somente os campos desejados
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }

    const routerService = new OpenRouterServer(customConfig);
    const app = createServer(routerService);

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: {
            question: 'What is rate limiting and how does it work?'
        }
    });
    assert.equal(response.statusCode, 200);
    const body = response.json() as LLMResponse;
    assert.equal(body.model, 'liquid/lfm-2.5-2.6b:free');
})