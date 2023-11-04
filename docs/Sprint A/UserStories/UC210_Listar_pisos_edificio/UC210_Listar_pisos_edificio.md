#### Preconditions
* Campus manager is authenticated.

#### Postconditions
* The information about all building's floors is stored in the system.

## 2. Analysis

### 2.1. Information & analysis

- GET endpoint in path /api/buildings/getFloorsByBuildingId

## 3. Design

### 3.1 Information

### 3.2 Views

#### Level 1
![VP-US210](./VP_Nivel1.png)
#### Level 2
![VP-US210](./VP_Nivel2.png)
#### Level 3
![VP-US210](./VP_Nivel3.png)

### 3.3 Patterns/Libs

 - Aggregate root

 - Value object  

 - High cohesion and low coupling
   - By applying a layered architecture it was intended to organize the sections of the code with the best separation of responsibilities and with the lowest dependency between layers. 

- Information expert
  - The designed solution aims to assign the correct responsibility given the information the classes hold.

- DTO pattern.

## Tests

### Unit

#### Domain
- validate business rules attributes of minimum and maximum floors of a building.

#### Repository
- validate isolated behaviour of repository functions with mocked schema in case of success

#### Service
- validate isolated behaviour of service functions with mocked repository in case of success
- validate isolated behaviour of service functions with mocked repository with bad arguments, check failure errors

#### Controller
- validate isolated behaviour of controller functions with mocked service in case of success and status code
- validate isolated behaviour of controller functions with mocked service with bad arguments, check failure errors and status code


### Integration Testing