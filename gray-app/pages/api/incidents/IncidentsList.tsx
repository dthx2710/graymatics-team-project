import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    let incidentData: any = await supabase.from('Incident').select('*')
    res.status(200).json(incidentData.data)
}