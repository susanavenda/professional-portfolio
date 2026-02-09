# Professional Portfolio Infrastructure

This directory contains infrastructure code using modules from [devops-toolkit](https://github.com/susanavenda/devops-toolkit).

## What It Creates

- VPC with public and private subnets
- S3 bucket for static assets

## Usage

1. Configure variables in `terraform.tfvars`:

```hcl
aws_region = "us-east-1"
project_name = "professional-portfolio"
```

2. Initialize and apply:

```bash
terraform init
terraform plan
terraform apply
```

## Modules Used

- `susanavenda/devops-toolkit//terraform/modules/vpc` - VPC infrastructure
- `susanavenda/devops-toolkit//terraform/modules/s3` - S3 bucket

## Notes

This infrastructure is minimal as the portfolio is deployed to GitHub Pages. The VPC and S3 are available for future use if needed.
