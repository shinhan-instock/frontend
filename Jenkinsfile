pipeline {
    agent {
        kubernetes {
            label 'nodejs'
            defaultContainer 'node'
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins-build: front-build
  annotations:
    sidecar.istio.io/inject: "false"
spec:
  nodeSelector:
    kubernetes.io/hostname: k8s-cicd
  tolerations:
    - key: "no-kafka"
      operator: "Equal"
      value: "true"
      effect: "NoSchedule"
  containers:
    - name: node
      image: node:16
      command:
        - tail
        - -f
        - /dev/null
      tty: true
    - name: jnlp
      image: jenkins/inbound-agent:latest
      # jnlp 컨테이너의 기본 엔트리포인트와 인수를 사용하도록 args를 제거합니다.
"""
        }
    }

    stages {

        stage('Setup Tools') {
            steps {
                container('node') {
                    sh """
                        apt-get update && apt-get install -y awscli
                        aws --version
                    """
                }
            }
        }

        stage('Checkout') {
            steps {
                container('node') {
                    sh '''
                        git --version
                        git clone -b develop https://github.com/shinhan-instock/frontend.git .
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                container('node') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                container('node') {
                    sh 'aws s3 sync build/ s3://inst00ck-front --delete'
                }
            }
        }

        stage('Invalidate CloudFront') {
            steps {
                container('node') {
                    withAWS(credentials: '93d53f6a-d44c-4637-984b-ef73d9f2a653', region: 'ap-northeast-2') {
                        sh 'aws cloudfront create-invalidation --distribution-id d3tg0snud1pi3v.cloudfront.net --paths "/*"'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "🎉 프론트엔드 빌드 및 배포 성공!"
        }
        failure {
            echo "🚨 빌드 실패! 로그를 확인하세요..."
        }
    }
}
