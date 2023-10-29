# UC 350 - Criar tipo de robot
*Como gestor de frota pretendo adicionar um novo tipo de robot indicando a sua designação e que tipos de tarefas pode executar da lista prédefinida de tarefas*

## 1. Requirements

- esta listagem deve mostrar a informação sobre o piso (edificio, piso, descrição) e a que outros edificios/pisos tem passagem - [Forum question](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25451)

#### Preconditions
* Campus manager is authenticated.

#### Postconditions
* The information about the type of robot is stored in the system.

## 2. Analysis

### 2.1. Information & analysis

- POST endpoint in path /api/robotType

## 3. Design

### 3.1 Information

### 3.2 Views

#### Level 1
![VP-US350](../../Views/Level%201/PV/UC350-ProcessViewL1.svg)
#### Level 2
![VP-US350](../../Views/Level%202/PV/UC350-ProcessViewL2.svg)
#### Level 3
![VP-US350](./UC350-ProcessView.svg)

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