import {
  Home,
  Compass,
  PlusSquare,
  MessageCircle,
  Bell,
  User,
  Settings
} from "lucide-react"

export const CURRENT_USER = {
  id: "u1",
  name: "Alex Rivera",
  username: "@arivera",
  avatarUrl: "https://picsum.photos/id/64/200/200",
  isVerified: true,
  bio: "Frontend Wizard 🧙‍♂️ | React & Tailwind Enthusiast",
  stats: {
    posts: 42,
    followers: "12.5k",
    following: 340
  }
}

export const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Explore", icon: Compass, path: "/explore" },
  { label: "Create", icon: PlusSquare, path: "/create-post" },
  { label: "Messages", icon: MessageCircle, path: "/messages", badge: 3 },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Settings", icon: Settings, path: "/settings" }
]

export const SUGGESTED_USERS = [
  {
    id: "u2",
    name: "Nitin Singh",
    username: "@red_x",
    avatarUrl: "https://picsum.photos/id/65/200/200",
    isVerified: true
  },
  {
    id: "u3",
    name: "Tiwari",
    username: "@chutiya_boy",
    avatarUrl: "https://picsum.photos/id/91/200/200",
    isVerified: false
  },
  {
    id: "u4",
    name: "Panda",
    username: "@panda_here",
    avatarUrl: "https://picsum.photos/id/129/200/200",
    isVerified: false
  }
]

export const TRENDING_TOPICS = [
  { tag: "#CosmicUI", posts: "12.5k" },
  { tag: "#React19", posts: "8.2k" },
  { tag: "#GeminiAI", posts: "5.1k" },
  { tag: "#WebDesign", posts: "3.4k" },
  { tag: "#SpaceX", posts: "2.9k" }
]

export const MOCK_POSTS = [
  {
    id: "p1",
    user: {
      id: "u2",
      name: "Sarah Chen",
      username: "@schen_dev",
      avatarUrl: "https://picsum.photos/id/65/200/200",
      isVerified: true
    },
    content:
      "Just finished the new dashboard design using React and Tailwind. The glassmorphism effect is subtle but adds so much depth! 🌌✨ What do you think?",
    imageUrl: "https://picsum.photos/id/42/800/500",
    timestamp: "2h ago",
    likes: 1240,
    commentsCount: 45,
    isLiked: false,
    isBookmarked: true,
    comments: [
      {
        id: "c1",
        user: {
          id: "u3",
          name: "Marcus Joy",
          username: "@marcus_j",
          avatarUrl: "https://picsum.photos/id/91/200/200"
        },
        text: "This looks absolutely stunning! The gradients are on point.",
        timestamp: "1h ago",
        likes: 24,
        replies: []
      }
    ]
  },
  {
    id: "p2",
    user: {
      id: "u4",
      name: "Elara Vance",
      username: "@elara_v",
      avatarUrl: "https://picsum.photos/id/129/200/200",
      isVerified: false
    },
    content:
      "Night photography is all about capturing the light that others miss. 📸 Took this on my hike yesterday. #NightOwl #Photography",
    imageUrl: "https://picsum.photos/id/16/800/600",
    timestamp: "5h ago",
    likes: 856,
    commentsCount: 12,
    isLiked: true,
    isBookmarked: false,
    comments: []
  },
  {
    id: "p3",
    user: CURRENT_USER,
    content:
      "Working on the next big update for Connect! 🚀 Stay tuned for some cosmic features.",
    timestamp: "Just now",
    likes: 5,
    commentsCount: 0,
    isLiked: false,
    isBookmarked: false,
    comments: []
  }
]
