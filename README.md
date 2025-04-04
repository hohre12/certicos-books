# Certicos Books

도서 검색 및 찜한 책 목록을 관리하는 사이트입니다.
사용자는 카카오 도서 검색 API를 활용하여 원하는 책을 검색하고, 찜한 책을 목록에서 확인할 수 있습니다.

## 1. 실행 방법 및 환경 설정

### 1.1 프로젝트 클론

```
https://github.com/hohre12/certicos-books.git
cd certicos-books
```

### 1.2 패키지 설치

1. yarn install 또는 npm install

### 1.3 환경 변수 설정

1. **.env** 파일 추가

### 1.4 서버 실행

1. yarn dev 또는 npm run dev

## 2. 폴더 구조 및 주요 코드 설명
```
├─node_modules
├─public
└─src
    ├─assets
    │  └─svgs                                   # svg파일 폴더
    ├─components                                # 재사용 가능한 컴포넌트
    │  ├─button                                 # (공통) 버튼 컴포넌트
    │  ├─dropdown                               # (공통) 드랍다운 컴포넌트
    │  ├─globalNavigationBar                    # (공통) GNB 컴포넌트
    │  ├─input                                  # (공통) 인풋 컴포넌트
    │  ├─searchBox                              # (공통) 검색 컴포넌트
    │  ├─svgIcon                                # (공통) 동적 svg 로딩 컴포넌트
    │  └─tableItem                              # (공통) 목록 로우 컴포넌트
    ├─constants                                 # 상수
    ├─hooks                                     # 커스텀 훅
    ├─pages                                     # 페이지별 컴포넌트
    │  ├─Book                                   # 도서 페이지
    │  │  └─List                                # 도서검색 목록 페이지
    │  │      └─components                      # 도서검색 목록에서만 사용되는 컴포넌트
    │  │          └─detailSearchPopup           # 상세검색 모달 컴포넌트
    │  └─Favorite                               # 찜 페이지
    │      └─List                               # 찜 목록 페이지
    ├─services                                  # API 요청 관련 로직
    │  └─keys                                   # API 요청시 사용되는 키
    ├─state                                     # Recoil 상태 관리
    ├─styles                                    # 스타일
    ├─types                                     # TypeScript 타입 정의
    └─utils                                     # 글로벌 함수
```

## 3. 라이브러리 선택 이유

- **recoil & recoil-persist**: 전역 상태 관리 및 로컬스토리지 기반 데이터 유지
- **Tanstack Query**: API 데이터 요청 및 캐싱 최적화
- **Styled-components**: 컴포넌트 기반 스타일링 적용
- **React Router**: 페이지 네비게이션을 위해 사용
- **React-popper**: 드롭다운 옵션 포지셔닝을 위해 사용

## 4. 강조하고 싶은 기능

### 4.1 도서 검색 기능
- 요구사항에 맞춘 전체검색과 상세검색 동시 진행 불가
  
### 4.2 찜한 책 관리
- recoil-persist를 활용하여 페이지 새로고침 및 세션 종료 후에도 찜목록 유지

### 4.3 아코디언
- 목록 row 내의 상세보기 클릭시 사용성을 위한 부드러운 아코디언 애니메이션

### 4.4 Tanstack Query를 활용한 API 캐싱
- 동일한 검색어로 반복 요청 시 API 호출 최소화
- 데이터 갱신이 필요할 때만 refetch 실행

