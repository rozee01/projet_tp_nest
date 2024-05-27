import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
    dest: './uploads',
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            if (file.mimetype.match(/\/(pdf|docx|pptx)$/)) {
                const filename: string = Date.now() + extname(file.originalname);
                callback(null, filename);
            } else {
                callback(new Error('File not supported'), file.originalname);
            }
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(pdf|docx|pptx)$/)) {
            callback(null, true);
        } else {
            callback(new Error('File not supported'), false);
        }
    },
};
