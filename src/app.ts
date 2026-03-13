console.log('Basic Node + TS scaffolding');
import express from 'express';
import cors from 'cors';
import { categoryRouter, orderRouter, productRouter, userRouter } from '#route';
import '#db';
import { normalizeResponse, errorHandler } from '#middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'eCommerce API',
            version: '1.0.0',
            description: 'API for managing users, products, categories, and orders in an eCommerce application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: [
        `${__dirname}/route/*.ts`,
        `${__dirname}/model/*.ts`,
        `${__dirname}/schema/*.ts`,
        `${__dirname}/controller/*.ts`
    ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
const app = express();
const port = process.env.PORT || 8080;
    
app.use(express.json());
app.use(normalizeResponse);

const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/error', (req, res) => {
    throw Error('Something went wrong', { cause: 400 });
});

app.put('/error-two', (req, res) => {
    throw Error('Something else went wrong', { cause: 418 });
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));

app.use('*splat', (req, res, next) => {
    throw new Error('Not Found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => console.log(`\x1b[34mMain app listening at http://localhost:${port}\n\x1b[34mAPI docs at http://localhost:3000/api-docs\x1b[0m`));
