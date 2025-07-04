const dotenv = require('dotenv');
const { execSync } = require('child_process');

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || '.env.test' });

module.exports = async () => {
    console.log('🧪 Using DB:', process.env.DATABASE_URL);
    execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
};
