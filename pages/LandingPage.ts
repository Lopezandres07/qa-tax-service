import { BasePage } from './BasePage'

export class LandingPage extends BasePage {
  private navMenu = this.page.locator('[data-testid="main-nav"]')
  private btnServices = this.page.locator('[data-testid="nav-services"]')
  private planesSection = this.page.locator('[data-testid="pricing-section"]')
  private priceErrorMessage = this.page.locator('[data-testid="price-error"]')

  get menuNavegacion() {
    return this.navMenu
  }

  async clickEnServices() {
    await this.btnServices.click()
  }

  obtenerCardServicio(nombreServicio: string) {
    return this.page.locator(
      `[data-testid="service-card"]:has-text("${nombreServicio}")`,
    )
  }

  get seccionPlanes() {
    return this.planesSection
  }

  obtenerPrecioPlan(monto: string) {
    return this.page.locator(
      `[data-testid="price-amount"]:has-text("${monto}")`,
    )
  }

  async clickEnStartNow(precio: string) {
    const boton = this.page.locator(
      `[data-testid="plan-card"]:has-text("${precio}") >> [data-testid="btn-start"]`,
    )
    await boton.click()
  }

  get mensajeErrorPrecio() {
    return this.priceErrorMessage
  }
}
