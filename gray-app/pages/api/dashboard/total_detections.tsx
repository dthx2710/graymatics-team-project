import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(_req: NextApiRequest, res: NextApiResponse){

    var data : any= await supabase.from('ChartData').select("objectData")
    var result: Number = 0
    for (let i=0; i<data?.data?.length;i++){
        result+=(data.data[i].objectData.value)
    }
    res.status(200).json(result)
}