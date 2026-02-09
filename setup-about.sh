#!/bin/bash
# Script to set GitHub repository About sections
# Requires: gh CLI authenticated (run 'gh auth login' first)

set -e

echo "🚀 Setting up GitHub repository About sections..."
echo ""

# Check if authenticated
if ! gh auth status &>/dev/null; then
    echo "❌ GitHub CLI not authenticated. Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""

# professional-portfolio
echo "📝 Setting up professional-portfolio..."
gh repo edit susanavenda/professional-portfolio \
  --description "Modern, responsive portfolio website built with React and Vite. Showcases professional experience, skills, certifications, and achievements with a clean, single-page design optimized for all devices." \
  --homepage "https://susanavenda.github.io/professional-portfolio/" \
  --add-topic portfolio,react,vite,resume,professional-website,github-pages,single-page-application,responsive-design,bootstrap,json-driven-content
echo "✅ Done"
echo ""

# observability-platform
echo "📝 Setting up observability-platform..."
gh repo edit susanavenda/observability-platform \
  --description "Comprehensive observability platform demonstrating distributed tracing, metrics collection, and log aggregation across microservices. Features OpenTelemetry integration, multi-language support, and cloud-native deployments." \
  --add-topic observability,opentelemetry,distributed-tracing,microservices,kubernetes,docker,prometheus,grafana,elasticsearch,monitoring,devops,cloud-native,multi-language,java,go,python,react
echo "✅ Done"
echo ""

# containerized-apps
echo "📝 Setting up containerized-apps..."
gh repo edit susanavenda/containerized-apps \
  --description "Collection of containerized application examples demonstrating Docker, Kubernetes, and OpenShift deployment patterns. Includes microservices, REST APIs, and CI/CD pipeline examples across multiple programming languages." \
  --add-topic docker,kubernetes,openshift,containerization,microservices,rest-api,ci-cd,jenkins,java,nodejs,php,go,devops,s2i,docker-compose,best-practices
echo "✅ Done"
echo ""

# devops-practice-platform
echo "📝 Setting up devops-practice-platform..."
gh repo edit susanavenda/devops-practice-platform \
  --description "Comprehensive DevOps learning platform featuring containerization, Kubernetes orchestration, infrastructure as code with Terraform, CI/CD pipelines, and monitoring solutions. Perfect for hands-on DevOps training." \
  --add-topic devops,kubernetes,docker,terraform,ansible,helm,ci-cd,github-actions,infrastructure-as-code,spring-boot,aws,openshift,monitoring,automation
echo "✅ Done"
echo ""

# angular-hybrid-app
echo "📝 Setting up angular-hybrid-app..."
gh repo edit susanavenda/angular-hybrid-app \
  --description "Hybrid Angular application demonstrating migration from AngularJS to modern Angular. Showcases techniques for running both frameworks side-by-side and gradually migrating components." \
  --add-topic angular,angularjs,typescript,webpack,migration,hybrid-application,frontend,javascript,legacy-migration,incremental-migration
echo "✅ Done"
echo ""

# spring-boot-demo
echo "📝 Setting up spring-boot-demo..."
gh repo edit susanavenda/spring-boot-demo \
  --description "Lightweight Spring Boot demonstration application showcasing RESTful API development, dependency injection, and modern Java application patterns. Foundation for building production-ready microservices." \
  --add-topic spring-boot,java,rest-api,microservices,maven,dependency-injection,spring-framework,backend,api,actuator
echo "✅ Done"
echo ""

echo "🎉 All repositories configured!"
echo ""
echo "Visit your repositories to verify:"
echo "  - https://github.com/susanavenda/professional-portfolio"
echo "  - https://github.com/susanavenda/observability-platform"
echo "  - https://github.com/susanavenda/containerized-apps"
echo "  - https://github.com/susanavenda/devops-practice-platform"
echo "  - https://github.com/susanavenda/angular-hybrid-app"
echo "  - https://github.com/susanavenda/spring-boot-demo"
