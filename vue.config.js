module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.plugins.delete('prefetch-index')
  },
  configureWebpack: {
  },
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/]
    },
    manifestOptions: {
      name: 'TrapScan',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      start_url: 'https://trapscan.app',
      theme_color: '#163b5e',
      msTileColor: '#163b5e',
      prefer_related_applications: true,
      scope: 'https://trapscan.app',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './img/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: './img/icons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          src: './img/icons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: './img/icons/safari-pinned-tab.svg',
          color: '#163b5e',
          type: 'maskable'
        }
      ]
    }
  }
}
