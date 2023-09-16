import express from 'express';
const router = express.Router();
import multer from 'multer';

const upload = multer({ dest: "public/files" });

router.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/filemetadata.html');
});

router.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});

export default router;