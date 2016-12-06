
## Sync profile task

The sync profile task is the core of the GitHub strategy:

- It listens to the _sammler_ RabbitMQ instance and syncs a GitHub profile into the _sammler_strategy_github_ MongoDB instance.

In detail:

The sync task gets triggered by a message `github.sync` in `queue` of RabbitMQ.
_(Note: The entire message structure of RabbitMQ has to be designed properly as the platform evolves)._

- [ ] Fetch the GitHub profile for the authenticated user
  - [ ] Save the result to table `profiles`
  - [ ] Sync the history of the profile
  - [ ] Set `last_sync` to current date
  - [ ] Acknowledge `github.sync` to be finished in `queue` in RabbitMQ.
  

  
 