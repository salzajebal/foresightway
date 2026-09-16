# 포사이트 투자자문

포사이트 투자자문의 서비스와 투자 철학을 소개하는 기업 웹사이트입니다.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- 메인 히어로의 영상, 애니메이션, 현재 문구는 별도 요청이 없으면 유지합니다.
- 히어로 아래의 모든 현재·신규 섹션은 `https://investlife.com/`의 레이아웃, 여백, 타이포그래피, 색상, 구분선 등 디자인 언어를 기준으로 구현합니다.
- 사용자가 전달한 이미지에서는 콘텐츠만 추출해 반영하고, 섹션 디자인을 임의로 재해석하지 않습니다.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
