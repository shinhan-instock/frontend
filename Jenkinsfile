pipeline {
    agent {
        kubernetes {
            label 'nodejs'    // 임의 라벨
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
  # 아래는 백엔드 파이프라인처럼 nodeSelector/toleration을 지정하는 예시
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
                        # node:16 이미지는 npm, node는 있지만 awscli는 없으므로 별도로 설치
                        apt-get update && apt-get install -y awscli
                        aws --version
                    """
                }
            }
        }

        stage('Checkout') {
            steps {
                container('node') {
                    // 개발 브랜치 등 원하는 브랜치를 클론. (백엔드처럼 'checkout scmGit' 써도 됨)
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
            echo "🎉 프론트엔드 빌드 & 배포 성공!"
        }
        failure {
            echo "🚨 빌드 실패! 로그를 확인하세요..."
        }
    }
}
