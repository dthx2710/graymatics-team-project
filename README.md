# Graymatics Dashboard Application
This project is a dashboard application built using React and Next.js.  
The main goal of the application is to display useful data from the Graymatics API backend on a intuitive dashboard system.  
This project is built and managed by SIT TeamA (T04) for our Graymatics customer (CSC2022-Team Project-22/23).  

## TeamA (T04) Members
Name | Student ID | Role | Github Username
--- | --- | --- | ---
**Seah Wen Kang** | 2102302 | Scrum Master & Frontend Lead | [@Insaneboy9](https://github.com/Insaneboy9)
**Dylan Tok Hong Xun** | 2101372 | Product Owner & Backend Lead | [@dthx2710](https://github.com/dthx2710)
**Edward Foo** | 2101258 | Frontend Developer | [@Anermers95](https://github.com/Anermers95)
**Chang Kai Wen** | 2100823 | Frontend Developer | [@kaiwen2612](https://github.com/kaiwen2612)
**Toh Zheng Xiang** | 2101089 |  Backend Developer & Communications Lead | [@tohzx](https://github.com/tohzx)

## Navigating Directory
- **Non-code** documentation directory is in [`/documentation`](/documentation)
  - Documentation directory table is in [`/documentation/README.md`](/documentation/README.md)
  - Documentation images and assets are in [`/documentation/assets`](/documentation/assets)
- **Working Directory** is in [`/gray-app`](/gray-app)
  - Views are found in `/gray-app/pages`
  - Public & static resources are found in `/gray-app/public`
  - Serverless API functions are found in `/gray-app/pages/api`
  - Frontend
    - React pages are found in `/gray-app/pages`
    - Components and other content are found in `/gray-app/src`
  - Build files are found in `/gray-app/.next`

## Instructions to run the program locally
- Clone the repository
    > `git clone`
- CD to working directory
    > `cd gray-app`
- Install Dependencies
    > `npm install`
- Create a `.env` file in the working directory
    - You can use the .env.sample file as a template
- Build the program
    > `npm run build`
- Run the program
    > `npm run dev`

## Basic Program Commands
- CD to working directory
    > `cd gray-app`
- Install Dependencies
    > `npm install`
- Checking eslint
    > `npm run lint`
- Build & compile program
    > `npm run build`
- Running Developement mode
    > `npm run dev`
- Running Production mode
    > `npm start`