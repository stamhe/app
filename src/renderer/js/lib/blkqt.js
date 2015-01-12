// thwart browserify, setting browser field doesn't
// seem to work in watch scripts
var ipc = require('i' + 'pc')

function sendIPC(data, callback) {
  data.token = Date.now() + Math.random()
  
  if (callback) {
    var recpMsg = data.msg + '-' + data.token
    ipc.once(recpMsg, function() {
      var args = [].slice.call(arguments)

      // error
      if (args[0])
        callback(new Error(args[0]))
      else
        callback(null, args[1])
    })
  }

  ipc.send(data.msg, data)
}

function getAccounts(callback) {
  var data = {
    msg: 'blkqt',
    args: ['listreceivedbyaddress', 0, true]
  }

  sendIPC(data, function(err, result) {
    if (err) return callback(err)
    var accounts = result.map(function(acc) {
      acc.label = acc.account
      delete acc.account
    })
      
    callback(null, result)
  })
}

module.exports = {
  getAccounts: getAccounts
}
