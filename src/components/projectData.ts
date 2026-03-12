import { ProjectDetail } from "./ProjectModal";

export const projectDetails: Record<string, ProjectDetail> = {
  hakim: {
    title: "Hakim — Healthcare Platform",
    description:
      "Terraform-managed AWS infrastructure for a B2B/B2C healthcare platform: VPC with multi-AZ subnets, ALB + ACM + Cloudflare DNS, RDS PostgreSQL, EC2 compute, SQS/SNS event bus, S3, IAM and CodeDeploy — all workspace-aware for dev/stg/prd.",
    tags: ["Terraform", "AWS VPC", "ALB", "ACM", "RDS PostgreSQL", "EC2", "SQS", "SNS", "S3", "CloudWatch", "IAM", "CodeDeploy", "Cloudflare", "ECR"],
    color: "indigo",
    hld: {
      title: "Hakim — AWS High Level Architecture",
      layers: [
        {
          label: "DNS & TLS",
          color: "orange",
          items: ["Cloudflare DNS (proxied)", "ACM Certificate (TLS 1.2)", "Cloudflare SSL Full Mode"],
        },
        {
          label: "Edge / Load Balancer",
          color: "sky",
          items: ["Public ALB", "HTTP → HTTPS Redirect", "Target Group (port 80)", "Security Group (0.0.0.0/0 → 443/80)"],
        },
        {
          label: "Compute — Private Subnets",
          color: "violet",
          items: ["EC2 t3.medium (single)", "IAM Instance Profile", "Security Group (ALB → :80, SSH :22)", "AWS CodeDeploy Agent"],
        },
        {
          label: "Data Layer — Database Subnets",
          color: "emerald",
          items: ["RDS PostgreSQL (gp3)", "Multi-AZ optional", "KMS Encryption optional", "DB Subnet Group"],
        },
        {
          label: "Messaging — SQS / SNS",
          color: "amber",
          items: [
            "SNS: hakim-booking-events (fan-out)",
            "SQS: hakim-{customer|driver|admin|service-center|company}-events",
            "DLQ per queue (14-day retention)",
            "SQS: hakim-notification-queue",
            "SQS: hakim-payment-events + DLQ",
            "Filter policies per consumer role",
          ],
        },
        {
          label: "Storage & Logging",
          color: "rose",
          items: ["S3: asset bucket (public read)", "S3: envs bucket (env files)", "CloudWatch Log Groups (30-day retention)", "ECR: hakim-backend/* + hakim-frontend/*"],
        },
        {
          label: "Networking — VPC",
          color: "teal",
          items: [
            "VPC CIDR: dev=10.10.0.0/20 | stg=10.11.0.0/20 | prd=10.12.0.0/20",
            "3× Public Subnets",
            "3× Private Subnets (EC2)",
            "3× Database Subnets (RDS)",
            "3× Extra Subnets",
            "NAT Gateway",
          ],
        },
      ],
    },
    repoStructure: [
      {
        name: "hakim-infra/", type: "folder", children: [
          { name: "main.tf", type: "file" },
          { name: "variables.tf", type: "file" },
          { name: "locals.tf", type: "file" },
          { name: "outputs.tf", type: "file" },
          { name: "terraform.tf", type: "file" },
          { name: "vars/", type: "folder", children: [
            { name: "dev.tfvars", type: "file" },
            { name: "stg.tfvars", type: "file" },
          ]},
          { name: ".github/workflows/", type: "folder", children: [
            { name: "staging.yaml", type: "file" },
            { name: "dev.yaml", type: "file" },
          ]},
          { name: "modules/aws/", type: "folder", children: [
            { name: "vpc/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "alb/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "acm/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "output.tf", type: "file" },
            ]},
            { name: "rds/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "compute/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "iam/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "sqs/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "sns/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "s3/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "sg/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "ecr/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
            { name: "cloudwatch_log/", type: "folder", children: [
              { name: "main.tf", type: "file" },
              { name: "variables.tf", type: "file" },
              { name: "outputs.tf", type: "file" },
            ]},
          ]},
          { name: "modules/cloudflare/", type: "folder", children: [
            { name: "main.tf", type: "file" },
            { name: "variables.tf", type: "file" },
            { name: "outputs.tf", type: "file" },
          ]},
        ],
      },
    ],
    snippets: [
      {
        filename: "locals.tf — Network CIDR Layout",
        language: "terraform",
        code: `locals {
  env = {
    dev = "10.10.0.0/20"
    stg = "10.11.0.0/20"
    prd = "10.12.0.0/20"
  }

  subnet_cidrs = cidrsubnets(local.env["\${terraform.workspace}"], 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4)

  public_subnets   = slice(local.subnet_cidrs, 0, 3)
  private_subnets  = slice(local.subnet_cidrs, 3, 6)
  database_subnets = slice(local.subnet_cidrs, 6, 9)
  extra_subnets    = slice(local.subnet_cidrs, 9, 12)
}`,
      },
      {
        filename: "main.tf — VPC + RDS",
        language: "terraform",
        code: `module "vpc" {
  source   = "./modules/aws/vpc"
  vpc_name = "\${terraform.workspace}-vpc-hakim"
  vpc_cidr = local.env["\${terraform.workspace}"]

  public_subnets   = local.public_subnets
  private_subnets  = local.private_subnets
  database_subnets = local.database_subnets
  extra_subnets    = local.extra_subnets

  tags = merge(var.tags, {
    Environment = "\${terraform.workspace}"
    Criticality = "high"
  })
}

module "rds" {
  source        = "./modules/aws/rds"
  name_prefix   = var.rds_db_name
  environment   = terraform.workspace
  database_name = var.rds_db_name

  vpc_id                     = module.vpc.vpc_id
  vpc_cidr                   = module.vpc.vpc_cidr_block
  database_subnet_group_name = module.vpc.database_subnet_group_name

  instance_class   = var.rds_instance_class
  storage_size     = var.rds_storage_size
  storage_type     = "gp3"
  multi_az         = var.rds_multi_az

  backup_retention_period = var.rds_backup_retention_period
}`,
      },
      {
        filename: "main.tf — ALB + ACM + Cloudflare",
        language: "terraform",
        code: `module "alb" {
  source  = "./modules/aws/alb"
  name    = "hakim"
  vpc_id  = module.vpc.vpc_id
  subnets = module.vpc.public_subnets
  enable_deletion_protection = var.enable_deletion_protection
}

module "acm" {
  count  = var.enable_acm ? 1 : 0
  source = "./modules/aws/acm"

  domain_name      = var.domain_name
  subdomains       = var.app_subdomains
  alb_arn          = module.alb.alb_arn
  target_group_arn = module.alb.target_group_arn
  ssl_policy       = "ELBSecurityPolicy-TLS-1-2-2017-01"
}

module "cloudflare" {
  count  = var.enable_acm ? 1 : 0
  source = "./modules/cloudflare"

  zone_id      = var.cloudflare_zone_id
  domain_name  = var.domain_name
  subdomains   = var.app_subdomains
  alb_dns_name = module.alb.alb_dns_name
  proxied      = true
  ssl_mode     = "full"

  acm_validation_records = {
    for k, v in module.acm[0].validation_records : k => v
    if k != var.domain_name && k != "*.\${var.domain_name}"
  }
}`,
      },
      {
        filename: "main.tf — SNS Fan-out + SQS per Role",
        language: "terraform",
        code: `locals {
  booking_event_roles = ["customer", "driver", "admin", "service-center", "company"]
}

module "booking_events_sns_topic" {
  source     = "./modules/aws/sns"
  topic_name = "hakim-booking-events-\${terraform.workspace}"
}

module "booking_events_queue" {
  source   = "./modules/aws/sqs"
  for_each = toset(local.booking_event_roles)

  queue_name                 = "hakim-\${each.value}-events-\${terraform.workspace}"
  message_retention_seconds  = 345600   # 4 days
  visibility_timeout_seconds = 346
  receive_wait_time_seconds  = 20

  redrive_policy = {
    dead_letter_target_arn = module.booking_events_dlq[each.value].main_queue_arn
    max_receive_count      = 1000
  }

  queue_policy = jsonencode({
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "sns.amazonaws.com" }
      Action    = "sqs:SendMessage"
      Condition = { ArnEquals = {
        "aws:SourceArn" = module.booking_events_sns_topic.topic_arn
      }}
    }]
  })
}`,
      },
      {
        filename: "main.tf — IAM Role + Inline Policies",
        language: "terraform",
        code: `module "iam" {
  source = "./modules/aws/iam"
  roles = {
    "\${terraform.workspace}_ec2_role" = {
      name = "hakim-\${terraform.workspace}-EC2Role"
      assume_role_policy = jsonencode({
        Statement = [{
          Effect    = "Allow"
          Principal = { Service = ["ec2.amazonaws.com", "codedeploy.amazonaws.com"] }
          Action    = "sts:AssumeRole"
        }]
      })
      policy_arns = [
        "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy",
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
      ]
      inline_policies = {
        S3ReadAccess   = jsonencode({ ... })
        CloudWatchLogs = jsonencode({ ... })
        SQSSNSAccess   = jsonencode({ ... })
      }
    }
  }
}`,
      },
    ],
  },

  esim: {
    title: "eSIM Platform Infrastructure",
    description:
      "Modular Terraform AWS infrastructure for a Spring Boot eSIM backend: VPC with pod subnets, public ALB + ACM + Route53, EC2 compute, RDS PostgreSQL, cross-region VPC peering, S3, IAM/CodeDeploy, and Docker Compose deployments with Nginx, Datadog APM and OpenTelemetry.",
    tags: ["Terraform", "AWS VPC", "ALB", "ACM", "Route53", "RDS PostgreSQL", "EC2", "CodeDeploy", "VPC Peering", "S3", "IAM", "Docker Compose", "Nginx", "Datadog", "OTEL"],
    color: "amber",
    hld: {
      title: "eSIM — AWS High Level Architecture",
      layers: [
        {
          label: "DNS & TLS",
          color: "orange",
          items: ["Route53 A (alias → ALB)", "ACM Certificate (fib-one.com + esim-v2.*)", "HTTP → HTTPS Redirect on ALB"],
        },
        {
          label: "Edge / Load Balancer",
          color: "sky",
          items: ["Public ALB (esim-prod-alb)", "Target Group (:80, /health check)", "SG: 0.0.0.0/0 → 443/80"],
        },
        {
          label: "Compute — Private Subnets",
          color: "violet",
          items: ["EC2 t3.small (single, no ASG)", "IAM: CodeDeploy + ECR ReadOnly + S3", "SG: ALB → :80, SSH VPC-only", "AWS CodeDeploy Agent"],
        },
        {
          label: "Application Stack",
          color: "indigo",
          items: ["Docker Compose", "Spring Boot esim-backend (:8080)", "Nginx reverse proxy (:80)", "Datadog Agent (APM, OTEL gRPC/HTTP)", "ECR: esim/backend:*-latest"],
        },
        {
          label: "Data Layer",
          color: "emerald",
          items: ["RDS PostgreSQL (db.t3.micro)", "Database Subnets", "VPC Peering (cross-region eu-west-1)", "SG: :5432 from peered VPC CIDRs"],
        },
        {
          label: "Storage",
          color: "rose",
          items: ["S3: esim-tsa-asset-bucket-* (public CDN)", "S3: esim-tsa-envs-bucket-* (env files)", "CloudWatch Logs"],
        },
        {
          label: "Networking — VPC",
          color: "teal",
          items: ["dev=10.10.0.0/16 | stg=10.11.0.0/16 | prd=10.12.0.0/16", "3× Public /24 (ALB)", "3× Private /24 (EC2)", "3× Database /24 (RDS)", "3× Extra /24", "3× Pod /20 (future EKS)", "NAT Gateway"],
        },
      ],
    },
    repoStructure: [
      {
        name: "esim-infra/", type: "folder", children: [
          { name: "main.tf", type: "file" },
          { name: "vars.tf", type: "file" },
          { name: "locals.tf", type: "file" },
          { name: "terraform.tf", type: "file" },
          { name: "Makefile", type: "file" },
          { name: "vars/", type: "folder", children: [
            { name: "dev.tfvars", type: "file" },
            { name: "prod.tfvars", type: "file" },
          ]},
          { name: ".github/workflows/", type: "folder", children: [
            { name: "dev.yaml", type: "file" },
            { name: "prod.yaml", type: "file" },
          ]},
          { name: "modules/aws/", type: "folder", children: [
            { name: "vpc/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "alb/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "acm/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "compute/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "iam/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "rds/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "s3/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "sg/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "ecr/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "sqs/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "codedeploy/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "route53/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "vpc-peering/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "cloudwatch/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
          ]},
        ],
      },
      {
        name: "esim-infra-compose/", type: "folder", children: [
          { name: ".github/workflows/", type: "folder", children: [
            { name: "deploy.yaml", type: "file" },
            { name: "dev-deploy.yaml", type: "file" },
            { name: "prod-deploy.yaml", type: "file" },
          ]},
          { name: "esim-backend/", type: "folder", children: [
            { name: "appspec.yml", type: "file" },
            { name: "scripts/", type: "folder", children: [
              { name: "before_install.sh", type: "file" },
              { name: "after_install.sh", type: "file" },
              { name: "start_server.sh", type: "file" },
              { name: "setup_nginx.sh", type: "file" },
              { name: "datadog_install.sh", type: "file" },
              { name: "otel_install.sh", type: "file" },
            ]},
          ]},
          { name: "dev-deploy/", type: "folder", children: [
            { name: "esim-backend/appspec.yml", type: "file" },
            { name: "esim-backend/scripts/", type: "folder" },
            { name: "shared/docker-compose.yaml", type: "file" },
            { name: "shared/inginx/conf.d/esim.conf", type: "file" },
          ]},
          { name: "prod-deploy/", type: "folder", children: [
            { name: "esim-backend/appspec.yml", type: "file" },
            { name: "esim-backend/scripts/", type: "folder" },
            { name: "shared/docker-compose.yaml", type: "file" },
          ]},
          { name: "shared/", type: "folder", children: [
            { name: "docker-compose.yaml", type: "file" },
            { name: "inginx/Dockerfile", type: "file" },
            { name: "inginx/nginx.conf", type: "file" },
            { name: "inginx/conf.d/esim.conf", type: "file" },
          ]},
          { name: "envs/dev/application.properties", type: "file" },
          { name: "envs/prod/application.properties", type: "file" },
        ],
      },
    ],
    snippets: [
      {
        filename: "locals.tf — VPC CIDR Layout",
        language: "terraform",
        code: `locals {
  env = {
    dev = "10.10.0.0/16"
    stg = "10.11.0.0/16"
    prd = "10.12.0.0/16"
  }
  base_cidr = local.env["\${terraform.workspace}"]

  public_subnets = [
    cidrsubnet(local.base_cidr, 8, 0),  # 10.X.0.0/24
    cidrsubnet(local.base_cidr, 8, 1),  # 10.X.1.0/24
    cidrsubnet(local.base_cidr, 8, 2),  # 10.X.2.0/24
  ]
  private_subnets = [
    cidrsubnet(local.base_cidr, 8, 10), # 10.X.10.0/24
    cidrsubnet(local.base_cidr, 8, 11), # 10.X.11.0/24
    cidrsubnet(local.base_cidr, 8, 12), # 10.X.12.0/24
  ]
  database_subnets = [
    cidrsubnet(local.base_cidr, 8, 20), # 10.X.20.0/24
    cidrsubnet(local.base_cidr, 8, 21), # 10.X.21.0/24
    cidrsubnet(local.base_cidr, 8, 22), # 10.X.22.0/24
  ]
  # Pod subnets — /20 each (4,096 IPs, future EKS)
  pod_subnets = [
    cidrsubnet(local.base_cidr, 4, 4), # 10.X.64.0/20
    cidrsubnet(local.base_cidr, 4, 5), # 10.X.80.0/20
    cidrsubnet(local.base_cidr, 4, 6), # 10.X.96.0/20
  ]
}`,
      },
      {
        filename: "main.tf — VPC + ALB + ACM + Route53",
        language: "terraform",
        code: `module "vpc" {
  source             = "./modules/aws/vpc"
  vpc_name           = "\${terraform.workspace}-vpc-tsa"
  vpc_cidr           = local.env["\${terraform.workspace}"]
  public_subnets     = local.public_subnets
  private_subnets    = local.private_subnets
  database_subnets   = local.database_subnets
  pod_subnets        = local.pod_subnets
  enable_nat_gateway = "true"
}

module "alb" {
  source                 = "./modules/aws/alb"
  name                   = "esim-prod-alb"
  vpc_id                 = module.vpc.vpc_id
  subnets                = module.vpc.public_subnets
  redirect_http_to_https = true
  certificate_arn        = module.acm.certificate_arn
  health_check_path      = "/health"
}

module "acm" {
  source              = "./modules/aws/acm"
  domain_name         = "fib-one.com"
  subdomains          = ["esim-v2"]
  include_root_domain = false
  zone_id             = "Z00890231SHQHLFQC7NV2"
  create_route53_records = true
  alb_arn             = module.alb.alb_arn
  target_group_arn    = module.alb.target_group_arn
}

module "route53" {
  source = "./modules/aws/route53"
  external_zone_records = {
    "esim-d-v2" = {
      zone_id = "Z00890231SHQHLFQC7NV2"
      name    = "esim-v2"
      type    = "A"
      alias = {
        name                   = module.alb.alb_dns_name
        zone_id                = module.alb.alb_zone_id
        evaluate_target_health = true
      }
    }
  }
}`,
      },
      {
        filename: "main.tf — EC2 SG + IAM + Compute",
        language: "terraform",
        code: `resource "aws_security_group" "app_instance_sg" {
  name   = "\${terraform.workspace}-app-sg"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [module.alb.security_group_id]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block] # VPC-only SSH
  }
  egress { from_port = 0; to_port = 0; protocol = "-1"; cidr_blocks = ["0.0.0.0/0"] }
}

module "iam" {
  source = "./modules/aws/iam"
  roles = {
    "\${terraform.workspace}_ec2_role" = {
      name = "esim-prod-EC2Role"
      assume_role_policy = jsonencode({ Statement = [{
        Effect = "Allow"
        Principal = { Service = ["ec2.amazonaws.com", "codedeploy.amazonaws.com"] }
        Action = "sts:AssumeRole"
      }]})
      policy_arns = [
        "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy",
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
      ]
      inline_policies = { S3ReadAccess = jsonencode({ ... }) }
    }
  }
}

module "compute_app_instance" {
  source             = "./modules/aws/compute"
  name               = "esim-app"
  ami_id             = data.aws_ami.ubuntu.id
  instance_type      = "t3.small"
  subnet_ids         = module.vpc.private_subnets
  security_group_ids = [aws_security_group.app_instance_sg.id]
  create_asg         = false
  target_group_arns  = [module.alb.target_group_arn]
  iam_instance_profile_name = module.iam.instance_profile_names["\${terraform.workspace}_ec2_role"]
}`,
      },
      {
        filename: "main.tf — Cross-Region VPC Peering",
        language: "terraform",
        code: `locals {
  route_table_map = {
    private  = module.vpc.private_route_table_ids
    public   = module.vpc.public_route_table_ids
    database = module.vpc.database_route_table_ids
    intra    = module.vpc.intra_route_table_ids
  }
}

module "vpc_peering" {
  source = "./modules/aws/vpc-peering"
  providers = {
    aws      = aws
    aws.peer = aws.eu_west_1  # Cross-region peer
  }
  environment = terraform.workspace

  vpc_peering_connections = {
    for k, v in var.vpc_peering_connections : k => {
      requester_vpc_id   = module.vpc.vpc_id
      requester_vpc_cidr = module.vpc.vpc_cidr_block
      accepter_vpc_id    = v.accepter_vpc_id
      accepter_vpc_cidr  = v.accepter_vpc_cidr
      peer_region        = v.peer_region
      auto_accept        = v.auto_accept
      requester_route_table_ids = distinct(flatten([
        for rt_type in v.requester_route_table_types :
          local.route_table_map[rt_type]
      ]))
    }
  }
}

# Dynamic SG rules — allow peered VPCs to reach RDS :5432
resource "aws_security_group_rule" "rds_from_peered_vpcs" {
  for_each          = var.rds_additional_ingress_cidrs
  type              = "ingress"
  from_port         = 5432
  to_port           = 5432
  protocol          = "tcp"
  cidr_blocks       = [each.value]
  description       = "PostgreSQL from peered VPC: \${each.key}"
  security_group_id = module.rds_prod.security_group_id
}`,
      },
      {
        filename: "shared/docker-compose.yaml",
        language: "yaml",
        code: `version: '3.8'

services:
  nginx:
    build: ./nginx
    container_name: nginx-proxy
    ports:
      - "80:80"
    networks: [app-network]

  esim-backend:
    image: 851725652938.dkr.ecr.me-central-1.amazonaws.com/esim/backend:dev-latest
    container_name: esim-backend
    restart: unless-stopped
    ports:
      - "\${APP_PORT:-8080}:8080"
    environment:
      - OTEL_SERVICE_NAME=esim-backend
      - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=\${DD_ENV:-dev}
    volumes:
      - ./application.properties:/opt/app/application.properties:ro
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      retries: 3
    networks: [app-network]

  datadog-agent:
    image: datadog/agent:7.57.0
    container_name: datadog-agent
    ports:
      - "4317:4317"  # OTLP gRPC
      - "4318:4318"  # OTLP HTTP
      - "8126:8126"  # APM traces
    environment:
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
    networks: [app-network]

networks:
  app-network:`,
      },
      {
        filename: "esim-backend/appspec.yml + start_server.sh",
        language: "yaml",
        code: `# appspec.yml
version: 0.0
os: linux
files:
  - source: /docker-compose.yaml
    destination: /opt/esim-backend/app
  - source: /scripts/
    destination: /opt/esim-backend/app/scripts/

permissions:
  - object: /opt/esim-backend/app/scripts/*
    owner: root
    mode: 755
    type: [file]

hooks:
  BeforeInstall:
    - location: scripts/before_install.sh
      timeout: 300
      runas: root
  AfterInstall:
    - location: scripts/after_install.sh
      timeout: 300
      runas: root
    - location: scripts/setup_nginx.sh
      timeout: 300
      runas: root
    - location: scripts/datadog_install.sh
      timeout: 300
  ApplicationStart:
    - location: scripts/start_server.sh
      timeout: 300
      runas: root

# --- start_server.sh ---
#!/bin/bash
set -e
cd /opt/esim-backend/app

docker compose -f docker-compose.yaml up -d --force-recreate --no-deps esim-backend
sleep 10
docker exec nginx-proxy nginx -s reload

if docker compose -f docker-compose.yaml ps | grep -q "esim-backend.*Up"; then
  echo "esim-backend started successfully"
else
  docker compose -f docker-compose.yaml logs esim-backend
  exit 1
fi`,
      },
      {
        filename: ".github/workflows/prod-deploy.yaml",
        language: "yaml",
        code: `name: Deploy PROD Services

on:
  repository_dispatch:
    types: [prod-service-updated]
  workflow_dispatch:
    inputs:
      service:
        description: 'Service to deploy'
        required: true
        type: string

jobs:
  deploy:
    runs-on: ubuntu-latest
    concurrency:
      group: codedeploy-\${{ github.event.client_payload.service || inputs.service }}
      cancel-in-progress: false
    env:
      SERVICE_NAME: \${{ github.event.client_payload.service || inputs.service }}
      IMAGE_URL: \${{ github.event.client_payload.image || inputs.image }}
    steps:
      - uses: actions/checkout@v5
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ secrets.AWS_REGION }}

      - name: Wait if another deployment is in progress
        run: |
          while aws deploy list-deployments \\
            --application-name \${{ secrets.CODE_DEPLOY_APP }} \\
            --include-only-statuses InProgress \\
            --query "deployments" --output text | grep -q .; do
              echo "Another deployment running. Waiting 30s..."
              sleep 30
          done`,
      },
    ],
  },

  loto: {
    title: "Loto Project — Full Platform",
    description:
      "End-to-end lottery platform on EKS 1.31: Atlantis-driven Terraform for VPC, EKS, RDS PostgreSQL, ArgoCD GitOps for 7 microservices (tls-*), AWS Managed Grafana + Loki S3 + Prometheus observability, Cloudflare-DNS ACM certificates, CloudFront CDN, and Cloudflare Zero Trust — across staging, production and sandbox environments.",
    tags: ["EKS", "ArgoCD", "Kustomize", "Terraform", "Atlantis", "Loki", "Prometheus", "Grafana", "RDS PostgreSQL", "Cloudflare", "CloudFront", "External Secrets", "AWS SSO", "Cert-Manager"],
    color: "sky",
    hld: {
      title: "Loto Platform — AWS High Level Architecture",
      layers: [
        {
          label: "DNS & CDN",
          color: "orange",
          items: [
            "Cloudflare DNS — proxied records for all subdomains",
            "ACM certs: site + infra subdomains (argocd, grafana, loki, prometheus) + app subdomains (7× tls-* services)",
            "CloudFront Distribution — cdn.iraqloto.iq → S3 OAC, TLSv1.2_2021, PriceClass_100",
            "external-dns helm chart (bitnami 6.20.4) — auto-creates CF records from K8s Ingress",
          ],
        },
        {
          label: "GitOps — ArgoCD",
          color: "violet",
          items: [
            "ArgoCD 7.7.0 — installed via eks-blueprints-addons helm module",
            "SAML SSO via AWS Identity Center (IAM Identity Center)",
            "ALB Ingress (internet-facing, HTTPS:443, ip target-type)",
            "14 ArgoCD Applications: tls-cms, tls-connect, tls-frontend, tls-lottomanager, tls-retailmanager, tls-usermanager, tls-data-manipulation, tls-common + observability stack",
            "Kustomize overlays per environment (staging branch / sandbox branch)",
            "ECR image tags patched per app per environment",
          ],
        },
        {
          label: "EKS Cluster (v1.31)",
          color: "sky",
          items: [
            "EKS module ~20.0 — cluster name: loto-<workspace>",
            "Managed Node Groups: t3.xlarge, 2 node groups × N nodes, multi-AZ",
            "Addons: coredns, vpc-cni, kube-proxy, eks-pod-identity-agent (all latest)",
            "AWS Load Balancer Controller 1.10.0 — provisions ALBs from Ingress",
            "cert-manager 1.16.1 — TLS automation",
            "external-secrets 0.10.5 — syncs AWS Secrets Manager → K8s secrets",
            "EFS CSI Driver — PVCs for lottomanager & usermanager (EFS-backed)",
            "IAM auth configmap — AWS SSO cluster-admin role mapping",
          ],
        },
        {
          label: "Observability Stack",
          color: "emerald",
          items: [
            "AWS Managed Grafana — SSO (admin + viewer groups), CloudWatch datasource",
            "Loki — S3 chunks + S3 ruler buckets (loto-loki-chunks-<env>, loto-loki-ruler-<env>), IRSA role",
            "Prometheus — internal ALB, SG allows only Managed Grafana egress on :80",
            "Loki gateway SG — restricts ingress to Managed Grafana security group only",
            "ArgoCD Applications: prometheus.yaml + loki.yaml per environment",
          ],
        },
        {
          label: "Data Layer",
          color: "teal",
          items: [
            "RDS PostgreSQL (engine version configurable) — identifier: loto-<workspace>",
            "db.t3.* instance class, gp3/io1 storage, multi-AZ optional",
            "Performance Insights (7d), Enhanced Monitoring (60s interval)",
            "Backup: configurable retention, maintenance Mon 00:00–03:00",
            "Parameters: rds.force_ssl=0, autovacuum=1, client_encoding=utf8",
            "Secrets Manager — DB password auto-generated",
            "EFS — persistent volumes for stateful workloads (lottomanager PVC)",
          ],
        },
        {
          label: "Network — VPC",
          color: "amber",
          items: [
            "VPC CIDR: <vpc_network_prefix>.0.0/16, 2 AZs",
            "Public subnets — ALB, NAT Gateway (single NAT)",
            "Private subnets — EKS worker nodes, internal LBs (elb tag)",
            "Database subnets — RDS instances",
            "DNS hostnames enabled, database subnet group auto-created",
          ],
        },
        {
          label: "CI/CD — Atlantis",
          color: "rose",
          items: [
            "Atlantis — PR-based Terraform automation, 2 workspaces: staging + production",
            "atlantis.yaml: separate plan/apply workflows per environment",
            "Backend config: per-env .backend.tfvars, vars/staging.tfvars + vars/production.tfvars",
            "AWS accounts: staging=396913715179, production=593793046312 (eu-west-1)",
            "ECR cross-account replication (staging → production)",
            "cf-zero-access — GitHub Actions Terraform for Cloudflare Zero Trust policies",
            "Bootstrap: production.tf + staging.tf + tooling.tf for state bucket provisioning",
          ],
        },
      ],
    },
    repoStructure: [
      {
        name: "terraform/", type: "folder", children: [
          { name: "atlantis.yaml", type: "file" },
          { name: "README.md", type: "file" },
          { name: "backends/", type: "folder", children: [
            { name: "production.backend.tfvars", type: "file" },
            { name: "staging.backend.tfvars", type: "file" },
          ]},
          { name: "bootstrap/", type: "folder", children: [
            { name: "production.tf", type: "file" },
            { name: "staging.tf", type: "file" },
            { name: "tooling.tf", type: "file" },
            { name: "provider.tf", type: "file" },
            { name: "outputs.tf", type: "file" },
          ]},
          { name: "infrastructure/", type: "folder", children: [
            { name: "eks.tf", type: "file" },
            { name: "argocd.tf", type: "file" },
            { name: "vpc.tf", type: "file" },
            { name: "alb.tf", type: "file" },
            { name: "rds.tf", type: "file" },
            { name: "efs.tf", type: "file" },
            { name: "ecr.tf", type: "file" },
            { name: "loki.tf", type: "file" },
            { name: "prometheus.tf", type: "file" },
            { name: "grafana.tf", type: "file" },
            { name: "cloudflare.tf", type: "file" },
            { name: "r53.tf", type: "file" },
            { name: "iam.tf", type: "file" },
            { name: "identity_center.tf", type: "file" },
            { name: "secrets.tf", type: "file" },
            { name: "s3.tf", type: "file" },
            { name: "account_data.tf", type: "file" },
            { name: "vars.tf", type: "file" },
            { name: "provider.tf", type: "file" },
            { name: "vars/", type: "folder", children: [
              { name: "staging.tfvars", type: "file" },
              { name: "production.tfvars", type: "file" },
            ]},
            { name: "external_dns_values.yaml.tpl", type: "file" },
          ]},
          { name: "sandbox/", type: "folder", children: [
            { name: "bootstrap/main.tf", type: "file" },
            { name: "infrastructure/", type: "folder", children: [
              { name: "eks.tf", type: "file" },
              { name: "argocd.tf", type: "file" },
              { name: "vpc.tf", type: "file" },
              { name: "rds.tf", type: "file" },
              { name: "loki.tf", type: "file" },
              { name: "prometheus.tf", type: "file" },
              { name: "grafana.tf", type: "file" },
              { name: "iam.tf", type: "file" },
              { name: "ecr.tf", type: "file" },
              { name: "efs.tf", type: "file" },
              { name: "secrets.tf", type: "file" },
              { name: "s3.tf", type: "file" },
              { name: "identity_center.tf", type: "file" },
              { name: "route53.tf", type: "file" },
              { name: "k8s-examples/alb.yaml", type: "file" },
              { name: "k8s-examples/external-secret.yaml", type: "file" },
            ]},
          ]},
        ],
      },
      {
        name: "s3-cdn-bucket/", type: "folder", children: [
          { name: "atlantis.yaml", type: "file" },
          { name: "bootstrap/cdn-prod.tf", type: "file" },
          { name: "infra/", type: "folder", children: [
            { name: "cloudfront.tf", type: "file" },
            { name: "s3.tf", type: "file" },
            { name: "acm.tf", type: "file" },
            { name: "cloudflare.tf", type: "file" },
            { name: "variables.tf", type: "file" },
            { name: "vars/production.backend.tfvars", type: "file" },
          ]},
        ],
      },
      {
        name: "argocd/", type: "folder", children: [
          { name: "Kustomize/", type: "folder", children: [
            { name: "tls-cms/", type: "folder", children: [
              { name: "cms.deployment.yaml", type: "file" },
              { name: "cms.db-init-job.yaml", type: "file" },
              { name: "ingress.yaml", type: "file" },
              { name: "service.yaml", type: "file" },
              { name: "kustomization.yaml", type: "file" },
            ]},
            { name: "tls-common/", type: "folder", children: [
              { name: "external-secret.yaml", type: "file" },
              { name: "external-db-service.yaml", type: "file" },
              { name: "common-wildfly-config-cm.yaml", type: "file" },
              { name: "kustomization.yaml", type: "file" },
            ]},
            { name: "tls-connect/", type: "folder", children: [
              { name: "connect.deployment.yaml", type: "file" },
              { name: "ingress.yaml", type: "file" },
              { name: "service.yaml", type: "file" },
            ]},
            { name: "tls-frontend/", type: "folder", children: [
              { name: "frontend.deployment.yaml", type: "file" },
              { name: "configs/nginx.conf", type: "file" },
              { name: "ingress.yaml", type: "file" },
              { name: "service.yaml", type: "file" },
            ]},
            { name: "tls-lottomanager/", type: "folder", children: [
              { name: "lottomanager.deployment.yaml", type: "file" },
              { name: "lottomanager.db-init-job.yaml", type: "file" },
              { name: "lottomanager.pvc.yaml", type: "file" },
              { name: "ingress.yaml", type: "file" },
              { name: "service.yaml", type: "file" },
            ]},
            { name: "tls-retailmanager/", type: "folder", children: [
              { name: "retailmanager.deployment.yaml", type: "file" },
              { name: "retailmanager.db-init-job.yaml", type: "file" },
              { name: "ingress.yaml", type: "file" },
              { name: "service.yaml", type: "file" },
            ]},
            { name: "tls-usermanager/", type: "folder", children: [
              { name: "usermanager.deployment.yaml", type: "file" },
              { name: "usermanager.db-init-job.yaml", type: "file" },
              { name: "usermanager.pvc.yaml", type: "file" },
              { name: "configs/transactionModule.json", type: "file" },
              { name: "ingress.yaml", type: "file" },
            ]},
            { name: "Helm/tls-data-job/", type: "folder", children: [
              { name: "Chart.yaml", type: "file" },
              { name: "values.yaml", type: "file" },
              { name: "templates/job.yaml", type: "file" },
              { name: "templates/configmap.yaml", type: "file" },
            ]},
          ]},
          { name: "staging/", type: "folder", children: [
            { name: "kustomization.yaml", type: "file" },
            { name: "tls-lottomanager.yaml", type: "file" },
            { name: "tls-frontend.yaml", type: "file" },
            { name: "tls-usermanager.yaml", type: "file" },
            { name: "tls-cms.yaml", type: "file" },
            { name: "tls-connect.yaml", type: "file" },
            { name: "tls-retailmanager.yaml", type: "file" },
            { name: "tls-common.yaml", type: "file" },
            { name: "tls-data-manipulation.yaml", type: "file" },
            { name: "prometheus.yaml", type: "file" },
            { name: "loki.yaml", type: "file" },
            { name: "external-secrets-store.yaml", type: "file" },
            { name: "mailhog.yaml", type: "file" },
          ]},
          { name: "sandbox/", type: "folder", children: [
            { name: "kustomization.yaml", type: "file" },
            { name: "external-secrets-store.yaml", type: "file" },
            { name: "loki.yaml", type: "file" },
            { name: "mailpit.yaml", type: "file" },
            { name: "prometheus.yaml", type: "file" },
          ]},
        ],
      },
      {
        name: "cf-zero-access/", type: "folder", children: [
          { name: "main.tf", type: "file" },
          { name: "terraform.tfvars", type: "file" },
          { name: "oidc-setup/main.tf", type: "file" },
          { name: "oidc-setup/README.md", type: "file" },
          { name: ".github/workflows/terraform.yml", type: "file" },
        ],
      },
      {
        name: "openvpn/", type: "folder", children: [
          { name: "terraform/server.tf", type: "file" },
          { name: "terraform/vpc.tf", type: "file" },
          { name: "terraform/provider.tf", type: "file" },
          { name: "ansible/install-openvpn.yaml", type: "file" },
          { name: "ansible/add-new-user.yaml", type: "file" },
          { name: "ansible/hosts", type: "file" },
        ],
      },
    ],
    snippets: [
      {
        filename: "eks.tf — EKS Cluster + Blueprints Addons",
        language: "terraform",
        code: `locals {
  eks_cluster_version = "1.31"
  eks_cluster_name    = "loto-\${var.workspace-alias}"
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = local.eks_cluster_name
  cluster_version = local.eks_cluster_version

  cluster_endpoint_public_access           = true
  enable_cluster_creator_admin_permissions = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = tomap({
    for i in range(1, var.eks_nodegroup_count + 1) : "node_group_\${i}" => {
      instance_types = [var.eks_node_instance_type]  # t3.xlarge default
      min_size       = length(local.azs)
      max_size       = var.eks_nodes_per_group + 2
      desired_size   = var.eks_nodes_per_group
    }
  })

  tags = var.default_tags
}

# Install addons via eks-blueprints-addons module
module "eks_blueprints_addons" {
  source  = "aws-ia/eks-blueprints-addons/aws"
  version = "~> 1.0"

  cluster_name      = local.eks_cluster_name
  cluster_endpoint  = try(module.eks.cluster_endpoint, "disabled")
  oidc_provider_arn = try(module.eks.oidc_provider_arn, "disabled")

  eks_addons = var.eks_disabled ? {} : {
    coredns                = { most_recent = true }
    vpc-cni                = { most_recent = true }
    kube-proxy             = { most_recent = true }
    eks-pod-identity-agent = { most_recent = true }
  }

  enable_aws_load_balancer_controller = true && !var.eks_disabled
  aws_load_balancer_controller        = { chart_version = "1.10.0" }

  enable_cert_manager    = true && !var.eks_disabled
  cert_manager           = { chart_version = "1.16.1" }

  enable_external_secrets = true && !var.eks_disabled
  external_secrets        = { chart_version = "0.10.5" }

  enable_aws_efs_csi_driver = true && !var.eks_disabled

  enable_argocd = true && !var.eks_disabled
  argocd        = local.argocd_helm_config

  tags = var.default_tags
}

# Map AWS SSO role to cluster-admin
module "eks_aws_auth" {
  source  = "terraform-aws-modules/eks/aws//modules/aws-auth"
  version = "~> 20.0"

  manage_aws_auth_configmap = true

  aws_auth_roles = [for role in data.aws_iam_roles.cluster_admin_roles.names : {
    rolearn  = "arn:aws:iam::\${local.account_id}:role/\${role}"
    username = "cluster-admin"
    groups   = ["system:masters"]
  }]
}`,
      },
      {
        filename: "argocd.tf — ArgoCD SAML + ALB Ingress Config",
        language: "terraform",
        code: `locals {
  argocd_chart_version = "7.7.0"

  # Resolve domain: prefer Route53, fall back to Cloudflare
  domain = (var.r53_hosted_zone != null && var.r53_hosted_zone != "") ? var.r53_hosted_zone : (
    (var.cloudflare_domain != null && var.cloudflare_domain != "") ? var.cloudflare_domain : null
  )
  argocd_domain_name = try(
    local.domain != null ? "\${var.argocd_subdomain_name}.\${local.domain}" : "disabled",
    "disabled"
  )

  argocd_helm_config = {
    chart_version = local.argocd_chart_version
    set = [
      { name = "server.ingress.enabled";                                              value = true },
      { name = "server.ingress.ingressClassName";                                     value = "alb" },
      { name = "server.ingress.annotations.alb\\.ingress\\.kubernetes\\.io/scheme";  value = "internet-facing" },
      { name = "server.ingress.annotations.alb\\.ingress\\.kubernetes\\.io/target-type"; value = "ip" },
      { name = "server.ingress.annotations.alb\\.ingress\\.kubernetes\\.io/listen-ports"; value = "[{\\"HTTPS\\":443}]" },
      { name = "server.ingress.hostname";                                             value = local.argocd_domain_name },
      { name = "server.extraArgs[0]";                                                 value = "--insecure" },
      { name = "configs.rbac.policy\\.default";                                       value = "role:admin" },
      { name = "configs.cm.dex\\.config"; type = "string";
        value = yamlencode(local.argocd_saml_config) },
    ]
  }

  argocd_saml_config = {
    connectors : [{
      type : "saml", id : "aws", name : "AWS-SSO"
      config : {
        ssoURL      : var.sso_app_argocd_url
        caData      : var.sso_app_argocd_ca
        entityIssuer : "https://\${local.argocd_domain_name}/api/dex/callback"
        redirectURI  : "https://\${local.argocd_domain_name}/api/dex/callback"
        usernameAttr : "email"
        emailAttr    : "email"
        groupsAttr   : "groups"
      }
    }]
  }
}`,
      },
      {
        filename: "vpc.tf — Multi-AZ VPC Layout",
        language: "terraform",
        code: `locals {
  azs                 = slice(data.aws_availability_zones.available.names, 0, 2)
  vpc_cidr            = "\${var.vpc_network_prefix}.0.0/16"
  vpc_subnet_new_bits = 8
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "\${lower(var.workspace-alias)}-vpc"
  azs  = local.azs
  cidr = local.vpc_cidr

  # /24 subnets auto-calculated from /16 CIDR
  public_subnets   = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, local.vpc_subnet_new_bits, 0 * length(local.azs) + k)]
  database_subnets = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, local.vpc_subnet_new_bits, 1 * length(local.azs) + k)]
  private_subnets  = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, local.vpc_subnet_new_bits, 2 * length(local.azs) + k)]

  enable_nat_gateway           = true
  single_nat_gateway           = true
  enable_dns_hostnames         = true
  create_database_subnet_group = true

  public_subnet_tags  = merge(var.default_tags, { "kubernetes.io/role/elb" = 1 })
  private_subnet_tags = merge(var.default_tags, { "kubernetes.io/role/internal-elb" = 1 })

  tags = var.default_tags
}`,
      },
      {
        filename: "loki.tf — Loki S3 + IRSA + Gateway SG",
        language: "terraform",
        code: `# S3 buckets for Loki chunks and ruler data
resource "aws_s3_bucket" "loki_chunks" {
  bucket = "loto-loki-chunks-\${var.workspace-alias}"
  lifecycle { prevent_destroy = true }
  tags   = var.default_tags
}

resource "aws_s3_bucket" "loki_ruler" {
  bucket = "loto-loki-ruler-\${var.workspace-alias}"
  lifecycle { prevent_destroy = true }
  tags   = var.default_tags
}

# IAM policy allowing Loki full S3 access to both buckets
resource "aws_iam_policy" "loki_bucket_rw_access" {
  name = "loki-bucket-full-access"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid    = "LokiStorageRWAccess"
      Effect = "Allow"
      Action = ["s3:ListBucket","s3:PutObject","s3:GetObject","s3:DeleteObject"]
      Resource = [
        aws_s3_bucket.loki_chunks.arn, "\${aws_s3_bucket.loki_chunks.arn}/*",
        aws_s3_bucket.loki_ruler.arn,  "\${aws_s3_bucket.loki_ruler.arn}/*",
      ]
    }]
  })
}

# IRSA role — binds loki K8s service account to the IAM policy
module "loki_irsa_role" {
  count   = var.eks_disabled ? 0 : 1
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.0"

  role_name        = "loki"
  role_policy_arns = { policy = aws_iam_policy.loki_bucket_rw_access.arn }

  oidc_providers = {
    ex = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["loki:loki"]
    }
  }
  tags = var.default_tags
}

# Loki gateway SG — allows ingress only from AWS Managed Grafana on port 80
resource "aws_security_group" "loki_gateway" {
  name        = "loki-gateway-sg"
  description = "Only allow http traffic from managed grafana to loki gateway"
  vpc_id      = module.vpc.vpc_id
  tags        = merge(var.default_tags, { Name = "grafana-loki-access" })
}

resource "aws_vpc_security_group_ingress_rule" "grafana_loki_gateway" {
  security_group_id            = aws_security_group.loki_gateway.id
  referenced_security_group_id = module.managed_grafana.security_group_id
  from_port                    = 80
  ip_protocol                  = "tcp"
  to_port                      = 80
  tags                         = var.default_tags
}`,
      },
      {
        filename: "cloudflare.tf — ACM Certs + DNS Validation",
        language: "terraform",
        code: `# Wildcard cert for the root domain
resource "aws_acm_certificate" "site_cert" {
  count             = var.cloudflare_domain != null ? 1 : 0
  domain_name       = var.cloudflare_domain
  validation_method = "DNS"
  tags              = var.default_tags
  lifecycle { create_before_destroy = true }
}

# Per-subdomain certs for infrastructure (argocd, grafana, loki, prometheus)
resource "aws_acm_certificate" "infra_certs" {
  for_each          = var.cloudflare_domain != null ? toset(local.infra_subdomains) : []
  domain_name       = "\${each.key}.\${var.cloudflare_domain}"
  validation_method = "DNS"
  tags              = var.default_tags
  lifecycle { create_before_destroy = true }
}

# Per-subdomain certs for application services (tls-*)
resource "aws_acm_certificate" "application_certs" {
  for_each          = var.cloudflare_domain != null ? toset(local.application_subdomains) : []
  domain_name       = "\${each.key}.\${var.cloudflare_domain}"
  validation_method = "DNS"
  tags              = var.default_tags
  lifecycle { create_before_destroy = true }
}

# Cloudflare DNS validation records for ACM — auto-created via for_each
resource "cloudflare_record" "infra_cert_validation" {
  for_each = local.infra_cert_validations_map
  zone_id  = var.cloudflare_zone_id
  name     = trimsuffix(each.value.name, ".\${var.cloudflare_domain}")
  content  = each.value.content
  type     = each.value.type
  ttl      = 60
  proxied  = false
}

# Cert validation waits for Cloudflare DNS propagation
resource "aws_acm_certificate_validation" "infra_certs" {
  for_each        = var.cloudflare_domain != null ? aws_acm_certificate.infra_certs : {}
  certificate_arn = each.value.arn
  validation_record_fqdns = [
    for record in each.value.domain_validation_options : record.resource_record_name
  ]
  depends_on = [cloudflare_record.infra_cert_validation]
}

# external-dns helm chart — watches K8s Ingress, creates CF records automatically
resource "helm_release" "external_dns" {
  count      = var.cloudflare_domain != null ? 1 : 0
  name       = "external-dns"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "external-dns"
  namespace  = kubernetes_namespace.external_dns[count.index].metadata[0].name
  version    = "6.20.4"
  values     = [local.external_dns_values]
  depends_on = [kubernetes_secret.cloudflare]
}`,
      },
      {
        filename: "s3-cdn-bucket/infra/cloudfront.tf — CDN Distribution",
        language: "terraform",
        code: `# Origin Access Control — CloudFront signs all S3 requests with SigV4
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "cdn-oac"
  description                       = "OAC for S3 CDN Bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = [var.cdn_domain]  # cdn.iraqloto.iq

  origin {
    domain_name              = aws_s3_bucket.cdn_bucket.bucket_regional_domain_name
    origin_id                = "s3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "s3Origin"
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  price_class = "PriceClass_100"  # US, Canada, Europe

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cdn_cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }
}

# S3 bucket policy — allow ONLY CloudFront OAC to read objects
resource "aws_s3_bucket_policy" "cdn_policy" {
  bucket = aws_s3_bucket.cdn_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontServicePrincipalReadOnly"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "\${aws_s3_bucket.cdn_bucket.arn}/*"
      Condition = {
        StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn }
      }
    }]
  })
}`,
      },
      {
        filename: "atlantis.yaml — PR-based Terraform Automation",
        language: "yaml",
        code: `version: 2
projects:
- name: staging
  dir: infrastructure
  terraform_version: v1.5.6
  workflow: staging
  workspace: staging
- name: production
  dir: infrastructure
  terraform_version: v1.5.6
  workflow: production
  workspace: production

workflows:
  staging:
    plan:
      steps:
      - run: rm -rf .terraform*
      - init:
          extra_args:
          - -backend-config=../backends/staging.backend.tfvars
      - plan:
          extra_args:
          - -compact-warnings
          - -var region=eu-west-1
          - -var account=396913715179
          - -var role_name=atlantis
          - -var-file=vars/staging.tfvars
    apply:
      steps:
      - apply
  production:
    plan:
      steps:
      - run: rm -rf .terraform*
      - init:
          extra_args:
          - -backend-config=../backends/production.backend.tfvars
      - plan:
          extra_args:
          - -compact-warnings
          - -var region=eu-west-1
          - -var account=593793046312
          - -var role_name=atlantis
          - -var-file=vars/production.tfvars
    apply:
      steps:
      - apply`,
      },
    ],
  },

  travluence: {
    title: "Travluence — Travel Infra",
    description:
      "AWS infrastructure for a travel-tech platform: workspace-aware VPC (inno/trav projects), public ALB with host-based routing to separate frontend (t3.large) and backend (t3.medium) EC2 instances, RDS MySQL 8 with KMS + Secrets Manager, ACM + Cloudflare DNS for 9 subdomains, and GitHub Actions CI/CD.",
    tags: ["Terraform", "AWS VPC", "ALB", "Host Routing", "RDS MySQL", "ACM", "Cloudflare", "EC2", "IAM", "KMS", "Secrets Manager", "GitHub Actions"],
    color: "teal",
    hld: {
      title: "Travluence — AWS High Level Architecture",
      layers: [
        {
          label: "DNS & CDN",
          color: "orange",
          items: ["Cloudflare DNS (proxied, CDN+DDoS)", "10 subdomains: travluence.com, www, backoffice, agent, serviceapi, temp-logs, manage, checkout, developer, help", "ACM TLS Certificate", "SSL Full Mode"],
        },
        {
          label: "Edge / Load Balancer",
          color: "sky",
          items: ["Public ALB (host-based routing)", "Frontend TG: travluence.com, www, backoffice, agent", "Backend TG: serviceapi, temp-logs, manage, checkout, developer, help", "HTTP → HTTPS Redirect"],
        },
        {
          label: "Compute — Private Subnets",
          color: "violet",
          items: ["EC2 t3.large (frontend)", "EC2 t3.medium (core-engine / backend)", "IAM Instance Profile (S3, CodeDeploy)", "SG: ALB → :80, SSH VPC-only"],
        },
        {
          label: "Data Layer",
          color: "emerald",
          items: ["RDS MySQL 8.0.42 (db.t3.medium)", "KMS Encryption + Key Rotation", "AWS Secrets Manager (master password)", "gp3, max 100GB auto-scale", "Slow query log enabled", "Backup 7d, maintenance Sun 04:00"],
        },
        {
          label: "Workspace-Aware Network",
          color: "teal",
          items: ["Workspace: <project>-<env> (e.g. trav-prd)", "inno=10.10.0.0/16 | trav=10.20.0.0/16", "Each env → /20 block (4,096 IPs)", "Public/Private/Database/ElastiCache subnets", "NAT Gateway"],
        },
        {
          label: "CI/CD",
          color: "amber",
          items: ["GitHub Actions: plan.yaml (PR)", "GitHub Actions: apply.yaml (merge to main)", "Makefile shortcuts", "OpenTofu (Terraform fork)"],
        },
      ],
    },
    repoStructure: [
      {
        name: "travluence/infra/", type: "folder", children: [
          { name: "main.tf", type: "file" },
          { name: "locals.tf", type: "file" },
          { name: "variables.tf", type: "file" },
          { name: "outputs.tf", type: "file" },
          { name: "terraform.tf", type: "file" },
          { name: "Makefile", type: "file" },
          { name: "README.md", type: "file" },
          { name: ".github/workflows/", type: "folder", children: [
            { name: "plan.yaml", type: "file" },
            { name: "apply.yaml", type: "file" },
          ]},
          { name: "modules/aws/", type: "folder", children: [
            { name: "vpc/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "alb/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }, { name: "README.md", type: "file" }] },
            { name: "acm/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }] },
            { name: "compute/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }, { name: "README.md", type: "file" }] },
            { name: "iam/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }, { name: "README.md", type: "file" }] },
            { name: "rds/", type: "folder", children: [{ name: "main.tf", type: "file" }, { name: "variables.tf", type: "file" }, { name: "outputs.tf", type: "file" }, { name: "README.md", type: "file" }] },
          ]},
          { name: "modules/cloudflare/", type: "folder", children: [
            { name: "main.tf", type: "file" },
            { name: "variables.tf", type: "file" },
            { name: "outputs.tf", type: "file" },
          ]},
        ],
      },
    ],
    snippets: [
      {
        filename: "locals.tf — Workspace-Aware VPC CIDRs",
        language: "terraform",
        code: `locals {
  # Workspace format: "<project>-<env>" e.g. trav-prd
  ws_parts = split("-", terraform.workspace)
  project  = local.ws_parts[0]
  env      = local.ws_parts[1]

  # Each project gets a /16; each env gets a /20 (4,096 IPs)
  project_cidrs = {
    inno = "10.10.0.0/16"
    trav = "10.20.0.0/16"
  }
  env_index = { dev = 0; stg = 1; prd = 2 }

  vpc_cidr = cidrsubnet(
    local.project_cidrs[local.project], 4,
    local.env_index[local.env]
  )

  # /20 → 16× /24 subnets
  subnets_24 = [for i in range(16) : cidrsubnet(local.vpc_cidr, 4, i)]

  public_subnets      = slice(local.subnets_24, 0, 3)  # AZs a/b/c
  private_subnets     = slice(local.subnets_24, 3, 6)
  database_subnets    = slice(local.subnets_24, 6, 9)
  elasticache_subnets = slice(local.subnets_24, 9, 12)
  spare_subnets       = slice(local.subnets_24, 12, 16)

  name_prefix = "\${local.project}-\${local.env}"
  tags = {
    Environment = local.env
    Project     = local.project
    ManagedBy   = "OpenTofu"
  }
}`,
      },
      {
        filename: "main.tf — ALB + Host-Based Routing",
        language: "terraform",
        code: `module "alb" {
  source      = "./modules/aws/alb"
  name_prefix = "\${terraform.workspace}-alb"
  vpc_id      = module.vpc.vpc_id
  subnets     = module.vpc.public_subnets
  internal    = false
  health_check_path = "/health"
}

# Separate Target Group for Backend API
resource "aws_lb_target_group" "backend" {
  name     = "\${terraform.workspace}-backend-tg"
  port     = 80; protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id
  health_check { path = "/health"; matcher = "200" }
}

# Host-based routing: Backend subdomains
resource "aws_lb_listener_rule" "backend_api" {
  listener_arn = module.alb.http_listener_arn
  priority     = 100
  action { type = "forward"; target_group_arn = aws_lb_target_group.backend.arn }
  condition {
    host_header {
      values = ["serviceapi.travluence.com", "temp-logs.travluence.com",
                "manage.travluence.com", "checkout.travluence.com",
                "developer.travluence.com"]
    }
  }
}

# Frontend subdomains (root + www + portals)
resource "aws_lb_listener_rule" "frontend" {
  listener_arn = module.alb.http_listener_arn
  priority     = 200
  action { type = "forward"; target_group_arn = module.alb.target_group_arn }
  condition {
    host_header {
      values = ["travluence.com", "www.travluence.com",
                "backoffice.travluence.com", "agent.travluence.com"]
    }
  }
}`,
      },
      {
        filename: "main.tf — Dual EC2 Compute Instances",
        language: "terraform",
        code: `# Backend: core-engine (API server)
module "compute_app_instance_backend" {
  source             = "./modules/aws/compute"
  name               = "core-engine"
  ami_id             = data.aws_ami.ubuntu.id
  instance_type      = "t3.medium"
  subnet_ids         = module.vpc.private_subnets
  security_group_ids = [aws_security_group.core_engine_instance_sg.id]
  create_asg         = false
  target_group_arns  = [aws_lb_target_group.backend.arn]
  iam_instance_profile_name = module.iam.instance_profile_names["\${terraform.workspace}_ec2_role"]
  tags = merge(local.tags, { Name = "\${terraform.workspace}-core-engine" })
}

# Frontend: Next.js / static app server
module "compute_app_instance_frontend" {
  source             = "./modules/aws/compute"
  name               = "frontend"
  ami_id             = data.aws_ami.ubuntu.id
  instance_type      = "t3.large"
  subnet_ids         = module.vpc.private_subnets
  security_group_ids = [aws_security_group.core_engine_instance_sg.id]
  create_asg         = false
  launch_template_version = "\$Latest"
  target_group_arns  = [module.alb.target_group_arn]
  iam_instance_profile_name = module.iam.instance_profile_names["\${terraform.workspace}_ec2_role"]
  tags = merge(local.tags, { Name = "\${terraform.workspace}-frontend" })
}`,
      },
      {
        filename: "main.tf — RDS MySQL + KMS + Secrets Manager",
        language: "terraform",
        code: `module "rds_mysql" {
  source     = "./modules/aws/rds"
  identifier = "\${terraform.workspace}-mysql-db"
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.database_subnets

  master_username = "\${local.project}_\${local.env}_admin"
  # Password managed by AWS Secrets Manager
  manage_master_user_password = true
  create_kms_key              = true
  enable_kms_key_rotation     = false

  database_name         = "\${local.project}_\${local.env}_db"
  instance_class        = "db.t3.medium"
  engine_version        = "8.0.42"
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp3"
  storage_encrypted     = true
  multi_az              = false

  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "sun:04:00-sun:05:00"

  enabled_cloudwatch_logs_exports = ["error", "general", "slowquery"]

  parameters = [
    { name = "character_set_server"; value = "utf8mb4" },
    { name = "collation_server";     value = "utf8mb4_unicode_ci" },
    { name = "max_connections";      value = "100" },
    { name = "slow_query_log";       value = "1" },
    { name = "long_query_time";      value = "2" },
  ]
}`,
      },
      {
        filename: "main.tf — ACM + Cloudflare DNS",
        language: "terraform",
        code: `module "acm" {
  source      = "./modules/aws/acm"
  domain_name = "travluence.com"
  subdomains  = ["www", "backoffice", "agent",
                 "serviceapi", "temp-logs", "manage",
                 "checkout", "developer", "help"]
  alb_arn          = module.alb.alb_arn
  target_group_arn = module.alb.target_group_arn
  ssl_policy       = "ELBSecurityPolicy-TLS-1-2-2017-01"
}

module "cloudflare" {
  source   = "./modules/cloudflare"
  zone_id  = var.cloudflare_zone_id
  domain_name  = "travluence.com"
  alb_dns_name = module.alb.alb_dns_name

  subdomains = ["@", "www", "backoffice", "agent",
                "serviceapi", "temp-logs", "manage",
                "checkout", "developer", "help"]

  enable_acm_validation  = true
  acm_validation_records = module.acm[0].validation_records

  proxied  = true   # Cloudflare CDN + DDoS protection
  ssl_mode = "full" # Cloudflare HTTPS, ALB HTTP
  enable_cache_rules = false
}`,
      },
    ],
  },
};

