const { getServers } = require("dns");
const { getuid } = require("process");

const sessionIdToUserMap = new Map();

function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}


module.exports = {
    setUser,
    getUser,
}