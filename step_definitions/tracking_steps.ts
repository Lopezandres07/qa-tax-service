import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { TrackingHelper } from '../helpers/TrackingHelper'

const tracker = new TrackingHelper()

Then('el email del usuario debe viajar hasheado en SHA256', async function () {
  const hashRecibido = this.lastMetaPayload.user_data.em //
  const hashEsperado = TrackingHelper.generarHashSHA256(this.userEmail)
  expect(hashRecibido).toBe(hashEsperado)
})
