import { supabaseAdmin } from '../../_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  const { id } = req.query || {};

  const { data, error } = await supabaseAdmin
    .from('group_members')
    .select('device_id,devices(id,name,type,status,last_seen)')
    .eq('group_id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data?.map((member: any) => member.devices) || []);
}
