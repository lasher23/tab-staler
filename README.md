# Tab Staler

This is a Chrome extension to close tabs after a certain amount of time.
You can configure a given regex with a certain amount of time, after which the tab should be closed.
The Regex must follow the standard JS Regex requirements and the configured time is in milliseconds.

# Development

## Prerequisites

* [node 18 + npm](https://nodejs.org/)

## Includes the following

* TypeScript
* Webpack
* React

## Project Structure

* src: Source Code
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

## Load extension to chrome

Load `dist` directory
