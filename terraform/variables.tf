variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "bucket_prefix" {
  description = "Prefix for the S3 bucket name"
  type        = string
  default     = "shopsmart-assets"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "shopsmart"
}

variable "container_port" {
  description = "Port exposed by the container"
  type        = number
  default     = 5001
}

variable "image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}
