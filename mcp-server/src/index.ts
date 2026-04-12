#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { PrismaClient } from '@prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Card Game Types & Utilities
// ---------------------------------------------------------------------------

const SUITS = ['S', 'H', 'D', 'C'] as const;
const SUIT_NAMES: Record<string, string> = { S: 'Spades', H: 'Hearts', D: 'Diamonds', C: 'Clubs' };
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
type Suit = typeof SUITS[number];
type Rank = typeof RANKS[number];
type Card = { rank: Rank; suit: Suit };

function cardLabel(c: Card): string {
  return `${c.rank}${c.suit}`;
}

function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function cardNumericValue(rank: Rank): number {
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  if (rank === 'A') return 11;
  return parseInt(rank, 10);
}

/** Blackjack: sum aces-adjusted hand, return value and whether it is soft */
function blackjackHandValue(cards: Card[]): { value: number; soft: boolean } {
  let total = 0;
  let aces = 0;
  for (const c of cards) {
    if (c.rank === 'A') {
      total += 11;
      aces++;
    } else {
      total += cardNumericValue(c.rank);
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return { value: total, soft: aces > 0 };
}

/** Poker: rank index (higher = better card) */
function rankIndex(rank: Rank): number {
  const order: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return order.indexOf(rank);
}

/** Evaluate a 5-card poker hand. Returns numeric rank (10=Royal Flush, 1=High Card) */
function evaluatePokerHand(cards: Card[]): { rank: number; name: string; description: string } {
  if (cards.length !== 5) {
    return { rank: 0, name: 'Invalid', description: 'Need exactly 5 cards' };
  }

  const sorted = [...cards].sort((a, b) => rankIndex(b.rank) - rankIndex(a.rank));
  const ranks = sorted.map(c => c.rank);
  const suits = sorted.map(c => c.suit);
  const indices = sorted.map(c => rankIndex(c.rank));

  const isFlush = suits.every(s => s === suits[0]);

  const uniqueIdx = [...new Set(indices)].sort((a, b) => b - a);
  const isNormalStraight = uniqueIdx.length === 5 && uniqueIdx[0] - uniqueIdx[4] === 4;
  const isWheelStraight = // A-2-3-4-5
    uniqueIdx.length === 5 &&
    uniqueIdx[0] === 12 && // Ace
    uniqueIdx[1] === 3 &&
    uniqueIdx[2] === 2 &&
    uniqueIdx[3] === 1 &&
    uniqueIdx[4] === 0;
  const isStraight = isNormalStraight || isWheelStraight;

  const counts: Record<string, number> = {};
  for (const r of ranks) counts[r] = (counts[r] ?? 0) + 1;
  const freq = Object.values(counts).sort((a, b) => b - a);

  const isRoyal = isFlush && isStraight && ranks[0] === 'A' && ranks[1] === 'K';

  if (isRoyal) {
    return { rank: 10, name: 'Royal Flush', description: `${ranks.join(' ')} -- the best possible hand!` };
  }
  if (isFlush && isStraight) {
    return { rank: 9, name: 'Straight Flush', description: `${ranks[0]}-high straight flush in ${SUIT_NAMES[suits[0]]}` };
  }
  if (freq[0] === 4) {
    const quad = (Object.entries(counts).find(([, v]) => v === 4) ?? ['?'])[0];
    return { rank: 8, name: 'Four of a Kind', description: `Four ${quad}s` };
  }
  if (freq[0] === 3 && freq[1] === 2) {
    const trip = (Object.entries(counts).find(([, v]) => v === 3) ?? ['?'])[0];
    const pair = (Object.entries(counts).find(([, v]) => v === 2) ?? ['?'])[0];
    return { rank: 7, name: 'Full House', description: `${trip}s full of ${pair}s` };
  }
  if (isFlush) {
    return { rank: 6, name: 'Flush', description: `${ranks[0]}-high flush in ${SUIT_NAMES[suits[0]]}` };
  }
  if (isStraight) {
    const high = isWheelStraight ? '5' : ranks[0];
    return { rank: 5, name: 'Straight', description: `${high}-high straight` };
  }
  if (freq[0] === 3) {
    const trip = (Object.entries(counts).find(([, v]) => v === 3) ?? ['?'])[0];
    return { rank: 4, name: 'Three of a Kind', description: `Three ${trip}s` };
  }
  if (freq[0] === 2 && freq[1] === 2) {
    const pairs = Object.entries(counts).filter(([, v]) => v === 2).map(([k]) => k);
    return { rank: 3, name: 'Two Pair', description: `${pairs[0]}s and ${pairs[1]}s` };
  }
  if (freq[0] === 2) {
    const pair = (Object.entries(counts).find(([, v]) => v === 2) ?? ['?'])[0];
    return { rank: 2, name: 'One Pair', description: `Pair of ${pair}s` };
  }
  return { rank: 1, name: 'High Card', description: `${ranks[0]} high` };
}

/** Parse a space-separated card string like "AH KS 10D" into Card[] */
function parseCards(str: string): Card[] {
  return str.trim().split(/\s+/).map(t => {
    const suit = t.slice(-1).toUpperCase() as Suit;
    const rank = t.slice(0, -1).toUpperCase() as Rank;
    return { rank, suit };
  });
}

// ---------------------------------------------------------------------------
// Tool Definitions
// ---------------------------------------------------------------------------

const tools: Tool[] = [
  // -- Person CRUD -----------------------------------------------------------
  {
    name: 'createPerson',
    description: 'Create a new person record in the database',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: "Full name" },
        email: { type: 'string', description: "Email address" },
        phone: { type: 'string', description: "Phone number (optional)" },
        address: { type: 'string', description: "Address (optional)" },
        bio: { type: 'string', description: "Short biography (optional)" },
      },
      required: ['name', 'email'],
    },
  },
  {
    name: 'readPerson',
    description: 'Get a person by ID, or list all persons when no ID is supplied',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Person ID (omit to list all)' },
      },
    },
  },
  {
    name: 'searchPerson',
    description: 'Search persons by name, email, or phone (case-insensitive)',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term' },
      },
      required: ['query'],
    },
  },
  {
    name: 'updatePerson',
    description: 'Update an existing person record by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Person ID' },
        name: { type: 'string', description: "New full name (optional)" },
        email: { type: 'string', description: "New email (optional)" },
        phone: { type: 'string', description: "New phone (optional)" },
        address: { type: 'string', description: "New address (optional)" },
        bio: { type: 'string', description: "New bio (optional)" },
      },
      required: ['id'],
    },
  },
  {
    name: 'deletePerson',
    description: 'Permanently delete a person record by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Person ID to delete' },
      },
      required: ['id'],
    },
  },

  // -- Dice ------------------------------------------------------------------
  {
    name: 'rollDice',
    description:
      'Roll one or more dice. Supports any die type: d4, d6, d8, d10, d12, d20, d100, etc. ' +
      'Notation: "2d6+3" means roll two 6-sided dice and add 3. ' +
      'Returns each individual roll and the final total.',
    inputSchema: {
      type: 'object',
      properties: {
        sides: {
          type: 'number',
          description: 'Sides on each die (default: 6). Common values: 4, 6, 8, 10, 12, 20, 100.',
        },
        count: {
          type: 'number',
          description: 'Number of dice to roll (default: 1, max: 20).',
        },
        modifier: {
          type: 'number',
          description: 'Flat modifier added to the total, e.g. +3 or -2 (default: 0).',
        },
      },
    },
  },

  // -- Card Games ------------------------------------------------------------
  {
    name: 'dealPokerHands',
    description:
      'Shuffle a standard 52-card deck and deal 5-card Texas Hold\'em style hands to 1-6 players. ' +
      'Evaluates each hand and announces the winner. ' +
      'Card notation: rank (A 2-10 J Q K) + suit (S H D C). Example: AS = Ace of Spades.',
    inputSchema: {
      type: 'object',
      properties: {
        players: {
          type: 'number',
          description: 'Number of players (1-6, default: 4)',
        },
      },
    },
  },
  {
    name: 'evaluatePokerHand',
    description:
      'Evaluate any 5-card poker hand and return the hand name and rank. ' +
      'Provide 5 space-separated cards. Rank (A 2-10 J Q K) + suit (S H D C). ' +
      'Example: "AS KS QS JS 10S" = Royal Flush.',
    inputSchema: {
      type: 'object',
      properties: {
        cards: {
          type: 'string',
          description: '5 space-separated cards, e.g. "AS KS QS JS 10S"',
        },
      },
      required: ['cards'],
    },
  },
  {
    name: 'playBlackjack',
    description:
      'Play a round of Blackjack against a simulated dealer. ' +
      'Use action="deal" to start a new game. ' +
      'Use action="hit" to draw another card (pass current playerCards and dealerCards). ' +
      'Use action="stand" to finish — dealer draws to 17 and the winner is revealed. ' +
      'Card notation: rank (A 2-10 J Q K) + suit (S H D C). Example: KH = King of Hearts.',
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['deal', 'hit', 'stand'],
          description: '"deal" = new game, "hit" = draw a card, "stand" = end player turn',
        },
        playerCards: {
          type: 'string',
          description:
            'Current player hand as space-separated cards, e.g. "KH 7D". ' +
            'Required for "hit" and "stand".',
        },
        dealerCards: {
          type: 'string',
          description:
            'Dealer\'s visible card(s), e.g. "6S". Required for "hit" and "stand".',
        },
      },
      required: ['action'],
    },
  },
];

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new Server(
  { name: 'person-app-mcp', version: '2.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: rawArgs = {} } = request.params;
    const args = rawArgs as Record<string, unknown>;

    // -----------------------------------------------------------------------
    // Person CRUD
    // -----------------------------------------------------------------------

    if (name === 'createPerson') {
      const person = await prisma.person.create({
        data: {
          name: args['name'] as string,
          email: args['email'] as string,
          phone: (args['phone'] as string | undefined) ?? null,
          address: (args['address'] as string | undefined) ?? null,
          bio: (args['bio'] as string | undefined) ?? null,
        },
      });
      return {
        content: [{ type: 'text', text: `[OK] Person created:\n${JSON.stringify(person, null, 2)}` }],
      };
    }

    if (name === 'readPerson') {
      const id = args['id'] as number | undefined;
      if (id !== undefined) {
        const person = await prisma.person.findUnique({ where: { id } });
        return {
          content: [{
            type: 'text',
            text: person
              ? JSON.stringify(person, null, 2)
              : `Person with ID ${id} not found.`,
          }],
        };
      }
      const people = await prisma.person.findMany({ orderBy: { createdAt: 'desc' } });
      return {
        content: [{
          type: 'text',
          text: `${people.length} person(s) in the database:\n${JSON.stringify(people, null, 2)}`,
        }],
      };
    }

    if (name === 'searchPerson') {
      const query = args['query'] as string;
      const people = await prisma.person.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { phone: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
      return {
        content: [{
          type: 'text',
          text: `Found ${people.length} person(s) matching "${query}":\n${JSON.stringify(people, null, 2)}`,
        }],
      };
    }

    if (name === 'updatePerson') {
      const id = args['id'] as number;
      const data: Record<string, string> = {};
      for (const field of ['name', 'email', 'phone', 'address', 'bio']) {
        if (args[field] !== undefined) data[field] = args[field] as string;
      }
      const person = await prisma.person.update({ where: { id }, data });
      return {
        content: [{ type: 'text', text: `[OK] Person updated:\n${JSON.stringify(person, null, 2)}` }],
      };
    }

    if (name === 'deletePerson') {
      const id = args['id'] as number;
      const person = await prisma.person.delete({ where: { id } });
      return {
        content: [{ type: 'text', text: `[OK] Deleted: ${person.name} (ID ${person.id})` }],
      };
    }

    // -----------------------------------------------------------------------
    // Dice
    // -----------------------------------------------------------------------

    if (name === 'rollDice') {
      const sides = Math.max(2, Math.min(1000, (args['sides'] as number) ?? 6));
      const count = Math.max(1, Math.min(20, (args['count'] as number) ?? 1));
      const modifier = (args['modifier'] as number) ?? 0;

      const rolls: number[] = [];
      for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
      }
      const subtotal = rolls.reduce((s, r) => s + r, 0);
      const total = subtotal + modifier;

      const notation = `${count}d${sides}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ''}`;
      let result = `[DICE] Rolling ${notation}\n`;
      result += `Rolls   : [${rolls.join(', ')}]\n`;
      if (count > 1) result += `Subtotal: ${subtotal}\n`;
      if (modifier !== 0) result += `Modifier: ${modifier > 0 ? '+' : ''}${modifier}\n`;
      result += `Total   : ${total}`;

      if (count === 1 && sides === 20) {
        if (rolls[0] === 20) result += '\n[CRIT] Natural 20 -- Critical Hit!';
        else if (rolls[0] === 1) result += '\n[FAIL] Natural 1 -- Critical Fail!';
      }

      return { content: [{ type: 'text', text: result }] };
    }

    // -----------------------------------------------------------------------
    // Poker
    // -----------------------------------------------------------------------

    if (name === 'dealPokerHands') {
      const players = Math.max(1, Math.min(6, (args['players'] as number) ?? 4));
      const deck = shuffleDeck(buildDeck());

      const hands: Card[][] = Array.from({ length: players }, () => []);
      for (let round = 0; round < 5; round++) {
        for (let p = 0; p < players; p++) {
          const card = deck.shift();
          if (card) hands[p].push(card);
        }
      }

      const results = hands.map((hand, i) => ({
        player: i + 1,
        cards: hand.map(cardLabel).join(' '),
        eval: evaluatePokerHand(hand),
      }));

      results.sort((a, b) => b.eval.rank - a.eval.rank);

      let output = `[POKER] ${players}-player game\n`;
      output += '='.repeat(40) + '\n';
      results.forEach((r, i) => {
        const prefix = i === 0 ? '[WIN] ' : `  ${i + 1}.  `;
        output += `${prefix}Player ${r.player}: ${r.cards}\n`;
        output += `        ${r.eval.name} -- ${r.eval.description}\n`;
      });

      if (players > 1) {
        const isTie = results[0].eval.rank === results[1].eval.rank;
        output += '\n' + (isTie
          ? '[TIE] Split pot -- kicker comparison required.'
          : `[WIN] Player ${results[0].player} wins with ${results[0].eval.name}!`);
      }

      return { content: [{ type: 'text', text: output }] };
    }

    if (name === 'evaluatePokerHand') {
      const cardStr = args['cards'] as string;
      const tokens = cardStr.trim().split(/\s+/);
      if (tokens.length !== 5) {
        return {
          content: [{ type: 'text', text: `[ERR] Provide exactly 5 cards. Got: ${tokens.length}` }],
          isError: true,
        };
      }

      const hand = parseCards(cardStr);
      const result = evaluatePokerHand(hand);
      const stars = '*'.repeat(result.rank);

      let output = `[EVAL] Hand: ${tokens.join(' ')}\n`;
      output += `Rank  : ${stars}\n`;
      output += `Result: ${result.name}\n`;
      output += `Detail: ${result.description}`;

      return { content: [{ type: 'text', text: output }] };
    }

    // -----------------------------------------------------------------------
    // Blackjack
    // -----------------------------------------------------------------------

    if (name === 'playBlackjack') {
      const action = args['action'] as 'deal' | 'hit' | 'stand';
      const deck = shuffleDeck(buildDeck());

      if (action === 'deal') {
        const playerHand = [deck.shift()!, deck.shift()!];
        const dealerHand = [deck.shift()!, deck.shift()!];
        const { value: pVal, soft: pSoft } = blackjackHandValue(playerHand);

        let output = `[BLACKJACK] New Hand\n`;
        output += '='.repeat(35) + '\n';
        output += `Your hand  : ${playerHand.map(cardLabel).join(' ')} = ${pSoft ? 'soft ' : ''}${pVal}\n`;
        output += `Dealer shows: ${cardLabel(dealerHand[0])} + [hidden]\n\n`;

        if (pVal === 21) {
          output += '[BLACKJACK!] You win! (pays 3:2)';
        } else {
          const dealerUp = cardNumericValue(dealerHand[0].rank);
          let advice: string;
          if (pVal <= 11) advice = 'Hit';
          else if (pVal >= 17) advice = 'Stand';
          else if (pVal >= 13 && dealerUp <= 6) advice = 'Stand';
          else if (pVal === 12 && dealerUp >= 4 && dealerUp <= 6) advice = 'Stand';
          else advice = 'Hit';

          output += `Basic strategy: ${advice}\n\n`;
          const pc = playerHand.map(cardLabel).join(' ');
          const dc = cardLabel(dealerHand[0]);
          output += `To hit  : playBlackjack(action:"hit",  playerCards:"${pc}", dealerCards:"${dc}")\n`;
          output += `To stand: playBlackjack(action:"stand", playerCards:"${pc}", dealerCards:"${dc}")`;
        }

        return { content: [{ type: 'text', text: output }] };
      }

      if (action === 'hit') {
        const playerCards = parseCards(args['playerCards'] as string);
        const newCard = deck.shift()!;
        const newHand = [...playerCards, newCard];
        const { value, soft } = blackjackHandValue(newHand);

        let output = `[HIT] Drew: ${cardLabel(newCard)}\n`;
        output += `Your hand: ${newHand.map(cardLabel).join(' ')} = ${soft ? 'soft ' : ''}${value}\n\n`;

        if (value > 21) {
          output += '[BUST] Over 21. You lose.';
        } else if (value === 21) {
          output += '[21] Perfect score -- recommend Stand.';
        } else {
          const dealerStr = (args['dealerCards'] as string) ?? '';
          const dealerUp = dealerStr ? cardNumericValue(parseCards(dealerStr)[0].rank) : 7;
          const advice = value >= 17 ? 'Stand' : dealerUp <= 6 ? 'Stand' : 'Hit';
          const pc = newHand.map(cardLabel).join(' ');
          const dc = dealerStr || 'unknown';
          output += `Basic strategy: ${advice}\n`;
          output += `To hit  : playBlackjack(action:"hit",  playerCards:"${pc}", dealerCards:"${dc}")\n`;
          output += `To stand: playBlackjack(action:"stand", playerCards:"${pc}", dealerCards:"${dc}")`;
        }

        return { content: [{ type: 'text', text: output }] };
      }

      if (action === 'stand') {
        const playerCards = parseCards(args['playerCards'] as string);
        const visibleDealer = parseCards(args['dealerCards'] as string);

        const { value: pVal } = blackjackHandValue(playerCards);

        // Simulate dealer: reveal hidden card then draw to 17
        let dealerHand = [...visibleDealer, deck.shift()!];
        while (blackjackHandValue(dealerHand).value < 17) {
          dealerHand.push(deck.shift()!);
        }
        const { value: dVal } = blackjackHandValue(dealerHand);

        let output = `[STAND] Final Result\n`;
        output += '='.repeat(35) + '\n';
        output += `Your hand  : ${playerCards.map(cardLabel).join(' ')} = ${pVal}\n`;
        output += `Dealer hand: ${dealerHand.map(cardLabel).join(' ')} = ${dVal}\n\n`;

        if (dVal > 21) output += '[WIN] Dealer busts! You win!';
        else if (pVal > dVal) output += `[WIN] You win! (${pVal} vs ${dVal})`;
        else if (pVal < dVal) output += `[LOSE] Dealer wins. (${pVal} vs ${dVal})`;
        else output += `[PUSH] Tie -- bet returned.`;

        return { content: [{ type: 'text', text: output }] };
      }
    }

    return {
      content: [{ type: 'text', text: `Unknown tool: ${name}` }],
      isError: true,
    };
  } catch (err) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${err instanceof Error ? err.message : String(err)}`,
      }],
      isError: true,
    };
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Person App MCP Server v2.0.0 started -- 8 tools: Person CRUD + Dice + Card Games');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
