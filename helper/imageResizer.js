const sharp = require("sharp");
const fs = require("fs");
module.exports = function imgResize (path,format,width,height){
    const readStream = fs.createReadStream(path);
    let transform = sharp();
    if(format){
        transform = transform.toFormat(format);
    }
    if(width||height){
        transform = transform.resize(width,height);
    }
    return readStream.pipe(transform);
};