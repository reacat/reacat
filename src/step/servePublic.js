import http from 'http';
import ecstatic from 'ecstatic';

function servePublic() {
  http.createServer(
    ecstatic({root: this.config.public_dir})
  ).listen(this.config.dev_port);
}

export default servePublic;
