Plugin.registerCompiler({
  extensions: ['blaze.html'],
  archMatching: 'web',
  isTemplate: true
}, () => new CachingHtmlCompiler(
  "templating",
  TemplatingTools.scanHtmlForTags,
  TemplatingTools.compileTagsWithSpacebars
));
