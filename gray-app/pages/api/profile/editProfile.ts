import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'POST':
      const userObj = req.body;
      const { error } = await supabase
        .from('User')
        .update({
          country: userObj.country,
          description: userObj.description,
          role: userObj.role,
          logo: userObj.logo
        })
        .eq('username', userObj.username);
      if (error) {
        console.log(error);
        res.status(500).json({ error: error });
      } else {
        res.status(200).send('Successfully updated name!');
      }
      break;
  }
}
