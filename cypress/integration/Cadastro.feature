Feature: Cadastro
      

@PaginaCadastro
    Scenario: Cadastrar um novo usuário no sistema
        Given que eu acesse o site
        Given Que eu clique no botao cadastrar
        When Eu inserir um novo usuario valido
        Then Devera aparecer uma mensagem de cadastro realizado