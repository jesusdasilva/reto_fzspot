# OUTPUT
output "http_80" {
  value       = "http://${aws_lb.load_balancer.dns_name}"
  description = "HTTP Link Port 80"
}