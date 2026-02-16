\# Inventory Management System (Production-Grade AWS Deployment)

A full-stack inventory management application deployed on AWS using a highly available, production-style architecture with Auto Scaling, Load Balancing, and managed database services.

![AWS Architecture](architecture/aws-architecture.png)


\## Live Architecture



Internet

&nbsp;  ↓

Application Load Balancer

&nbsp;  ↓

Auto Scaling Group (2–5 EC2 instances)

&nbsp;  ↓

Docker Containers

&nbsp;  ├── Frontend (React)

&nbsp;  └── Backend (Node.js/Express)

&nbsp;        ↓

Amazon RDS (MySQL)



---



\## Key Features



\- JWT-based authentication

\- Role-based access (Admin/User)

\- Product inventory management

\- Low-stock alerts

\- Inventory activity logs

\- Analytics dashboard



---



\## Tech Stack



Frontend:

\- React (Vite)

\- Tailwind CSS

\- Axios



Backend:

\- Node.js

\- Express

\- Sequelize ORM

\- JWT Authentication



Database:

\- MySQL (Amazon RDS)



DevOps \& Cloud:

\- AWS VPC (public \& private subnets)

\- Application Load Balancer

\- Auto Scaling Group

\- EC2 (Dockerized services)

\- RDS (private subnet)

\- Docker \& Docker Compose

\- GitHub Actions CI/CD



---



\## Production Architecture Highlights



\- Multi-AZ Auto Scaling Group (2–5 instances)

\- Private EC2 instances (no public access)

\- Bastion host for secure SSH

\- Database isolated in private subnet

\- Security-group based layered access

\- Path-based ALB routing:

&nbsp; - `/` → frontend

&nbsp; - `/api/\*` → backend



---



\## Security Model



Internet

&nbsp;  ↓

ALB Security Group

&nbsp;  ↓

EC2 Security Group

&nbsp;  ↓

RDS Security Group



---



\## Local Development



Clone the repository:



git clone https://github.com/Sashank2256/inventory-management-system.git

cd inventory-management-system



Run the app:



docker compose up -d



Frontend:

http://localhost:5173



Backend:

http://localhost:5000



---



\## Scaling Configuration



Min instances: 2  

Max instances: 5  

Scaling metric: CPU utilization  

Target CPU: 60%



---



\## Resume Highlights



\- Designed and deployed a production-style AWS architecture with VPC, ALB, Auto Scaling, and RDS.

\- Implemented secure private-subnet application servers with bastion access.

\- Built a full-stack containerized inventory system using React, Node.js, and MySQL.

\- Configured path-based routing and auto-scaling for high availability.

\- Automated build and deployment using GitHub Actions.



