export interface OverallChatStats {
  totalMessages: number;
  meMessages: number;
  pattiMessages: number;
  uniqueWords: number;
  analyzedWords: number;
  totalEmojis: number;
  mediaMessages: number;
  deletedMessages: number;
  editedMessages: number;
}

export interface IndividualStat {
  id: "me" | "patti";
  name: string;
  avatar: string;
  tag: string;
  totalMessages: number;
  percentage: number;
  totalWords: number;
  uniqueWords: number;
  totalEmojis: number;
  mostUsedWord: { word: string; count: number };
  mostUsedEmoji: { emoji: string; count: number };
  mostActiveTime: string;
  loveWordsUsed: number;
  avgMessageLength: number; // average words per message
}

export interface ChatRecordsData {
  totalMessages: number;
  mediaMessages: number;
  deletedMessages: number;
  editedMessages: number;
}

export const overallChatStats: OverallChatStats = {
  totalMessages: 54570,
  meMessages: 27254,
  pattiMessages: 27316,
  uniqueWords: 9221,
  analyzedWords: 151745,
  totalEmojis: 40219,
  mediaMessages: 1528,
  deletedMessages: 26,
  editedMessages: 695,
};

export const chatRecords: ChatRecordsData = {
  totalMessages: 54570,
  mediaMessages: 1528,
  deletedMessages: 26,
  editedMessages: 695,
};

export const individualStats: Record<"me" | "patti", IndividualStat> = {
  me: {
    id: "me",
    name: "Me",
    avatar: "🌑",
    tag: "🌑 Me",
    totalMessages: 27254,
    percentage: 49.94,
    totalWords: 75410,
    uniqueWords: 5420,
    totalEmojis: 22739,
    mostUsedWord: { word: "mm", count: 3210 },
    mostUsedEmoji: { emoji: "💋", count: 13809 },
    mostActiveTime: "9 PM",
    loveWordsUsed: 1085,
    avgMessageLength: 2.77,
  },
  patti: {
    id: "patti",
    name: "Patti kutti",
    avatar: "🐶",
    tag: "🐶 Patti kutti",
    totalMessages: 27316,
    percentage: 50.06,
    totalWords: 76335,
    uniqueWords: 5810,
    totalEmojis: 17480,
    mostUsedWord: { word: "ahh", count: 2840 },
    mostUsedEmoji: { emoji: "💋", count: 8099 },
    mostActiveTime: "9 PM",
    loveWordsUsed: 1023,
    avgMessageLength: 2.79,
  },
};
