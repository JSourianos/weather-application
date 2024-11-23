# Code Challenge

## How to run the project

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app (Application is compatible with Expo Go on both iOS and Android)

   ```bash
    npx expo start
   ```
   
3. Having problems? Try clear the cache.
   ```bash
    npx expo start -c
   ```



## Project structure
* `src/app` contains the routing and layout configuration for the app, based on Expo's File Based Routing. The screens are defined separately in the `src/screens` folder, to avoid clutter in the `app` folder, and make integration testing easier.

* ``src/components`` contains the shared components used in the app.
* `src/screens` contains the screens of the app.
* `src/utils` contains utility functions used in the app.
* `src/assets` contains the images and other assets used in the app.
* `src/contenxts` contains the context providers used in the app, and their respective hooks.
* `src/hooks` contains the custom hooks used in the app.

## Key Packages
* `dayjs` is used for date and time manipulation.
* `lucide-react-native` is used for icons.
* `nativewind` is used for styling.
* `expo-location` is used for location services.

## Icons
**IMPORTANT:** You have to export the icons from lib/icons using the wrapper function in order for NativeWind to be able to apply classnames.

* We use the `lucide-react-native` package for icons. You can find the icons and their names [here](https://lucide.dev/). 

## ESLint and Prettier
* ESLint and Prettier are used to maintain code quality and consistency, as well as for static analysis.

## Testing

### Test code can be found under ``__tests__`` folder in the root directory.
### Mocks can be found under ``__mocks__`` folder in the root directory.

* Jest and React Testing Library are used for testing.
* Commands for running tests:
* Relevant commands:
* `npm run test` - Run all tests
* `npm run test:watch` - Run all tests in watch mode
* `npm run test:coverage` - Run all tests and generate coverage report


## Future Development:
* CI/CD pipeline
* React Query
* Higher Test Coverage
* Timezone support
