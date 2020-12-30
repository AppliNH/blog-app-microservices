#!/bin/bash

echo "Start minikube before that please !"

eval $(minikube docker-env)
docker build -t applinh/client client/
docker build -t applinh/posts posts/
docker build -t applinh/comments comments/
docker build -t applinh/query query/
docker build -t applinh/event-bus event-bus/
docker build -t applinh/moderation moderation/
kubectl apply -f infra/k8s/