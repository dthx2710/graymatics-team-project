import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      let ticketData: any = await supabase.from('Tickets').select('*');
      res.status(200).json(ticketData.data);
      break;
    case 'POST':
      const ticketObj= req.body 
      console.log(ticketObj);
      const {error} = await supabase.from('Tickets').insert(ticketObj)
      if(error){
        console.log(error)
        res.status(500).json({error: error})
      }
      else{
        res.status(200).send("Successfully updated ticket!");
      }
      break;
  }
}
