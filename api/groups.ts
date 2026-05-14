import { supabaseAdmin } from './_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  const { data, error } = await supabaseAdmin
    .from('groups')
    .select('id,name,description,created_at,device_count');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data || []);
}
