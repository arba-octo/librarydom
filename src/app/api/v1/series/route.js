import { NextResponse } from 'next/server';
import prisma from '#prisma/client';

// GET: получить все серии
export async function GET() {
    try {
        const series = await prisma.series.findMany();
        return NextResponse.json(series, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};