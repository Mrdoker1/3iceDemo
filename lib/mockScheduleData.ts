export interface Team {
  name: string;
  logo: string;
  record: string;
  last5: string;
  streak?: string;
  gfpg?: string; // Goals For Per Game
  gapg?: string; // Goals Against Per Game
  pp?: string;   // Power Play %
  pk?: string;   // Penalty Kill %
  fo?: string;   // Faceoff Win %
}

export interface KeyStat {
  label: string;
  teamA: string;
  teamB: string;
}

export interface KeyPlayer {
  name: string;
  role: string;
  avatar: string;
  lastGameLine: string;
}

export interface BettingOdds {
  moneyline: {
    teamA: string;
    teamB: string;
  };
  spread: {
    teamA: string;
    teamB: string;
  };
  total: {
    over: string;
    under: string;
    line: string;
  };
}

export interface InjuryReport {
  player: string;
  team: 'teamA' | 'teamB';
  status: 'Out' | 'Doubtful' | 'Questionable' | 'Day-to-Day';
  injury: string;
}

export interface TeamLeader {
  name: string;
  stat: string;
  value: string;
  avatar: string;
}

export interface Game {
  id: string;
  dateTime: string;
  competitionLabel?: string;
  teams: {
    teamA: Team;
    teamB: Team;
  };
  venue: string;
  city?: string;
  status: 'Upcoming' | 'Final' | 'Live';
  liveStatus?: string; // e.g., "2nd • 3:21"
  whyItMatters?: string;
  winProb?: {
    teamA: number;
    teamB: number;
  };
  odds?: {
    teamA: string;
    teamB: string;
  };
  bettingOdds?: BettingOdds;
  keyStats?: KeyStat[];
  keyPlayers?: {
    teamA: KeyPlayer[];
    teamB: KeyPlayer[];
  };
  teamLeaders?: {
    teamA: TeamLeader[];
    teamB: TeamLeader[];
  };
  injuries?: InjuryReport[];
  injuriesCount?: number;
  didYouKnow?: string[];
  ticketUrl: string;
  vodUrl?: string;
  score?: {
    teamA: number;
    teamB: number;
  };
  isFeatured?: boolean;
}

export interface ScheduleWeek {
  week: number;
  games: Game[];
}

export interface StandingsTeam {
  rank: number;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  otl: number;
  points: number;
  streak: string;
}

export interface TopPerformer {
  name: string;
  team: string;
  stat: string;
  value: string;
  avatar: string;
}

export const mockStandings: StandingsTeam[] = [
  { rank: 1, name: 'Minnesota', logo: '/Minnesota.png', wins: 12, losses: 4, otl: 0, points: 24, streak: 'W4' },
  { rank: 2, name: 'Buffalo', logo: '/Buffalo.png', wins: 12, losses: 5, otl: 0, points: 24, streak: 'W2' },
  { rank: 3, name: 'Chicago', logo: '/logoSmall.png', wins: 10, losses: 7, otl: 0, points: 20, streak: 'L1' },
  { rank: 4, name: 'Dallas', logo: '/logoSmall.png', wins: 10, losses: 7, otl: 0, points: 20, streak: 'W2' },
  { rank: 5, name: 'Pittsburgh', logo: '/logoSmall.png', wins: 9, losses: 8, otl: 0, points: 18, streak: 'W1' },
  { rank: 6, name: 'Boston', logo: '/logoSmall.png', wins: 8, losses: 9, otl: 0, points: 16, streak: 'L2' },
  { rank: 7, name: 'New York', logo: '/logoSmall.png', wins: 7, losses: 9, otl: 0, points: 14, streak: 'W1' },
  { rank: 8, name: 'Nashville', logo: '/logoSmall.png', wins: 6, losses: 10, otl: 0, points: 12, streak: 'L3' },
];

export const mockTopPerformers: TopPerformer[] = [
  { name: 'Jake Anderson', team: 'Minnesota', stat: 'Goals', value: '18', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Connor Williams', team: 'Buffalo', stat: 'Assists', value: '22', avatar: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Michael Rodriguez', team: 'Dallas', stat: 'Points', value: '35', avatar: 'https://i.pravatar.cc/150?img=23' },
  { name: 'Marcus Johnson', team: 'Minnesota', stat: 'Save %', value: '.935', avatar: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Tyler Smith', team: 'Minnesota', stat: '+/-', value: '+18', avatar: 'https://i.pravatar.cc/150?img=14' },
];

export const educationalFacts = [
  'NHL adopted 3-on-3 overtime in 2015 to reduce shootouts and create more exciting sudden-death finishes.',
  '3ICE games are played in two 8-minute halves with a shootout if tied, making every second count.',
  'The Patrick Cup is named after hockey legend Craig Patrick, celebrating excellence in the 3-on-3 format.',
  'Power plays in 3ICE create 3-on-2 situations, leading to more scoring opportunities than traditional 5-on-5 hockey.',
  'Each 3ICE team consists of 6 skaters and 1 goaltender, emphasizing speed and skill over traditional positional play.',
  '3ICE games average over 10 goals per game, making it one of the highest-scoring hockey formats in the world.',
];

export const mockScheduleWeeks: ScheduleWeek[] = [
  {
    week: 1,
    games: [
      {
        id: 'week1-game1',
        dateTime: '2026-06-12T19:00:00',
        competitionLabel: 'Patrick Cup – Week 1 Featured Matchup',
        teams: {
          teamA: {
            name: 'Minnesota',
            logo: '/Minnesota.png',
            record: '12-4-0',
            last5: 'W-W-L-W-W',
            streak: 'W4',
            gfpg: '4.2',
            gapg: '2.8',
            pp: '28.5%',
            pk: '82.3%',
            fo: '52.1%',
          },
          teamB: {
            name: 'Buffalo',
            logo: '/Buffalo.png',
            record: '11-5-0',
            last5: 'W-L-W-W-L',
            streak: 'W2',
            gfpg: '3.8',
            gapg: '3.1',
            pp: '24.1%',
            pk: '79.8%',
            fo: '48.9%',
          },
        },
        venue: 'F & M Bank Arena, Clarksville, TN',
        city: 'Clarksville',
        status: 'Final',
        isFeatured: true,
        whyItMatters: 'This clash between two top contenders could determine playoff seeding. Minnesota enters on a four-game winning streak, while Buffalo looks to bounce back after a tough road loss. Both teams feature elite goaltending and high-powered offenses, making this a must-watch battle for Patrick Cup positioning.',
        score: {
          teamA: 4,
          teamB: 2,
        },
        winProb: {
          teamA: 58,
          teamB: 42,
        },
        odds: {
          teamA: '-145',
          teamB: '+125',
        },
        bettingOdds: {
          moneyline: {
            teamA: '-145',
            teamB: '+125',
          },
          spread: {
            teamA: '-1.5 (+180)',
            teamB: '+1.5 (-220)',
          },
          total: {
            over: '-110',
            under: '-110',
            line: '6.5',
          },
        },
        teamLeaders: {
          teamA: [
            { name: 'Jake Anderson', stat: 'Goals', value: '18', avatar: 'https://i.pravatar.cc/150?img=12' },
            { name: 'Tyler Smith', stat: 'Assists', value: '20', avatar: 'https://i.pravatar.cc/150?img=14' },
            { name: 'Marcus Johnson', stat: 'Save %', value: '.935', avatar: 'https://i.pravatar.cc/150?img=13' },
          ],
          teamB: [
            { name: 'Connor Williams', stat: 'Goals', value: '16', avatar: 'https://i.pravatar.cc/150?img=15' },
            { name: 'Brandon Lee', stat: 'Assists', value: '18', avatar: 'https://i.pravatar.cc/150?img=17' },
            { name: 'Ryan Mitchell', stat: 'Save %', value: '.912', avatar: 'https://i.pravatar.cc/150?img=16' },
          ],
        },
        injuries: [
          { player: 'Erik Carlson', team: 'teamA', status: 'Day-to-Day', injury: 'Upper Body' },
          { player: 'Jack Eichel Jr.', team: 'teamB', status: 'Out', injury: 'Lower Body' },
          { player: 'Matt Dumba', team: 'teamB', status: 'Questionable', injury: 'Ankle' },
        ],
        injuriesCount: 3,
        keyStats: [
          { label: 'Goals Per Game', teamA: '4.2', teamB: '3.8' },
          { label: 'Power Play %', teamA: '28.5%', teamB: '24.1%' },
          { label: 'Penalty Kill %', teamA: '82.3%', teamB: '79.8%' },
          { label: 'Shots Per Game', teamA: '32.4', teamB: '29.7' },
          { label: 'Save %', teamA: '.915', teamB: '.908' },
          { label: 'Faceoff Win %', teamA: '52.1%', teamB: '48.9%' },
        ],
        keyPlayers: {
          teamA: [
            {
              name: 'Jake Anderson',
              role: 'Center',
              avatar: 'https://i.pravatar.cc/150?img=12',
              lastGameLine: '2G, 1A, +3',
            },
            {
              name: 'Marcus Johnson',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=13',
              lastGameLine: '28 saves, .933 SV%',
            },
            {
              name: 'Tyler Smith',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=14',
              lastGameLine: '1G, 2A, +2',
            },
          ],
          teamB: [
            {
              name: 'Connor Williams',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=15',
              lastGameLine: '1G, 1A, +1',
            },
            {
              name: 'Ryan Mitchell',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=16',
              lastGameLine: '25 saves, .892 SV%',
            },
            {
              name: 'Brandon Lee',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=17',
              lastGameLine: '0G, 1A, -1',
            },
          ],
        },
        didYouKnow: [
          'Minnesota has won 4 of the last 5 meetings against Buffalo',
          'This is the first time these teams meet at F & M Bank Arena',
        ],
        ticketUrl: 'https://www.ticketmaster.com/3ice',
        vodUrl: '/watch/week1-game1',
      },
      {
        id: 'week1-game2',
        dateTime: '2026-06-13T19:00:00',
        competitionLabel: 'Patrick Cup – Week 1',
        teams: {
          teamA: {
            name: 'Chicago',
            logo: '/logoSmall.png',
            record: '10-6-0',
            last5: 'L-W-W-L-W',
          },
          teamB: {
            name: 'Dallas',
            logo: '/logoSmall.png',
            record: '9-7-0',
            last5: 'W-L-L-W-W',
          },
        },
        venue: 'CUTX Center, Allen, TX',
        city: 'Allen',
        status: 'Final',
        whyItMatters: 'Dallas seeks revenge after losing to Chicago earlier this season. With both teams fighting for a playoff spot, this game could be a turning point. Dallas boasts the league\'s best power play, while Chicago\'s defense has been stingy at home.',
        score: {
          teamA: 3,
          teamB: 5,
        },
        winProb: {
          teamA: 52,
          teamB: 48,
        },
        odds: {
          teamA: '-110',
          teamB: '-110',
        },
        keyStats: [
          { label: 'Goals Per Game', teamA: '3.9', teamB: '4.1' },
          { label: 'Power Play %', teamA: '26.2%', teamB: '29.8%' },
          { label: 'Penalty Kill %', teamA: '80.5%', teamB: '83.2%' },
          { label: 'Shots Per Game', teamA: '30.8', teamB: '31.5' },
        ],
        keyPlayers: {
          teamA: [
            {
              name: 'Alex Thompson',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=20',
              lastGameLine: '1G, 0A, +1',
            },
            {
              name: 'David Brown',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=21',
              lastGameLine: '32 saves, .865 SV%',
            },
            {
              name: 'Chris Davis',
              role: 'Center',
              avatar: 'https://i.pravatar.cc/150?img=22',
              lastGameLine: '1G, 1A, 0',
            },
          ],
          teamB: [
            {
              name: 'Michael Rodriguez',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=23',
              lastGameLine: '2G, 2A, +3',
            },
            {
              name: 'James Wilson',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=24',
              lastGameLine: '27 saves, .900 SV%',
            },
            {
              name: 'Kevin Martinez',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=25',
              lastGameLine: '0G, 1A, +2',
            },
          ],
        },
        didYouKnow: [
          'Dallas is on a 3-game winning streak at home',
          'Chicago\'s power play has struggled in the last 3 games',
        ],
        ticketUrl: 'https://www.ticketmaster.com/3ice',
        vodUrl: '/watch/week1-game2',
      },
      {
        id: 'week1-game3',
        dateTime: '2026-06-14T19:00:00',
        competitionLabel: 'Patrick Cup – Week 1',
        teams: {
          teamA: {
            name: 'Boston',
            logo: '/logoSmall.png',
            record: '8-8-0',
            last5: 'L-L-W-W-L',
          },
          teamB: {
            name: 'New York',
            logo: '/logoSmall.png',
            record: '7-9-0',
            last5: 'L-W-L-L-W',
          },
        },
        venue: 'Tsongas Center, Lowell, MA',
        city: 'Lowell',
        status: 'Final',
        whyItMatters: 'A rematch of last season\'s intense playoff series brings renewed rivalry to the ice. Both teams are desperate for wins to stay in the playoff hunt. New York has found success on the road lately, but Boston\'s home crowd could be the difference maker.',
        score: {
          teamA: 2,
          teamB: 3,
        },
        winProb: {
          teamA: 55,
          teamB: 45,
        },
        odds: {
          teamA: '-130',
          teamB: '+110',
        },
        keyStats: [
          { label: 'Goals Per Game', teamA: '3.5', teamB: '3.3' },
          { label: 'Power Play %', teamA: '22.8%', teamB: '21.5%' },
          { label: 'Penalty Kill %', teamA: '78.9%', teamB: '77.2%' },
          { label: 'Shots Per Game', teamA: '28.6', teamB: '27.9' },
        ],
        keyPlayers: {
          teamA: [
            {
              name: 'Patrick O\'Brien',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=30',
              lastGameLine: '1G, 0A, -1',
            },
            {
              name: 'Sean Murphy',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=31',
              lastGameLine: '29 saves, .906 SV%',
            },
            {
              name: 'Brian Kelly',
              role: 'Center',
              avatar: 'https://i.pravatar.cc/150?img=32',
              lastGameLine: '0G, 1A, -1',
            },
          ],
          teamB: [
            {
              name: 'Anthony Russo',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=33',
              lastGameLine: '2G, 0A, +2',
            },
            {
              name: 'Vincent Caruso',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=34',
              lastGameLine: '26 saves, .929 SV%',
            },
            {
              name: 'Dominic Marino',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=35',
              lastGameLine: '1G, 0A, +1',
            },
          ],
        },
        didYouKnow: [
          'This is a rematch of last season\'s playoff series',
          'New York has won 3 of the last 4 road games',
        ],
        ticketUrl: 'https://www.ticketmaster.com/3ice',
      },
    ],
  },
  {
    week: 2,
    games: [
      {
        id: 'week2-game1',
        dateTime: '2026-06-19T19:00:00',
        competitionLabel: 'Patrick Cup – Week 2 Featured Matchup',
        teams: {
          teamA: {
            name: 'Buffalo',
            logo: '/Buffalo.png',
            record: '12-5-0',
            last5: 'W-W-L-W-W',
            streak: 'W3',
            gfpg: '4.0',
            gapg: '3.0',
            pp: '25.8%',
            pk: '81.2%',
            fo: '50.2%',
          },
          teamB: {
            name: 'Minnesota',
            logo: '/Minnesota.png',
            record: '12-5-0',
            last5: 'W-L-W-W-W',
            streak: 'W4',
            gfpg: '4.2',
            gapg: '2.8',
            pp: '28.5%',
            pk: '82.3%',
            fo: '52.1%',
          },
        },
        venue: 'LeCom Harborcenter, Buffalo, NY',
        city: 'Buffalo',
        status: 'Upcoming',
        isFeatured: true,
        whyItMatters: 'The rematch everyone has been waiting for! After Minnesota\'s dominant 4-2 victory in Week 1, Buffalo gets home ice advantage to even the score. With identical records and both teams riding hot streaks, this could be a preview of the Patrick Cup Finals.',
        winProb: {
          teamA: 51,
          teamB: 49,
        },
        odds: {
          teamA: '-105',
          teamB: '-115',
        },
        bettingOdds: {
          moneyline: {
            teamA: '-105',
            teamB: '-115',
          },
          spread: {
            teamA: '+1.5 (-200)',
            teamB: '-1.5 (+165)',
          },
          total: {
            over: '-115',
            under: '-105',
            line: '7.0',
          },
        },
        teamLeaders: {
          teamA: [
            { name: 'Connor Williams', stat: 'Goals', value: '19', avatar: 'https://i.pravatar.cc/150?img=15' },
            { name: 'Brandon Lee', stat: 'Assists', value: '20', avatar: 'https://i.pravatar.cc/150?img=17' },
            { name: 'Ryan Mitchell', stat: 'Save %', value: '.912', avatar: 'https://i.pravatar.cc/150?img=16' },
          ],
          teamB: [
            { name: 'Jake Anderson', stat: 'Goals', value: '18', avatar: 'https://i.pravatar.cc/150?img=12' },
            { name: 'Tyler Smith', stat: 'Assists', value: '20', avatar: 'https://i.pravatar.cc/150?img=14' },
            { name: 'Marcus Johnson', stat: 'Save %', value: '.935', avatar: 'https://i.pravatar.cc/150?img=13' },
          ],
        },
        injuries: [
          { player: 'Rasmus Dahlin Jr.', team: 'teamA', status: 'Questionable', injury: 'Upper Body' },
          { player: 'Jared Spurgeon', team: 'teamB', status: 'Day-to-Day', injury: 'Groin' },
        ],
        injuriesCount: 2,
        keyStats: [
          { label: 'Goals Per Game', teamA: '4.0', teamB: '4.2' },
          { label: 'Power Play %', teamA: '25.8%', teamB: '28.5%' },
          { label: 'Penalty Kill %', teamA: '81.2%', teamB: '82.3%' },
          { label: 'Shots Per Game', teamA: '30.5', teamB: '32.4' },
          { label: 'Save %', teamA: '.910', teamB: '.915' },
          { label: 'Faceoff Win %', teamA: '50.2%', teamB: '52.1%' },
        ],
        keyPlayers: {
          teamA: [
            {
              name: 'Connor Williams',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=15',
              lastGameLine: '3G, 1A, +4',
            },
            {
              name: 'Ryan Mitchell',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=16',
              lastGameLine: '31 saves, .912 SV%',
            },
            {
              name: 'Brandon Lee',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=17',
              lastGameLine: '1G, 2A, +3',
            },
          ],
          teamB: [
            {
              name: 'Jake Anderson',
              role: 'Center',
              avatar: 'https://i.pravatar.cc/150?img=12',
              lastGameLine: '1G, 2A, +2',
            },
            {
              name: 'Marcus Johnson',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=13',
              lastGameLine: '29 saves, .935 SV%',
            },
            {
              name: 'Tyler Smith',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=14',
              lastGameLine: '0G, 1A, +1',
            },
          ],
        },
        didYouKnow: [
          'This is a rematch of Week 1 - Minnesota won 4-2',
          'Buffalo has the home ice advantage and a strong home record (8-2)',
        ],
        ticketUrl: 'https://www.ticketmaster.com/3ice',
        vodUrl: undefined,
      },
      {
        id: 'week2-game2',
        dateTime: '2026-06-20T19:00:00',
        competitionLabel: 'Patrick Cup – Week 2',
        teams: {
          teamA: {
            name: 'Dallas',
            logo: '/logoSmall.png',
            record: '10-7-0',
            last5: 'W-W-L-W-W',
          },
          teamB: {
            name: 'Pittsburgh',
            logo: '/logoSmall.png',
            record: '9-8-0',
            last5: 'L-W-W-L-W',
          },
        },
        venue: 'PPG Paints Arena, Pittsburgh, PA',
        city: 'Pittsburgh',
        status: 'Upcoming',
        whyItMatters: 'Pittsburgh looks to defend home ice against a surging Dallas squad. The Penguins have won seven of their last ten at PPG Paints Arena, but Dallas\' league-leading power play poses a serious threat. This matchup could define both teams\' playoff trajectories.',
        winProb: {
          teamA: 48,
          teamB: 52,
        },
        odds: {
          teamA: '+105',
          teamB: '-125',
        },
        keyStats: [
          { label: 'Goals Per Game', teamA: '4.1', teamB: '3.7' },
          { label: 'Power Play %', teamA: '29.8%', teamB: '23.5%' },
          { label: 'Penalty Kill %', teamA: '83.2%', teamB: '79.1%' },
          { label: 'Shots Per Game', teamA: '31.5', teamB: '29.2' },
        ],
        keyPlayers: {
          teamA: [
            {
              name: 'Michael Rodriguez',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=23',
              lastGameLine: '1G, 3A, +2',
            },
            {
              name: 'James Wilson',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=24',
              lastGameLine: '28 saves, .903 SV%',
            },
            {
              name: 'Kevin Martinez',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=25',
              lastGameLine: '1G, 0A, +1',
            },
          ],
          teamB: [
            {
              name: 'Sidney Crosby Jr.',
              role: 'Center',
              avatar: 'https://i.pravatar.cc/150?img=40',
              lastGameLine: '2G, 1A, +3',
            },
            {
              name: 'Matt Murray II',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=41',
              lastGameLine: '30 saves, .909 SV%',
            },
            {
              name: 'Kris Letang Jr.',
              role: 'Defenseman',
              avatar: 'https://i.pravatar.cc/150?img=42',
              lastGameLine: '0G, 2A, +2',
            },
          ],
        },
        didYouKnow: [
          'Pittsburgh has won 7 of their last 10 home games',
          'Dallas leads the league in power play percentage',
        ],
        ticketUrl: 'https://www.ticketmaster.com/3ice',
      },
      {
        id: 'week2-game3',
        dateTime: '2026-06-21T19:00:00',
        competitionLabel: 'Patrick Cup – Week 2',
        teams: {
          teamA: {
            name: 'Chicago',
            logo: '/logoSmall.png',
            record: '10-7-0',
            last5: 'W-W-L-W-L',
            streak: 'L1',
            gfpg: '3.9',
            gapg: '3.2',
            pp: '26.2%',
            pk: '80.5%',
            fo: '51.3%',
          },
          teamB: {
            name: 'Boston',
            logo: '/logoSmall.png',
            record: '8-9-0',
            last5: 'L-W-L-W-L',
            streak: 'L2',
            gfpg: '3.5',
            gapg: '3.6',
            pp: '22.8%',
            pk: '78.9%',
            fo: '49.1%',
          },
        },
        venue: 'Fox Valley Ice Arena, Geneva, IL',
        city: 'Geneva',
        status: 'Live',
        liveStatus: '2nd Half • 3:21',
        whyItMatters: 'Chicago remains undefeated at home this season and looks to extend that streak against a struggling Boston team. The Bruins need a road win to keep their playoff hopes alive, but Chicago\'s fortress-like home record makes this an uphill battle.',
        score: {
          teamA: 2,
          teamB: 1,
        },
        winProb: {
          teamA: 53,
          teamB: 47,
        },
        odds: {
          teamA: '-120',
          teamB: '+100',
        },
        keyStats: [
          { label: 'Goals Per Game', teamA: '3.9', teamB: '3.5' },
          { label: 'Power Play %', teamA: '26.2%', teamB: '22.8%' },
          { label: 'Penalty Kill %', teamA: '80.5%', teamB: '78.9%' },
          { label: 'Shots Per Game', teamA: '30.8', teamB: '28.6' },
        ],
        keyPlayers: {
          teamA: [
            {
              name: 'Alex Thompson',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=20',
              lastGameLine: '2G, 1A, +2',
            },
            {
              name: 'David Brown',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=21',
              lastGameLine: '26 saves, .897 SV%',
            },
            {
              name: 'Chris Davis',
              role: 'Center',
              avatar: 'https://i.pravatar.cc/150?img=22',
              lastGameLine: '0G, 2A, +1',
            },
          ],
          teamB: [
            {
              name: 'Patrick O\'Brien',
              role: 'Forward',
              avatar: 'https://i.pravatar.cc/150?img=30',
              lastGameLine: '1G, 1A, 0',
            },
            {
              name: 'Sean Murphy',
              role: 'Goalie',
              avatar: 'https://i.pravatar.cc/150?img=31',
              lastGameLine: '24 saves, .923 SV%',
            },
            {
              name: 'Brian Kelly',
              role: 'Center',
              avatar: 'https://i.pravatar.cc/150?img=32',
              lastGameLine: '0G, 0A, -1',
            },
          ],
        },
        didYouKnow: [
          'Chicago is undefeated at home this season (6-0)',
          'Boston is looking to snap a 2-game losing streak',
        ],
        ticketUrl: 'https://www.ticketmaster.com/3ice',
        vodUrl: '/watch/week2-game3-live',
      },
    ],
  },
];
