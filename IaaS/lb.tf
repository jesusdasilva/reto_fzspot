# LOAD BALANCER
resource "aws_lb" "load_balancer" {
  name               = "elb-${local.service}" # No debe tener mas de 32 caracteres
  load_balancer_type = "application"
  security_groups    = [aws_security_group.sg_lb.id]
  subnets            = data.aws_subnet.example.ids #[local.subnet_a, local.subnet_b, local.subnet_c]#AQUI VA EL SUBNET ID

  enable_deletion_protection = false 

  tags       = {
    Name    = "elb-${local.service}"
    Entity  = local.entity
    Creator = local.creator
  }
  depends_on = [aws_autoscaling_group.as-ubuntu]
}

# LOAD BALANCER TARGET GROUP
resource "aws_lb_target_group" "lb_target" {
  name        = "tg-${local.service}"
  port        = 80
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      =  module.vpc.vpc_id #local.vpc_id#AQUI VA EL VPC ID

  depends_on = [aws_lb.load_balancer]
}

# LISTENER PORT 80
resource "aws_lb_listener" "front_end_80" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.lb_target.arn
  }
  depends_on        = [aws_lb_target_group.lb_target]
}

# ATTACHMENT LOAD BALANCER TO AUTO SCALING GROUP
resource "aws_autoscaling_attachment" "asg_attachment_lb" {
  autoscaling_group_name = aws_autoscaling_group.as-ubuntu.name
  alb_target_group_arn   = aws_lb_target_group.lb_target.arn
  depends_on             = [aws_autoscaling_group.as-ubuntu, aws_lb_target_group.lb_target]
}