# WIP

### Cert creation
Every dev should install and run mkcert separately.
Certs should not be stored/shared.

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
