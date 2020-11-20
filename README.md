# Sportstream (Linode) :rocket:
> This is the minimum viable product for the Castamatch site

---

# Table of Contents

1.  [Abstract](#Abstract)
    1.  [Technology Overview](#Technology-Overview)

---

# Abstract

## Technology Overview

_sportstream-linode_ if the first iteration of the Castamatch live streaming
wesbite.

## First time setup and configuration

**Note:** This server can only be deployed on a linux-based operating 
system. Eventually, it will be encapsulated in a docker container but currently 
it is not.

1. **Install Certbot**
    -   This is used to generate SSL certificates
    -   First, install the prerequisites and ensure you can run certbot with these bash commands
    ```bash
    sudo snap install core
    sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
    ```
    -   Create the certificates with this
    ```bash
    sudo certbot certonly --webroot
    ```

1.  **Enable SSL certification script** (Deprecated)
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

1.  **Install Node.js and npm**
    -   In Ubuntu distributions, you can install nodejs with
    ```bash
    apt install nodejs
    ```
    -   In Ubuntu distributions, you can install npm with
    ```bash
    apt install npm
    ```

1.  **Install ffmpeg**
    -   ffmpeg is needed to run the RTMP server that is needed to livestream. You can install it with
    ```bash
    apt install ffmpeg
    ```

1.  **Install MongoDB**
    -   MongoDB is the database this project uses. You can install it with
    ```bash
    apt install mongodb
    ```

1.  **Install server dependencies**
    -   You can install dependencies from the root of the project with
    ```node
    npm install
    ```

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