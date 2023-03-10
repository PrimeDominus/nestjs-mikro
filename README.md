# nestjs-mikro
Learning NestJS with Mikro-ORM

# create .env file
# Create .env file like below : 
``` .env
OPENAPI_DOC_TITLE="Api example"
OPENAPI_DOC_DESCRIPTION="The nestjs API description"
OPENAPI_DOC_VERSION="1.0"
OPENAPI_Tag="nest-example"
API_PORT=3000
API_URL='localhost'
DB_SYNC = "false"
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = "root"a
DB_NAME = "mikroORMNest"
DB_PORT = "5432"
DB_TYPE = "postgresql"
JWT_SECRET_KEY = "!@#$%^&*()_+_)(*&^%$#@!"
```

# api doc link 
``` description
http://localhost:3000/api-doc
```

# install package
``` command
npm install
```

# start docker (linux)
``` command
sudo systemctl start docker
docker-compose up
```

# create database 
``` description
Go to .env file and set DB_SYNC = true
```

# Start Project
``` command
npm run start:dev1
```

# create user
``` description
Route : /v1/user (POST)
```
Example body param : 
``` json
{
  "name": "sp",
  "email": "sp-1@yopmail.com",
  "password": "1234"
}
```

# Login user
``` description
Route : /v1/auth/login (POST)
```
Example body param: 
``` json
{
  "email": "sp-1@yopmail.com",
  "password": "1234"
}
```

# create shop
``` description
Route : /v1/shop (POST)
```
Example body param :
``` json 
{
  "name": "string",
  "description": "string",
  "owner": 1 # owner will be the created user id
}
```
``` description
token : pass login token here
```

# create product
``` description
Route : /v1/product (POST)
```
Example body param : 
``` json
{
  "name": "string",
  "description": "string",
  "amount": 0,
  "shop": 1, # shop will be the created shop id
  "owner": 1 # owner will be the created user id
}
```
``` description
token : pass login token here
```

# get shop list
``` description
Route : /v1/shop (GET)
token : pass login token here
```