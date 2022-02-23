# Lib Manager

"An API to register books, users and control the borrowing of books from a library."

## How to run and install

To install the system, it is necessary to follow some steps, such as downloading the project and carrying out some installations. For this, it is necessary to open a terminal tab and enter the following code.

### This step is to download the project

https://gitlab.com/andluizv/lib-manager.git

### Enter the folder

cd LIB-MANAGER

### Copy the env.example

Copy the .env.example file and rename it with .env. Your credentials must be placed there.

Installing the dependencies should run:

docker-compose up

Run future migrations
docker exec nomedocker yarn typeorm migration:generate -n nome
docker exec nomedocker yarn typeorm migration:run

## Use

To use it, you must use an API Client like Insomnia. At localhost:3000.

### Examples of use

The documentation you can access with the localhost

### Technologies Used

- Node.js
- TypeScript
- Framworks express
- Docker
- Jest test
