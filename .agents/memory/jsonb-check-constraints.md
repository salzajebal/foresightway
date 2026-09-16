---
name: JSONB check constraints
description: JSONB 배열 기반 성과 테이블의 데이터베이스 제약조건 작성 원칙
---

JSONB 배열을 저장하는 성과 테이블의 `CHECK` 제약조건에는 `jsonb_array_elements`를 사용하는 서브쿼리를 넣지 않는다. 데이터베이스에서는 singleton ID와 배열 길이처럼 서브쿼리 없는 조건만 보장하고, 배열 항목별 필수값 및 형식은 API 요청과 저장 데이터 검증에서 처리한다.

**Why:** 이 프로젝트의 PostgreSQL은 `CHECK` 제약조건 안의 서브쿼리를 허용하지 않아 스키마 적용이 실패한다.

**How to apply:** 새로운 JSONB 성과 데이터 테이블을 만들 때 DB 제약조건은 `jsonb_array_length` 등 단순 표현식으로 제한하고, 항목 내부 문자열·숫자 검증은 OpenAPI/Zod 및 서버 검증 함수에 둔다.