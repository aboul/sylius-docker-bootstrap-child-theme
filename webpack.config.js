/* eslint-disable no-param-reassign */
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const Encore = require('@symfony/webpack-encore');
const WebpackBar = require('webpackbar');

const syliusBundles = path.resolve(__dirname, 'vendor/sylius/sylius/src/Sylius/Bundle/');
const uiBundleScripts = path.resolve(syliusBundles, 'UiBundle/Resources/private/js/');
const uiBundleResources = path.resolve(syliusBundles, 'UiBundle/Resources/private/');

// Shop config
Encore
  .setOutputPath('public/build/shop/')
  .setPublicPath('/build/shop')
  .addEntry('shop-entry', './vendor/sylius/sylius/src/Sylius/Bundle/ShopBundle/Resources/private/entry.js')
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new WebpackBar({
    name: 'shop',
    color: 'blue',
  }))
  .enableSassLoader();

const shopConfig = Encore.getWebpackConfig();

shopConfig.resolve.alias['sylius/ui'] = uiBundleScripts;
shopConfig.resolve.alias['sylius/ui-resources'] = uiBundleResources;
shopConfig.resolve.alias['sylius/bundle'] = syliusBundles;
shopConfig.name = 'shop';

Encore.reset();

// Admin config
Encore
  .setOutputPath('public/build/admin/')
  .setPublicPath('/build/admin')
  .addEntry('admin-entry', './vendor/sylius/sylius/src/Sylius/Bundle/AdminBundle/Resources/private/entry.js')
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new WebpackBar({
    name: 'admin',
    color: 'green',
  }))
  .enableSassLoader();

const adminConfig = Encore.getWebpackConfig();

adminConfig.resolve.alias['sylius/ui'] = uiBundleScripts;
adminConfig.resolve.alias['sylius/ui-resources'] = uiBundleResources;
adminConfig.resolve.alias['sylius/bundle'] = syliusBundles;
adminConfig.externals = { ...adminConfig.externals, window: 'window', document: 'document' };
adminConfig.name = 'admin';

Encore.reset();

// App shop config
Encore
  .setOutputPath('public/build/app/shop')
  .setPublicPath('/build/app/shop')
  .addEntry('app-shop-entry', './assets/shop/entry.js')
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new WebpackBar({
    name: 'app.shop',
    color: 'grey',
  }))
  .enableSassLoader();

const appShopConfig = Encore.getWebpackConfig();

appShopConfig.resolve.alias['sylius/ui'] = uiBundleScripts;
appShopConfig.resolve.alias['sylius/ui-resources'] = uiBundleResources;
appShopConfig.resolve.alias['sylius/bundle'] = syliusBundles;
appShopConfig.externals = { ...appShopConfig.externals, window: 'window', document: 'document' };
appShopConfig.name = 'app.shop';

Encore.reset();

// App admin config
Encore
  .setOutputPath('public/build/app/admin')
  .setPublicPath('/build/app/admin')
  .addEntry('app-admin-entry', './assets/admin/entry.js')
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new WebpackBar({
    name: 'app.admin',
    color: 'yellow',
  }))
  .enableSassLoader();

const appAdminConfig = Encore.getWebpackConfig();

appAdminConfig.resolve.alias['sylius/ui'] = uiBundleScripts;
appAdminConfig.resolve.alias['sylius/ui-resources'] = uiBundleResources;
appAdminConfig.resolve.alias['sylius/bundle'] = syliusBundles;
appAdminConfig.externals = { ...appAdminConfig.externals, window: 'window', document: 'document' };
appAdminConfig.name = 'app.admin';

Encore.reset();

// App theme config
Encore
  .setOutputPath('public/themes/bootstrap-theme')
  .setPublicPath('/themes/bootstrap-theme')
  .addEntry('app', path.resolve(__dirname, './themes/MyTheme/assets/entry.js'))
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSassLoader()
  .addPlugin(new WebpackBar({
    name: 'app.bootstrapTheme',
    color: 'violet',
  }))
  .configureDevServerOptions((options) => {
    options.client = {
      overlay: {
        warnings: false,
      },
    };
    options.liveReload = true;
    options.static = {
      watch: false,
    };
    options.watchFiles = {
      paths: ['src/**/*.php', 'templates/**/*', 'themes/**/*'],
    };
  })
  .configureWatchOptions((options) => {
    options.aggregateTimeout = 300;
    options.poll = 250;
  })
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction());

const themeBootstrapConfig = Encore.getWebpackConfig();
themeBootstrapConfig.name = 'app.bootstrapTheme';

module.exports = [shopConfig, adminConfig, appShopConfig, appAdminConfig, themeBootstrapConfig];
