/**
 * This represents the config.yml
 * @class Config
 * @property {string} token
 * @property {string[]} t3roleID
 * @property {string[]} roles
 */
export default class Config {
    public readonly token: string;

    public readonly t3roleID: string[];

    public readonly roles: string[];

    constructor() {
      this.token = '';
      this.t3roleID = [''];
      this.roles = [''];
    }

  // /**
  //  * @throws {Error} If an attribute is missing from the config.yml
  //  */
  // public static getConfig(): Config {
  //   const fileContents = fs.readFileSync('./config.yml', 'utf-8');
  //   const casted = yaml.safeLoad(fileContents) as Config;

  //   return casted;
  // }
}
