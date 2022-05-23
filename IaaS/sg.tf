# Security group Load Balancer
resource "aws_security_group" "sg_lb" {
  name        = "sg_lb_${local.az_prefix}-1_001"
  description = "ALB - Security Group"
  vpc_id      =  module.vpc.vpc_id #local.vpc_id #AQUI VA EL VPC ID

  # INGRESS RULES
  ingress {
    from_port   = "80"
    to_port     = "80"
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Habilita el acceso HTTP al puerto 80"
  }

  # EGRESS RULES
  egress {
    from_port   = "0"
    to_port     = "0"
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "sg_lb_${local.az_prefix}-1_001"
    Creator = local.creator
  }
}

# Security group Instancias EC2
resource "aws_security_group" "sg_service" {
  name        = "sg_staging_${local.az_prefix}_${local.service}_001"
  description = "${local.service} - Security Group"
  vpc_id      = module.vpc.vpc_id#local.vpc_id #AQUI VA EL VPC ID

  # INGRESS RULES
  ingress {
    from_port       = "80"
    to_port         = "80"
    protocol        = "tcp"
    security_groups = [aws_security_group.sg_lb.id]
    description     = "Habilita el acceso HTTP al puerto 80"
  }

  # EGRESS RULES
  egress {
    from_port   = "0"
    to_port     = "0"
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "sg_staging_${local.az_prefix}-1_${local.service}_001"
    Creator = local.creator
  }
}
