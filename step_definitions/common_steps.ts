import { Given } from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage'
import type { CustomWorld } from '../support/world'

Given(
  'que el usuario navega a la landing principal con {string}',
  async function (this: CustomWorld, query) {
    await this.page!.goto(`https://tu-ecommerce-demo.com/${query}`)
  },
)

Given(
  'los datos de tráfico se almacenan correctamente en el sistema',
  async function (this: CustomWorld) {
    const basePage = new BasePage(this.page!)
    await basePage.validarTracking('g_123', 'f_456')
  },
)
