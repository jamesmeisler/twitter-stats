import * as express from 'express';
import { TwitterApi } from 'twitter-api-v2';

const apiToken = process.env['BEARER_TOKEN'];
const router = express.Router();
const twitterClient = new TwitterApi(apiToken);



router.get('/', async (req, res) => {
    const userResult = await twitterClient.v2.userByUsername('holycity15');
    res.json(userResult.data);
});

export default router;