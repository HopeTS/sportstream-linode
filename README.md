# Sportstream (Linode) :rocket:

This is the minimum viable product for the Castamatch site. This README contains 
an overview of the technologies implemented, the development pipeline, metadata 
about the structure of the documentation.

---

# Table of Contents

1.  [Abstract](#Abstract)
    1.  [Business Requirements](#Business-Requirements) TODO
    1.  [Technology Overview](#Technology-Overview)
1.  [Development Process](#Development-Process)
1.  [Server Configuration](#Server-Configuration)

---

#   Abstract

_sportstream-linode_ if the first iteration of the Castamatch live streaming
website. 

##  Business Requirements

TODO! It is going to take a lot of manual labor to set a sports center up with 
the equipment needed to livestream via Castamatch, and it is up to the each 
sports center to charge their athletes or teams for use of the livestream 
service.

##  Technology Overview

---

#   Development Process

This server can only be run in development by a Windows machine by default. 
It has not been tested on other operating systems, but it should work if the 
developer changes the FFMPEG_PATH in _~/.env-cmdrc_. 

1.  Install dependencies
>   TODO: Steps to install dependencies from factory reset to npm install

---

#   Server Configuration

This server is built to be run on a linode linux VM. By default, the 
development server can only be run on Windows, but both the http and https 
production server can only be run on linux due to the ffmpeg configuration.

1. **Install Certbot**

    -   This is used to generate SSL certificates
    -   First, install the prerequisites and ensure you can run certbot with 
    these bash commands

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