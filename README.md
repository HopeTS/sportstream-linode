# Sportstream (Linode) :rocket:
This is the minimum viable product for SportStream,deployed on linode

## First time setup and configuration
___Note___: This server can only be deployed on a linux-based operating system. Eventually, it will be encapsulated in a docker container but currently it is not.

1.  Enable SSL certification script
    -   This server enforces HTTPS for webpages.
    -   Navigate to the certificate directory with 
        ```bash
        cd ./server/ssl
        ```
    -   In the bash shell, enter
        ```bash
        chmod +x ./generate-certificates.sh 
        ```
    -   Then, if no SSL certificates have been generated, enter
        ```bash
        ./generate-certificates.sh
        ```

2.  Install Node.js and npm
    -   In Ubuntu distributions, you can install nodejs with
        ```bash
        apt install nodejs
        ```
    -   In Ubuntu distributions, you can install npm with
        ```bash
        apt install npm
        ```

3.  Install ffmpeg
    -   ffmpeg is needed to run the RTMP server that is needed to livestream. You can install it with
    ```bash
    apt install ffmpeg
    ```

4.  Install server dependencies
    -   You can install dependencies from the root of the project with
    ```node
    npm install
    ```

4.

---
## Commands: 

-   #### npm run start
    Runs the Express server

-   #### npm run start:dev
    Runs the development environment

-   #### npm run build:prod
    Generates production bundle.js/css

-   #### npm run test
    Runs Jest unit tests

-   #### npm run test:watch
    Runs Jest unit tests in watch mode