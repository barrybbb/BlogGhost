// # Socket Plugin Module

// Module dependencies
var PeerServer = require('./server').PeerServer,
	connect = require('connect'),
	SessionSockets = require('session.socket.io'),
	sessionStore = new connect.middleware.session.MemoryStore(),
	express = require('express'),
	//socket = require('socket.io'),
	//http = require('http'),
    socketplugin = require('../../core/server/plugins/GhostPlugin'),
	peerServer, ghostServer, httpserver, cookieParser, sessionSockets;
/*
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
  */
// ### Show Room
// 'myroom' handler.
function showRoom(req, res, next) {
    if (req.session.user) {
        res.render('room');
    }else{
		res.render('room');
	}

    next();
}

GhostPlugin = function (ghost) {
    this.app = ghost;
};


GhostPlugin.prototype.activate = function (ghost) {

	ghostServer = ghost.server;
	//ghostServer.use(express.session({store: sessionStore}));
	
	httpserver = require('http').createServer(ghostServer);
	io = require('socket.io').listen(httpserver);
	httpserver.listen(ghost.config().server.port);
	
	//cookieParser = express.cookieParser(ghost.dbHash);
	sessionSockets = new SessionSockets(io, ghost.sessionStore, ghost.cookieParser);

	peerServer = new PeerServer({ app: ghostServer, socket: sessionSockets, debug: true});
	
	ghostServer.get('/room/:nickname', showRoom);
	
	return;
};

/** 
 * A method that will be called on uninstallation.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
GhostPlugin.prototype.uninstall = function (ghost) {
    return;
};

/** 
 * A method that will be called when the plugin is enabled.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
GhostPlugin.prototype.install = function (ghost) {

    return;
};

/** 
 * A method that will be called when the plugin is disabled.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
GhostPlugin.prototype.deactivate = function (ghost) {
    return;
};
module.exports = GhostPlugin;


