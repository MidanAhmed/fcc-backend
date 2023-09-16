import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/headerparser.html');
});

router.get('/api/whoami', (req, res) => {
    const software = req.get("user-agent");
    const ipaddress = req.get("host");
    const language = req.get("accept-language");
    res.json({ ipaddress, language, software });
});

export default router;