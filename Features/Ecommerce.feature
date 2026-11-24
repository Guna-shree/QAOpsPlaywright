Feature: Ecommerce validations

  Scenario: Placing the Order
  Given login to Ecommerce application with "gunashreel@gmail.com" and "Gunashree@2003"
    When Add "iphone 13 pro" to cart
    Then Verify "iphone 13 pro" is displayed in the cart  
    When Enter valid details and place the Order
    Then verify order is present in the orderHistory