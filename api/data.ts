import { supabaseAdmin } from './_supabase';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('telemetry')
      .select('id,device_id,temperature,humidity,timestamp')
      .order('timestamp', { ascending: false })
      .limit(100);

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

      const { device_id, temperature, humidity } = payload;

      if (!device_id) {
        return res.status(400).json({ error: 'Missing device_id' });
      }

      const { error } = await supabaseAdmin.from('telemetry').insert([{ device_id, temperature, humidity, timestamp: new Date().toISOString() }]);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json({ status: 'success', data: payload });
    } catch (error: any) {
      return res.status(500).json({ error: error?.message || 'Failed to record telemetry' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
