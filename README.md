For the time being, I named this as **w8nc**, which means `wait and see`. Simple http request to queue anything you want, just queue, wait and see.

> Everything is still work in progress. Welcome to contribute.
> This is totally not ready yet to be used!

## Motivation

I am basically building a lot of projects in serverless land, where server does not live long enough to run jobs. I've been using zeplo and thought maybe I could make something from it.

Maybe a self hosted version of this would make me happier?

## Supported Features

-   Scheduled one off or cron based jobs
-   Resume and pause the jobs as you need
-   Allow retry if task failed
-   Allow forward specified headers
-   Request and response headers are saved in task for more information

## Roadmap

-   Task management api
-   Allow auth and access token for api access
-   Dashboard console for admin
-   Proper docs
-   Dockerized the app for ease of self hosting

## Concept

The app has 2 important part, which is job and task. A job can be either `one off` or `recurring`, while each task will be run under the parent job.

## API

### Get all jobs

```js
import axios from "axios";

const options = {
    method: "GET",
    url: "https://domain-for-this-app.com/api/jobs",
    headers: {
        "Content-Type": "application/json",
    },
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
```

### Get single job

```js
import axios from "axios";

const options = {
    method: "GET",
    url: "http://domain-for-this-app.com/api/job/{jobID}",
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
```

### Post a new job

There's 2 ways to post a job. You can either define the config with `cron` key and specify your desired cron expression, or define a `date` key, which will schedule to hit on that particular time.

#### Post as cron (recurring)

```js
import axios from "axios";

const options = {
    method: "POST",
    url: "https://domain-for-this-app.com/api/job",
    headers: { "Content-Type": "application/json" },
    data: {
        config: { cron: "*/1 * * * *" }, // Any cron expression
        retry: retryNumber, //eg. 3
        url: "https://destination-url.com/api/whatever", // Destination url
        data: { hello: "cron" }, // Any data to include when call to your api
        headers: { "x-test": true }, // Forward any headers
    },
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
```

#### Post as scheduled date (once)

The date object should be in UTC string.

```js
import axios from "axios";

const options = {
    method: "POST",
    url: "https://domain-for-this-app.com/api/job",
    headers: { "Content-Type": "application/json" },
    data: {
        config: { date: "2023-02-13T17:29:00.000Z" }, // Date string in UTC
        retry: retryNumber, //eg. 3
        url: "https://destination-url.com/api/whatever", // Destination url
        data: { hello: "schedule" }, // Any data to include when call to your api
        headers: { "x-test": true }, // Forward any headers
    },
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
```

### Pause a job

To pause a job, the job status has to be `pending`

```js
import axios from "axios";

const options = {
    method: "PUT",
    url: "https://domain-for-this-app.com/api/job/{jobID}/pause",
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
```

### Resume a job

To resume a job, the job status has to be `inactive`.

```js
import axios from "axios";

const options = {
    method: "PUT",
    url: "http://domain-for-this-app.com/api/job/{jobID}/resume",
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
```
