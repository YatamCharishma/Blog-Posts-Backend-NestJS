import { promises as fs } from 'fs';
import * as path from 'path';

export class FileDB<T> {
    private filePath: string;

    constructor(fileName: string) {
        this.filePath = path.join(process.cwd(), 'data', fileName);
    }

    async read(): Promise<T[]> {
        const data = await fs.readFile(this.filePath, 'utf8');
        return JSON.parse(data) as T[];
    }

    async write(data: T[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async findById(id: number): Promise<T | undefined> {
        const all = await this.read();
        return all.find((item: any) => item.id === id);
    }

    async insert(newItem: T): Promise<void> {
        const all = await this.read();
        all.push(newItem);
        await this.write(all);
    }

    async update(id: number, updatedFields: Partial<T>): Promise<void> {
        const all = await this.read();
        const index = all.findIndex((item: any) => item.id === id);
        if (index === -1) return;
        all[index] = { ...all[index], ...updatedFields };
        await this.write(all);
    }

    async delete(id: number): Promise<void> {
        const all = await this.read();
        const filtered = all.filter((item: any) => item.id !== id);
        await this.write(filtered);
    }
}