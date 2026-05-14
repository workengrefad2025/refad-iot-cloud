// api/sensor.ts
// Vercel-compatible serverless endpoint for receiving sensor data from ESP32 devices.

export default async function handler(req: any, res: any) {
  // Log incoming request details for debugging and traceability.
  console.log('[api/sensor] Incoming request:', {
    method: req.method,
    url: req.url || '/api/sensor',
    headers: req.headers,
  });

  // Reject any non-POST requests explicitly and provide an Allow header.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.warn('[api/sensor] Rejected non-POST request:', req.method);
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST to submit sensor readings.',
    });
  }

  let payload: any = req.body;

  // If the request body arrives as a string, attempt JSON parsing.
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (parseError) {
      console.error('[api/sensor] Invalid JSON payload:', parseError);
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON payload. Please send valid JSON.',
      });
    }
  }

  console.log('[api/sensor] Parsed payload:', payload);

  // Validate that both temperature and humidity are present and numeric.
  const temperature = payload?.temperature;
  const humidity = payload?.humidity;

  if (temperature === undefined || humidity === undefined) {
    console.error('[api/sensor] Missing required fields:', {
      temperature,
      humidity,
    });
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: temperature and humidity are required.',
    });
  }

  const temperatureValue = Number(temperature);
  const humidityValue = Number(humidity);

  if (Number.isNaN(temperatureValue) || Number.isNaN(humidityValue)) {
    console.error('[api/sensor] Invalid numeric values:', {
      temperature,
      humidity,
    });
    return res.status(400).json({
      success: false,
      error: 'temperature and humidity must be numeric values.',
    });
  }

  // Optional: Add any production-ready hooks here, such as saving the values to a database.
  console.log('[api/sensor] Valid sensor reading received:', {
    temperature: temperatureValue,
    humidity: humidityValue,
  });

  // Return the required success response.
  return res.status(200).json({
    success: true,
  });
}

/*
  Example ESP32 JSON request:
  {
    "temperature": 24.8,
    "humidity": 56.3
  }

  Example success response:
  {
    "success": true
  }

  Example error response (missing field):
  {
    "success": false,
    "error": "Missing required fields: temperature and humidity are required."
  }

  Example error response (invalid method):
  {
    "success": false,
    "error": "Method Not Allowed. Use POST to submit sensor readings."
  }
*/