# Films App
## Abstract
this project aims to allow the visitors to be able to browse list movies, and movie details like rate, description, people comments,...etc, and enable the users to sign-up and log in for being able to comment on any movie.

### Functional requirements 
1. sign up & login 
2. the admin user can log in and add a new film, and upload a poster image for the film, in addition, the normal users and guests privileges 
3. users & guests can browse a list of films 
4. users & guests can click on the film to visit the film screen and show full details of it, like its poster image, description, rate, country, genres, and user comments  
5. logged in users can type a comment on any film from the film details screen



### Trying & Testing 

#### try
1. login to the application using the following credintials as an admin:
   
   - email: `admin@email.com`, password: `admin`
2. sign up & login by any credentials and try to show films list, film details, comment on film

#### Unit testing 
- for server-side, please run `npm run test:server:watch` 

### Technical operations

#### install the dependencies:
Run `npm install` and please use a reliable VPN if you are in Syria

#### Run the app options:

##### Docker 
1. make sure Docker desktop and Docker-compose are installed on your pc 
2. build image `docker build --tag film-app-img:latest . `
3. run container for port 80 `docker-compose up -d`
4. open you browser on `http://localhost`

##### Locally on production environment
1. make sure you install Node.js > v14.x, npm and Angular v13 globally on your machine 
2. have an running PostgreSQl instance
3. open a `run.sh` file in the root dir of the project and set value for `PROD_PG_STING` variable as the connection string to db instance
4. go to project root directory, run this build command `npm build`
5. after building is done, run start command `npm start`, this command will serve the application on port 8080
6. open you browser on `http://localhost:8080`

##### Locally on development environment
1. make sure you install Node.js > v14.x, npm and Angular v13 globally on your machine 
2. have an running PostgreSQl instance
3. define a `.env` file in the root dir of the project and set value for `PROD_PG_STING` variable as the connection string to db instance
4. run `npm run start:dev` this will Backend Node.js app locally on port 8080 
5. run `ng serve` this will serve the Frontend Angular app locally on port 4200 
6. open you browser on `http://localhost:4200` 


#### Code Structure

```
/client  /* ordinary angular app files */

/server/shared  /* shared files between Frontend & Backend codebase */
│   ├── configurations
│   │   └── socket-events.ts /* const string of socket events */
│   ├── models
│   │   ├── generics
│   │   │   ├── map.ts
│   │   │   └── id.ts  /* type of the id for all the models to unify it */
│   │   ├── account.ts
│   │   ├── film.ts
│   │   └── comment.ts
│   ├── utils               /* utilities and functions used across the application */
│   │    ├── cors.util.ts
│   │    ├── date.util.ts
│   │    ├── error-catcher.util.ts
│   │    ├── filter-by.util.ts
│   │    ├── format-number.util.ts
│   │    ├── map.util.ts
│   │    ├── sort-by.util.ts
└── └──  └── uuid.util.ts


/server/src
│   ├── controllers
│   │   ├── account.controller.ts
│   │   ├── film.controller.ts
│   │   └── comment.controller.ts  
│   │ ├── db
│   │   ├── db.ts  /* initiate DB singleton instance */
│   │   └── seed.db.ts /* seed the DB by account and conversations */
│   ├── environments
│   │   ├── env.reader.ts  /* functions to read the environment varibles for Node.js Backend */
│   │   ├── env.util.ts  /* functions to use the environment object across the application for  */
│   │   ├── environment.prod.ts /* production environment variables */
│   │   └── environment.ts  /* development environment variables */
│   ├── middlewares
│   │	├── cors.middleware.ts 
│   │   └── request-responder.middleware.ts
│   ├── repositories
│   │   ├── generics
│   │   │   └── crud-base.repo.ts  /* abstraction of add, delete, find, and findOne methods */
│   │   ├── film.repo.ts
│   │   ├── comment.repo.ts
│   │   └── account.repo.ts
│   ├── utils
│   │   ├── auth.util.ts
│   │   ├── bcrypt.util.ts
│   │   ├── jwt.util.ts
│   │   └── stream-file.util
└── └── index.ts  /* include all functionalities to setup and run the app */


```

## For help
Please contact [Sohaib Faroukh](https://github.com/sohaib-faroukh) 

