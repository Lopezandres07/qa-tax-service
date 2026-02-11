import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  private inputEmail = this.page.locator('[data-testid="input-email"]')
  private inputCard = this.page.locator('[data-testid="input-card"]')
  private inputExpiry = this.page.locator('[data-testid="input-expiry"]')
  private inputCVC = this.page.locator('[data-testid="input-cvc"]')
  private inputName = this.page.locator('[data-testid="input-name"]')
  private btnFinish = this.page.locator('[data-testid="btn-finish-purchase"]')
  private labelTotalPrice = this.page.locator('[data-testid="total-price"]')
  private alertError = this.page.locator('[data-testid="error-message"]')

  // Getters para que el Step pueda hacer los expects
  get precioTotal() {
    return this.labelTotalPrice
  }
  get mensajeError() {
    return this.alertError
  }
  get campoEmail() {
    return this.inputEmail
  }

  async llenarFormulario(datos: any) {
    if (datos.email) await this.inputEmail.fill(datos.email)
    if (datos.card_number) await this.inputCard.fill(datos.card_number)
    if (datos.expiry) await this.inputExpiry.fill(datos.expiry)
    if (datos.cvc) await this.inputCVC.fill(datos.cvc)
    if (datos.name) await this.inputName.fill(datos.name)
  }

  async finalizarCompra() {
    await this.btnFinish.click()
  }
}
