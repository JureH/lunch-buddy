# Lunch Buddy Application

## Overview

This repository contains Express server backend and Angular frontend app for Lunch Buddy. There are also kubernetes configuration files that create kubernetes cluster containing those two elements along with Mongo database and Ingress controller.

## Components

Kubernetes Cluster:

The Kubernetes cluster is deployed on the VM essa-vm-08.lrk.si.
The cluster includes multiple worker nodes for distributing the workload.

Cert-manager:

Cert-manager is installed within the Kubernetes cluster to manage TLS certificates.
Let's Encrypt is used as the certificate issuer to provide HTTPS encryption for our application.

Ingress Controller:

Nginx Ingress Controller is deployed to manage incoming HTTP and HTTPS traffic.
Ingress resources are defined to route requests to the appropriate services based on hostname and path.

Application Stack:

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

The application source code is stored in this repository, upon push to the repository it automaticly buids and pushes images to ghcr.io docker registry.



