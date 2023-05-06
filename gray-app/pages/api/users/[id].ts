import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from 'lib/supabase';
import { genSalt, hash } from 'bcrypt';

const userApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { method } = req;
  switch (method) {
    case 'GET': {
      // Get specific user info
      let { data: User, error } = await supabase
        .from('User')
        .select('*')
        .eq('id', id);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).json(User);
      }
      break;
    }
    case 'PUT': {
      // Update specific user data
      const clientData = JSON.parse(req.body);
      delete clientData.error;
      delete clientData.errorHelper;
      delete clientData.passwordConfirm;
      delete clientData.showPassword;
      delete clientData.admin;
      let userData = Object.fromEntries(
        Object.entries(clientData).filter(
          ([_, v]) => v !== null && v !== '' && v !== undefined
        )
      );
      if (userData.password) {
        const salt = await genSalt(10);
        const hashed = await hash(clientData.password, salt);
        userData.password = hashed;
      }
      let { error } = await supabase.from('User').update(userData).eq('id', id);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).send(`Successfully updated ${id}`);
      }
      break;
    }
    case 'DELETE': {
      // Delete specific user
      let { error } = await supabase.from('User').delete().eq('id', id);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).send(`Successfully deleted ${id}`);
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
