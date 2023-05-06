import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from 'lib/supabase';

const userApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { method } = req;
  switch (method) {
    case 'GET': {
      // Get specific user info
      let { data: Video, error } = await supabase
        .from('Video')
        .select('*')
        .eq('id', id);
        if (error) {
            res.status(400).send({
              message: error
            });
          } else {
            res.status(200).json(Video);
          }
      break;
    }
    case 'PUT': {
      const VideoData= req.body 
      let { error } = await supabase
        .from('Video')
        .update(VideoData)
        .eq('id', id);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).send(`Successfully updated Video ${id}`);
      }
      break;
    }
    case 'DELETE': {
      // Delete specific user
      let { error } = await supabase.from('Video').delete().eq('id', id);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).send(`Successfully deleted Video ${id}`);
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
