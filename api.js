const axios = require('axios');

const SlackAPIEndpoints = require('./slack-endpoints');
const querystring = require('querystring');
const {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_VERIFICATION_TOKEN,
  SLACK_OAUTH_ACCESS_TOKEN,
  SLACK_BOT_USER_OAUTH_ACCESS_TOKEN,
} = process.env;

// need google maps location of ride owner

const getUserFullname = () => {

}


const getUserFromResultOrFetchNext = (userEmail, fetchFn) => (response) => {
    const responseData = response.data;


    if (! responseData.ok) {
        console.log('here')
        throw Error(responseData);
    }

    for (let { profile, id } of responseData.members) {
        if(profile && profile.email == userEmail) {
            return id;
        }
    }

    if(responseData.response_metadata) {
        return fetchFn(
            userEmail, responseData.response_metadata.next_cursor
        );
    }
    return undefined;
}

const getSlackUserId = (userEmail, cursor = '') => {
    const params = { token: SLACK_OAUTH_ACCESS_TOKEN, cursor }

    return axios.get(
            SlackAPIEndpoints.users.list.url, 
            { params }
        )
        .then(getUserFromResultOrFetchNext(userEmail, getSlackUserId))
        .catch(err => err.message);
}

const handleGetSlackUserId = (req, res) => {
    getSlackUserId(req.body.email).then(function(slackUserId) {
        res.json({ slackUserId });
    });
}

const handlePostMessageInvocations = (req, res, next) => {
    // when users invoke message buttons.
    // get user_id, user_email, user_id ride_request_id,
    // send response with an ephemeral message to cancel acceptance
    // https://api.slack.com/methods/chat.postEphemeral

    // check rider count
    // if(len)
    // when rider count hits limit, DM ride owner
    // Invoke('slackDM', {rideOwner: 'x01'})
    
    // if ride owner accepts message,
    // edit interactive message and remove join button and put a lock on message
   return res.send('Working');
}


const handlePostMenuOptions = (req, res, next) => {
    return res.status(200);
}


module.exports = {
    api: (router) => {
        router.post('/messageInvocations', handlePostMessageInvocations);
        router.post('/menuOptions', handlePostMenuOptions);
        router.get('/slackUserInfo', handleGetSlackUserId);

        return router;
    },
    getSlackUserId,
}