import { PersonalityType } from '../App'

export interface Personality {
  name: string
  emoji: string
  tagline: string
  description: string
  color: string
  secondaryColor: string
  strengths: string[]
  weaknesses: string[]
  perfectDay: string
  famousMatches: string[]
}

export const personalities: Record<PersonalityType, Personality> = {
  sunshine: {
    name: "Sunshine Sparkle",
    emoji: "☀️",
    tagline: "You light up every room you enter!",
    description: "You're the human equivalent of a golden retriever - enthusiastic, warm, and absolutely impossible not to love! Your energy is contagious, and people are naturally drawn to your positive vibes. You see the best in everyone and everything, making the world a brighter place just by being in it.",
    color: "yellow",
    secondaryColor: "coral",
    strengths: [
      "Infectious optimism that lifts everyone's mood",
      "Natural ability to make friends instantly",
      "See opportunities where others see obstacles",
      "Genuine enthusiasm for life's little moments",
      "Loyal friend who always shows up"
    ],
    weaknesses: [
      "Sometimes ignore red flags in people",
      "Can be too trusting",
      "Struggle with saying no",
      "May avoid difficult conversations",
      "Burn out from giving too much energy"
    ],
    perfectDay: "Wake up early to catch the sunrise, spontaneous brunch with friends, afternoon adventure to somewhere new, evening game night with your favorite people, and falling asleep with a smile knowing you made someone's day better.",
    famousMatches: ["Leslie Knope", "SpongeBob", "Ted Lasso", "Rapunzel", "Buddy the Elf"]
  },
  cosmic: {
    name: "Cosmic Dreamer",
    emoji: "🌙",
    tagline: "Your head's in the clouds, and that's where magic happens!",
    description: "You're a beautiful blend of creativity and mystery. Your mind works in ways others can't quite understand, connecting dots that seem invisible to everyone else. You're the friend who has the most interesting perspectives and can turn any conversation into something profound.",
    color: "purple",
    secondaryColor: "cyan",
    strengths: [
      "Incredibly creative and imaginative",
      "Deep thinker who sees beyond the surface",
      "Unique perspective on everything",
      "Artistic soul with multiple talents",
      "Comfortable with ambiguity and mystery"
    ],
    weaknesses: [
      "Can get lost in your own thoughts",
      "Sometimes struggle with practical matters",
      "May seem distant or distracted",
      "Difficulty with strict routines",
      "Overthink simple decisions"
    ],
    perfectDay: "Sleep in late, spend the morning creating something (art, music, writing), afternoon lost in a bookstore or museum, evening stargazing while having deep conversations about the universe, and falling asleep to ambient music.",
    famousMatches: ["Luna Lovegood", "Willy Wonka", "Amélie", "Doctor Who", "Björk"]
  },
  forest: {
    name: "Forest Soul",
    emoji: "🌲",
    tagline: "Grounded, wise, and deeply connected to what matters!",
    description: "You're the calm in everyone's storm. Like a ancient tree, you're deeply rooted in your values and provide shelter for those who need it. You have an old soul wisdom that makes people feel safe and understood. Your presence is healing, and you have a natural ability to help others find their center.",
    color: "lime",
    secondaryColor: "yellow",
    strengths: [
      "Incredibly patient and understanding",
      "Natural healer and listener",
      "Strong moral compass",
      "Environmentally conscious",
      "Authentic and genuine in all relationships"
    ],
    weaknesses: [
      "Can be too self-sacrificing",
      "Struggle with change",
      "May hold grudges longer than healthy",
      "Sometimes too serious",
      "Difficulty asking for help"
    ],
    perfectDay: "Morning hike in nature, afternoon reading under a tree, cooking a wholesome meal from scratch, evening with close friends around a fire, and falling asleep to the sound of rain.",
    famousMatches: ["Treebeard", "Bob Ross", "Pocahontas", "Aragorn", "Jane Goodall"]
  },
  ocean: {
    name: "Ocean Wave",
    emoji: "🌊",
    tagline: "Deep, mysterious, and full of hidden treasures!",
    description: "You're complex and ever-changing, just like the ocean. On the surface, you might seem calm and collected, but there's so much depth beneath. You feel everything intensely and have a rich inner world. People are fascinated by you because they sense there's always more to discover.",
    color: "cyan",
    secondaryColor: "purple",
    strengths: [
      "Emotionally intelligent and empathetic",
      "Adaptable to different situations",
      "Deep capacity for love and connection",
      "Intuitive understanding of others",
      "Creative problem solver"
    ],
    weaknesses: [
      "Mood swings like the tides",
      "Can be overly sensitive",
      "Tendency to retreat when hurt",
      "Difficulty expressing needs clearly",
      "May hold emotions in too long"
    ],
    perfectDay: "Morning meditation by water, afternoon exploring tide pools or aquarium, creative project that expresses your feelings, evening with intimate conversation with someone you trust, and falling asleep to ocean sounds.",
    famousMatches: ["Moana", "Ariel", "Percy Jackson", "Aquaman", "Finding Nemo's Dory"]
  },
  fire: {
    name: "Fire Spirit",
    emoji: "🔥",
    tagline: "Passionate, bold, and absolutely unstoppable!",
    description: "You're pure energy and determination! When you set your mind to something, nothing can stand in your way. You're the friend who inspires others to be brave, take risks, and live life to the fullest. Your passion is your superpower, and you light a fire under everyone around you.",
    color: "coral",
    secondaryColor: "orange",
    strengths: [
      "Fearless and courageous",
      "Natural leader who inspires action",
      "Passionate about your beliefs",
      "Quick decision maker",
      "Energetic and motivating presence"
    ],
    weaknesses: [
      "Can be impulsive",
      "Sometimes too intense for others",
      "Struggle with patience",
      "May burn bridges when angry",
      "Difficulty with slow-paced activities"
    ],
    perfectDay: "Early morning workout, tackling a challenging project, afternoon adventure sport or competition, evening dancing or high-energy social event, and falling asleep exhausted but satisfied from a day well-lived.",
    famousMatches: ["Merida", "Tony Stark", "Katniss Everdeen", "The Flash", "Mulan"]
  }
}
