- Downlaod Hypriot OS image from https://blog.hypriot.com/downloads/
- Flash the image on an MicroSD with e.g. https://rufus.ie
- Change the `ssid` and `psk` for the wlan in `user-data`
- Copy `user-data` to the MicroSD (replace the old `user-data`)

The PI can now be reached with the hostname `om-pi`, e.g.
```bash
ssh om@om-pi    # PWD: order-manager
```