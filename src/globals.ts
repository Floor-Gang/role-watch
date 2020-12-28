import { safeLoad } from 'js-yaml';
import fs from 'fs';
import Config from './config/config';

export const doc = safeLoad(fs.readFileSync('./config.yml', 'utf8')) as Config;

// export const CONFIG = Config.getConfig();
