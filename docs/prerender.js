const fs = require('fs')
const path = require('path')

const toAbsolute = (p) => path.resolve(__dirname, p).replace(/\\/, '/')

const manifest = require('./dist/static/ssr-manifest.json')
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = require('./dist/server/entry-server.js')

const writeFileRecursive = function (path, buffer) {
  const lastPath = path.substring(0, path.lastIndexOf('/'))

  fs.mkdir(lastPath, { recursive: true }, () => {
    fs.writeFileSync(path, buffer)
  })
}

const fileDisplay = (file) => {
  fs.readdirSync(toAbsolute(file)).forEach(async (filename) => {
    const filedir = path.join(file, filename).replace(/\\/, '/')

    if (fs.statSync(toAbsolute(filedir)).isDirectory()) {
      fileDisplay(filedir)
    } else {
      const url = filedir
        .replace(/^docs/, '')
        .replace(/\.(vue|md)$/, '')
        .replace(/index$/, '')
        .replace(/\/([^/]*)$/, (item) =>
          item.replace(/\B([A-Z])/g, '-$1').toLowerCase()
        )
      const [appHtml, preloadLinks] = await render(url, manifest)
      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)

      const filePath = `dist/static${url.replace(/\/$/, '/index')}.html`
      writeFileRecursive(toAbsolute(filePath), html)
    }
  })
}

fileDisplay('docs')

fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))