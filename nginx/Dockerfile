ARG IMAGE=nginx
# --build-arg IMAGE=tobi312/rpi-nginx for Raspberry Pi

FROM ${IMAGE}

COPY nginx/etc/nginx/conf.d/* /etc/nginx/conf.d/
COPY nginx/etc/nginx/ssl/ /etc/nginx/ssl/
COPY nginx/etc/nginx/nginx.conf /etc/nginx/

# COPY client/deploy/* /srv/om/

CMD ["nginx", "-g", "daemon off;"]
