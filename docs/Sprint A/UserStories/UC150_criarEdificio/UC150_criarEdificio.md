# UC 150 - Criar Edificio (SG3-18)

## 1. Requirements
The **Campus Manager** starts the process of creating a new building by providing the system with the following information:
* Building name
* Building Code
* Building size (length * width)

#### Preconditions
* Campus Manager is authenticated.

#### Postconditions
* The information about the building is stored in the system.

## 2. Analysis

### 2.1. Information
[Source](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25047#p31684)
* **Building code:** mandatory, max 5 chars (leters, numbers and space)
* **Building name:** optional, max 50 alfanumeric chars
[Source](https://moodle.isep.ipp.pt/mod/forum/search.php?id=5536&search=criar+edificio)
* **Building max size:** mandatory, lenght*width

### 2.2. Analysis
- POST endpoint in path /api/building
- Json body with the following information:
    ```
        {
            code: string
            name: string
            lenght: number
            width: number
        }
    ```

## 3. Design

### 3.1 Information

### 3.2 Views
![VP-US150](../ProcessViews/VP-US150-CreateBuilding.svg)
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
