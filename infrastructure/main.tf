# Infrastructure for Professional Portfolio
# Uses devops-toolkit modules for all infrastructure concerns

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC for hosting the application
module "vpc" {
  source = "github.com/susanavenda/devops-toolkit//terraform/modules/vpc?ref=main"

  name       = "${var.project_name}-vpc"
  cidr_block = var.vpc_cidr_block

  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs

  enable_nat_gateway = true

  tags = merge(
    var.tags,
    {
      Project = "professional-portfolio"
    }
  )
}

# S3 bucket for static assets (if needed)
module "s3_assets" {
  source = "github.com/susanavenda/devops-toolkit//terraform/modules/s3?ref=main"

  bucket_name      = "${var.project_name}-assets-${random_id.bucket_suffix.hex}"
  enable_versioning = true

  lifecycle_rules = [
    {
      id      = "cleanup-old-versions"
      enabled = true
      expiration_days = null
      noncurrent_version_expiration_days = 30
      transitions = []
    }
  ]

  tags = merge(
    var.tags,
    {
      Project = "professional-portfolio"
      Purpose = "static-assets"
    }
  )
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}
