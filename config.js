const HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

var config = {
  dir: HOME + '/Desktop/', // 默认地址为桌面
}
