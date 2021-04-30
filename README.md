# fiap-microservices-serverless

## Pré requisitos 

AWS SAM CLI
> https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

AWS CLI
> https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-chap-install.html

> https://docs.aws.amazon.com/pt_br/rekognition/latest/dg/setup-awscli-sdk.html


## Setup do projeto

```bash 
# Instalar pacotes npm

$ npm install 

# Fazer deploy do projeto na amazon para criação dos recursos
$ sam deploy --guided 

# responser com [y] (yes) para todas as opções do prompt.


# Rodar o projeto localmente

$ sam local start-api 

```

## Testes Postman 

> https://www.postman.com/downloads/

> Após iniciar o projeto localmente (sam local start-api), importar a coleção (Fiap Serverless.postman_collection.json) do postman disponível no diretório *exemplos* do projeto e utilizar para executar as requisições.
