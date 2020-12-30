# Blog app microservices

This is a blog app built as a set of microservices, implementing an built-in-from-scratch event-bus and orchestrated with Kubernetes.

**DO NOT** use this as a microservices template tho.

This has been developped using Node, React, and [minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/) as a "Kubernetes VM".

## Set up

- Start minikube : `minikube start`
- Type `minikube ip` to show the IP held by minikube
- Add this address to your `/etc/hosts` followed by the domain `minikube.com` (eg: `192.168.49.2     minikube.com`)


## Start in production

You can alternatively :

- `skaffold run` at the root of the project, if you have skaffold installed
- execute `buildAllAndStart.sh`

## Start in dev

You'll need [skaffold to be installed](https://skaffold.dev/) for that.
Then run `skaffold dev`.

## About the app

It's a simple post + comment app.

You make a **post**, then you can add **comment** on it. Every comment is filtered by the **moderation** service : the word "loser" is rejected.

The **query** service basically collects posts with their associated comments.

The architecture is organized around events, most of the microservices actions are **event-driven**

You'll have to refresh the page each time you make a post or a comment, it's not dynamic.
**The sole purpose of all this was to try out a little app using a microservices architecture, that I could orchestrate with Kubernetes.**
Not to make something fancy.
