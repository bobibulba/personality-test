export interface Question {
  question: string
  category: string
  emoji?: string
  options: {
    text: string
    value: number
  }[]
}

export const questions: Question[] = [
  {
    question: "It's Saturday morning! What's your first move?",
    category: "Weekend Vibes",
    emoji: "☀️",
    options: [
      { text: "Jump out of bed ready to conquer the world!", value: 1 },
      { text: "Snooze button is my best friend", value: 3 },
      { text: "Meditate and ease into the day peacefully", value: 5 },
      { text: "Check my phone and plan my adventure", value: 2 },
    ]
  },
  {
    question: "Your friend cancels plans last minute. Your reaction?",
    category: "Social Energy",
    emoji: "📱",
    options: [
      { text: "Perfect! More me-time!", value: 5 },
      { text: "Immediately make backup plans with someone else", value: 1 },
      { text: "Feel a bit relieved, actually", value: 4 },
      { text: "Disappointed but I'll survive", value: 3 },
    ]
  },
  {
    question: "Pick your dream vacation:",
    category: "Travel Style",
    emoji: "✈️",
    options: [
      { text: "Backpacking through multiple countries", value: 2 },
      { text: "Luxury resort with all-inclusive everything", value: 4 },
      { text: "Camping in the wilderness", value: 5 },
      { text: "City hopping and museum tours", value: 3 },
    ]
  },
  {
    question: "How do you handle stress?",
    category: "Coping Mechanisms",
    emoji: "😰",
    options: [
      { text: "Talk it out with friends immediately", value: 1 },
      { text: "Exercise or physical activity", value: 2 },
      { text: "Journal or creative expression", value: 4 },
      { text: "Need alone time to process", value: 5 },
    ]
  },
  {
    question: "Your ideal Friday night looks like:",
    category: "Social Life",
    emoji: "🌙",
    options: [
      { text: "House party with all my friends!", value: 1 },
      { text: "Cozy night in with Netflix and snacks", value: 5 },
      { text: "Dinner and drinks at a new restaurant", value: 3 },
      { text: "Concert or live event", value: 2 },
    ]
  },
  {
    question: "When making decisions, you usually:",
    category: "Decision Making",
    emoji: "🤔",
    options: [
      { text: "Go with my gut feeling instantly", value: 2 },
      { text: "Make a pros and cons list", value: 4 },
      { text: "Ask everyone's opinion first", value: 1 },
      { text: "Sleep on it and decide later", value: 5 },
    ]
  },
  {
    question: "Your phone dies at a party. You:",
    category: "Tech Dependency",
    emoji: "🔋",
    options: [
      { text: "Panic! Must find charger immediately!", value: 1 },
      { text: "Actually enjoy being unplugged", value: 5 },
      { text: "Borrow someone's phone to check messages", value: 2 },
      { text: "Feel slightly anxious but manage", value: 3 },
    ]
  },
  {
    question: "Pick your superpower:",
    category: "Fantasy Self",
    emoji: "⚡",
    options: [
      { text: "Flying - freedom and adventure!", value: 2 },
      { text: "Mind reading - understand everyone", value: 4 },
      { text: "Invisibility - observe without being seen", value: 5 },
      { text: "Super strength - help everyone!", value: 1 },
    ]
  },
  {
    question: "Your workspace/room is usually:",
    category: "Personal Space",
    emoji: "🏠",
    options: [
      { text: "Organized chaos - I know where everything is!", value: 2 },
      { text: "Minimalist and clean", value: 5 },
      { text: "Decorated with memories and trinkets", value: 3 },
      { text: "Honestly? A bit messy...", value: 1 },
    ]
  },
  {
    question: "Someone shares exciting news. You:",
    category: "Emotional Response",
    emoji: "🎉",
    options: [
      { text: "Jump up and down with excitement!", value: 1 },
      { text: "Give a warm smile and congratulations", value: 4 },
      { text: "Ask all the details and celebrate together", value: 2 },
      { text: "Feel genuinely happy but express it calmly", value: 5 },
    ]
  },
]
