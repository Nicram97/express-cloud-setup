import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

export class ConfigService {
    static config;

    static loadConfigFile() {
        try {
            const configPath = path.resolve(__dirname, '../../config.yaml');
            this.config = yaml.load(fs.readFileSync(configPath, 'utf-8'));
            return this.config;
        } catch(e) {
            throw new Error('Couldnt load config file');
        }
    }
}