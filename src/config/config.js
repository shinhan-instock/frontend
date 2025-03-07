// S3 관련 설정
export const S3_UPLOAD_URL = "https://inst00ck-icebucket.s3.amazonaws.com/"; // S3 버킷 URL

// AWS S3 버킷 설정 정보
export const S3_BUCKET_NAME = "s3://inst00ck-icebucket";
export const S3_REGION = "ap-northeast-2"; // AWS S3 리전

// AWS 인증 정보 (IAM 역할을 사용하는 방식으로 설정하는 것이 더 안전)
export const AWS_ACCESS_KEY_ID = "976193268442";

// CORS 설정 (필요한 경우)
export const CORS_CONFIG = {
  allowedOrigins: ["*"], // 허용할 도메인
  allowedMethods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메소드
  allowedHeaders: ["Content-Type", "Authorization"], // 허용할 헤더
};
