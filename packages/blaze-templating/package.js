Package.describe({
  name:"mwc:blaze-templating",
  summary: "Allows templates to be defined in .blaze.html files",
  version: '1.1.9'
});

// Today, this package is closely intertwined with Handlebars, meaning
// that other templating systems will need to duplicate this logic. In
// the future, perhaps we should have the concept of a template system
// registry and a default templating system, ideally per-package.

Package.registerBuildPlugin({
  name: "compileTemplatesBatch",
  // minifier-js is a weak dependency of spacebars-compiler; adding it here
  // ensures that the output is minified.  (Having it as a weak dependency means
  // that we don't ship uglify etc with built apps just because
  // boilerplate-generator uses spacebars-compiler.)
  // XXX maybe uglify should be applied by this plugin instead of via magic
  // weak dependency.
  use: [
    'caching-html-compiler@1.0.2',
    'ecmascript@0.4.1',
    'templating-tools@1.0.2',
  ],
  sources: [
    'plugin/compile-templates.js'
  ]
});

// This onUse describes the *runtime* implications of using this package.
Package.onUse(function (api) {
  // XXX would like to do the following only when the first html file
  // is encountered

  api.addFiles('templating.js', 'client');
  api.export('Template', 'client');

  api.use('underscore@1.0.8'); // only the subset in packages/blaze/microscore.js

  api.use('isobuild:compiler-plugin@1.0.0');

  // html_scanner.js emits client code that calls Meteor.startup and
  // Blaze, so anybody using templating (eg apps) need to implicitly use
  // 'meteor' and 'blaze'.
  api.use(['blaze@2.1.7', 'spacebars@1.0.11']);
  api.imply(['meteor', 'blaze@2.1.7', 'spacebars@1.0.11'], 'client');

  api.addFiles(['dynamic.blaze.html', 'dynamic.js'], 'client');
});
