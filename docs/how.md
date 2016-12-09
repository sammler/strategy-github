
## General Todos
- [ ] We have a conflict in the date-fields, GitHub is also using `created_at` and `updated_at`. 
Change the fields to `s5r_created_at` and `s5r_updated_at`
- [ ] Move to airbnb lint style, seems to be more widely used than idiomatic.
- [ ] API design: Go with `profile` or `profiles` in the endpoint => document as standard

## Sync profile task

The sync profile task is the core of the GitHub strategy:

- It listens to the _sammler_ RabbitMQ instance and syncs a GitHub profile into the _sammler_strategy_github_ MongoDB instance.

In detail:

The sync task gets triggered by a message `strategy.github.profile.sync` in `queue` of RabbitMQ.
_(Note: The entire message structure of RabbitMQ has to be designed properly as the platform evolves)._

- [x] Fetch the GitHub profile for the authenticated user
  - [x] Save the result to table `profiles`
  - [ ] Sync the history of the profile to `profile_history`
    - [ ] Update the history of profile-followers
    - [ ] Update the history of profile-following
    - [ ] Update the history of profile-gists
    - [ ] Update the history of starred profiles
    - [ ] Update the history of subscriptions
    - [ ] Update the history of repositories
    - [ ] Update the history of events
    - [ ] Update the history of received-events    
  - [ ] Set `last_sync` to current date
  - [ ] Acknowledge `strategy.github.profile.sync` to be finished in `queue` in RabbitMQ.
 
## Sync repos

- [ ] Iterate for each of the GitHub repos of a profile (determined by filter if only public or also private ones)
  - For each repo
    - [ ] Save the history (stargazers, etc.) per day
    - [ ] Save changes of stargazers
    - [ ] Save changes of subscribers
    - [ ] 
  
 