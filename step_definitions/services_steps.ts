import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { LandingPage } from '../pages/LandingPage'

When('el usuario visualiza las opciones del menú', async function () {
  const landing = new LandingPage(this.page)
  await expect(landing.menuNavegacion).toBeVisible()
})

When(
  'el usuario hace click en la opción "Services" del menú',
  async function () {
    const landing = new LandingPage(this.page)
    await landing.clickEnServices()
  },
)

Then(
  'se deben visualizar los detalles de {string}, {string} y {string}',
  async function (s1, s2, s3) {
    const landing = new LandingPage(this.page)
    const servicios = [s1, s2, s3]

    for (const nombre of servicios) {
      const card = landing.obtenerCardServicio(nombre)
      await expect(card).toBeVisible()
    }
  },
)

Then(
  'no se visualizan los servicios {string}, {string} y {string}',
  async function (s1, s2, s3) {
    const landing = new LandingPage(this.page)
    const servicios = [s1, s2, s3]

    for (const nombre of servicios) {
      const card = landing.obtenerCardServicio(nombre)
      await expect(card).not.toBeVisible()
    }
  },
)
