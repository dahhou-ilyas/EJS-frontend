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
                withCredentials([usernamePassword(credentialsId: 'dahhouilyas', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                    sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
                }

                sh "docker build -t dahhouilyas/esj:${BUILD_ID} ."

                sh "docker push dahhouilyas/esj:${BUILD_ID}"
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