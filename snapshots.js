const handleSnapshotUpdate = (snapshot) => {
    console.log(snapshot.val());
  }
  
const handleSnapshotError = (err) => {
    console.log(err);
}

module.exports = {
    handleSnapshotError,
    handleSnapshotUpdate
}
