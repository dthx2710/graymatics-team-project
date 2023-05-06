import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      let vidData: any = await supabase.from('Video').select('*');
      res.status(200).json(vidData.data);
      break;
    case 'POST':
      const vidObj = req.body;
      const { error } = await supabase.from('Video').insert(vidObj);
      if (error) {
        console.log(error);
        res.status(500).json({ error: error });
      } else {
        res.status(200).send('Successfully updated name!');
      }
      break;
  }
}
