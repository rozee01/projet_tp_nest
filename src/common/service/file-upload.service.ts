import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
    private readonly uploadFolder = 'uploads';

    saveFile(file: Express.Multer.File): string {
        const filePath = path.join(this.uploadFolder, file.originalname);
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    }

    getFilePath(filename: string): string {
        return path.join(this.uploadFolder, filename);
    }
}
