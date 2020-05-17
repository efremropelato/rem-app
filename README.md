# REAL ESTATE MANAGEMENT
---

### RUN
```sh
docker-compose build # only first time
docker-compose up -d
docker-compose run web rails db:create db:migrate db:seed
```

### optional
```sh
docker-compose run web yarn install --check-files 
```

### Cleanup for restart
```sh
sudo rm -rfv ./tmp/db
docker-compose rm -f
```