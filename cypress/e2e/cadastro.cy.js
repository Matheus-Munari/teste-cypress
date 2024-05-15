import cadastro from '../support/pages/cadastro'
import {faker} from '@faker-js/faker/locale/en_US'

describe('funcionalidades de cadastro', () => { // Especificação da funcionalidade a ser testada
  beforeEach(() => {
    cy.visit('https://automationexercise.com'); // Visita a página inicial da aplicação utilizando a API do Cypress com o alias "cy"
  });

  const infosCadastro = {
    nome: faker.name.firstName(),
    sobrenome: faker.name.lastName(),
    numAleatorio: Math.floor(Math.random() * 100 + 1)
  }

  it('cadastrar um novo usuário', () => { // Descrição do cenário de teste
    // Código aqui
    cadastro.clicarBotaoSignUp();
    cadastro.criarUsuario(infosCadastro.nome, infosCadastro.sobrenome, infosCadastro.numAleatorio);
    cadastro.preencherFormularioUsuario();
    cadastro.preencherFormularioEndereco(infosCadastro.nome, infosCadastro.sobrenome);
    cadastro.clicarCreateAccount();
    cy.get('b').should('have.text', infosCadastro.nome);
    cy.request({
      method: "GET",
      url: `https://automationexercise.com/api/getUserDetailByEmail?email=${infosCadastro.nome}@gmail.com`
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
    })
  });

  it('cadastrar um usuário já existente', () => { // Descrição do cenário de teste
    // Código aqui
    cadastro.clicarBotaoSignUp();
    cadastro.criarUsuario(infosCadastro.nome, infosCadastro.sobrenome, infosCadastro.numAleatorio);
    cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!');
    cy.request({
      method: "GET",
      url: `https://automationexercise.com/api/getUserDetailByEmail?email=${infosCadastro.nome}${infosCadastro.sobrenome}${infosCadastro.numAleatorio}@gmail.com`
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
    })
    
  });

  it('tentar cadastrar um usuário sem informar uma senha', () => { // Descrição do cenário de teste
    // Código aqui
    cadastro.clicarBotaoSignUp();
    infosCadastro.nome = faker.name.firstName();
    infosCadastro.sobrenome = faker.name.lastName();
    cadastro.criarUsuario(infosCadastro.nome, infosCadastro.sobrenome, infosCadastro.numAleatorio);
    cadastro.preencherFormularioUsuario();
    cadastro.preencherFormularioEndereco(infosCadastro.nome, infosCadastro.sobrenome);
    cadastro.clicarCreateAccount();
    cy.request({
      method: "GET",
      url: `https://automationexercise.com/api/getUserDetailByEmail?email=${infosCadastro.nome}${infosCadastro.sobrenome}${infosCadastro.numAleatorio}@gmail.com`
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
    })
    
  });
});