------------------------ DESCRIÇÃO DO PROJETO -----------------------

W16 Warker App - Frontend

Desenvolvedor
Olá! Muito obrigado por participar da avalição técnica para integrar a equipe de desenvolvimento da W16.

Criamos esta avaliação para avaliar seu conhecimento em lógica de programação, capacidade de investigar e conhecer novas ferramentas, organização e qualidade de código e especialmente, sua criatividade.

Especificação
No mundo pós-apocaliptico de 2021, o combustível tem um valor inestimável. Gangues bárbaras lutam até a morte pelo controle desse valioso recurso e a W16 está desenvolvendo o aplicativo WARKER, que é a última esperança da humanidade em trazer um pouco de paz e ordem à esse mundo devastado. Esse aplicativo é feito em React Native e deve consumir uma API REST que indica os postos de gasolina das diversas cidades, sua localização e o nível dos seus reservatórios. Lembre-se de que não há mais lei e a sua vida depende do sucesso desse app. Marcopoc não fica feliz quando o seu app falha devido a erros do frontend (ou do backend) e você não quer deixar o Marcopoc irritado...

Regras
- Faça bom uso dos recursos Material Bread, React Navigation, Formik, Yup, Context API
- D.R.Y. = "Don't Repeat Yourself"
- Mantenha o código limpo e organizado
- Utilize comentários pois alguém irá ler o seu código. Nosso último dev esqueceu um comentário importante. RIP :(
- Utilize o README.md do seu projeto para explicar instalação, funcionamento, o processo que usou para o desenvolvimento ou implorar por misericórdia.

Funcionalidades
- Mapa
- Listagem
- Busca/filtro
- Estou com sede (indicar posto mais próximo)

Importante
- Use Expo
- Use Expo
- Use Expo
- Já mencionei que precisa buildar com Expo?
- O app precisa ser bonito :)

Pontos Extras
- Autenticação
- Firebase/Amplify
- Teste automatizado
- Typescript

Exemplo de entidades retornadas pela API:

Cidades
|id |nome_da_cidade|created_at|updated_at|
|int|string        |timestamp |timestamp |

Postos
|id |cidade_id|reservatorio|latitude|longitude|created_at|updated_at|
|int|int(fk)  |int(1-100%) |double  |double   |timestamp |timestamp |

*Endpoint
/api/cidade/id

{
    id : id,
    cidade : nome_da_cidade,
    postos : {
        id : id,
        reservatorio : reservatorio,
        coords : {
            latitude : latitude,
            longitude : longitude
        },
        updated_at : updated_at
    }
}

*Endpoint
/api/posto/id

{
    id : id,
    reservatorio : reservatorio,
    coords : {
        latitude : latitude,
        longitude : longitude
    },
    updated_at : updated_at
}

------------------ CONFIGURAÇÕES PARA RODAR O PROJETO ----------------


Antes de tudo baixe o projeto, coloque-o dentro de onde se executa o localhost e já rode o seu apache para que o localhost funcione.

Chame o terminal de comando na pasta onde é possivel ver o projeto 

Instale o expo como sendo um comando global:
(se já instalou isso desconsidere)
npm install --global expo-cli

Agora entre na pasta do projeto via terminal e execute:
npm install
Dessa forma será baixado as dependências do projeto.

Agora entre na pasta do projeto e de o comando:
expo start
Com esse comando, o projeto irá rodar.

Abra no navegador a URL que o expo está falando que rodou o DevTools, ex:
http://localhost:19002

No navegador escolha onde você quer rodar o projeto em algum simulador de celular ou no seu próprio celular.

Para rodar em seu próprio celular você deve instalar o Expo App e escanear o QRCode que aparece, dessa forma o código passara a rodar em seu celular de forma sincronizada.

OBS: Se você tentar rodar pela web, irá dar problema, pois o aplicativo foi feito para celular, usando recurso nativo do próprio celular(mapa). 