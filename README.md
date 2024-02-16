# Lunch Buddy Application

## Overview

This repository contains Express server backend and Angular frontend app for Lunch Buddy. There are also kubernetes configuration files that create kubernetes cluster containing those two elements along with Mongo database and Ingress controller.

## Components

### Kubernetes Cluster:

The Kubernetes cluster is deployed on the VM essa-vm-08.lrk.si.
The cluster includes multiple worker nodes for distributing the workload.

### Cert-manager:

Cert-manager is installed within the Kubernetes cluster to manage TLS certificates.
Let's Encrypt is used as the certificate issuer to provide HTTPS encryption for our application.

### Ingress Controller:

Nginx Ingress Controller is deployed to manage incoming HTTP and HTTPS traffic.
Ingress resources are defined to route requests to the appropriate services based on hostname and path.

### Application Stack:

Angular App:

The frontend Angular application provides the user interface.
It is deployed as a Kubernetes Deployment with multiple replicas for scalability.
The Angular app service is exposed internally within the cluster.

Express.js App:

The backend Express.js application serves as the API server for the frontend.
It is deployed as a Kubernetes Deployment with multiple replicas for scalability.
The Express.js app service is exposed internally within the cluster.

MongoDB:

MongoDB is used as the database for storing application data.
It is deployed as a stateful set to ensure data persistence.
The MongoDB service is exposed internally within the cluster.

## Deployment Workflow

### Source Code Management:

The application source code is stored in this repository.
Upon push to the repository, GitHub Actions or another CI/CD tool automatically builds Docker images for each microservice and pushes them to ghcr.io Docker registry.


### Kubernetes Deployment:

The Kubernetes deployment manifests are stored in the kubernetes_files folder within the repository.
To deploy the application to Kubernetes:
Clone the repository to your local machine or access it directly from your CI/CD environment.
Apply all YAML files in the kubernetes_files folder to your Kubernetes cluster using kubectl apply -f <filename> or a similar command.
Ensure that the necessary secrets or configurations are set up in your Kubernetes cluster, such as access to the Docker registry or any environment-specific configurations.


### Deployment Verification:

After applying the YAML files, monitor the Kubernetes resources using kubectl get <resource> and kubectl describe <resource> commands to ensure that all resources are created and running as expected.
Use kubectl get pods, kubectl get services, and other relevant commands to verify that the application pods are running, services are exposed, and Ingress resources are correctly configured.




