# Posts microservice

## `/posts` 

### `GET`

Retrieve all posts

`curl localhost:4000/posts`

### `POST`

Post a post.

**Request body:**

```JSON
{
    "title":"My first post"
}
```

**Answer:**

```JSON
{
    "id":"dca3a505",
    "title":"My first post"
}
```

`curl -X POST -d '{"title":"My first post"}' -H "Content-Type: application/json"  localhost:4000/posts`