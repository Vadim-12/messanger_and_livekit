# Socket Service

---

## After copying into your project, update the node.js dependencies and all packages.
## It will also be nice if you create a merge requeue with updated dependencies afterwards :)

---

## Dependencies

```
Node.js >= 16.3.0
RabbitMQ
```

## Available scripts

> npm run start - to start service \
> npm run dev - to start service with nodemon \
> npm run lint - to lint service \
> npm run lint:fix - to lint and fix errors \
> npm run lint:watch - to lint and watch for changes


## Service parts

### Broker
#### The broker divided into modules by exchanges

Each module contains:
- Publisher - publish a message to the queue
- Consumer - subscribes to the queue
- Controller - calls service, ack message

#### Broker config must be sync with other services

### Services
Services must accept the first argument of an object with variables

### External Services
External services contain services that access external api

### Boot
Boot contains the scripts that are run at service startup

### Config
Config contains configuration files

### Const
Const contains files with constants

### Utils
Utils contain helping functions
