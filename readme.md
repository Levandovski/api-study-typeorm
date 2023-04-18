## Application for studying typeorm

## To run the project:

### npm install

## Inside the project run the command:

### docker-compose up db

## After that, create the database with the name of the DB_NAME variable in the env file

## Now delete the files from the migration folder and run the commands below:

### npm run migration:generate

### npm run migration:run

## After that run the command:

### npm run dev

## Below is the model of entity and relationships of the project:

<img src="./ERD.PNG" />

## More information:

### Application made to study the typeorm. This application is for managing classes registration on a study platform. We can have several classes for a subject and several subjects for a class. Each class can also have several linked videos.
