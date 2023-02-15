import { createServer } from './chunk-EBDWWG77.js';
import './chunk-7PJ5ZCCZ.js';
import './chunk-XCWHEJKC.js';
import './chunk-Q4XMHGFZ.js';
import { startBree } from './chunk-2IKT6M3Z.js';
import './chunk-ZET6VW4Y.js';
import './chunk-GDKE6HDW.js';
import './chunk-GQXM3VM5.js';
import './chunk-NNTLG7HB.js';
import { log } from '@w8nc/logger';

var port = process.env.PORT || 8e3;
var server = createServer();
startBree().then(() => {
  return;
}).catch(() => {
  return;
});
server.listen(port, () => {
  log(`api running on ${port}`);
});
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map