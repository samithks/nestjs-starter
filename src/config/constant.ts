import { homedir } from 'os';
import { join } from 'path';

// Constants
export const ENV_PATH = join(homedir(), 'env/nestjs-starter/.env'); // Env Path