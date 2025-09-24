import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import qrRouter from './routes/qrcodesRoutes.js';

const app=express();
const PORT=5337;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api/qrcode/',qrRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'../public')));
app.set('views','views');
app.set('view engine','ejs');

app.get('/',async (req,res)=>{
    res.render('index');
})

app.listen(PORT,()=>console.log(`Server is now listening on port: ${PORT}`));
