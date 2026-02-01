import { mockScheduleWeeks } from '@/lib/mockScheduleData';
import MatchupClient from './MatchupClient';

// Generate static params for all game IDs
export function generateStaticParams() {
  const allGames = mockScheduleWeeks.flatMap(week => week.games);
  return allGames.map(game => ({
    id: game.id,
  }));
}

export default async function MatchupPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params in Next.js 15
  const { id } = await params;
  
  // Find the game by ID on the server
  const game = mockScheduleWeeks
    .flatMap(week => week.games)
    .find(g => g.id === id);

  return <MatchupClient game={game || null} />;
}
