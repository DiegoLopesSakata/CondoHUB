# CondoHub

Sistema Integrado de Gestão Condominial — Projeto Integrador, curso de ADS, FATEC Ipiranga.

## O problema

Condomínios residenciais e comerciais sofrem com ineficiência operacional decorrente de tarefas manuais,
controle fragmentado de processos e ausência de um canal oficial integrado de comunicação entre síndicos,
moradores e funcionários.

## O que o CondoHub resolve

Um painel único por perfil (síndico, morador, porteiro, funcionário) cobrindo o ciclo operacional do
condomínio: manutenção preventiva, controle de vagas com carregador para veículos elétricos, painel de
sustentabilidade por unidade, gestão de pets, encomendas, controle de acesso, tarefas, reservas de áreas
comuns, agendamento de mudanças e reuniões com controle de quórum e ata digital.

## Stack

HTML5 + CSS3 + JavaScript (ES6+), sem frameworks, sem TypeScript, sem build step. Módulos via ES Modules
nativos (`import`/`export`). Dados mockados em objetos JS locais — sem backend e sem banco de dados nesta
fase.

## Como rodar

Como o projeto usa ES Modules nativos, é necessário servir os arquivos por um servidor local (abrir o
`index.html` direto do disco não funciona por causa do CORS de módulos).

- **Opção recomendada:** extensão [Live Server] do VS Code — botão direito em `index.html` → "Open with Live Server".
- **Alternativa via npx** (sem instalar nada globalmente): `npx serve .`

## Equipe

- Diego Lopes Sakata
- Felipe Martins
- Franklin Sousa e Silva
- Jonathan Batista Bispo
- Lucas Guilherme do Carmo Silva
- Nyikholas Seiji Tsukamoto Ferreira

## Status

Em desenvolvimento — fase de estruturação inicial do projeto (frontend estático com dados mock).
