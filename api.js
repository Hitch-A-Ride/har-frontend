const {
    broadcastRideRequest, postEphemeral, postMessage, reactionAdd,
    getSlackUserEmail, getSlackUserId, 
    JOIN_ACTION, LEAVE_ACTION,
    LOCKDOWN_ACTION,
    REMOVE_ACTION,
} = require('./external/invoke');

// need google maps location of ride owner

function handleGetSlackUserInfo(req, res) {
    if(req.query.email) {
        return getSlackUserId(req.query.email)
        .then(function(slackUserId) {
            res.json({ slackUserId });
        });
    }
    
    return getSlackUserEmail(req.query.id)
        .then(function(slackUserEmail) {
            res.json({ slackUserEmail });
        });
}

function handlePostMessageInvocations(watchdog) {
    return (req, res) => {
        const payload = JSON.parse(req.body.payload);
        const responseUrl = payload.response_url;
        const slackUserId = payload.user.id;
        let channel = payload.channel.id;
        const originalMessage = payload.original_message;
            
        
        const [ existingAction, rideId, rideOwnerSlackId, ...others] = payload.callback_id.split(':');
        // maps slack id to email if not create rider
        let copyMessage = { ...originalMessage };
        const sentAction = copyMessage.attachments[0].actions[0];

        if(JOIN_ACTION.value == sentAction.value) {
            getSlackUserEmail(slackUserId).then(email => {
                let rider = watchdog.getOrCreateUser(slackUserId, email);
                watchdog.addRider(rideId, rider.id);
                copyMessage.callback_id = `cancelJoinRideAction:${rideId}:${rideOwnerSlackId}:${rider.id}`;
                copyMessage.attachments[0].actions = JSON.stringify([
                    LEAVE_ACTION
                ]);

                watchdog.setBroadcastParams(rideId, {
                    channel,
                    message_ts: payload.message_ts,
                    text: originalMessage.text,
                });
                
                if(watchdog.isMaximum(rideId)) {
                    let riders = watchdog.getRidersAsString(rideId);

                    const attachments = [{ 
                        "fallback": "Will you like to lockdown now?", 
                        "title": "Will you like to lockdown now?",
                        "callback_id": `lockDownAction:${rideId}:${rideOwnerSlackId}`, 
                        "color": "#606089",
                        "attachment_type": "default",
                        "actions": [
                            LOCKDOWN_ACTION
                        ]
                    }];

                    postMessage(rideOwnerSlackId, {
                        ...copyMessage, 
                        text: `Your ride request was attended to by ${riders}.\n When you commence your ride, click the button to lock it down.`,
                        attachments,
                    }); // send DM to rideOwner
                }

                postEphemeral({channel, user: slackUserId, ...copyMessage});
            }).catch(err => console.log(err.message));
            
        } else if (LEAVE_ACTION.value == sentAction.value) {
            let riderId = others[0];
            watchdog.removeRider(rideId, riderId);
            copyMessage.callback_id = `joinRideAction:${rideId}:${rideOwnerSlackId}`;
            copyMessage.attachments[0].actions = JSON.stringify([
                JOIN_ACTION 
            ]);
            postEphemeral({ channel, user: slackUserId, ...copyMessage});
        } else if (LOCKDOWN_ACTION.value == sentAction.value) {
            copyMessage.attachments[0].actions = [];
            postEphemeral({ channel, user: slackUserId, ...copyMessage}); //removing actions in DM
            
            let broadcastParams = watchdog.getBroadcastParams(rideId);

            copyMessage = {
                text: broadcastParams.text, 
                attachments: JSON.stringify([])
            };
            postMessage(broadcastParams.channel, copyMessage); //removing actions in broadcast channel

            reactionAdd({name:'lock', channel: broadcastParams.channel, timestamp: broadcastParams.message_ts});
        }

        return res.sendStatus(200);
    }
}


function handlePostMenuOptions(watchdog) {
    return (req, res) => {
        return res.sendStatus(200);
    };
}

function handlePostCancelRideRequest(watchdog) {
    return (req, res) => {
        const { rideId } = req.body;
        const broadcastParams = watchdog.getBroadcastParams(rideId);
        
        const copyMessage = {
            text: broadcastParams.text, 
            attachments: JSON.stringify([])
        };

        postMessage(broadcastParams.channel, copyMessage);
        reactionAdd({name:'x', channel: broadcastParams.channel, timestamp: broadcastParams.message_ts});
        return res.sendStatus(200);
    }
}

function injectApiDependencies(router, watchdog) {
    router.post('/messageInvocations', handlePostMessageInvocations(watchdog));
    router.post('/menuOptions', handlePostMenuOptions(watchdog));
    router.post('/cancelRideRequest', handlePostCancelRideRequest(watchdog));
    router.get('/slackUserInfo', handleGetSlackUserInfo);
    return router;
}


module.exports = {
    injectApiDependencies,
    getSlackUserId,
}