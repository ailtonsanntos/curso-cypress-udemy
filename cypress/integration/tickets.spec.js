
describe('Tickets', () => {
    beforeEach(() => {
        cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html")
    });

    it('Preencher os campos de texto', () => {
        const firstName = "Ailton"
        const lastName = "Santos"

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName)
        cy.get("#email").type("teste@teste.com")
        cy.get("#requests").type("Outros")
        cy.get("#signature").type(`${firstName} ${lastName}`)
    });

    it('Selecionar o ticket select', () => {
        cy.get("#ticket-quantity").select("2")
    });

    it('Selecionar vip ticket type', () => {
        cy.get("#vip").check()
    });

    it('Seleciona um checkbox soialmedia', () => {
        cy.get("#social-media").check()
        
    });

    it('Seleciona friend, publication e desmarcar o friend', () => {
        cy.get("#friend").check()
        cy.get("#publication").check()
        cy.get("#friend").uncheck()
    });

    it("has 'TICKETBOX' header`s heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it('Alerta de email inválido', () => {
        cy.get("#email")
        .as("email")
        .type("ailtonteste.com")

        cy.get("#email.invalid").should("exist")

        cy.get("@email")
        .clear()
        .type("teste@teste.com")

        cy.get("#email.invalid").should("not.exist")
    });

    it('Preencher o formulário e depois resetar', () => {
        const firstName = "Ailton"
        const lastName = "Santos"
        const fullName = `${firstName} ${lastName}`

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName)
        cy.get("#email").type("teste@teste.com")

        cy.get("#ticket-quantity").select("2")
        cy.get("#vip").check()
        cy.get("#friend").check()

        cy.get("#requests").type("Vinhos")

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`)

        cy.get("#agree").click()
        cy.get("#signature").type(fullName)

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled")

        cy.get("button[type='reset']").click()
        
        cy.get("@submitButton").should("be.disabled")

    });

    it('Preenche os campos obrigatorios e verifica se os botoõs estão habilitados ou desabilitados', () => {
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joao@teste.com"
        }

        cy.fillMandatoryFilds(customer)

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled")

        cy.get("#agree").uncheck()
        cy.get("@submitButton").should("be.disabled")
    


    });

   
    
});