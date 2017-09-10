// important classes
const usingContext = (self, fn) => fn.bind(self);

function watchSnapshot(reference, handleSuccess, handleError) {
    const self = this;
    const refName = reference.replace('/', '_');

    self[refName] = this._database.ref(reference);

    self[refName].once('value')
        .then(usingContext(self, handleSuccess))
        .catch(usingContext(self, handleError));
}

function addRider(rideId, riderId) {
    const rides = this._rides.child([rideId, 'riders'].join('/'));
    const key = riders.push().key;
    riders.update({
        id: riderId
    });
}

function removeRider(rideId, riderId) {
    const riders = this._rides.child([rideId, 'riders'].join('/'));

    for(let rider in riders) {
        if(rider.id == riderId) {
            rider.remove();
        }
    }
}


function getOrCreateUser(slackUserId, email) {
    const users = this._users.val();

    for(let user in users) {
        if(user.email == email) {
            return user;
        }
    }
    
    const key = this._users.push().key;
    let user = { email, slackUserId, id: key };
    this._users.child(key).update(user);

    return user;
}

function Watchdog(database) {
    this._database = database;
}


function isMaximum(rideId) {
    // TODO: return true if maximum ride capacity reached
    const ride = this._rides.child(rideId).val();

    return ride.availableSeats > Object.keys(ride.child('riders').val());
}

function setBroadcastParams(rideId, params) {
    // TODO: set Slack channel for ride.
    this._rides.child(rideId).update(
        ...params
    );
}

function getBroadcastParams(rideId) {
    // TODO: get Slack channel for ride.
    const ride = this._rides.child(rideId).val();
    return {
        channel: ride.channel,
        message_ts: ride.message_ts,
        text: ride.text,
    };
}

function getRidersAsString(rideId) {
    const riders = this._rides.child(rideId).child('riders').val();
    let names = [];
    for (let rider in riders) {
        names.push(
            riders[rider].firstName + ' ' + riders[rider].lastName
        );
    }
    return names.join(', ');
}

Watchdog.prototype.watchSnapshot = watchSnapshot;
Watchdog.prototype.addRider = addRider;
Watchdog.prototype.removeRider = removeRider;
Watchdog.prototype.getOrCreateUser = getOrCreateUser;
Watchdog.prototype.isMaximum = isMaximum;
Watchdog.prototype.setBroadcastParams = setBroadcastParams;
Watchdog.prototype.getBroadcastParams = getBroadcastParams;
Watchdog.prototype.getRidersAsString = getRidersAsString;


// Broadcasters

const messageBroadcast = (req, res, next) => {
    // broadcast message to slack location for user.
    // - get country from geocoords;
    // - post to slack location
    // https://api.slack.com/methods/chat.postMessage
}
  


// Handlers

const handleRidesSnapshotUpdate = function(snapshot) {
    // console.log(snapshot.val());
}

const handleUsersSnapshotUpdate = function(snapshot) {
    // console.log(snapshot.val());
}

const handleCurrentRideSnapshotUpdate = function(snapshot) {
    let currentRides = snapshot.val();
    for(let currentRideId in currentRides) {
        let ride = self._rides.child(currentRides[currentRideId].id);
        if (!ride.broadcasted) {
            invokeAction('broadcastRideRequest', ride);
            ride.update({
                broadcasted: true
            });
        }
    }
}

const handleSnapshotError = function(err) {
    console.log(err);
}


// Watchers

const setWatchOnDatabaseReferences = (database) => {
    watchdog = new Watchdog(database);

    watchdog.watchSnapshot(
        '/currentRides', 
        handleCurrentRideSnapshotUpdate,
        handleSnapshotError
    );

    watchdog.watchSnapshot(
        '/rides', 
        handleRidesSnapshotUpdate,
        handleSnapshotError
    );

    watchdog.watchSnapshot(
        '/users', 
        handleUsersSnapshotUpdate,
        handleSnapshotError
    );

    return watchdog;
}


module.exports = {
    setWatchOnDatabaseReferences
}
