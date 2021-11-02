# Uber Eats clone

-   Based on project by Qazi
-   https://www.youtube.com/watch?v=jmvbhuJXFow
-   https://github.com/CleverProgrammers/LIVE-uber-eats-clone-youtube

# Live site published on Netlify

https://musing-minsky-5247a3.netlify.app/

# Notes

-   This is a **public** copy of a private repo. I had to make it private to hide my API keys as there does not appear to be an easy way to do this in React Native. (putting in .env file doesnt work)

-   I wanted to do this project to get my feet wet with React Native. I really enjoyed it.

-   This is a React Native app designed for iOS but deployed as a website. Therefore, the display and smoothness will not be the best as React Native is designed for iOS and Android, not for web.
-   LotteView animations (Checkout screen) dont work on web
-   Swiping between screens does not work on web
-   Still not bad for publishing on web

# Things I added

-   Clickable 'favorite' heart on restaurant turns pink on click
-   Bottom Button Bar on every page
-   Home button navigation
-   generate random wait / delivery time for each restaurant
-   on View Cart Screen, touch outside Cart Container hides the Cart Container, intuitive UX
-   other mobile styling - shadows, spacing, colors, etc.

## Tools Used

**npx create-react-native-app uber-clone**

-   Expo
-   React Native Vector Icons
    -   **npm install react-native-vector-icons**
-   React Native Google Places Autocomplete

    -   https://www.npmjs.com/package/react-native-google-places-autocomplete
    -   **npm install react-native-google-places-autocomplete**

-   Because the Yelp API does not support CORS at all, ALL static client-side front-end requests are denied - I used a private CORS proxy I've made for use on other projects for this problem

-   Google Places API is run out of **Google Cloud Console** not Firebase - https://console.cloud.google.com/

-   Page view Dividers
-   **npm install react-native-elements**
-   https://www.npmjs.com/package/react-native-elements

    -   note : react-native-elements@3.4.2 requires a peer of react-native-safe-area-context@^3.1.9 but none is installed. You must install peer dependencies yourself.

-   ## Navigation

    -   Good notes

        -   https://reactnative.dev/docs/navigation

    -   **npm install @react-navigation/native**
    -   **npm install @react-navigation/stack**
    -   **npm install --save react-native-gesture-handler react-native-reanimated react-native-screens**
        -   allows swipe back and forth between screens functionality

-   ### Dynamic select checkboxes to add food items to your order

    -   **npm install react-native-bouncy-checkbox**
    -   To avoid errors

        -   **npm install tslib**

-   ## Modal Screen

    -   **npm install reanimated-bottom-sheet**

-   ## Redux

    -   **npm install react-redux**
    -   Why are we using redux? To manage the Cart state for when users add or remove menu Items
    -   we need this state to process orders and send to Firebase

    -   ### Redux Store Diagram

        ![redux store diagram](https://raw.githubusercontent.com/kawgh1/public-uber-eats-clone/master/react-redux-hooks.png)

-   ## Firebase

    -   since this is React Native, cannot do npm install firebase
    -   must do **expo install firebase**
    -   firebase.js
        -   **import firebase from 'firebase/compat/app'**
        -   **import 'firebase/compat/firestore';**

-   ## Checkout Screen

    -   Lottie View
    -   **npm install lottie-react-native**
    -   Lottie doesn't work with react native web.
        you can check Platform before loading the LottieTag so you can still use both platforms

            import { Platform } from 'react-native'

            {Platform.OS != 'web' ?
            <LottieView ...
            : null }

-   # Deployment

    -   ## Deploying React Native web-only app (no iOS or Android) to Netlify

        -   https://blog.kripiz.com/setting-up-a-react-native-project-with-expo-206/

        -   have to make sure expo-cli is installed
        -   **npm install expo-cli**

        -   run **expo build:web** in terminal
        -   on Netlify set Build command "expo build:web"
        -   set Publish directory: web-build

## Boiler Notes from Expo

#### 🚀 How to use

-   Install packages with `yarn` or `npm install`.
    -   If you have native iOS code run `npx pod-install`
-   Run `yarn start` to start the bundler.
-   Open the project in a React runtime to try it:
    -   iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
    -   Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
    -   Web: Any web browser

#### Adding Native Code

-   This project can be run from a web browser or the Expo client app. You may find that you want to add more native code later on. You can do this by ejecting the project and rebuilding it yourself.

-   Run `yarn eject` to create the native projects.
-   You can still run your project in the web browser or Expo client, you just won't be able to access any new native modules you add.

#### Publishing

-   Deploy the native app to the App store and Play store using this guide: [Deployment](https://docs.expo.dev/distribution/app-stores/).
-   Deploy the website using this guide: [Web deployment](https://docs.expo.dev/distribution/publishing-websites/).

#### 📝 Notes

-   Learn more about [Universal React](https://docs.expo.dev/).
-   See what API and components are [available in the React runtimes](https://docs.expo.dev/versions/latest/).
-   Find out more about developing apps and websites: [Guides](https://docs.expo.dev/guides/).
<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>
