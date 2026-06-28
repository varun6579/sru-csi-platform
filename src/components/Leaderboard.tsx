'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { LeaderboardEntry } from '@/app/api/leaderboard/route';

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/leaderboard');
        const json = await res.json();
        
        if (isMounted && json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter(entry => 
      entry.name.toLowerCase().includes(lowerQuery)
    );
  }, [data, searchQuery]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-4 animate-pulse">
        <div className="h-10 bg-slate-800 rounded-lg w-full mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-800 rounded-xl w-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Global Leaderboard
        </h2>
        <input
          type="text"
          placeholder="Search coders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200 placeholder-slate-400 transition-all w-full md:w-64"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-300 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Rank</th>
              <th className="px-6 py-4 font-semibold">Coder</th>
              <th className="px-6 py-4 font-semibold">Problems Solved</th>
              <th className="px-6 py-4 font-semibold text-right">Total Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredData.length > 0 ? (
              filteredData.map((entry) => (
                <tr 
                  key={entry.id}
                  className="group hover:bg-slate-800/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <span className={\`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold \${
                      entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      entry.rank === 2 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' :
                      entry.rank === 3 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-slate-800 text-slate-400'
                    }\`}>
                      {entry.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {entry.solvedCount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono font-bold text-emerald-400">
                      {entry.score.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No coders found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
