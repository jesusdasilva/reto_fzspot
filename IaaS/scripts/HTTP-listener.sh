#!/bin/bash
  sudo apt update && sudo apt upgrade -y && sudo apt install -y nginx
  sudo systemctl start nginx.service
  sudo systemctl enable nginx.service
  sudo /bin/su -c "echo '<p>Hola FzSports!</p><h1>NODO: $(hostname -f)</h1>' >> /var/www/html/index.html"
