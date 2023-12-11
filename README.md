# Charger - Express, Node.js, MySQL system for operating charging stations.

### Introduction

Charger is a part of the system for charging station operations.
System allows for efficient operation of the charging station structure.
The charging station has its own type, settings and places to which the vehicle can be connected.

#### Project keywords:

- Node.js
- Express.js
- MySQL
- TypeORM
- Typescript

## Getting started

### Installation

- Clone repository: ```git clone https://github.com/Ralysen/codetain_task.git```
- ```$ npm install```

### Setup
To run this project:

```
$ npm run build
$ npm run start
```

## Configuration

### Database configuration

You can configure MySQL database using data-source.ts file. 
All base configuration can be set with environment variables in .env file (example):

- DB_NAME=charger
- PORT=8080
- DB_USER=root
- DB_PASSWORD=Qwerty1@
- DB_PORT=3306
- DB_HOST=localhost


## Base Rest API functionality 

System provides multiple functionalities for every part of the structure.

#### Endpoints
- User: ```/user```
- Charging Station: ```/stations```
- Connectors: ```/connectors```
- Charging Station Type: ```/station-types```

Every endpoint supports base CRUD options and allow to get list of elements or single element by id, create, update, delete elements.
In addition, the system allows you to assign connectors and station type to specified charging station, it can be done with ```/stations``` endpoint:
- Set station type: ```/:station_id/type/:type_id```
- Add connector to station structure: ```/:station_id/connectors/:connector_id```

### Pagination
The display of elements lists can be limited by pagination, you can provide two parameters: ```page``` and ```limit``` to change display form of response.
- ```page``` - describe which page should be display (information about current page is in response)
- ```limit``` - describe how many element should be display in one page (if you change this parameter number of pages can change too)

Example of pagination: ```/?page=3&limit=5```

### Filters
System provide simple filters for elements lists, you can filter response by some logical resources like name, firmware_version, plug_count etc.
You can use it in similar way as pagination, example: ```/?name=test```

### Authentication and Authorization
Api is secured with JWT authentication. To get access to API you have to create new user with user endpoint.
With your own user you can use ```/login``` to get your API Token (token expire after 120 seconds). To get access to every system functionality provide this token to Authorization header of request (with Bearer*).
If your token expire, it will refresh automatically and shows in every response in ```metadata```.

## Tests
In progress...

## Docker
Technical problems (in progress...)