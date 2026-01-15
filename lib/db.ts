/**
 * Simple in-memory database for URL mappings
 * For production, replace this with a real database (PostgreSQL, MongoDB, etc.)
 */

export interface URLMapping {
  id: string;
  originalUrl: string;
  shortCode: string;
  suspiciousPath: string;
  domain: string;
  createdAt: Date;
  clicks: number;
}

class InMemoryDB {
  private urls: Map<string, URLMapping> = new Map();
  private shortCodeIndex: Map<string, string> = new Map();

  async createURL(mapping: Omit<URLMapping, "createdAt" | "clicks">): Promise<URLMapping> {
    const fullMapping: URLMapping = {
      ...mapping,
      createdAt: new Date(),
      clicks: 0,
    };

    this.urls.set(mapping.id, fullMapping);
    this.shortCodeIndex.set(mapping.shortCode, mapping.id);

    return fullMapping;
  }

  async getURLByShortCode(shortCode: string): Promise<URLMapping | null> {
    const id = this.shortCodeIndex.get(shortCode);
    if (!id) return null;

    return this.urls.get(id) || null;
  }

  async getURLById(id: string): Promise<URLMapping | null> {
    return this.urls.get(id) || null;
  }

  async incrementClicks(shortCode: string): Promise<void> {
    const id = this.shortCodeIndex.get(shortCode);
    if (!id) return;

    const mapping = this.urls.get(id);
    if (mapping) {
      mapping.clicks++;
      this.urls.set(id, mapping);
    }
  }

  async getAllURLs(): Promise<URLMapping[]> {
    return Array.from(this.urls.values());
  }

  async shortCodeExists(shortCode: string): Promise<boolean> {
    return this.shortCodeIndex.has(shortCode);
  }
}

// Singleton instance
export const db = new InMemoryDB();
