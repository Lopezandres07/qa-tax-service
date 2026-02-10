Feature: Integración S2S y Tracking de Conversión
  Background:
    Given un usuario accede con parámetros "?gclid=g_123&fbclid=f_456"

  @Integration @S2S @HU4 @HU7
  Scenario: Flujo de venta exitoso y persistencia en Base de Datos
    When completa el pago exitosamente en Stripe
    Then el backend debe crear una orden en estado "Pending"
    And se debe registrar la atribución vinculando el ID "g_123"
    When el servidor recibe el webhook "checkout.session.completed"
    Then la orden en DB debe cambiar a estado "Paid"
    And se debe crear un trato en Pipedrive con estado "Venta creada"

  @Tracking @HU5 @HU6
  Scenario: Reporte de Conversión y Hash de Seguridad
    Given que una orden ha sido marcada como "Paid"
    Then el servidor debe enviar el evento "Purchase" a las APIs de Ads
    And el email del usuario debe viajar hasheado en SHA256
    And el campo "ConversionSent" debe estar en "true"