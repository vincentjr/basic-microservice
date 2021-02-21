# [WIP]

### Testing
The idea behind this setup is to have the frontend app being served from a separate server. In this instance, we're spoofing that by hosting on a different port: `https://local.dev.io:3000`.

Every api call from the frontend will go to an Apollo federated gateway sitting behind nginx hosted at `https://local.dev.io`.

The rest of the services (products, users) sit behind the gateway where their schemas are automatically stitched together by the gateway.


### Local SSL Cert creation
***Every dev should install and run mkcert separately. Certs should not be stored/shared.**

Make sure mkcert is installed, or install with:
```
brew install mkcert
brew install nss # if you use Firefox
mkcert -install
```

In the `certs` directory run:
```
mkcert local.dev.io
```

Append to your `/etc/hosts` file:
```
127.0.0.1 local.dev.io
```

[todo] will automate - for now you must copy the certs into `frontend/certs` and `nginx/certs` before running `docker-compose build`.
