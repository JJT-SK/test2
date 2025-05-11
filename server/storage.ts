import {
  users, type User, type InsertUser,
  protocols, type Protocol, type InsertProtocol,
  protocolCheckIns, type ProtocolCheckIn, type InsertProtocolCheckIn,
  biometrics, type Biometric, type InsertBiometric,
  achievements, type Achievement, type InsertAchievement,
  forumPosts, type ForumPost, type InsertForumPost,
  forumComments, type ForumComment, type InsertForumComment
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, lte, gte } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Protocol operations
  getProtocols(userId: number): Promise<Protocol[]>;
  getActiveProtocols(userId: number): Promise<Protocol[]>;
  getProtocol(id: number): Promise<Protocol | undefined>;
  createProtocol(protocol: InsertProtocol): Promise<Protocol>;
  updateProtocol(id: number, protocolData: Partial<Protocol>): Promise<Protocol | undefined>;
  deleteProtocol(id: number): Promise<boolean>;
  
  // Protocol check-in operations
  createProtocolCheckIn(checkIn: InsertProtocolCheckIn): Promise<ProtocolCheckIn>;
  getProtocolCheckIns(protocolId: number): Promise<ProtocolCheckIn[]>;
  
  // Biometric operations
  createBiometric(biometric: InsertBiometric): Promise<Biometric>;
  getBiometrics(userId: number): Promise<Biometric[]>;
  getRecentBiometrics(userId: number, days: number): Promise<Biometric[]>;
  
  // Achievement operations
  getAchievements(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // Forum operations
  getForumPosts(): Promise<ForumPost[]>;
  getForumPostsByCategory(category: string): Promise<ForumPost[]>;
  getForumPost(id: number): Promise<ForumPost | undefined>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
  
  // Forum comment operations
  getForumComments(postId: number): Promise<ForumComment[]>;
  createForumComment(comment: InsertForumComment): Promise<ForumComment>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getProtocols(userId: number): Promise<Protocol[]> {
    return await db
      .select()
      .from(protocols)
      .where(eq(protocols.userId, userId))
      .orderBy(desc(protocols.createdAt));
  }

  async getActiveProtocols(userId: number): Promise<Protocol[]> {
    return await db
      .select()
      .from(protocols)
      .where(and(
        eq(protocols.userId, userId),
        eq(protocols.isCompleted, false)
      ))
      .orderBy(desc(protocols.createdAt));
  }

  async getProtocol(id: number): Promise<Protocol | undefined> {
    const [protocol] = await db
      .select()
      .from(protocols)
      .where(eq(protocols.id, id));
    return protocol;
  }

  async createProtocol(insertProtocol: InsertProtocol): Promise<Protocol> {
    const [protocol] = await db
      .insert(protocols)
      .values(insertProtocol)
      .returning();
    return protocol;
  }

  async updateProtocol(id: number, protocolData: Partial<Protocol>): Promise<Protocol | undefined> {
    const [protocol] = await db
      .update(protocols)
      .set(protocolData)
      .where(eq(protocols.id, id))
      .returning();
    return protocol;
  }

  async deleteProtocol(id: number): Promise<boolean> {
    const result = await db
      .delete(protocols)
      .where(eq(protocols.id, id))
      .returning({ id: protocols.id });
    return result.length > 0;
  }

  async createProtocolCheckIn(insertCheckIn: InsertProtocolCheckIn): Promise<ProtocolCheckIn> {
    const [checkIn] = await db
      .insert(protocolCheckIns)
      .values(insertCheckIn)
      .returning();
    return checkIn;
  }

  async getProtocolCheckIns(protocolId: number): Promise<ProtocolCheckIn[]> {
    return await db
      .select()
      .from(protocolCheckIns)
      .where(eq(protocolCheckIns.protocolId, protocolId))
      .orderBy(desc(protocolCheckIns.createdAt));
  }

  async createBiometric(insertBiometric: InsertBiometric): Promise<Biometric> {
    const [biometric] = await db
      .insert(biometrics)
      .values(insertBiometric)
      .returning();
    return biometric;
  }

  async getBiometrics(userId: number): Promise<Biometric[]> {
    return await db
      .select()
      .from(biometrics)
      .where(eq(biometrics.userId, userId))
      .orderBy(desc(biometrics.date));
  }

  async getRecentBiometrics(userId: number, days: number): Promise<Biometric[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    return await db
      .select()
      .from(biometrics)
      .where(and(
        eq(biometrics.userId, userId),
        gte(biometrics.date, date)
      ))
      .orderBy(desc(biometrics.date));
  }

  async getAchievements(userId: number): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId))
      .orderBy(desc(achievements.unlockedAt));
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db
      .insert(achievements)
      .values(insertAchievement)
      .returning();
    return achievement;
  }

  async getForumPosts(): Promise<ForumPost[]> {
    return await db
      .select()
      .from(forumPosts)
      .orderBy(desc(forumPosts.createdAt));
  }

  async getForumPostsByCategory(category: string): Promise<ForumPost[]> {
    return await db
      .select()
      .from(forumPosts)
      .where(eq(forumPosts.category, category))
      .orderBy(desc(forumPosts.createdAt));
  }

  async getForumPost(id: number): Promise<ForumPost | undefined> {
    const [post] = await db
      .select()
      .from(forumPosts)
      .where(eq(forumPosts.id, id));
    return post;
  }

  async createForumPost(insertPost: InsertForumPost): Promise<ForumPost> {
    const [post] = await db
      .insert(forumPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getForumComments(postId: number): Promise<ForumComment[]> {
    return await db
      .select()
      .from(forumComments)
      .where(eq(forumComments.postId, postId))
      .orderBy(desc(forumComments.createdAt));
  }

  async createForumComment(insertComment: InsertForumComment): Promise<ForumComment> {
    const [comment] = await db
      .insert(forumComments)
      .values(insertComment)
      .returning();
    return comment;
  }
}

export const storage = new DatabaseStorage();