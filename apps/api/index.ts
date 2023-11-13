import express, { Request, Response } from 'express';
import cors from "cors"
import axios from "axios"
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 4 * 60 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return String(req.headers['x-client-key']) || 'unknown';
    }
});

const app = express();
app.use(express.json())
app.use(cors())
app.use('/gpt', limiter);


const apiKey = 'AIzaSyD5nW8zRrBKpAld0MJXw3O6HAiRIyXRng8';
const searchEngineId = 'c786d15db9d0147eb';

app.get('/gpt', (req: Request, res: Response) => {
    console.log("Request")
    const queryParam = req.query
    console.log(queryParam)
    let query;
    if (queryParam.query) {
        query = `inurl:/g/ site:chat.openai.com ${queryParam.query}`;
    } else {
        query = `inurl:/g/ site:chat.openai.com`;
    }
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&start=${Math.floor(Math.random() * (50 - 1 + 1)) + 1}`;
    axios.get(url)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(error => {
            console.log(error)
            res.status(501).json({ status: "Fatal Error" })
        });
});

const PORT = process.env.PORT || 40010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
