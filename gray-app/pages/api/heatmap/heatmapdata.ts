import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    let heatmapData: any = await supabase.from('Heatmap').select('*')
    res.status(200).json(heatmapData.data)
}