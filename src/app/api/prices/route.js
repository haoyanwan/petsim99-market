import { NextResponse } from 'next/server';

export async function GET(res) {
 
  try {
    const response = await fetch('https://biggamesapi.io/api/rap');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { revalidate: 0 });
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
}
