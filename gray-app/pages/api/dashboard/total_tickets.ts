import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(_req: NextApiRequest, res: NextApiResponse){

    var data : any= await supabase.from('Tickets').select()
    var result: number = 0
    for (let i=0; i<data?.data?.length;i++){
        result+=1
    }
    res.status(200).json(result)
}