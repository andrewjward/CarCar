# CarCar

Team:

- Andrew Ward - Sales
- Christopher Roldan - Services

## Design

Project Beta is a web application that is designed to manage an automobile dealership by monitoring the inventory, sales, and services. This application is run in docker with all dependencies. The three microservices use Restful Api in the back end that is used to display and interact with the front end. Both sales and services possess an Automobile value object which are created and updated through our poller which requests and retrieves Automobile data from the inventory microservice.
We chose to design the application with a modern feeling, using bootstrap in order to unify the appearance of the project.

## Service microservice

The Service Microservice is comprised of two applications api and poll which share a common database. This microservice takes care of all the data and functionality related to service appointments and technicians. A poller was used to poll an Automobile value object to check if the vin number was in the dealership inventory, in turn this helps determine if the car orignated from the dealership which would then qualify for vip treatment.

## Sales microservice

The Sales Microservice is a backend api that manages all sales related data in the database. Those data are: customers, salespeople, and sales. In order to recieve relevant information about the automobiles being sold, the sales "poller" polls the inventory api using an automobile "Value Object" in order to gain the necessary information to create an accurate sale. On the front end of our project, we are making RESTful API calls to recieve the information stored inside of the sales api in order to create sales, customers, and salespeople inside of a web application.
