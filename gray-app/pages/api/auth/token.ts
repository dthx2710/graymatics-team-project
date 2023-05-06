import { NextApiRequest, NextApiResponse } from 'next/types';
import * as jwt from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

const token = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await jwt.getToken({ req, secret });
    res.send(token);
  } 

export default token;