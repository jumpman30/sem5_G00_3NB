## Contents
- [Purpose and Scope of the SAD](#purpose-and-scope-of-the-sad)
- [How the SAD Is Organized](#how-the-sad-is-organized)
- [How a View Is Documented](#how-a-view-is-documented)

# Explicação da arquitetura onion

Ao nivel de arquitetura usamos o modelo Onion (tambem conhecido por Clean Arquiture, nome sugerido por Robert C. Martin aka "Uncle Bob"), que é um modelo de arquitetura de software que separa a aplicação em camadas, sendo que cada camada tem uma responsabilidade diferente. O modelo Onion é composto por concentricas. No centro e totalmente encapsulado encontra-se a camada de domínio, que é responsável pela lógica de negócio da aplicação. A camada de domínio não tem dependencias com as outras camadas. A camada de domínio é seguida pela camada de aplicação, que é responsável pela lógica de negócio da aplicação e "execução" dos casos, mas que é mais "alta" que a camada de domínio. A camada de aplicação tem dependencias com a camada de domínio, mas não tem dependencias com a camada de infraestrutura. A camada de aplicação é seguida pela camada de infraestrutura, que é responsável pela comunicação com a base de dados, receber requests HTTP, etc. A camada de infraestrutura tem dependencias com a camada de aplicação, mas não tem dependencias com a camada de domínio. Todas as dependencias são feitas através de interfaces, de modo a que as camadas sejam desacopladas e facilmente ser possivel alterar as depencencias atraves de injeção de dependencias.

## Purpose and Scope of the SAD
A arquitetura de software dum sistema é a estrutura ou estruturas desse sistema, que inclui elementos do software e suas proprieades visíveis externamente, e as relações entre ele (Bass 2012).

Este SAD (Software Architecture Document) descreve a arquitetura de software do sistema a desenvolver por solicitação do Instituto Superior de Engenharia do Porto (ISEP) para gestão de uma frota de robots e drones que possam planear e executar tarefas no interior do seu campus.

Este SAD é desenvolvido e integrado num contexto académico de ensino-aprendizagem (no 5º semestre da LEI no ano letivo 2023-2024 (LAPR5)).

Porque visa suportar o processo de ensino-aprendizagem, não tem como objetivo ser completo ou descrever a melhor arquitetura possível, mas servir de guia e exemplo, em linha com as competências a adquirir em cada iteração/sprint do projeto.

Neste projeto, os estudantes desempenham diferentes papéis. Ex: analistas de negócio, arquitetos de software, programadores, testers, administradores e utilizadores.

## How the SAD Is Organized
Este SAD adota a estrutura proposta acima.

- [Documentation Roadmap and Overview](./RoadMapOverview.md): Apresenta os aspetos mais gerais do SAD aos leitores e ajuda-os a encontrar a informação que procuram.
- [Architecture Background](Background.md): disponibiliza informação sobre a arquitectura do sistema
e descreve as abordagens abordadas.
- [Views](./Views/Introduction.md): levantamento das várias vistas da arquitetura do sistema, vista lógica, vista de implementação, diagramas de sequência (SD)
  e diagramas de sequencia de sistema (SSD)
- [Referenced Materials](./References.md): Referências de documentos e informação utilizada ao longo deste SAD.

## How a View Is Documented
Neste SAD será adotada a notação UML, nomeadamente, diagramas de componentes, de classes, de sequência e de packagings.

A organização das vistas será implementada com recurso ao modelo C4 (diferentes níveis de abstração/granularidade).