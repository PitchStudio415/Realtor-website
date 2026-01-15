import { type User, type InsertUser, type Contact, type InsertContact, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletters(): Promise<Newsletter[]>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private newsletters: Map<string, Newsletter>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      phone: insertContact.phone || null,
      timeline: insertContact.timeline || null,
      city: insertContact.city || null,
      message: insertContact.message || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const existing = await this.getNewsletterByEmail(insertNewsletter.email);
    if (existing) {
      return existing;
    }
    
    const id = randomUUID();
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      createdAt: new Date(),
      source: insertNewsletter.source || null
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletters(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (n) => n.email.toLowerCase() === email.toLowerCase()
    );
  }
}

export const storage = new MemStorage();
