console.log('Basic Node + TS scaffolding');
import express from 'express';
import { categoryRouter, orderRouter, productRouter, userRouter } from '#route';
import '#db';
import { errorHandler } from '#middleware';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

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

app.use('*splat', (req, res, next) => {
    throw new Error('Not Found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => console.log(`\x1b[34mMain app listening at http://localhost:${port}\x1b[0m`));
