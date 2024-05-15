import cadastro from '../pages/cadastro'
import {faker} from '@faker-js/faker'

const infosCadastro = {
    nome: faker.name.firstName()
  }

Given("Eu acesso o site automationexercize", () => {
    cadastro.acessarSite();
})

When("Eu inserir um novo usuario valido", () => {
    cadastro.criarUsuario(infosCadastro.nome);
})

