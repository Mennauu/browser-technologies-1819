const shrinkRay = require('shrink-ray-current')
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// Disable x-powered-by header
app.disable('x-powered-by')

// Compress files to brotli or gzip
app.use(shrinkRay())

// serve static files
app.use(express.static(__dirname + '/public', {
  maxAge: "365d",
  lastModified: "",
  etag: ""
}))

// Homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/index.html')))
// Demopage
app.get('/demo', (req, res) => res.sendFile(path.join(__dirname + '/views/demo.html')))
// Music file
app.get('/create-mp3-file/', (req, res) => {
  const file = path.join(__dirname + '/public/sounds/funky.mp3')
  res.download(file)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))