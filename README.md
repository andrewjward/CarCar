# CarCar

Team:

- Andrew Ward - Sales
- Christopher Roldan - Services

## Design

Project Beta is a web application that is designed to manage an automobile dealership by monitoring the inventory, sales, and services. This application is run in docker with all dependencies. The three microservices use Restful Api in the back end that is used to display and interact with on the front end. Both sales and services possess an Automobile value object which are created and updated through our poller which requests and retrieves Automobile data from the inventory microservice.

## Service microservice

The Service Microservice is comprised of two applications api and poll which share a common database. This microservice takes care of all the data and functionality related to service appointments and technicians. A poller was used to poll an Automobile value object to check if the vin number was in the dealership inventory, in turn this helps determine if the car orignated from the dealership which would then qualify for vip treatment.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
