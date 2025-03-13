pipeline {
    agent any  // Jenkins가 실행 가능한 모든 노드에서 동작
    
    stages {
        stage('Checkout') {
            steps {
                // (방법 1) Jenkins Job 설정에서 "Pipeline script from SCM"을 쓴다면, 아래 2줄 대신 'checkout scm' 만 써도 됨
                git branch: 'main', url: 'https://github.com/shinhan-instock/frontend.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy to S3') {
            steps {
                // 이 스테이지에서 AWS CLI로 build 폴더를 S3에 업로드
                sh 'aws s3 sync build/ s3://inst00ck-front  --delete'
            }
        }

        stage('Invalidate CloudFront') {
            steps {
                withAWS(credentials: '93d53f6a-d44c-4637-984b-ef73d9f2a653', region: 'ap-northeast-2') {
                    sh 'aws cloudfront create-invalidation --distribution-id d3tg0snud1pi3v.cloudfront.net --paths "/*"'
                }
            }
        }
    }
}
