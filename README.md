# Simple messaging service/app

## 1. General info
App made as part of a technical interview for a dev position at a company.

The main form (full name + phone) is used to create a user/recepient. Created users are pulled from database trough an API and displayed in the table below. 
Users can be selected (multiple) with checkboxes on the far left. The text area below accepts a message of max. 160 characters. Hitting **Send** on the bottom will "send" a message to selected users/recepients by writing the messages to the database, and also to files for each individual user. 

## 2. Tech stack
Front end (2 versions):
* Razor/HTML, with Bootstrap 4

* React.JS + [Ant Design](https://ant.design/components/overview/)

Backend:
* .NET 5
* Entity Framework Core
* Microsoft SQL Server

## 3. Screenshots
### 3.1. Razor/HTML version
<kbd>
  <img src="https://i.imgur.com/ScU4Evc.png" width="900px"/>
</kbd>

### 3.2. React.JS version
<kbd>
  <img src="https://i.imgur.com/6QocHRC.png" width="900px"/>  
</kbd>



