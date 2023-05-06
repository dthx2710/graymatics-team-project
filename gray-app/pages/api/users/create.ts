import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from 'lib/supabase';
import { genSalt, hash } from 'bcrypt';

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      // Create user
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
      let { data, error } = await supabase.from('User').insert(userData);
      if (error) {
        res.status(400).send({
          message: error
        });
      } else {
        res.status(200).send(`Successfully created: ${data}`);
      }
      break;
    default:
      return res.json({
        message: '404 Not Found'
      });
  }
};

export default createUser;
