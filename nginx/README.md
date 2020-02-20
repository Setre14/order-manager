# NGINX

docker pull tobi312/rpi-nginx

mkdir -p /home/pi/{.ssl,html} && mkdir -p /home/pi/.config/nginx && touch /home/pi/.config/nginx/default.conf

openssl req -x509 -newkey rsa:4086 -subj "/C=/ST=/L=/O=/CN=localhost" -keyout "ssl.key" -out "ssl.crt" -days 3650 -nodes -sha256
mv ssl.\* /home/pi/.ssl/

docker run -d -p 88:80 -p 443:443 -v /home/pi/.ssl:/etc/nginx/ssl:ro tobi312/rpi-nginx

docker run --name nginx -d -p 80:80 -p 443:443 --link some-php-fpm-container:phphost -v /home/pi/.ssl:/etc/nginx/ssl:ro -v /home/pi/.config/nginx:/etc/nginx/conf.d:ro -v /home/pi/html:/var/www/html tobi312/rpi-nginx
