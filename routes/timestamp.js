import express from 'express';
const router = express.Router();

router.get("/", function (req, res) {
    res.sendFile(process.cwd() + '/views/timestamp.html');
});

router.get('/api', (req, res) => {
    const time = Date.now();
    return res.status(200).json({ unix: time, utc: new Date(time).toUTCString() });
});

router.get('/api/:val', (req, res) => {

    try {
        const { val } = req.params;
        let date;
        if (!isNaN(val)) {
            date = new Date(parseInt(val))
        } else {
            date = new Date(val)
        }
        const utc = new Date(date);
        const unix = utc.getTime();
        if (isNaN(unix) || utc === "Invalid Date")
            throw "NaN";
        return res.status(200).json({ unix: unix, utc: utc.toUTCString() });
    } catch (error) {
        return res.status(400).json({ error: "Invalid Date" })
    }

});

export default router;