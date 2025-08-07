const fs = require('fs')
const path = require('path')

module.exports = function hardwarePagesGenerator(context, options) {
  return {
    name: 'hardware-pages-generator',

    async loadContent() {
      // Load the devices array
      const devicesPath = path.resolve(__dirname, '../../data/hardware/devices.js')
      const devicesModule = require(devicesPath)
      const devices = devicesModule.default || devicesModule

      // Read all metadata files in the metadata directory
      const metadataDir = path.resolve(__dirname, '../../data/hardware/metadata')
      const metaMap = {}

      if (fs.existsSync(metadataDir)) {
        const files = fs.readdirSync(metadataDir).filter((f) => f.endsWith('.js'))

        files.forEach((file) => {
          const filePath = path.resolve(metadataDir, file)
          const id = path.basename(file, path.extname(file))
          metaMap[id] = filePath
        })
      }

      return { devices, metaMap }
    },

    async contentLoaded({ content, actions }) {
      const { devices, metaMap } = content
      const { addRoute } = actions

      const devicesModulePath = require.resolve(path.resolve(__dirname, '../../data/hardware/devices.js'))
      const componentPath = require.resolve(path.resolve(__dirname, '../../components/HardwareDetailTemplate.jsx'))

      devices.forEach((device) => {
        const metaFilePath = metaMap[device.id]
        if (!metaFilePath) {
          // Skip devices without metadata
          return
        }
        // Add English route
        addRoute({
          path: `/hardware_pages/${device.id}`,
          component: componentPath,
          exact: true,
          modules: {
            device: devicesModulePath,
            meta: require.resolve(metaFilePath),
          },
        })
        // Add Chinese route
        addRoute({
          path: `/zh/hardware_pages/${device.id}`,
          component: componentPath,
          exact: true,
          modules: {
            device: devicesModulePath,
            meta: require.resolve(metaFilePath),
          },
        })
      })
    },
  }
}
