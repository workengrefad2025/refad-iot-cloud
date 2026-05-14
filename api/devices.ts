import { supabaseAdmin } from './_supabase';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('devices')
      .select('id,name,type,status,last_seen');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data || []);
  }

  if (req.method === 'POST') {
    try {
      const payload = await new Promise<any>((resolve, reject) => {
        if (req.body) return resolve(req.body);

        let body = '';
        req.on('data', (chunk: Buffer) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch (error) {
            reject(error);
          }
        });
        req.on('error', reject);
      });

      const { id, name, type } = payload;

      if (!id || !name || !type) {
        return res.status(400).json({ error: 'Missing device id, name, or type' });
      }

      const { error } = await supabaseAdmin.from('devices').insert([{ id, name, type, status: 'online', last_seen: new Date().toISOString() }]);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json({ id, name, type, status: 'online', last_seen: new Date().toISOString() });
    } catch (error: any) {
      return res.status(500).json({ error: error?.message || 'Failed to create device' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
