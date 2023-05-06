import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chart_type: chartType } = req.query;
  var data: any = await supabase
    .from('ChartData')
    .select('*')
    .eq('chartType', chartType);
  var resArray = [];
  for (let i = 0; i < data?.data?.length; i++) {
    resArray.push(data.data[i].objectData);
  }
  res.status(200).json(resArray);
}
