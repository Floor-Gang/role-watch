import fs from 'fs';
import { safeDump, safeLoad } from 'js-yaml';
import { CONFIG } from '../globals';

/**
 * This represents the config.yml
 * @class Config
 * @property {string} token
 * @property {string} prefix
 * @property {string[]} t3roleID
 * @property {string[]} roles
 */
export default class Config {
    public readonly token: string;

    public readonly prefix: string;

    public readonly t3roleID: string[];

    public readonly roles: string[];

    constructor() {
      this.token = '';
      this.prefix = '';
      this.t3roleID = [''];
      this.roles = [''];
    }

    /**
     * @throws {Error} If an attribute is missing from the config.yml
     */
    public static getConfig(): Config {
      const fileContents = fs.readFileSync('./config.yml', 'utf-8');
      const casted = safeLoad(fileContents) as Config;

      return casted;
    }

    public static saveConfig() {
      const save = fs.writeFileSync('./config.yml', safeDump(CONFIG), 'utf8');
      return save;
    }
}
