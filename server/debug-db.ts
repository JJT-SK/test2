import { db } from "./db";
import { 
  users, 
  protocols, 
  protocolCheckIns, 
  biometrics, 
  achievements, 
  forumPosts, 
  forumComments 
} from "@shared/schema";

/**
 * Debug script to list all database tables and their contents
 */
async function debugDb() {
  console.log("=========================================");
  console.log("DATABASE DEBUG - LISTING ALL TABLE CONTENTS");
  console.log("=========================================");
  
  try {
    // Users
    console.log("\n📋 USERS TABLE:");
    const allUsers = await db.select().from(users);
    console.log(`Found ${allUsers.length} users`);
    allUsers.forEach(user => {
      console.log(`  - User #${user.id}: ${user.username} (${user.firstName} ${user.lastName})`);
    });
    
    // Protocols
    console.log("\n📋 PROTOCOLS TABLE:");
    const allProtocols = await db.select().from(protocols);
    console.log(`Found ${allProtocols.length} protocols`);
    allProtocols.forEach(protocol => {
      console.log(`  - Protocol #${protocol.id}: ${protocol.name} (User #${protocol.userId})`);
    });
    
    // Protocol check-ins
    console.log("\n📋 PROTOCOL CHECK-INS TABLE:");
    const allCheckIns = await db.select().from(protocolCheckIns);
    console.log(`Found ${allCheckIns.length} protocol check-ins`);
    
    // Biometrics
    console.log("\n📋 BIOMETRICS TABLE:");
    const allBiometrics = await db.select().from(biometrics);
    console.log(`Found ${allBiometrics.length} biometric entries`);
    
    // Achievements
    console.log("\n📋 ACHIEVEMENTS TABLE:");
    const allAchievements = await db.select().from(achievements);
    console.log(`Found ${allAchievements.length} achievements`);
    
    // Forum posts
    console.log("\n📋 FORUM POSTS TABLE:");
    const allPosts = await db.select().from(forumPosts);
    console.log(`Found ${allPosts.length} forum posts`);
    
    // Forum comments
    console.log("\n📋 FORUM COMMENTS TABLE:");
    const allComments = await db.select().from(forumComments);
    console.log(`Found ${allComments.length} forum comments`);
    
  } catch (error) {
    console.error("Error debugging database:", error);
  }
  
  console.log("\n=========================================");
}

// Run the debug function
debugDb().catch(console.error);