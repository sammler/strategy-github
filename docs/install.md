First install yarn:

```
npm install -g yarn
```


**Production environment**

```sh
$ yarn run dc-up
```

**Development environment**

```sh
$ yarn run dc-dev-up
```

The development environment uses different ports, to not conflict with the sammler development environment:

- Rest service:
  - 
- RabbitMQ:
  - 18080 - Management UI
  - 15672 - Communication port
- MongoDB:
  - 27117
- jobs-service
  - 4003