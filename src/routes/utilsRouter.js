import { Router } from 'express';
import { refreshTokenHandler } from '../utils/refreshToken.js';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

router.post('/refresh', refreshTokenHandler);

export default router;
