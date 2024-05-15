import cadastro from '../../../../support/pages/cadastro'
import {faker} from '@faker-js/faker/locale/pt_BR'
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const infosCadastro = {
    nome: faker.name.firstName(),
    sobrenome: faker.name.lastName()
  }

Given("que eu acesse o site", () => {
	cy.visit('https://automationexercise.com');
});

Given("Que eu clique no botao cadastrar", () => {
	cadastro.clicarBotaoSignUp();
});

When("Eu inserir um novo usuario valido", () => {
	cadastro.criarUsuario(infosCadastro.nome);
    cadastro.preencherFormularioUsuario();
    cadastro.preencherFormularioEndereco(infosCadastro.nome, infosCadastro.sobrenome);
    cadastro.clicarCreateAccount();
    
});

Then("Devera aparecer uma mensagem de cadastro realizado", () => {
	cy.get('b').should('have.text', infosCadastro.nome);
    cy.request({
      method: "GET",
      url: `https://automationexercise.com/api/getUserDetailByEmail?email=${infosCadastro.nome}@gmail.com`
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
    })
});

