import express from 'express';
const app = express();
import cors from 'cors';

import headerparser from './routes/headerparser.js';
import timestamp from './routes/timestamp.js';
import urlshortener from './routes/urlshortener.js';
import exercisetracker from './routes/exercisetracker.js';
import filemetadata from './routes/filemetadata.js';

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/headerparser', headerparser);
app.use('/timestamp', timestamp);
app.use('/urlshortener', urlshortener);
app.use('/exercisetracker', exercisetracker);
app.use('/filemetadata', filemetadata);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});