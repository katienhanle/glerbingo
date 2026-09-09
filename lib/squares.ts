export type SquareDef = {
  id: number;
  label: string;
  shortLabel: string;
};

// 4x4 grid, row-major (row 0 = top row, index 0-3 / 4-7 / 8-11 / 12-15)
export const SQUARES: SquareDef[] = [
  { id: 0, label: "Selfie w/ Lucas & Katie", shortLabel: "Selfie" },
  { id: 1, label: "Read a book/comic from the shelf", shortLabel: "Read" },
  { id: 2, label: "Trade a fun fact with someone", shortLabel: "Fun fact" },
  { id: 3, label: "Find someone who works in tech", shortLabel: "Tech" },

  { id: 4, label: "Exchange socials with a new friend", shortLabel: "Socials" },
  { id: 5, label: "Ask someone for a song recc + Screenshot it", shortLabel: "Song" },
  { id: 6, label: "Find someone born in the same month", shortLabel: "Birthday" },
  { id: 7, label: "Take a cute candid photo of someone", shortLabel: "Candid" },

  { id: 8, label: "Meet someone invited by the other roomie", shortLabel: "Roomie" },
  { id: 9, label: "Play/learn a game of mahjong", shortLabel: "Mahjong" },
  { id: 10, label: "Meet someone born in another country", shortLabel: "Abroad" },
  { id: 11, label: "Learn a dance move from someone", shortLabel: "Dance" },

  { id: 12, label: "Take a Group Photo/Selfie w/ 4-5 ppl", shortLabel: "Group" },
  { id: 13, label: "Do a Tarot card reading for a stranger", shortLabel: "Tarot" },
  { id: 14, label: "Pour/Serve someone a drink/food", shortLabel: "Serve" },
  { id: 15, label: "Introduce 2 People Who Haven't Met", shortLabel: "Intro" },
];

export const GRID_SIZE = 4;
