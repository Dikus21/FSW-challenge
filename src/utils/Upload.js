import multer from 'multer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

console.log("dirname = " + dirname(fileURLToPath(import.meta.url)));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(dirname(fileURLToPath(import.meta.url)), '../../public/asset/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Only images are allowed'));
        }
        cb(null, true);
    }
});
export default upload;