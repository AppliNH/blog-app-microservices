# Using kubernetes

`minikube start` first please.

`kubectl apply -f [config_file]` : apply a config file to the cluster

## Terminology 

- Kubernetes cluster : a collection of nodes + a master to manage them
- Node : a virtual or physical machine that will run containers
- Pod : atomic unit of a kubernetes cluster, can run one or several container(s)
- Deployment : Monitors a set of pods, make they sure they are running and restart them if they crash
- Service : Provides a readable URL to access one or several pod(s)

# Pods

## Commands

- `kubectl get pods`
- `kubectl exec -it [pod_name] [cmd]`
- `kubectl logs [pod_name]`
- `kubectl delete pod [pod_name]`
- `kubectl describe pod [pod_name]`


## Run `example.yml`

Because we'll be using a local image, you have to build it, from the posts service's Dockerfile.

However, you have to build it in the context of minikube, so it can find the image (remember, minikube is running as a VM).

so basically, in the same shell :

- `eval $(minikube docker-env)` to build in the context of the minikube VM
- `docker build -t applinh/posts posts/.`

and then, you can go for `kubectl apply -f infra/k8s/example.yml`


# Deployment

The deployment manages a set of pod :

- Monitors the pods' state
- Restart if they crash
- Update them if there's an update policy

`kubectl apply -f posts-depl.yaml`

## Commands

- `kubectl get deployments`
- `kubectl describe deployment [deployment_name]`
- `kubectl delete deployment [deploymet_name]`

## Updating pods

### Method 1 (not very used)

- Make a change in code
- Rebuild the image with a new version code (0.0.3)
- Update the image in the config file
- `kubectl apply -f [file]`

### Method 2

- Do not specify version code in your config file
- `kubectl apply -f [file]`

then :

- Make a change in code
- Rebuild the image
- Push to your registry
- `kubectl rollout restart deployment [deployment_name]`

### Method 3

Set a pull policy

# Services

Services provide networking between pods, and from the outside world to a pod.

## Types of services

- **Cluster IP:** sets up an easy-to-remember URL to access a pod. Only exposes pods *in the cluster*.
- **Node Port:** makes a pod accessible from outside the cluster. Usually only used for dev purposes.
- **Load Balancer:** Makes a pod accessible from outside the cluster. This is the right way to expose a pod to the outside world.
- **External Name:** redirects an in-cluster request to a CNAME url


### Node port

Will expose a **random port** when applying the configuration to the cluster(ex : `32343`) (you can see it by listing services `kubectl get services`).

Then, you can query your service using the minikube ip (you can get it with the cmd `minikube ip`) and the node port.
Development purposes only !

### Cluster IP

A cluster IP service exposes a pod inside a cluster. It's through and thanks to this service that two pods can communicate with each others inside of a cluster.

The cluster ip config file needs to be done on the two pods who need to communicate between each others.

In the code, in order to reach the cluster ip service of the targeted pod, you have to use the name of the service (ex: `http://event-bus-service:4005`).


### Load balancer service

A load balancer service basically tells the cluster to reach out to its provider and provision a load balancer. In the end it gets traffic into a single pod. The load balancer itself is often a third party that you can benefit from a cloud provider (AWS, GCP, AZURE, etc)

It's coupled to an **Ingress Controller**. It's a pod with a set of routing rules to distribute traffic to other pods.

### Ingress Controller : Ingress-nginx

An open source project that will crate a Load Balancer Service + an Ingress. It's similar to **kubernetes-ingress**.

> `minikube addons enable ingress`

Thanks to the ingress config file `host` key, you can host multiple apps at multiple different domain names.

However, when running locally on your computer, this is kind of cumbersome to deal with this feature.

In dev stage, add the minikube ip + a custom domain name to your `/etc/hosts`, and use it as a host (ex: `192.168.49.2      minikube.com`).
However, I advise you to use the same domain name as your prod domain name instead of a random one, and edit it in your `/etc/hosts`.




