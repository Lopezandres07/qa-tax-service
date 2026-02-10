import { Given, When, Then } from '@cucumber/cucumber'
import { EcommercePage } from '../pages/EcommercePage'

Given('que el usuario navega a la landing principal', async function () {
  await this.page.goto('/')
})

When(
  'el usuario selecciona el servicio de {string}',
  async function (servicio) {
    const page = new EcommercePage(this.page)
    await page.validarLanding()
    // lógica de selección...
  },
)
