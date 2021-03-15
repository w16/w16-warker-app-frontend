# W16 Warker App - Frontend

## Desenvolvedor

Olá! Muito obrigado por participar da avalição técnica para integrar a equipe de desenvolvimento da W16.

Criamos esta avaliação para avaliar seu conhecimento em lógica de programação, capacidade de investigar e conhecer novas ferramentas, organização e qualidade de código e especialmente, sua criatividade.

## Especificação
No mundo pós-apocaliptico de 2021, o combustível tem um valor inestimável. Gangues bárbaras lutam até a morte pelo controle desse valioso recurso e a W16 está desenvolvendo o aplicativo WARKER, que é a última esperança da humanidade em trazer um pouco de paz e ordem à esse mundo devastado.
Esse aplicativo deve consumir uma API REST que indica os postos de gasolina das diversas cidades, sua localização e o nível dos seus reservatórios. Lembre-se de que não há mais lei e a sua vida depende do sucesso desse app. Marcopoc não fica feliz quando o seu app falha devido a erros do frontend (ou do backend) e você não quer deixar o Marcopoc irritado...

## Regras
- Não há regras, não há lei, apenas a sobrevivência importa! 

## Recomendações
- Faça bom uso dos recursos Material Bread, React Navigation, Formik, Yup, Context API
- D.R.Y. = "Don't Repeat Yourself"
- Mantenha o código limpo e organizado
- Utilize comentários pois alguém irá ler o seu código. Nosso último dev esqueceu um comentário importante. RIP :(
- Utilize o README.md do seu projeto para explicar instalação, funcionamento, o processo que usou para o desenvolvimento ou implorar por misericórdia.

# Funcionalidades
- Mapa
- Listagem
- Busca/filtro
- Estou com sede (indicar posto mais próximo)

## Importante
- Use Expo
- Use Expo
- Use Expo
- Já mencionei que precisa buildar com Expo?
- O app precisa seguir este layout ==> [Layout](https://www.figma.com/file/22YXdBw0fOcOcWeK4DZTs1/W16-Warker-App-Frontend?node-id=0%3A1)

## Pontos Extras
Pode contar pontos extras
- Autenticação
- Firebase/Amplify
- Teste automatizado
- Typescript

### Exemplo de entidades retornadas pela API:

Cidades
```
|id |nome_da_cidade|created_at|updated_at|
|int|string        |timestamp |timestamp |
```

Postos
```
|id |cidade_id|reservatorio|latitude|longitude|created_at|updated_at|
|int|int(fk)  |int(1-100%) |double  |double   |timestamp |timestamp |
```

### Endpoints
- Forneceremos os endpoints no seguinte link ==> [Backend](https://warker-api.herokuapp.com)
- Você pode verificar a lista de Endpoints nesta [Collection](https://www.getpostman.com/collections/49738c9f93ceaa92aded) pelo Postman.

Credenciais de Acesso:
    Login: marco@w16.com.br
    Senha: w16front
    
/api/login
```
{
    email:email,
    password:password
}
```

/api/cidade/id
```
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
```

/api/posto/id
```
{
    id : id,
    reservatorio : reservatorio,
    coords : {
        latitude : latitude,
        longitude : longitude
    },
    updated_at : updated_at
}
```

## Entrega
Crie um FORK deste repositório e faça um Pull-Request. Commite no repositório todo o código do backend, juntamente com instruções, se necessário. O prazo para entrega será de 7 horas - ou melhor, 7 dias.

Qualquer dúvida, crie um issue neste projeto ou entre em contato com o nosso time pelo instagram: @w16.softwarehouse

2 DEVS ENTRAM, 1 DEV SAI!
