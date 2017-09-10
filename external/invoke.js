const axios = require('axios');

const SlackAPIEndpoints = require('./slack-endpoints');

const {
    SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET,
    SLACK_VERIFICATION_TOKEN,
    SLACK_OAUTH_ACCESS_TOKEN,
    SLACK_BOT_USER_OAUTH_ACCESS_TOKEN,
    CLIENT_ID,
    API_KEY
} = process.env;

const JOIN_ACTION = { 
    "name": "answer",
    "text": "Yes!",
    "type": "button",
    "value": "join"
};

const LEAVE_ACTION = { 
    "name": "answer",
    "text": "Oops! I'm no longer joining.",
    "type": "button",
    "value": "leave"
};

const LOCKDOWN_ACTION = { 
    "name": "answer",
    "text": "Lock ride request.",
    "type": "button",
    "value": "lockdown"
};


const REMOVE_ACTION = { 
    "name": "answer",
    "text": "Oops! I'm no longer going this way",
    "type": "button",
    "value": "remove"
};


function handleError(err) {
    console.log(err.message);
}

function handleSuccessResponse(res) {
    return res.data;
}

function GMapsGet(params) {
    params.key = API_KEY;
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
}

function SlackGet(url, params) {
    params.token = SLACK_OAUTH_ACCESS_TOKEN;

    return axios.get(url, { params });
}

function getUserFromResultOrFetchNext(key, userEmailOrId, fetchFn) {
    return (response) => {
        const responseData = response.data;
        
        if (! responseData.ok) {
            throw Error(responseData);
        }

        for (let { profile, id} of responseData.members) {
            if('email' == key && (profile && profile[key] == userEmailOrId)) {
                return id;
            } else if('id' == key && (id == userEmailOrId) && (!profile.bot_id)) {
                return  profile && profile.email;
            }
        }

        if(responseData.response_metadata) {
            return fetchFn(
                userEmailOrId, responseData.response_metadata.next_cursor
            );
        }
        return undefined;
    };
}

function getSlackUserId(userEmail, cursor = '') {
    const params = { token: SLACK_OAUTH_ACCESS_TOKEN, cursor }

    return SlackGet(
            SlackAPIEndpoints.users.list.url, 
            params
        )
        .then(getUserFromResultOrFetchNext('email', userEmail, getSlackUserId))
        .catch(handleError);
}

function getSlackUserEmail(userId, cursor = '') {
    const params = { token: SLACK_OAUTH_ACCESS_TOKEN, cursor }

    return SlackGet(
            SlackAPIEndpoints.users.list.url, 
            params
        )
        .then(getUserFromResultOrFetchNext('id', userId, getSlackUserEmail))
        .catch(handleError);
}

function getLocationChannels(coords) {
    return GMapsGet(
        { latlng: `${coords.lat},${coords.lng}` }
    ).then(handleSuccessResponse)
    .then(function(data) {
        const results = data.results;
        const searchString = result.map(
            (components) => components.map(
                component => (component.long_name.toLowerCase() || '')
            ).join(' ')).join();
        
        return SlackGet(SlackAPIEndpoints.channels.list.url, {
            exclude_archived: true,
            exclude_members: true
        })
        .then(handleSuccessResponse)
        .then(data => {
            const channels = data.channels.filter(
                channel => channel.is_member && searchString.indexOf(channel.name.toLowerCase()) > -1
            )
            //get channel with maxnum of member
            let maxSoFar = 0;
            let selectedChannel = channels[0].id;
            for (let channel in channels) {
                if(channel.num_members > maxSoFar) {
                    selectedChannel = channel.id
                    maxSoFar = maxSoFar;
                }
            }
            return selectedChannel;
        })
        .catch(handleError);

    })
    .catch(handleError);
}

function broadcastRideRequest(ride) {
    const { departureTime, destination } = ride;
    const rideId = ride.id;
    const { profile: { firstName, lastName } } = ride.rideOwner;
    const rideOwnerSlackId = rideOwner.slackId;

    const attachments = [{ 
        "fallback": "Will you like to join me?", 
        "title": "Will you like to join me?",
        "callback_id": `joinRideAction:${rideId}:${rideOwnerSlackId}`, 
        "color": "#606089",
        "attachment_type": "default",
        "actions": [
            JOIN_ACTION
        ]
    }];

    return getLocationChannels(takeOffCoord).then(
        function(channel) {
            const params = { 
                channel,
                text: `New ride request from ${firstName} ${lastName}.\nLeaving Amity to Yaba at ${departureTime}`,
                attachments: JSON.stringify(attachments)
            };
        
            return SlackGet(
                SlackAPIEndpoints.chat.postMessage.url, 
                params
            )
            .then(handleSuccessResponse)
            .catch(handleError);
        }
    );
}


function postMessage(slackUserId, message) {
    return SlackGet(SlackAPIEndpoints.im.open.url, { user: slackUserId })
    .then((res) => {
        const responseData = res.data;

        if (!responseData.ok) {
            throw Error(responseData.error);
        }

        const params = {
            channel: responseData.channel.id,
            ...message
        };
        
       return SlackGet(
            SlackAPIEndpoints.chat.postMessage.url, 
            params
        )
        .then(handleSuccessResponse);
    }).catch(handleError);
}


function postEphemeral(params) {
    return SlackGet(
        SlackAPIEndpoints.chat.postEphemeral.url,
        params
    )
    .then(handleSuccessResponse)
    .catch(handleError);
}

function reactionAdd(params) {
    return SlackGet(
        SlackAPIEndpoints.reactions.add.url,
        params
    ).then(handleSuccessResponse)
    .catch(handleError);
}



module.exports = {
    postMessage,
    postEphemeral,
    broadcastRideRequest,
    getSlackUserId,
    getSlackUserEmail,
    reactionAdd,
    JOIN_ACTION,
    LEAVE_ACTION,
    LOCKDOWN_ACTION,
    REMOVE_ACTION,
};