const elem = require('./elements').ELEMENTS;
import {faker} from '@faker-js/faker'

class cadastro{

    acessarSite(){
        cy.visit('https://automationexercise.com');
    }

    clicarBotaoSignUp(){
        cy.get(elem.botao_login).click();

    }

    criarUsuario(nome, sobrenome, num){

        cy.get(elem.input_nome).type(nome);
        cy.get(elem.input_email).type(nome + sobrenome + num + '@gmail.com');

        cy.get(elem.botao_cadastrar).click();
    }
    

    preencherFormularioUsuario(){
        cy.get(elem.checkbox_genero).click();
        cy.get(elem.input_senha).type("Senhateste123@")
        cy.get(elem.input_dia).select('6')
        cy.get(elem.input_mes).select('December')
        cy.get(elem.input_ano).select('1999')
    }

    preencherFormularioEndereco(nome, sobrenome){
        cy.get(elem.input_first_name).type(nome)
        cy.get(elem.input_last_name).type(sobrenome)
        cy.get(elem.input_company).type('V8 Tech')
        cy.get(elem.input_address).type('Rua Madeira, 70')
        cy.get(elem.input_pais).select('Australia')
        cy.get(elem.input_estado).type('São Paulo')
        cy.get(elem.input_cidade).type('São Paulo')
        cy.get(elem.input_cep).type('12345678')
        cy.get(elem.input_cel).type('11998764536')
    }

    clicarCreateAccount() {
        cy.get(elem.botao_criar_conta).click();
        cy.get(elem.botao_continuar).click();
    }





}

export default new cadastro();
