pipeline {
    agent any
    tools {
        nodejs('20.9.0')
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'mydocker'
    }
    triggers {
        pollSCM '* * * * *'
    }
    environment {
        CI = 'true'
        DOCKERHUB_CREDENTIALS = credentials('dahhouilyas')
    }
    
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Check Docker Path') {
            steps {
                sh 'which docker'
                sh 'docker --version'
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dahhouilyas', url: 'https://index.docker.io/v1/') {
                        def imageName = "${DOCKERHUB_CREDENTIALS_USR}/ejjs-frontend:${env.BUILD_NUMBER}"

                        // Utilisation de Jenkins Docker Pipeline Plugin pour builder l'image
                        docker.build(imageName)

                        // Push de l'image vers Docker Hub
                        docker.image(imageName).push()
                    }
                }
            }
        }
        
    }

    post {
        always {
            script {
                sh 'docker logout'
            }
        }
    }
}