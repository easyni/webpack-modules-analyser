# README

[![CircleCI](https://circleci.com/gh/easyni/webpack-modules-analyser.svg?style=svg)](https://circleci.com/gh/easyni/webpack-modules-analyser)

## Webpack modules analyser

this project have the objective to analyse the webpack statistics and extract the usage of modules

![dashboard](https://github.com/easyni/webpack-modules-analyser/blob/master/README/dashboard.jpg)

## Basic install & use
### node version: 8

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

To ignore some patterns 

```bash 

npx git+https://github.com/easyni/webpack-modules-analyser.git --ignore node_modules,foo

```
