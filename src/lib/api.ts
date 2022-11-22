const base = 'http://localhost';

async function send(method: any, path: string, data: unknown, token: string) {
  const opts: any = { method, headers: {} };

  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  }

  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${base}/api/${path}`, opts)
    .then((r) => r.text())
    .then((json) => {
      try {
        const resParsed = JSON.parse(json);

        if (resParsed?.status === 'error') {
          console.log(`API response error from ${base}/${path}: ${json}`);
        }

        return resParsed;
      } catch (err) {
        return json;
      }
    });
}

export function get(path: string, token: string) {
  const opts: any = { method: 'GET', headers: {} };

  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${base}/api/${path}`, opts)
    .then((r) => r.json())
    .then((json) => {
      return json;
    });
}

export function del(path: string, token: string) {
  return send('DELETE', path, null, token);
}

export function post(path: string, data: unknown, token: string) {
  return send('POST', path, data, token);
}

export function put(path: string, data: unknown, token: string) {
  return send('PUT', path, data, token);
}
