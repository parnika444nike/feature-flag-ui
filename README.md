# Feature Flag UI
Internal tool developed to deploy features and initialise other related attributes for a smooth AB testing experience.



## 1. Tech Stack

The following are the various tech using which the UI was built:

- **React**
- **REST APIs**
- **JavaScript**
- **MySQL**
- **HTML**
- **CSS**


## 2. Project Setup
Create project folder and open it on VSCode.

Server side -
- create folder `backend`
- `cd backend`
- In terminal - `npm init -y`
- Then run - `npm install mysql express`
- Finally run - `npm i cors`
- create file `db.js`

Frontend -
- `cd ..`
- Run - `npm create-react-app frontend`



## 3. Setup

-  Download XAMPP
-  Run both Apache and MySQL
- Open a browser and go to -```http://localhost/phpmyadmin/index.php?route=/database/structure&db=DB_NAME```
- This will be the database for the project and the flags will be updated here as well
- Run the server with `node db.js`
- Run the UI with `npm run start`
- Run `home.html` and inspect console to view short polling 

**Note-** The server must be restarted everytime a change is made in db.js


 ## 4. How It Works

The feature flag UI allows users to perform 3 main functions -

Create feature flags.
View the feature flags.
Update the feature flags.
Every feature flag has the following **attributes** -

- Name.
- Creator.
- Status.
- Start - Date, Time and Timezone.
- End - Date, Time and Timezone.
- Description.
- Environment Status - Prod, Test and Dev.


**Creation -** 

- We can specify the above mentioned attributes (except creator) during creation. 
- Once submitted, the database is updated as well.
- The feature flag is then visible in the dashboard. 

**Updation -**

Only the following feature flag details can be updated - 

- Status.
- Start and End - Date, Time and Timezone.
- Description.
- Environment status - Prod, Test and Dev.

**Viewing -**

- All the attributes can be viewed on the dashboard. 

**Deletion -**
- The features cannot be deleted.
- In case of any error, certain attributes can be edited instead. 



## 5. Terminology (in code)

- **finaldb** - MySQL database.
- **featuretable** - MySQL table storing all the data.
- **node.js** - The server accessing the database.
- **Feature.js** - The homepage with all the features and data.
- **CreateFeature.js** - Page to create feature and the attributes.
- **UpdateFeature.js** - Page to update the feature attributes.


## 6. Short Polling

-Short polling is a method of client-server communication where the client repeatedly asks the server for any updates. 

- Here, we have implemented short polling by creating a demo app that the user will be viewing. 
- This app could be a shopping website, job portals or fitness apps.
- In our code, `home.html` is the demo app that will be polling every 5 seconds to check for new updates 
- The data polled can be viewed on `http://localhost:8080/poll` 
- When the flag 'Red-title' is set to 'Active', the demo app will show a change in the title color (from black to red)


The console can be inspected to view the real time polling occuring. 


## 7. Future Scope  

- Short polling might be capable of providing high frequency polling and statlessness but the continuous communication costs eventually add up. 
- GRPCs (GRPC Remote Procedure Calls) are a new technology that can be implemented to avoid the costs and just let the server send the data in case of any updates. 

GRPCs might have the following drawbacks - 
- Relatively new technology, it has a steep learning curve.
- It is comparitvely more complex to implement.
- Hard to debug. 

While GRPCs are new and evolving, we can consider this to be a good alternative to short polling in order to cut down on costs.







