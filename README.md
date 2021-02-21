Every dev should install and run mkcert separately.
Certs should not be stored/shared.

brew install mkcert
brew install nss # if you use Firefox
mkcert -install

# Change to the local domain name you'd like to use
mkcert local.dev.io



# Change default.conf with local.dev.io
