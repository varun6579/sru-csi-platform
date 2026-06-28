import { NextResponse } from 'next/server';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  avatarUrl?: string;
  solvedCount: number;
}

// Mock data
const mockLeaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'Alice Smith', score: 1520, rank: 1, solvedCount: 152 },
  { id: '2', name: 'Bob Jones', score: 1480, rank: 2, solvedCount: 148 },
  { id: '3', name: 'Charlie Brown', score: 1455, rank: 3, solvedCount: 145 },
  { id: '4', name: 'Diana Prince', score: 1390, rank: 4, solvedCount: 139 },
  { id: '5', name: 'Evan Wright', score: 1310, rank: 5, solvedCount: 131 },
  { id: '6', name: 'Fiona Gallagher', score: 1290, rank: 6, solvedCount: 129 },
  { id: '7', name: 'George Miller', score: 1100, rank: 7, solvedCount: 110 },
  { id: '8', name: 'Hannah Abbott', score: 1050, rank: 8, solvedCount: 105 },
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({
    data: mockLeaderboardData,
    success: true,
    timestamp: new Date().toISOString()
  });
}
