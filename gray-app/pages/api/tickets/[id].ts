import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from 'lib/supabase';

const userApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { method } = req;
  switch (method) {
    case 'GET': {
      // Get specific user info
      let { data: Ticket, error } = await supabase
        .from('Tickets')
        .select('*')
        .eq('id', id);
        if (error) {
            res.status(400).send({
              message: error
            });
          } else {
            res.status(200).json(Ticket);
          }
      break;
    }
    case 'PUT': {
      const ticketData= req.body 
      let { error } = await supabase
        .from('Tickets')
        .update(ticketData)
        .eq('id', id);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).send(`Successfully updated ticket ${id}`);
      }
      break;
    }
    case 'DELETE': {
      // Delete specific user
      let { error } = await supabase.from('Tickets').delete().eq('id', id);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).send(`Successfully deleted ticket ${id}`);
      }
      break;
    }
    default:
      return res.json({
        message: '404 Not Found'
      });
  }
};

export default userApi;
