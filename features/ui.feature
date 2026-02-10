Feature: Interfaz de Usuario y Checkout
  Como usuario interesado en servicios legales
  Quiero navegar por la landing y completar el checkout
  Para adquirir un servicio de Incorporation o Tax

  @UI @HU1 @HU2
  Scenario: Carga de landing y selección de producto
    Given que el usuario navega a la landing principal
    Then debe visualizarse el título "Incorporation, Tax & Bookkeeping"
    When el usuario selecciona el servicio de "LLC Incorporation"
    And el precio mostrado debe ser "$500"

  @Functional @HU3 @Negative
  Scenario: Validaciones de seguridad en el formulario
    Given que el usuario está en la sección de checkout
    When el usuario intenta finalizar la compra sin ingresar su email
    Then el sistema debe mostrar un mensaje de error "El email es obligatorio"
    When el usuario ingresa un formato de email inválido "usuario@test"
    Then el sistema debe mostrar un mensaje de error "Email inválido"