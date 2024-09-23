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
        
        stage('Docker Build') {
            steps {
                script {
                    // Build Docker image using docker.build
                    def appImage = docker.build("${DOCKERHUB_CREDENTIALS_USR}/ejjs-frontend:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    // Use Docker plugin's withRegistry for login and push
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        appImage.push()
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
