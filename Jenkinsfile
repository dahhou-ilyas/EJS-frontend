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
                    // Build Docker image using sh
                    sh """
                        docker build -t ${DOCKERHUB_CREDENTIALS_USR}/ejjs-frontend:${env.BUILD_NUMBER} .
                    """
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    // Login to DockerHub using credentials and push the image
                    sh """
                        echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin
                        docker push ${DOCKERHUB_CREDENTIALS_USR}/ejjs-frontend:${env.BUILD_NUMBER}
                    """
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