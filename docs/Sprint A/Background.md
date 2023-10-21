## Contents
- [System Overview](#system-overview)
- [Context](#context)
- [Driving Requirements](#driving-requirements)
	- [Functional requirements](#functional-requirements)
	- [Quality attributes](#quality-attributes)
		- [Funcionalidade](#funcionalidade)
		- [Usabilidade](#usabilidade)
		- [Confiabilidade (Reliability)](#confiabilidade-reliability)
		- [Design constraints](#design-constraints)
		- [Implementation constraints](#implementation-constraints)
		- [Physical constraints](#physical-constraints)
- [Solution Background](#solution-background)
	- [Architectural Approaches](#architectural-approaches)
	- [Mapping Requirements to Architecture](#mapping-requirements-to-architecture)


### System Overview

A Graphs4Social, S.A. é uma startup com sede no Porto (Portugal) cuja missão é fornecer aplicações de manipulação e visualização de grafos de redes sociais.
A empresa decidiu recentemente expandir o seu portfolio de produtos entrando na área de jogos, mas mantendo o foco nos grafos de redes sociais.
A empresa decidiu recorrer à subcontratação de serviços de desenvolvimento uma vez que não possui capacity livre de momento.

---

### Context

Pretende-se o desenvolvimento de um protótipo para um sistema de execução de tarefas de uma frota de robots e drones. O sistema será denominado RobDroneGo.

O protótipo inicial deve ser constituído pelos seguintes módulos:
* Gestão de dispositivos
* Gestão de requisição de tarefas
* Planeamento de execução de uma tarefa

Este protótipo tem por objetivo permitir que o gestor de frota configure os robots e drones existentes para que possam mais tarde ser utilizados na execução de tarefas. Os utentes do campus podem registar-se no sistema para requisitar tarefas a serem executadas pelos robots e drones.

---

### Driving Requirements

#### Functional requirements
1. Como utilizador, pretendo escolher quais os "utilizadores objetivos".
2. Como utilizador, pretendo pedir introdução a um outro utilizador.
3. Como utilizador, pretendo aprovar ou desaprovar pedido de introdução.
4. Como utilizador, pretendo editar os meus relacionamentos a nível das tags e força de ligação.
5. Como utilizador, pretendo editar o meu perfil.
6. Como utilizador, pretendo editar o meu estado de humor.
7. Como utilizador, pretendo consultar a rede de ligações na minha perspetiva.
8. Como utilizador não registado, pretendo registar-me como utilizador no sistema.
9. Como utilizador, pretendo pesquisar por outros utilizadores que conheço na rede e pedir-lhes ligação.
10. Como utilizador, pretendo ver os pedidos de ligação que tenho pendente.
11. Como utilizador, quero aceitar ou rejeitar um pedido de introdução.

### Tasks

12. Planear o esqueleto da aplicação. Identificar que módulos e interfaces (detalhadas) de cada módulo. Identificar diferenças de terminologia, se existirem, entre o vários dominios.
13. Setup dos projetos e repositórios Git (Bitbucket).
14. Design arquitetural: 
    Nível 1: vista lógica e de processos,
	Nível 2: vista lógica, de processos, de implementação e física,
	Nível 3 (Gestão Campus): vista lógica, de processos e de implementação,
	Adoção de estilos/padrões: cliente-servidor, SOA, DDD, Onion, DTO.
15. Tecnologia: .Net C#, SGBD relacional (e.g. MS SQL Server), ORM (e.g. Entity Framework).
16. Testes unitários e de integração.
17. Implantação na cloud (e.g. Heroku, MongoDB Atlas).
18. Pipelines (Bitbucket Pipelines).

---

#### Quality attributes
Os atributos de qualidade são categorizados e sistematizados segundo o modelo FURPS+.

FURPS é um acrónimo que representa um modelo para classificação de atributos de qualidade de software (requisitos funcionais e não-funcionais) distribuído da seguinte forma:

##### Funcionalidade
1. Um utilizador deve conseguir registar-se com as suas credenciais e aceder à sua conta.
2. Deve ser auditada e verificada a integridade da informação a que os sistemas acedem.
3. Com vista à necessidade de saber e necessidade de conhecer, toda a informação deve estar protegida de acessos indevidos. Ou seja, o princípio de minimização de acesso ao que é essencial para cada utilizador/aplicação, criação de túneis para transferência de informação, avaliação da integridade de dados e aplicações, e encriptação/minimização dos dados.

##### Usabilidade
4. A SPA deve permitir acesso a todos os módulos do sistema: Gestão Campus, Gestão Frota, planeamento e visualização, bem como RGPD.

5. No âmbito do projeto atual, a administração de utilizadores pode ser efetuada diretamente na base de dados não sendo necessário um módulo de gestão de utilizadores.

##### Confiabilidade (Reliability)

6. A base de dados está normalizada segundo as normas. Assim, a duplicidade de dados é mínimia e a confiabilidade da base de dados é elevada.

7. Os protocolos http já estão implementados na framework do .NET pelo que só têm de ser personalizados

##### Design constraints
9. O sistema deve ser composto por uma aplicação web do tipo Single Page Application (SPA) que permite aos utilizadores autorizados acederem aos diferentes módulos da aplicação, bem como por um conjunto de serviços que implementem as componentes de regras de negócio necessárias para o funcionamento da aplicação web.

De um modo geral, as principais funcionalidades de cada módulo são as seguintes:

- Gestão Campus – permite a gestão da informação relacionada com os dados do sistema e mapas (edificios, pisos, salas e passagens).
- Gestão Frota - permite a gestão da informação relacionada com os dados dos robots, drones e tipos de tarefas.
- Gestão Tarefas – permite a gestão da informação relacionada com os tipos de tarefa de um robot
- Planeamento - irá consumir a informação dos diferentes módulos para permitir a identificação dos percursos que um robot deve executar para se deslocar de um
edifício para outro minimizando determinados critérios.
- UI – interface com o utilizador

10.  No âmbito do projeto atual, a administração de utilizadores pode ser efetuada diretamente na base de dados não sendo necessário um módulo de gestão de utilizadores.

##### Implementation constraints
11.   Todos os módulos devem fazer parte do código fonte da mesma SPA e serem disponibilizados como um único artefacto.

##### Physical constraints
16. Existsm dois servidores em load balancing, onde estão instaladas as aplicações, serviços e as bases de dados e que se encarregam do armazenamento da informação.

17. Existem ainda dois servidores em failover que distribuem os endereços a todos os sistemas e se encarregam da autenticação de sistemas e utilizadores (DHCP, DNS (se aplicável) e autenticação de servidores, e eventualmente um servidor Kerberos).
18. Algumas das aplicações devem ser implantadas *on premises* e outras em IaaS e PaaS (*on cloud*). Cf. requisitos específicos das UC por sprint.

---

## Solution Background

### Architectural Approaches

Baseado nos requisitos não funcionais e restrições de design, serão adotadas as seguintes abordagens/padrões/estilos:

- Web Application, em que o frontend é desempenhado por uma SPA (Single Page Application), e que o backend é desempenhado pelos módulos Gestão Campus, Gestão Frota, Gestão Tarefas e Planeamento;
- SOA, porque os servidores (cf. anterior) deverão disponibilizar API, e particularmemte API para serem usadas na web, disponibilizados serviços para os clientes respetivos. Serão adotados os nível 0, 1 e 2 do [Modelo de Maturidade de Richardson](https://martinfowler.com/articles/richardsonMaturityModel.html) aplicado a REST;
- Layered architecture, mais especificamente Onion Architecture, por razões académicas.

---

### Mapping Requirements to Architecture

[ListaFuncionalidades](./Planning/Team.md)