# mongodb-visualized
Visualized version of MongoDB, currently in initial Phase with a basic db.&lt;collection name>.count() implementation.

## Create a new project 

Clone this repo into new project folder (e.g., `my-proj`).
```shell
git clone https://github.com/DynamicRemo/mongodb-visualized  my-proj
cd my-proj
```

## Install npm packages

Install the npm packages described in the `package.json` and verify that it works:

> Node.js Server in the root Folder

```shell
npm install
```

> Angular 2 Client in the Client Folder and `npm start` is for the compilation of Typescript.

```shell
cd client
npm install
npm start
```

## Run Project
> Update MongoDB Url in the Api File `\routes\mongoapi.js`.
As this is just an starter project, customization and other features are in developement.
You can also have External Url from MongoLab or etc.

```shell
var url = 'mongodb://<connection-url>/<database-name>'

Something like this:
var url = 'mongodb://localhost:27017/mongodbapi';
```


> Navigate to Root Folder, in our case `my-proj`.

```shell
npm start
```
