import express from 'express';
import cors from 'cors';
import routes from './routes';

const port = 5000;
const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: ['http://localhost:3000']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes);

app.get('/health', (req, res) => {
    res.status(200).send("healthy");
});

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

