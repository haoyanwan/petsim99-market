import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const sh = searchParams.get('sh');
  var pt = searchParams.get('pt');

  // Check if all required query parameters are present
  if (!id || sh === null || pt === null) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
   

    const query = `
      SELECT pet_name, pt, sh, price, recorded_at
      FROM pet_prices
      WHERE pet_name = $1 AND sh = $2 AND pt = $3
      ORDER BY recorded_at DESC;
    `;
    
    const values = [id, sh === 'true', parseInt(pt)];

    const result = await client.query(query, values);
    const priceHistory = result.rows;

    client.release();

    return NextResponse.json(priceHistory, { status: 200 });
  } catch (error) {
    console.error('Error fetching price history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}