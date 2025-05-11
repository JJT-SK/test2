// Mock API for GitHub Pages deployment
// Since GitHub Pages only serves static content, we need to mock the API responses

import { User, Protocol, Achievement, ForumPost, Biometric } from "@shared/schema";

// Sample user data
const defaultUser: User = {
  id: 1,
  username: "johndoe",
  password: "password123", // In a real app, this wouldn't be exposed to the client
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  biohackScore: 78,
  currentStreak: 12,
  lastCheckIn: new Date(),
  createdAt: new Date()
};

// Sample protocols
const protocols: Protocol[] = [
  {
    id: 1,
    userId: 1,
    name: "Morning Cold Exposure",
    description: "5-minute cold shower every morning to boost immunity and energy",
    duration: 30,
    currentDay: 8,
    isCompleted: false,
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 2,
    userId: 1,
    name: "Meditation & Breathwork",
    description: "10-minute meditation and breathwork routine",
    duration: 14,
    currentDay: 12,
    isCompleted: false,
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 3,
    userId: 1,
    name: "Nootropic Stack",
    description: "Daily nootropic stack for cognitive enhancement",
    duration: 21,
    currentDay: 5,
    isCompleted: false,
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 4,
    userId: 1,
    name: "Intermittent Fasting",
    description: "16:8 intermittent fasting protocol",
    duration: 30,
    currentDay: 3,
    isCompleted: false,
    isActive: true,
    createdAt: new Date()
  }
];

// Sample biometrics
const generateBiometrics = () => {
  const biometrics: Biometric[] = [];
  const today = new Date();
  const days = 30;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const sleepQuality = Math.floor(75 + Math.random() * 15);
    const energyLevel = Math.floor(65 + Math.random() * 15);
    
    biometrics.push({
      id: i + 1,
      userId: 1,
      date,
      sleepQuality,
      energyLevel,
      stressLevel: Math.floor(30 + Math.random() * 40),
      focusLevel: Math.floor(60 + Math.random() * 30),
      moodLevel: Math.floor(65 + Math.random() * 25),
      notes: ""
    });
  }
  
  return biometrics;
};

// Sample achievements
const achievements: Achievement[] = [
  {
    id: 1,
    userId: 1,
    name: "30-Day Streak",
    description: "Completed protocols for 30 days in a row",
    points: 25,
    completedAt: new Date(new Date().setDate(new Date().getDate() - 2))
  },
  {
    id: 2,
    userId: 1,
    name: "Protocol Master",
    description: "Completed 5 protocols successfully",
    points: 40,
    completedAt: new Date(new Date().setDate(new Date().getDate() - 7))
  }
];

// Sample forum posts
const forumPosts: ForumPost[] = [
  {
    id: 1,
    userId: 1,
    title: "Anyone tried Lion's Mane + Bacopa stack?",
    content: "I've been researching cognitive enhancement supplements and this combo keeps coming up. Has anyone here tried it and what were your results?",
    category: "Cognitive Enhancement",
    commentCount: 24,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 2))
  },
  {
    id: 2,
    userId: 1,
    title: "My experience with sleep tracking rings",
    content: "I've been using a sleep tracking ring for 3 months now and here's what I've learned...",
    category: "Sleep Optimization",
    commentCount: 18,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 5))
  },
  {
    id: 3,
    userId: 1,
    title: "Intermittent fasting results (3 months)",
    content: "I've been doing intermittent fasting for the last 3 months and wanted to share my results with the community.",
    category: "Nutrition",
    commentCount: 32,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
  }
];

// Generate biometrics data
const biometrics = generateBiometrics();

// Mock API interface
export const mockApi = {
  getUser: async (id: number): Promise<User> => {
    if (id === 1) {
      return {...defaultUser};
    }
    throw new Error("User not found");
  },
  
  getActiveProtocols: async (userId: number): Promise<Protocol[]> => {
    if (userId === 1) {
      return protocols.filter(p => p.userId === userId && p.isActive);
    }
    return [];
  },
  
  checkInProtocol: async (protocolId: number): Promise<Protocol> => {
    const protocol = protocols.find(p => p.id === protocolId);
    if (!protocol) {
      throw new Error("Protocol not found");
    }
    
    // Safely increment with nullish coalescing
    protocol.currentDay = (protocol.currentDay ?? 0) + 1;
    protocol.isCompleted = (protocol.currentDay ?? 0) > (protocol.duration ?? 0);
    
    // Update user streak
    defaultUser.currentStreak = (defaultUser.currentStreak ?? 0) + 1;
    defaultUser.lastCheckIn = new Date();
    
    return protocol;
  },
  
  createProtocol: async (data: { name: string; description: string; duration: number; userId: number }): Promise<Protocol> => {
    const newId = protocols.length + 1;
    const newProtocol: Protocol = {
      id: newId,
      userId: data.userId,
      name: data.name,
      description: data.description,
      duration: data.duration,
      currentDay: 1,
      isCompleted: false,
      isActive: true,
      createdAt: new Date()
    };
    
    protocols.push(newProtocol);
    return newProtocol;
  },
  
  getBiometrics: async (userId: number, days: number = 30): Promise<Biometric[]> => {
    if (userId === 1) {
      return biometrics.slice(0, days);
    }
    return [];
  },
  
  getAchievements: async (userId: number): Promise<Achievement[]> => {
    if (userId === 1) {
      return achievements;
    }
    return [];
  },
  
  getForumPosts: async (): Promise<ForumPost[]> => {
    return forumPosts;
  },
  
  getForumPostsByCategory: async (category: string): Promise<ForumPost[]> => {
    return forumPosts.filter(post => post.category === category);
  },
  
  createForumPost: async (data: { title: string; content: string; category: string; userId: number }): Promise<ForumPost> => {
    const newId = forumPosts.length + 1;
    const newPost: ForumPost = {
      id: newId,
      userId: data.userId,
      title: data.title,
      content: data.content,
      category: data.category,
      commentCount: 0,
      createdAt: new Date()
    };
    
    forumPosts.push(newPost);
    return newPost;
  },
  
  checkIn: async (data: { 
    userId: number;
    biometrics: {
      sleepQuality?: number;
      energyLevel?: number;
      stressLevel?: number;
      focusLevel?: number;
      moodLevel?: number;
    }
  }): Promise<{ message: string; biometric: Biometric }> => {
    const newId = biometrics.length + 1;
    const newBiometric: Biometric = {
      id: newId,
      userId: data.userId,
      date: new Date(),
      sleepQuality: data.biometrics.sleepQuality,
      energyLevel: data.biometrics.energyLevel,
      stressLevel: data.biometrics.stressLevel,
      focusLevel: data.biometrics.focusLevel,
      moodLevel: data.biometrics.moodLevel,
      notes: ""
    };
    
    biometrics.unshift(newBiometric);
    
    // Update user
    defaultUser.lastCheckIn = new Date();
    defaultUser.currentStreak += 1;
    
    // Calculate new biohack score based on recent biometrics
    const recentMetrics = biometrics.slice(0, 7);
    if (recentMetrics.length > 0) {
      let scoreSum = 0;
      recentMetrics.forEach(b => {
        const metricSum = (b.sleepQuality || 0) + 
                        (b.energyLevel || 0) + 
                        (100 - (b.stressLevel || 0)) + 
                        (b.focusLevel || 0) + 
                        (b.moodLevel || 0);
        scoreSum += metricSum / 5;
      });
      
      defaultUser.biohackScore = Math.round(scoreSum / recentMetrics.length);
    }
    
    return {
      message: "Check-in successful",
      biometric: newBiometric
    };
  }
};