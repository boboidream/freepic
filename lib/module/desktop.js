const HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

var desktop = HOME + '/Desktop/'

module.exports = desktop
