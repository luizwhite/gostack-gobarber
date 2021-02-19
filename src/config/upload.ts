import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    // disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, cb) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const normalizedName = file.originalname.replace(/ /g, '_');
        const filename = `${fileHash}-${normalizedName}`;

        cb(null, filename);
      },
    }),
  },

  config: {
    // disk: {},
    aws: {
      bucket: 'app-myown-gobarber',
    },
  },
} as IUploadConfig;
