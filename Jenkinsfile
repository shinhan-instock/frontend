pipeline {
    agent {
        kubernetes {
            label 'nodejs'         // 파이프라인이 사용할 K8s Pod 라벨 (임의 이름)
            defaultContainer 'node'// 기본 컨테이너 이름
            yaml """
apiVersion: v1
kind: Pod
metadata:
  annotations:
    sidecar.istio.io/inject: "false"    # Istio 사이드카 자동 주입 비활성화
spec:
  containers:
    - name: node
      image: node:16
      tty: true
      command:
        - cat
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
                        # Node 공식 이미지에는 apt가 있으므로 아래처럼 AWS CLI 설치
                        apt-get update && apt-get install -y awscli
                        aws --version
                    """
                }
            }
        }

        stage('Checkout') {
            steps {
                container('node') {
                    // 예시로 git clone 사용. 필요 시 'checkout scm'으로 대체 가능
                    sh '''
                        git --version
                        git clone -b main https://github.com/shinhan-instock/frontend.git .
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
}
