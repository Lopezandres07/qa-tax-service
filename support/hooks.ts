import { Before, After, Status, BeforeAll, AfterAll } from '@cucumber/cucumber'
import { chromium, Browser, Page, BrowserContext } from '@playwright/test'

let browser: Browser

BeforeAll(async function () {
  // Se ejecuta una sola vez al iniciar toda la suite
  browser = await chromium.launch({ headless: true })
})

Before(async function () {
  // Crea un contexto limpio para cada escenario (limpia cookies/cache)
  this.context = await browser.newContext()
  this.page = await this.context.newPage()
})

After(async function (scenario) {
  // Lógica de Soporte: Si el test falla, adjuntamos evidencia al reporte
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot()
    this.attach(screenshot, 'image/png')
  }

  // Cerramos para liberar memoria
  await this.page.close()
  await this.context.close()
})

AfterAll(async function () {
  await browser.close()
})
