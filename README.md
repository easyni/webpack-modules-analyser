# README

[![CircleCI](https://circleci.com/gh/easyni/test-automate-jest-enzyme/tree/master.svg?style=svg)](https://circleci.com/gh/easyni/test-automate-jest-enzyme/tree/master)

## Basic install & use
### node version 8

this project have the objective to analyse the webpack statistics and extract the usage of modules

### HOW TO USE

just install npx globaly

 
```bash 

npm install -g npx

```

export your webpack json stats file: 
 
```bash ./src/Wynd/CustomerDisplayBundle/Resources/public/js/customerDisplay.view.js

webpack --json > stats.json

```


and launch: 
 
```bash 

npx git+https://github.com/easyni/webpack-modules-analyser.git

```
