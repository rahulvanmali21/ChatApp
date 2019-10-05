const router = require("express").Router();
const fs = require("fs");
// const path = require("path");
const imgResize = require("../helper/imageResizer");
router.get("/:type/:img_name/:width/:height", (req, res) => {
    const format = req.query.format;
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height);
    let image_path;
    if (req.params.type === "profile-picture") {
        image_path = "media/profile_pictures/" + req.params.img_name;

    }
    res.type(`image/${format || 'png'}`);
    if (fs.existsSync(image_path)) {
        imgResize(image_path, format, width, height).pipe(res);
    } else {
        return res.status(404);
    }
});

module.exports = router;