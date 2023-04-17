import Bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST'){
    return res.status(405).end();
  }
  try{
    const { email, username, password } = req.body;
    const existsEmail = await prismadb.user.findUnique({
      where: {
        email
      }
    });

    if(existsEmail){
      return res.status(422).json({error: 'Email taken'});
    }

    const hashedPassword = await Bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data:{
        email,
        name: username,
        hashedPassword,
        emailVerified: new Date(),

      }
    });

    return res.status(200).json(user);
  } catch(error){
    console.log(error);
    return res.status(500).end();
  }
}