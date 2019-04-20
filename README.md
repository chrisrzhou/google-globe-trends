# 🌎 Google Globe Trends

Create beautiful and interactive Google Trends globe visualizations with ease.

## About

![image](./demo.gif)

`google-globe-trends` is a [JAMStack][jamstack] application that visualizes Google Trends on an interactive React + ThreeJS globe. Data is fetched during build time using the [`google-trends-api`][google-trends-api] library. Globe visualizations are rendered using the [`react-globe`][react-globe-github] component.

This project is inspired by the wonderful [#metoorising][metoorising] project. With most of interactive features supported by `react-globe`, the project aims to simplify building beautiful globe visualizations with Google Trends datasets.

## Deploy Instance

To deploy your personal Google Globe Trends instance, click on the Deploy to Netlify button below. You will be prompted to connect this instance to a Github repo. Follow through the steps and you should be able to view a working example with your own Netlify URL!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chrisrzhou/google-globe-trends)

After successfully deploying an instance with Netlify, it is simple to configure how the globe looks and behave, as well as use an entirely different trend dataset.

### Globe Visuals

To configure globe visuals (e.g. globe texture, glow color, zoom behaviors), you can edit the [`config.js`][config-file] file. Please visit the `react-globe` [docs][react-globe-docs] to learn how to configure these options.

### Data

If you would like to render the Google Trends of another keyword, simply change the `data.keyword` field of the[`config.js`][config-file] file.

[config-file]: ./src/config.js
[jamstack]: https://jamstack.org/
[google-trends-api]: https://www.npmjs.com/package/google-trends-api
[react-globe-github]: https://github.com/chrisrzhou/react-globe
[react-globe-docs]: https://react-globe.netlify.com/
[metoorising]: https://metoorising.withgoogle.com/
