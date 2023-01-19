import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'

dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();

const port = process.env.PORT;

app.use(express.json());

app.get('/',(req: Request,res: Response) => {
    res.send('<h1>Express server</h1>');
});



app.post('/api/v1/users', async(req,res)=>{
    const { name, email, password,date_born } = req.body;
    const result = await prisma.usuario.create({
        data: {
          name: name,
          email: email,
          password:password,
          date_born:date_born
        },
      });

      return res.json(result);      
    });

app.get('/api/v1/users', async(req:Request,res:Response)=>{
    const users = await prisma.usuario.findMany();
    return res.json(users);

})

app.post('/api/v1/playlist', async(req:Request,res:Response)=>{
    const { name, userEmail } = req.body;
    const result = await prisma.playlist.create({
        data: {
          name: name,
          user: {connect: {email :userEmail}},
        },
      });

      return res.json(result);      
    });

app.get('/api/v1/playlist', async(req:Request,res:Response)=>{

})

app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})