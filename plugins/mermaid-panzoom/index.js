'use strict'

const path = require('path')

/** @type {import('@docusaurus/types').Plugin} */
function mermaidPanZoomPlugin(_context, _options) {
  return {
    name: 'mermaid-panzoom-buttons',
    getClientModules() {
      return [path.resolve(__dirname, 'mermaidPanZoom.js')]
    },
  }
}

module.exports = mermaidPanZoomPlugin
