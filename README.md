# Austrian VAT Calculator

Austrian VAT Calculator is an app to calculate regular (20%) or reduced (13% or 10%) Value Added Tax in Austria. It can also be used as a reverse VAT calculator as it is possible to easily calculate prices with VAT included and excluded.

# Decisions

As I chose to use the `ng2-currency-mask` library (https://github.com/cesarrew/ng2-currency-mask) in this project, this library does not accept non-numeric values as input. So I didn't do a specific validation if a non-numeric value was entered.

# Angular Version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Running

- for run application asap you can use docker-run, as the images have already been built and uploaded to docker hub:

```shell
    docker run -p 80:80 -d --name vat-calculator anatank/vat-calculator:latest
```

```shell
    http://localhost
```

- or you can use npm:

```shell
    npm install
```

```shell
    npm start
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running UI test automation with Cypress

Run `npm run cypress:open` to execute the unit tests via [Cypress](https://www.cypress.io/cypress).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
