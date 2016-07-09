## School GPA calculator + domino

This is a test task for AngularJS developer.

## Demo

To see demo in your browser, please follow to:

[Demo](https://gazhala-gpa-calc.firebaseapp.com)


## Local installation

To run the app locally, you need to compile package files with Webpack. The source code is in the `frontend` directory. In the end of packaging, Webpack adds resulted `bundle.js`, `styles.css` and the source-maps to the `public` directory.

At first, ensure you are running `Node (v4.1.x+)` and `NPM (2.15.x+)`.

Next:

1. Clone this repository: https://github.com/yGazhala/gpa-calc.git

2. Navigate to the project directory and run: `npm install`, wait until all dependencies will be installed.

3. To compile package files and run the local dev-server, execute: `npm start`.

4. Open in your browser: `http://localhost:8080`.

When the dev-server runs, it tracks all changes in the source code (`frontend` directory) and updates the results in the browser.

You can also make the package files without running the dev-server:
- `npm run build` - makes compressed files and adds them to the `public` directory.
- `npm run dev-build` - makes uncompressed files.

## Architecture and the file system

The app consists of 4 modules, each of them also includes separate components. Each module directory includes `index.js` file, that initializes angular-module and angular-entities (components, services etc.). The original entities were written in JavaScript objects and functions and were imported to the `index.js`.

- `shared` module describes the page layout and includes common components that are used by different modules of the app. These components are "layout", "main-nav" etc.

- `gpa-calculator` module provides the implementation of the gpa-calculator.

- `domino` module provides the implementation of the domino.

- `core` module joins all modules to one application, it is also the program entry point.

### CSS stylesheet structure

The source code was written in SASS and was compiled to the single `styles.css` file.

Organization of stylesheets is similar to the structuring of the JavaScript code. The styles were divided into modules and components, thus each component corresponds its styles.

The general structure is:
```
base
	- base.scss
	- reset.scss
modules
	- domino
	- gpa-calculator
		// components
		- gpa-calc.scss
		- grade.scss
	- shared
utils
	- mixins.scss
	- variables.scss
core.scss
```

There are two extra modules:
- `base` module describes setting of browser styles and common base styles, as a font-family and font-size.
- `utils` module includes all global variables and mixins, that are used by all classes. This allows changing common styles for the entire app easily.

To arrange "namespaces" - prefixes are added to names of CSS classes. Each prefix - is the name of the corresponding component.
For example, `.grade_removeStudentButton` class refers to the remove student button in the `grade` component.