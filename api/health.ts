import { supabaseAdmin } from './_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { data, error } = await supabaseAdmin.from('telemetry').select('id').limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({
    status: 'ok',
    platform: 'Refad IoT Platform',
    database: data ? 'supabase' : 'supabase-unavailable',
  });
}
