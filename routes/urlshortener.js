import express from 'express';
const router = express.Router();
import urlParser from 'url';
import dns from 'dns';

const urls = [];

router.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/urlshortener.html');
});

router.get('/api/shorturl/:qid', (req, res) => {
    const { qid } = req.params;
    if (qid <= urls.length - 1 && qid >= 0) {
        res.redirect(urls[Number(qid)])
    } else {
        res.json({ error: 'invalid url' });
    }
});

router.post('/api/shorturl', (req, res) => {
    const { url } = req.body;
    dns.lookup(urlParser.parse(url).hostname, (err, address) => {
        if (!address) {
            res.json({ error: "invalid url" });
        } else {
            urls.push(url);
            const id = urls.length;
            res.json(
                {
                    original_url: url,
                    short_url: id - 1
                }
            )
        }
    })
});

export default router;