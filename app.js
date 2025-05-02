import express from 'express'
import cors from 'cors'
import contactRoutes from './routes/contactRoutes.js';
import { URL } from './utlis/config.js';

const url = URL ? URL : 'http://localhost:5173'
console.log(url)
const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: url,
        credentials: true,
    }
))

// app.use(cookieParser())

app.use('/api/contact', contactRoutes);

app.use('/hello', async (req, res) => {
    res.json({ message: 'Hello' })
})

// app.use(errorPage); 

export default app

