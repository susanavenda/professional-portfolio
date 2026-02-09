#!/bin/bash
# Script to set GitHub repository About sections using GitHub API
# Usage: GITHUB_TOKEN=your_token ./setup-all-repos-api.sh
# Or: gh auth token | xargs -I {} GITHUB_TOKEN={} ./setup-all-repos-api.sh

set -e

# Check for token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set. Trying to get from gh CLI..."
    if command -v gh &> /dev/null && gh auth status &>/dev/null; then
        echo "✅ Using token from GitHub CLI"
        export GITHUB_TOKEN=$(gh auth token)
    else
        echo "❌ Please set GITHUB_TOKEN environment variable or authenticate with: gh auth login"
        echo ""
        echo "To get a token:"
        echo "1. Go to: https://github.com/settings/tokens"
        echo "2. Generate new token (classic) with 'repo' scope"
        echo "3. Run: export GITHUB_TOKEN=your_token"
        echo "4. Run this script again"
        exit 1
    fi
fi

API_BASE="https://api.github.com/repos/susanavenda"

echo "🚀 Setting up all GitHub repository About sections..."
echo ""

# Function to update repo
update_repo() {
    local repo=$1
    local description=$2
    local homepage=$3
    local topics=$4
    
    echo "📝 Updating $repo..."
    
    # Update description and homepage
    if [ -n "$homepage" ]; then
        curl -s -X PATCH \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            -d "{\"description\":\"$description\",\"homepage\":\"$homepage\"}" \
            "$API_BASE/$repo" > /dev/null
    else
        curl -s -X PATCH \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            -d "{\"description\":\"$description\"}" \
            "$API_BASE/$repo" > /dev/null
    fi
    
    # Update topics
    curl -s -X PUT \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.mercy-preview+json" \
        -d "{\"names\":[$topics]}" \
        "$API_BASE/$repo/topics" > /dev/null
    
    echo "✅ Done: $repo"
    echo ""
}

# professional-portfolio
update_repo "professional-portfolio" \
    "Modern, responsive portfolio website built with React and Vite. Showcases professional experience, skills, certifications, and achievements with a clean, single-page design optimized for all devices." \
    "https://susanavenda.github.io/professional-portfolio/" \
    "\"portfolio\",\"react\",\"vite\",\"resume\",\"professional-website\",\"github-pages\",\"single-page-application\",\"responsive-design\",\"bootstrap\",\"json-driven-content\""

# observability-platform
update_repo "observability-platform" \
    "Comprehensive observability platform demonstrating distributed tracing, metrics collection, and log aggregation across microservices. Features OpenTelemetry integration, multi-language support, and cloud-native deployments." \
    "" \
    "\"observability\",\"opentelemetry\",\"distributed-tracing\",\"microservices\",\"kubernetes\",\"docker\",\"prometheus\",\"grafana\",\"elasticsearch\",\"monitoring\",\"devops\",\"cloud-native\",\"multi-language\",\"java\",\"go\",\"python\",\"react\""

# containerized-apps
update_repo "containerized-apps" \
    "Collection of containerized application examples demonstrating Docker, Kubernetes, and OpenShift deployment patterns. Includes microservices, REST APIs, and CI/CD pipeline examples across multiple programming languages." \
    "" \
    "\"docker\",\"kubernetes\",\"openshift\",\"containerization\",\"microservices\",\"rest-api\",\"ci-cd\",\"jenkins\",\"java\",\"nodejs\",\"php\",\"go\",\"devops\",\"s2i\",\"docker-compose\",\"best-practices\""

# devops-practice-platform
update_repo "devops-practice-platform" \
    "Comprehensive DevOps learning platform featuring containerization, Kubernetes orchestration, infrastructure as code with Terraform, CI/CD pipelines, and monitoring solutions. Perfect for hands-on DevOps training." \
    "" \
    "\"devops\",\"kubernetes\",\"docker\",\"terraform\",\"ansible\",\"helm\",\"ci-cd\",\"github-actions\",\"infrastructure-as-code\",\"spring-boot\",\"aws\",\"openshift\",\"monitoring\",\"automation\""

# angular-hybrid-app
update_repo "angular-hybrid-app" \
    "Hybrid Angular application demonstrating migration from AngularJS to modern Angular. Showcases techniques for running both frameworks side-by-side and gradually migrating components." \
    "" \
    "\"angular\",\"angularjs\",\"typescript\",\"webpack\",\"migration\",\"hybrid-application\",\"frontend\",\"javascript\",\"legacy-migration\",\"incremental-migration\""

# spring-boot-demo
update_repo "spring-boot-demo" \
    "Lightweight Spring Boot demonstration application showcasing RESTful API development, dependency injection, and modern Java application patterns. Foundation for building production-ready microservices." \
    "" \
    "\"spring-boot\",\"java\",\"rest-api\",\"microservices\",\"maven\",\"dependency-injection\",\"spring-framework\",\"backend\",\"api\",\"actuator\""

echo "🎉 All repositories configured!"
echo ""
echo "Visit your repositories to verify:"
echo "  - https://github.com/susanavenda/professional-portfolio"
echo "  - https://github.com/susanavenda/observability-platform"
echo "  - https://github.com/susanavenda/containerized-apps"
echo "  - https://github.com/susanavenda/devops-practice-platform"
echo "  - https://github.com/susanavenda/angular-hybrid-app"
echo "  - https://github.com/susanavenda/spring-boot-demo"
