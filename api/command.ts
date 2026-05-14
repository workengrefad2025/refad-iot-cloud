import { supabaseAdmin } from './_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

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

    const { device_id, command } = payload;

    if (!device_id || !command) {
      return res.status(400).json({ error: 'Missing device_id or command' });
    }

    const { error } = await supabaseAdmin.from('commands').insert([{ device_id, command, timestamp: new Date().toISOString() }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ status: 'command_queued', device_id, command });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Failed to record command' });
  }
}
