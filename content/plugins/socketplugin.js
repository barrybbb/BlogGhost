// # Socket Plugin Module

// Module dependencies
var PeerServer = require('./server').PeerServer,
	//socket = require('socket.io'),
	//http = require('http'),
    socketplugin = require('../../core/server/plugins/GhostPlugin'),
	peerServer, ghostServer, httpserver;
/*
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
  */
// ### Show Room
// 'myroom' handler.
function showRoom(req, res, next) {
    if (req.session.user) {
        res.render('teacher');
    }else{
		res.render('room');
	}

    next();
}

GhostPlugin = function (ghost) {
    this.app = ghost;
};


GhostPlugin.prototype.activate = function (ghost) {


	//ghost.server.use(express.bodyParser());
    ghostServer = ghost.server;
	//server.listen(8888);
	httpserver = require('http').createServer(ghostServer);
	io = require('socket.io').listen(httpserver);
	httpserver.listen(ghost.config().server.port);
	peerServer = new PeerServer({ app: ghostServer, socket: io, debug: true});
	ghostServer.get('/myroom/roomId/', showRoom);
/*	var server = ghost.server;
	var z = require('http').createServer(server);
	//cookie = express.cookieParser(ghost.dbHash);
	session = express.cookieSession({store: store});

	//server.use(cookie);
	server.use(session);

    server.get('/myroom/roomId/', showRoom);
	io = require('socket.io').listen(httpserver);
	io.set('authorization', function(data, accept) {
		cookie(data, {}, function(err) {
			if (!err) {
				var sessionID = data.signedCookies[KEY];
				store.get(sessionID, function(err, session) {
					if (err || !session) {
						accept(null, false);
					} else {
						data.session = session;
						accept(null, true);
					}
				});
			} else {
				accept(null, false);
			}
		});
	});

	io.sockets.on('connection', function (socket) {
		var session = client.handshake.session
		, nome = session.nome;
		if (!io.connected) io.connected = true;
		socket.on('new-channel', function (data) {
			//onNewNamespace(data.channel, data.sender);
			io.of('/' + data.channel).on('connection', function (socket) {
				if (io.isConnected) {
					io.isConnected = false;
					socket.emit('connect', true);
				}

				socket.on('message', function (msg) {
					if (msg.sender == data.sender) socket.broadcast.emit('message', msg.data);
				});
			});
		});
	});
	*/


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


