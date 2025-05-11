import { db } from "./db";
import { 
  users, 
  protocols, 
  biometrics, 
  achievements, 
  forumPosts 
} from "@shared/schema";

/**
 * Creates a default user and sample data in the database
 */
async function seed() {
  console.log("Seeding database with initial data...");
  
  try {
    // Check if we already have a default user
    const existingUsers = await db.select().from(users);
    
    if (existingUsers.length > 0) {
      console.log("Database already has users. Skipping seed.");
      return;
    }
    
    // Create default user
    console.log("Creating default user...");
    const [defaultUser] = await db.insert(users).values({
      username: "johndoe",
      password: "password123", // Note: In a real app, this would be hashed
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      biohackScore: 78,
      currentStreak: 12,
      lastCheckIn: new Date(),
      createdAt: new Date()
    }).returning();
    
    console.log(`Created user: ${defaultUser.firstName} ${defaultUser.lastName}`);
    
    // Create sample protocols
    console.log("Creating sample protocols...");
    const protocolsData = [
      {
        userId: defaultUser.id,
        name: "Morning Cold Exposure",
        description: "5-minute cold shower every morning to boost immunity and energy",
        duration: 30,
        currentDay: 8,
        isCompleted: false,
        isActive: true,
        createdAt: new Date()
      },
      {
        userId: defaultUser.id,
        name: "Meditation & Breathwork",
        description: "10-minute meditation and breathwork routine",
        duration: 14,
        currentDay: 12,
        isCompleted: false,
        isActive: true,
        createdAt: new Date()
      },
      {
        userId: defaultUser.id,
        name: "Nootropic Stack",
        description: "Daily nootropic stack for cognitive enhancement",
        duration: 21,
        currentDay: 5,
        isCompleted: false,
        isActive: true,
        createdAt: new Date()
      },
      {
        userId: defaultUser.id,
        name: "Intermittent Fasting",
        description: "16:8 intermittent fasting protocol",
        duration: 30,
        currentDay: 3,
        isCompleted: false,
        isActive: true,
        createdAt: new Date()
      }
    ];
    
    await db.insert(protocols).values(protocolsData);
    
    // Create sample biometrics
    console.log("Creating sample biometrics...");
    const today = new Date();
    const biometricsData = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const sleepQuality = Math.floor(75 + Math.random() * 15);
      const energyLevel = Math.floor(65 + Math.random() * 15);
      
      biometricsData.push({
        userId: defaultUser.id,
        date,
        sleepQuality,
        energyLevel,
        stressLevel: Math.floor(30 + Math.random() * 40),
        focusLevel: Math.floor(60 + Math.random() * 30),
        moodLevel: Math.floor(65 + Math.random() * 25),
        notes: ""
      });
    }
    
    await db.insert(biometrics).values(biometricsData);
    
    // Create sample achievements
    console.log("Creating sample achievements...");
    const achievementsData = [
      {
        userId: defaultUser.id,
        name: "30-Day Streak",
        description: "Completed protocols for 30 days in a row",
        points: 25,
        completedAt: new Date(new Date().setDate(today.getDate() - 2))
      },
      {
        userId: defaultUser.id,
        name: "Protocol Master",
        description: "Completed 5 protocols successfully",
        points: 40,
        completedAt: new Date(new Date().setDate(today.getDate() - 7))
      }
    ];
    
    await db.insert(achievements).values(achievementsData);
    
    // Create sample forum posts
    console.log("Creating sample forum posts...");
    const forumPostsData = [
      {
        userId: defaultUser.id,
        title: "Anyone tried Lion's Mane + Bacopa stack?",
        content: "I've been researching cognitive enhancement supplements and this combo keeps coming up. Has anyone here tried it and what were your results?",
        category: "Cognitive Enhancement",
        commentCount: 24,
        createdAt: new Date(new Date().setHours(today.getHours() - 2))
      },
      {
        userId: defaultUser.id,
        title: "My experience with sleep tracking rings",
        content: "I've been using a sleep tracking ring for 3 months now and here's what I've learned...",
        category: "Sleep Optimization",
        commentCount: 18,
        createdAt: new Date(new Date().setHours(today.getHours() - 5))
      },
      {
        userId: defaultUser.id,
        title: "Intermittent fasting results (3 months)",
        content: "I've been doing intermittent fasting for the last 3 months and wanted to share my results with the community.",
        category: "Nutrition",
        commentCount: 32,
        createdAt: new Date(new Date().setDate(today.getDate() - 1))
      }
    ];
    
    await db.insert(forumPosts).values(forumPostsData);
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Export the seed function
export default seed;