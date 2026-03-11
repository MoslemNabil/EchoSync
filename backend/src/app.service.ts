import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getCleanedData(): Promise<any[]> {
    try {
      const cleanedPath = path.join(process.cwd(), '..', 'cleaned_data.csv');
      const content = await fs.readFile(cleanedPath, 'utf-8');
      
      // Simple CSV to JSON parser for this specific file
      const lines = content.trim().split('\n');
      const headers = lines[0].split(',');
      
      return lines.slice(1).map(line => {
        const parts = line.split(',');
        // The second part might contain commas if not escaped properly, 
        // but for our simple cleaner, it's usually fine.
        return {
          timestamp: parts[0],
          text: parts.slice(1).join(',')
        };
      });
    } catch (error) {
      // If file doesn't exist yet
      return [];
    }
  }
}
