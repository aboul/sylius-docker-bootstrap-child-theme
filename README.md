# Sylius with a ready to use bootstrap child theme and HMR

## About

A template/example of Sylius running through Docker (based on Sylius/Standard project) with bootstrap child theme ready to use.
It also provides webpack-dev-server configuration (HMR ready, live reload for css/js/twig/PHP).

## Sylius Documentation

Documentation is available at [docs.sylius.com](http://docs.sylius.com).

## Installation

Follow installation docs from [Sylius/Sylius-Standard](https://github.com/Sylius/Sylius-Standard/).

## Usage

By default, `compose.override.yml` launch `yarn dev-server`  on node container. Based on webpack.config.js file, this will run a dev-server at `localhost:8080` to deliver your asset. You don't need to refresh pages when you develop, your changes in twig, js, scss and php files will refresh the page for you.
You can follow compilation with this command line: `docker logs --tail 1000 -f <nodejs-container-name>`.

If dev-server crashes or bugs, restart it with `docker restart <nodejs-container-name>`.

### Disable dev-server and fallback to normal assets delivering by symfony

```yaml
# compose.override.yml
services: 
  ...
  nodejs:
    image: node:${NODE_VERSION:-18}-alpine
    user: ${DOCKER_USER:-1000:1000}
    working_dir: /srv/sylius
    entrypoint: [ "/bin/sh","-c" ]
    command:
        #- "yarn dev-server"
        - "yarn watch"
    volumes:
        - .:/srv/sylius:rw,cached
        - ./public:/srv/sylius/public:rw,delegated
    ports: 
        - "8080:8080"
```

or

```yaml
# compose.override.yml
services: 
  ...
  nodejs:
    image: node:${NODE_VERSION:-18}-alpine
    user: ${DOCKER_USER:-1000:1000}
    working_dir: /srv/sylius
    entrypoint: [ "/bin/sh","-c" ]
    command:
        #- "yarn dev-server"
        #- "yarn watch"
        - ""
    volumes:
        - .:/srv/sylius:rw,cached
        - ./public:/srv/sylius/public:rw,delegated
    ports: 
        - "8080:8080"
```

In the first example, `compose.override.yml` run ```yarn watch``` so you can start customize your theme.
In the second example, you have to run ```yarn watch``` (or others commands) manually in the docker node container to start development.

## Key files

- `package.json` for dev-server command config and see others yarn commands (native sylius)
- `webpack.config.js` for other dev-server config and customize other theme webpack configs (addEntry for example)
- `compose.override.yml` to change dev strategy

## Documentation

[Read the Documentation on docs.sylius.com](http://docs.sylius.com).  
[Read the Documentation on symfony.com](https://symfony.com/doc/current/frontend.html).  
[Read the Documentation of webpack-dev-server](https://github.com/webpack/webpack-dev-server).  

## Attribution

This project is based on [Sylius/Sylius-Standard v1.13](https://github.com/Sylius/Sylius-Standard).

## Authors

[Abel BRIEN](https://github.com/aboul).
