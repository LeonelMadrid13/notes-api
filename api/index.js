import serverless from 'serverless-http';
import app from '../src/index'; // or wherever your Express app is exported
export default serverless(app);
