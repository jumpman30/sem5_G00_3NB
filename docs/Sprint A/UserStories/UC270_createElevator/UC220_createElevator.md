# UC 270 - Criar elevador em edifício
*Criar elevador em edifício*

## 1. Requirements

- "bom dia,
  - edificio (obrigatório)
  - número identificativo (obrigatório, único no edificio)
  - lista de pisos do edificio servidos pelo elevador (obrigatório)
  - marca (opcional, alfanumerico, 50 caracteres)
  - modelo (opcional, mas obrigatório se marca for introduzido, alfanumerico, 50 caracteres)
  - número de série do fabricante (opcional, alfanumerico, 50 caracteres)
  - breve descrição (opcional, alfanumerico, 250 caracteres)
 - [Forum question](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25298#p32051)

#### Preconditions
* Campus manager is authenticated.

#### Postconditions

## 2. Analysis

### 2.1. Information & analysis

- POST endpoint in path /api/buildings/:id/elevator
- Body :
```
   {
   edificio (obrigatório)
   número identificativo (obrigatório, único no edificio)
   lista de pisos do edificio servidos pelo elevador (obrigatório)
   marca (opcional, alfanumerico, 50 caracteres)
   modelo (opcional, mas obrigatório se marca for introduzido, alfanumerico, 50 caracteres)
   número de série do fabricante (opcional, alfanumerico, 50 caracteres)
   breve descrição (opcional, alfanumerico, 250 caracteres)
  }
```

## 3. Design

### 3.1 Information

- access methods needed:
    - list all passages from building - PassagesRepo
    - list all floors with ids - FloorRepo
    - map data to ListFloorsWithPassagesDto - FloorMap

### 3.2 Views

#### Level 1
![VP-US350](../../Views/Level%201/PV/UC220-ProcessViewL1.svg)
#### Level 2
![VP-US350](../../Views/Level%202/PV/UC220-ProcessViewL2.svg)
#### Level 3
![VP-US350](../../Views/Level%203/PV/UC220-ProcessView.svg)

### 3.3 Patterns/Libs

 - Aggregate root

 - Value object  

 - High cohesion and low coupling
   - By applying a layered architecture it was intended to organize the sections of the code with the best separation of responsibilities and with the lowest dependency between layers. 

- Information expert
  - The designed solution aims to assign the correct responsibility given the information the classes hold.

- Interface Segregation Principle

- Dependency Inversion Principle

- DTO pattern.

## Tests

### Unit

#### Domain
- validate business rules of Robot Type attributes

#### Repository
- validate isolated behaviour of repository functions with mocked schema in case of success

#### Service
- validate isolated behaviour of service functions with mocked repository in case of success
- validate isolated behaviour of service functions with mocked repository with bad arguments, check failure errors

#### Controller
- validate isolated behaviour of controller functions with mocked service in case of success and status code
- validate isolated behaviour of controller functions with mocked service with bad arguments, check failure errors and status code


### Integration Testing