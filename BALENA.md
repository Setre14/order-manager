# BalenaOS
## Getting started
https://www.balena.io/os/docs/raspberrypi4-64/getting-started/

- Download the [development image](https://www.balena.io/os/#download)
- Install [balena cli](https://github.com/balena-io/balena-cli/releases)
- Configure the image
```bash
balena local configure ~/Downloads/balena.img
? Network SSID I_Love_Unicorns
? Network Key superSecretPassword
? Do you want to set advanced settings? Yes
? Device Hostname mydevice
? Do you want to enable persistent logging? no
Done!
```
- Download [balenaEtcher](https://www.balena.io/etcher/)
- Flash SD card with the configured image
- Boot up should be finished in ~10 seconds
- Test connection 
```bash
ping mydevice.local
```

## Connect with ssh
```bash
balena ssh mydevice.local
```

## Build and run a Docker container  
Execute the following command in the directory with a `Dockerfile` or `docker-compose.yml`
```bash
balena push mydevice.local
```
