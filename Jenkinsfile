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
    sidecar.istio.io/inject: "false"    # Istio 사이드카 자동 주입 비활성화
spec:
  nodeSelector:
    kubernetes.io/hostname: k8s-cicd    # k8s-cicd 노드에서 실행
  tolerations:
    - key: "no-kafka"
      operator: "Equal"
      value: "true"
      effect: "NoSchedule"
  containers:
    - name: node
      image: node:16
      command:
        - /busybox/cat
      tty: true
    - name: jnlp
      image: jenkins/inbound-agent:latest
      args:
        - \${computer.jnlpmac}
        - \${computer.name}
"""
        }
    }

    stages {

        stage('Setup Tools') {
            steps {
                container('node') {
                    sh """
                        # node:16 이미지는 npm과 node는 있으나, AWS CLI는 설치되어 있지 않으므로 설치
                        apt-get update && apt-get install -y awscli
                        aws --version
                    """
                }
            }
        }

        stage('Checkout') {
            steps {
                container('node') {
                    // develop 브랜치에서 리포 클론 (필요 시 'checkout scm' 사용 가능)
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
