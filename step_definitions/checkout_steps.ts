import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CheckoutPage } from '../pages/CheckoutPage'

Then(
  'el precio total a pagar {string} sea igual al servicio solicitado',
  async function (precioEsperado) {
    const checkout = new CheckoutPage(this.page)
    await expect(checkout.precioTotal).toHaveText(precioEsperado)
  },
)

When(
  'el usuario rellena el formulario con los siguientes datos:',
  async function (dataTable) {
    const checkout = new CheckoutPage(this.page)
    // .hashes() convierte la tabla en un array de objetos: [{email: '...', card_number: '...'}]
    const datos = dataTable.hashes()[0]
    await checkout.llenarFormulario(datos)
  },
)

When('hace click en el botón "Finalizar compra"', async function () {
  const checkout = new CheckoutPage(this.page)
  await checkout.finalizarCompra()
})

Then(
  'el sistema debe procesar el pago y enviar los IDs {string} y {string} al servidor',
  async function (gclid, fbclid) {
    // Aquí, como QA, podrías interceptar la llamada de red (API)
    // Por ahora, validamos que los IDs sigan presentes en el estado local antes de la redirección final
    const checkout = new CheckoutPage(this.page)
    await checkout.validarTracking(gclid, fbclid)
  },
)

Then('el usuario es redirigido a la página de pago exitoso', async function () {
  await expect(this.page).toHaveURL(/.*success/)
})

// STEPS PARA ESCENARIOS NEGATIVOS

When(
  'el usuario rellena el formulario con un email con formato incorrecto {string}',
  async function (emailInvalido) {
    const checkout = new CheckoutPage(this.page)
    await checkout.llenarFormulario({ email: emailInvalido })
  },
)

Then(
  'el sistema debe mostrar un mensaje de alerta {string}',
  async function (mensajeEsperado) {
    const checkout = new CheckoutPage(this.page)
    await expect(checkout.mensajeError).toBeVisible()
    await expect(checkout.mensajeError).toHaveText(mensajeEsperado)
  },
)

Then('no debe permitir el progreso a la página de éxito', async function () {
  await expect(this.page).not.toHaveURL(/.*success/)
})

When(
  'el usuario deja todos los campos del formulario en blanco',
  async function () {
    const checkout = new CheckoutPage(this.page)
    // No hacemos nada, para que queden vacíos
  },
)

Then(
  'el sistema debe resaltar los campos obligatorios en rojo',
  async function () {
    const checkout = new CheckoutPage(this.page)
    // Ejemplo: Validar que el input de email tenga una clase CSS de error o atributo aria-invalid
    await expect(checkout.campoEmail).toHaveAttribute('aria-invalid', 'true')
  },
)
