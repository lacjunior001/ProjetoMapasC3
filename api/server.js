/**
 * Instalações:
 * nodeJS
 * npm init -y --> cria o package.json
 * npm install --nodemon-dev --> Mantem a API rodando e atualizada, isso salva ele como uma dependência de desenvolvimento, significa que quando fizer o deploy/build da aplicação em produção não vai ser necessário o nodemon.
 * npm install express --save --> pacote para gerar o servidor com mais facilidade???? 
 * npm install cors --save --> pacote para gerar o servidor com mais facilidade???? 
 * npm install faker --save --> gera dados aleatórios
 * 
 * npm install mongoose --save --> instalado na aula da outra turma ??????
 * npm body-parse --save --> instalado na aula da outra turma ?????? pegar o body em uma requisição ????
 * 
 * Aula postada como tendo sido no dia 14/11/2020 como aula 24:
 * link: https://www.youtube.com/watch?v=kt3lPFqNqtg&ab_channel=Ot%C3%A1vioLube
 * essa aula não foi para nossa turma.
 * 
 * Aula postada como tendo sido no dia 16/11/2020 como aula 25:
 * link: https://www.youtube.com/watch?v=f7YFT830yHw&ab_channel=Ot%C3%A1vioLube
 * no inicio da aula menciona que explicou bootstrap --> não explicou
 * menciona que falou sobre criação de CSS particular --> não explicou
 * atenção com alteração necessária em package.json:
 *      comentários não são permitidos em json
 *      procurar por "scripts": {} 
 *      apagar a linha "teste": "echo \"Erro: no test specified\" && exit 1" que está dentro
 *      escrever no lugar "dev": "npx nodemon server.js"
 * fazendo isso é possível em rodar o servidor com o comando npm run dev no console
 * rodando o servidor desta forma é possível ver erros em tempo real
 * rodando desta forma o servidor sempre é atualizado quando algo é alterado neste arquivo
 * cada alteração recompila o servidor
 * obs.: caso queira instalar plugin do chrome chamado "json viewer" ele deixa a página bonitinha
 * ler os comentários desta página, criar as variáveis os métodos e depois criar em page o index.html/css/js
 * no index.html criar a página
 * entra no site https://leafletjs.com/
 * em tutorials --> Leaflet Quick Start Guide --> 
 * comentários em index.html/css/js
 * 
 * Aula como tendo sido do dia 21/11/2020 como aula 26:
 * Link: https://www.youtube.com/watch?v=CyQP604EuqY&ab_channel=Ot%C3%A1vioLube
 * Aula para fazer o mapa da ultima aula....
 * 
 * Aula de 23/11/2020 como aula 27:
 * link: https://getbootstrap.com/docs/4.5/layout/overview/
 * revisão do projeto atualização dos comentários nesta página, e em index.html/css/js
 * servidor está sempre escutando requisições, nessas requisições eu passo o verbo do parâmetros, se está fazendo get, post, etc...
 * depois de processar a requisição ele ve se ela é consistente e entrega algo para o cliente
 * normalmente se entrega o HTML, pode retornar tbm um xml (padrão de dados??), ou um JSON.
 * quando baixa o note eu traz junto o npm
 * npm é tipo um github exclusivo do node
 * var tudo o que declaramos como var é uma variável global do programa.
 * let reduz o escopo da variável apenas ao escopo de onde ela foi declarada, ex for.
 * const é para declarar uma constante, o valor fica fixo.
 * depois fazer anotações sobre o retornar uma página.
 * depois fazer anotações sobre a declaração do vetor final do video.
 * 
 * Aula de 28/11/2020 como aula 28:
 * demonstrações do bootstrap
 * svg é uma img vetorizada pode ser escrita por uma equação matemática.
 * é possível escalar da forma que quiser
 * 
 */

const express = require('express')
/**
 * isto equivale ao import do java.
 * os pacotes podem ser entendidos tbm como se fossem bibliotecas
 */
const cors = require('cors')
const faker = require('faker')

/** const bodyParser = require('body-parser')
* bodyParser passa um formulário????
* comando a aula que não foi para minha turma
*/

const app = express()
const bodyParser = require ('body-parser')
/**
 * inicia uma aplicação
 * o express é um middleware ele cria um meio de campo para gerenciar as requisições que vão chegar no servidor.
 * 
 */


const port = 3000
const hostname = 'localhost'

/** app.use(express.json())
 * não entendi bem, pegar informações do postman??
 * comando a aula que não foi para minha turma
 */

var vetorPessoa = []



app.use(cors())
/**
 * cors é para que não haja nenhum problema de requisição
 * tem como usar o cors para limitar o acesso a api
 */

/**
 * CRUD 
 * Create = post
 * Read = get
 * Update = patch
 * Delete = exclude 
 */

 app.use(express.json())
app.get('/', (req, res) => {
    //app.get é usado para receber requisições no servidor
    //método get é para fazer o READ
    //verbo universal que todo navegador usa para qualquer consulta
    //essa requisição recebe 2 parâmetros 

    // '/' significa que ele vai responder com o que se encontra na "raiz" do servidor

    //=> lambda, pesquisar melhor depois

    //res = response / resposta
    //req = request / pedido

    /**
     * console.log ('acessei o caminho / com o verbo GET')
     * esse comando exibe no console a msg acima
     * 
     * res.end(JSON.stringify({
     *      message: "Acessando o / com verbo GET"
     * }))
     * esse comando chama a "variável?Objeto?" res
     * "end" não faço ideia pesquisar sobre.
     * "JSON" também não faço ideia pesquisar sobre.
     * "stringify" = suponho que seja um método que transforma em string.
     * "message:" = suposição de marca como msg. Pesquisar.
     */

    res.setHeader('Content-Type', 'application/json')
    /**
     * isso seta o header da pagina na resposta 
     * informa que o Content-Type é application/json
     * aqui vc informa o tipo de documento que vai ser entregue
     * pode ser colocar um "text/html" para que retorne um html
     * 
     */

    if (vetorPessoa == "") {
        for (let i = 0; i < 10; i++) {
            vetorPessoa.push(gerarPessoaAleatória())
        }
    }
    //se o vetor pessoa estiver vazio ele gera 10 pessoas aleatórias
    
    /**
     * gera 10 pessoas aleatórias e armazena em vetor pessoa
     */
    res.end(JSON.stringify(vetorPessoa))
    /**
     * res.end('hello world')
     * primeira forma
     * quando receber um get na raiz a resposta seria o olá mundo para o navegador
     * res.end(JSON.stringify(gerarPessoaAleatória()))
     * segunda forma
     * exibia uma página html com uma pessoa gerada ao entrar no endereço do servidor
     * vc pode retornar uma página html inteira também, usando a template string.
     * 
     */
})

app.post('/', (req, resp) => {
    
    console.log(JSON.stringify(req.body))
    let pessoa = req.body
    console.log(pessoa)
    
    vetorPessoa.push (pessoa)
    
    /**
    * não funciona no navegador
    * é utilizado para CREAT
    * 
    * console.log(req.body)
    * response.end(JSON.stringify(request.body))
    * exibe as informações no postman
    */
   
})

app.delete('/', (req, resp) => {
    /**
    * é utilizado para EXCLUDE
    */

})

app.patch('/', (req, resp) => {
    /**
    * é utilizado para UPDATE
    */

})

app.listen(port, hostname, () => {
    /**
    * escutar?? toda vez?? criado junto do olá mundo.
    * estucar uma porta um hostname e executar uma função ???? 
    * toda vez que isso???? executar corretamente executa o comando do console abaixo.
    */
    console.log(`servidor rodando no endereço http://${hostname}:${port}`)
    /**
     * a crase possibilita concatenar string com variável usando ${variável}
     * o nome é template string 
     * aceita pular linha
     * considerado mais elegante
     * virou padrão 2017
     */
})

const gerarPessoaAleatória = () => {
    /**
     * método usando o faker para gerar pessoa aleatória em posições aleatórias
     */
    return {
        /**
         * retorna um objeto.
         * sem maiores informações sobre.
         * pelo visto não é necessário usar o var/const/let
         */
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        position: {
            /**
             * é um objeto dentro de um objeto.
             */
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        }
    }
}