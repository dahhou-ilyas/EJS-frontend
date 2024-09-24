pipeline {
    agent any
    tools {
        nodejs('20.9.0')
    }
    triggers {
        pollSCM '* * * * *'
    }
    environment {
        CI = 'true'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Docker Build and Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        def appImage = docker.build("${DOCKERHUB_CREDENTIALS_USR}/ejjs-frontend:${env.BUILD_NUMBER}")
                        appImage.push()
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Ensure we're in a node context
                node {
                    sh 'docker logout'
                }
            }
        }
    }
}