const argv = require('commander')
const Command = require('commander').Command;

// fix -h conflict
Command.prototype.helpInformation = function() {
    return ('\n  Usage: freepic [options]\n\n' +
    '  Options:\n\n' +
    '        --help            output usage information\n' +
    '    -V, --version         output the version number\n' +
    '    -w, --width  <lang>   picture width\n' +
    '    -h, --height <lang>   picture height\n' +
    '    -a, --about  <lang>   keyword: nature,water\n' +
    '    -d, --desktop         save picture to Desktop\n\n')
}

// init commander
argv.version('0.0.1')
    .usage('[options]')
    .option('-w, --width <lang>', 'picture width')
    .option('-h, --height <lang>', 'picture height')
    .option('-a, --about <lang>', 'keyword: nature,water')
    .option('-d, --desktop', 'save picture to Desktop')
    

argv.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ freepic');
  console.log('    $ freepic -w 1600 -h 1200 -d');
  console.log('    $ freepic -a nature');
  console.log('');
});

module.exports = argv.parse(process.argv)
