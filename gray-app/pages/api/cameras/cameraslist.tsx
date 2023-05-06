import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      var camData: any = await supabase.from('Camera').select('*');
      res.status(200).json(camData.data);
      break;
    case 'DELETE':
      var cameraId = req.query.id 
      var camData: any = await supabase.from('Camera').delete().match({cam_id: cameraId});
      res.status(200).json(camData);
      break;
    case 'POST':
      var cameraObj= req.body 
      const {error} = await supabase.from('Camera').insert(cameraObj)
      if(error){
        console.log(error)
        res.status(500).json({error: error})
      }
      else{
        res.status(200).send("Successfully updated name!");
      }
      break;
  }
}
