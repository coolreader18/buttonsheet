// hack until https://github.com/parcel-bundler/parcel/pull/7741 merges
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const {Transformer} = require("@parcel/plugin")

const path = require("path")
const camelcase = require("camelcase")
const pluginSvgo = require("@svgr/plugin-svgo")
const pluginJsx = require("@svgr/plugin-jsx")
const {transform} = require("@svgr/core")

function getComponentName(filePath) {
  let name = path.parse(filePath).name.replace(/[^a-zA-Z0-9_-]/g, '');

  return camelcase(name, {
    pascalCase: true
  });
}

exports.default = new Transformer({
  async loadConfig({config}) {
    let { contents } = await config.getConfig(['.svgrrc', '.svgrrc.json']);
    return contents;
  },
  async transform({asset,config}) {
    let code = await asset.getCode();
    let componentName = getComponentName(asset.filePath);
    const jsx = await transform(code, { ...config, runtimeConfig: false }, {
      caller: {
        name: '@parcel/transformer-svg-react',
        defaultPlugins: [pluginSvgo, pluginJsx]
      },
      componentName,
      filePath: asset.filePath,
    });
    asset.type = 'jsx';
    asset.bundleBehavior = null;
    asset.setCode(jsx);
    return [asset];
  }

});