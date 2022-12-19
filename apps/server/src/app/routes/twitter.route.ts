import * as express from 'express';
import { TwitterApi } from 'twitter-api-v2';

const apiToken = process.env['BEARER_TOKEN'];
const router = express.Router();
const twitterClient = new TwitterApi(apiToken);



router.get('/', async (req, res) => {
    const userResult = await twitterClient.v2.userByUsername('holycity15');
    res.json(userResult.data);
});

router.get('/:user/timeline', async (req, res) => {
    const userResult = await twitterClient.v2.userByUsername('holycity15', {
        "user.fields": ['created_at', 'description', 'username', 'verified']
    });
    const id = userResult.data.id
    const userTimelinePaginator = await twitterClient.v2.userTimeline(id, {
        'tweet.fields': ['created_at', 'public_metrics', 'geo', 'in_reply_to_user_id']
    });

    const tweets = await userTimelinePaginator.fetchLast(100);
    res.json({
        user: userResult.data,
        tweets: tweets.data
    });

});

export default router;