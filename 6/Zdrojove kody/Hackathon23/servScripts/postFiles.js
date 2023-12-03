const fs = require('fs')

let fname = fs.readdirSync('public/posts')
let pfpname = fs.readdirSync('public/pfp')
let fvideo = fs.readdirSync('public/videos')


module.exports.postName = { img : fname, pfp : pfpname, video : fvideo}