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
        
    }

    post {
        always {
            script {
                sh 'docker logout'
            }
        }
    }
}