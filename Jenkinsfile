pipeline {
    agent {
        kubernetes {
            label 'nodejs'         // 파이프라인이 사용할 K8s Pod의 라벨(아무 이름 가능)
            defaultContainer 'node'// 기본 컨테이너 이름을 'node'로 설정
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:16
      tty: true
      command:
        - cat
      # 여기서는 node:16 이미지를 씁니다. npm은 들어있지만 awscli는 없으므로, 아래 단계에서 apt-get install 필요.
"""
        }
    }

    stages {

        stage('Setup Tools') {
            steps {
                container('node') {
                    sh '''
                        # Node 공식 이미지에는 apt가 있으므로 아래처럼 AWS CLI를 설치
                        apt-get update && apt-get install -y awscli
                        aws --version
                    '''
                }
            }
        }

        stage('Checkout') {
            steps {
                // Jenkinsfile과 동일한 Git Repo라면 checkout scm 써도 되며,
                // 별도 repo면 git url: "...", branch: "..."
                container('node') {
                    sh 'git --version'
                    sh 'git clone -b main https://github.com/shinhan-instock/frontend.git .'
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
                    // build 폴더를 S3로 업로드
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
