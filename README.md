# Price Alert App
This app is used to sign up for price drop tracking of items on Amazon.com.
The app notifies users through email when the price of an item has dropped to or below the target price.
It can also be used as one stop place to check for the current price of each item on the price tracking list.

# App is published at https://dagmawig.github.io/price-alert/

## Server side
Server side code is located at https://glitch.com/edit/#!/price-drop-alert

### Services and Functions Used
I used firebase authentication to verify user email and authenticate using email and password.
I used axios method to make https request to server side
I used MongoDB to store user data.
I used glitch.com to host server code.
I used Redux Toolkit to manage global app state.
I used useState hook to manage local app state.
I used puppeteer to capture item price from Amazon website.