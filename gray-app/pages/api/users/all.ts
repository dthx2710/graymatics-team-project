import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from 'lib/supabase';

const editname = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case "GET":
            const { data } = await supabase.from('User').select('*')
            res.status(200).json(data);
            break;
        default:
            return res.json({
                message: 'Success',
            })
    }
}

export default editname;