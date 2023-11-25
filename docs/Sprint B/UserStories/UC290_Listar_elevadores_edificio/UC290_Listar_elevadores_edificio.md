# UC 290 - Listar Elevadores em Edificio

## 1. Requirements

#### Preconditions

- Campus Manager is authenticated.
- The buiding must exist in the system

#### Postconditions

- The information about all building's elevators is stored in the system.

## 2. Analysis

### 2.1. Information & analysis

- GET endpoint in path /api/building/buildingId/elevators

## 3. Design

### 3.1 Information

### 3.2 Views

### 3.3 Patterns/Libs

- Aggregate root

- Value object

- High cohesion and low coupling

  - By applying a layered architecture it was intended to organize the sections of the code with the best separation of responsibilities and with the lowest dependency between layers.

- Information expert

  - The designed solution aims to assign the correct responsibility given the information the classes hold.

- DTO pattern.

## Tests

### Integration Testing
