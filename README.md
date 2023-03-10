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
KEYCLOAK_REALM = "nestjs-auth-test"
KEYCLOAK_CLIENT_ID = "auth-testing-nestjs"
KEYCLOAK_CLIENT_SECRET = "121414"
KEYCLOAK_AUTH_SERVER_URL = "http://localhost:8080/"
```

# api doc link 
``` description
http://localhost:3000/api-doc
```

# 1> install package
``` command
npm install
```

# 2> start docker (linux)
``` command
sudo systemctl start docker
docker-compose up
```

# 3> create database 
``` description
Go to .env file and set DB_SYNC = true
```
``` description
Command : npm run start:dev1
```

# 4> create user
``` description
Route : /v1/user (POST)
```
Example body param : 
``` json
{
  "name": "sp",
  "email": "sp-1@yopmail.com",
  "password": "1234",
  "type": "APP_USER",
  "role": "SUPERADMIN"
}
```
``` description
x-access-token : 12345
```

# 5> Login user
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

# 6> create shop
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
x-access-token : 12345
token : pass login token here
```

# 6> create product
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
x-access-token : 12345
token : pass login token here
```

# 7> get shop list
``` description
Route : /v1/shop (GET)
x-access-token : 12345
token : pass login token here
```