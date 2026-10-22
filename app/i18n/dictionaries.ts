import type { Locale } from "./locales";

// Every string on the site that isn't project content. English is the source; the
// other languages must have the same keys (the type checks it).

const en = {
  profile: {
    role: "Backend Software Engineer",
    location: "Tokyo",
    greeting: "Hello,",
    greetingName: "I'm Henry Kim.",
    intro:
      "Backend engineer in Tokyo, working mainly in Java and Spring. Outside work I build small products end to end, from design and code to cloud infrastructure and keeping them running.",
    description:
      "Henry Kim — backend engineer in Tokyo. Side projects built end to end with Java, Spring, cloud and the web.",
    dayJob: { title: "Backend Engineer", detail: "Payments & finance · API · DB · Auth · Cloud" },
  },
  nav: { home: "Home", projects: "Projects", about: "About", label: "Main", skip: "Skip to content" },
  language: { label: "Language" },
  theme: { system: "system", light: "light", dark: "dark", title: "Theme: {theme}", action: "Theme: {theme}. Switch to {next}." },
  home: {
    clockLabel: "Local time in Tokyo",
    clockEyebrow: "Tokyo · JST",
    dayJob: "Day job",
    stack: "Tools I reach for",
    projects: "Projects",
    writing: "Writing",
    blog: "Dev blog",
    moreAboutMe: "More about me",
    about: "About",
  },
  projects: {
    title: "Projects",
    description: "Side projects I designed, built and run myself.",
    lead: "Things I designed, built and keep running myself. Each one says where it stands.",
    all: "All projects",
  },
  project: {
    back: "All projects",
    backTo: "Back to {name}",
    history: "Earlier projects",
    historyLead: "{name} grew out of these two projects.",
    about: "About",
    features: "What it does",
    built: "How it's built",
    screenshots: "Screenshots",
    more: "More projects",
    previous: "Previous",
    next: "Next",
    liveSite: "live site",
    source: "source",
    screenshotsSoon: "screenshots soon",
  },
  status: { live: "Live", testing: "Testing", "in-progress": "In progress", planned: "Planned", archived: "Archived" },
  about: {
    title: "About",
    description: "Henry Kim is a backend engineer in Tokyo working with Java, Kotlin and Spring.",
    paragraphs: [
      "I'm Henry, a Korean backend engineer working in Tokyo. At work I build payment and finance systems with Java, Kotlin and Spring, covering APIs, databases, authentication, cloud infrastructure and CI/CD.",
      "Outside work I build side projects end to end. They're where I try what I don't get to use at work: a new framework, another cloud, running a service on my own.",
    ],
    focus: [
      { label: "Languages", value: "Java · Kotlin" },
      { label: "Framework", value: "Spring Boot" },
      { label: "Domain", value: "Payments & finance" },
      { label: "Areas", value: "API · DB · Auth · Cloud · CI/CD" },
    ],
    elsewhere: "Elsewhere",
    blog: "Dev blog",
  },
  notFound: {
    title: "This page doesn't exist.",
    body: "The link may be old, or the project may have moved.",
    back: "Back home",
  },
  footer: { blog: "Blog", built: "Built with Nuxt, hosted on Cloudflare Pages" },
};

export type Dictionary = typeof en;

const ja: Dictionary = {
  profile: {
    role: "バックエンドエンジニア",
    location: "東京",
    greeting: "こんにちは。",
    greetingName: "Henry Kimです。",
    intro:
      "東京でバックエンドエンジニアとして働いています。業務では主にJavaとSpringを使っています。業務外では、小さなプロダクトを設計から実装、クラウド構築、運用まで一人で手がけています。",
    description:
      "Henry Kim — 東京のバックエンドエンジニア。Java・Spring・クラウド・Webを使い、企画から運用まで一人で手がけたサイドプロジェクトを紹介します。",
    dayJob: { title: "バックエンド開発", detail: "決済・金融 · API · DB · 認証 · クラウド" },
  },
  nav: { home: "ホーム", projects: "作品", about: "プロフィール", label: "メイン", skip: "本文へスキップ" },
  language: { label: "言語" },
  theme: {
    system: "システム",
    light: "ライト",
    dark: "ダーク",
    title: "テーマ: {theme}",
    action: "テーマ: {theme}。{next}に切り替え",
  },
  home: {
    clockLabel: "東京の現在時刻",
    clockEyebrow: "東京 · JST",
    dayJob: "本業",
    stack: "よく使う技術",
    projects: "作品",
    writing: "発信",
    blog: "開発ブログ",
    moreAboutMe: "プロフィールを見る",
    about: "プロフィール",
  },
  projects: {
    title: "作品",
    description: "設計から開発、運用まで自分で手がけているサイドプロジェクトです。",
    lead: "設計から開発、運用まで自分で手がけているサイドプロジェクトです。それぞれの現在の状況も記載しています。",
    all: "すべての作品",
  },
  project: {
    back: "作品一覧",
    backTo: "{name}に戻る",
    history: "前身のプロジェクト",
    historyLead: "{name}は、次の2つのプロジェクトを経て今の形になりました。",
    about: "概要",
    features: "主な機能",
    built: "技術構成",
    screenshots: "スクリーンショット",
    more: "ほかの作品",
    previous: "前へ",
    next: "次へ",
    liveSite: "サイト",
    source: "ソースコード",
    screenshotsSoon: "スクリーンショットは準備中",
  },
  status: { live: "公開中", testing: "テスト中", "in-progress": "開発中", planned: "予定", archived: "アーカイブ" },
  about: {
    title: "プロフィール",
    description: "Henry Kimは東京で働くバックエンドエンジニアです。Java・Kotlin・Springを使った開発を行っています。",
    paragraphs: [
      "東京で働く韓国出身のバックエンドエンジニア、Henryです。業務ではJava・Kotlin・Springで決済・金融システムを開発しており、API、データベース、認証、クラウドインフラ、CI/CDまで幅広く担当しています。",
      "業務外では、サイドプロジェクトを企画から運用まで一人で手がけています。新しいフレームワークや別のクラウド、サービスの運用など、業務ではなかなか試せないことをここで試しています。",
    ],
    focus: [
      { label: "言語", value: "Java · Kotlin" },
      { label: "フレームワーク", value: "Spring Boot" },
      { label: "分野", value: "決済・金融" },
      { label: "担当領域", value: "API · DB · 認証 · クラウド · CI/CD" },
    ],
    elsewhere: "リンク",
    blog: "開発ブログ",
  },
  notFound: {
    title: "ページが見つかりません。",
    body: "リンクが古いか、プロジェクトが移動したのかもしれません。",
    back: "ホームに戻る",
  },
  footer: { blog: "ブログ", built: "Nuxtで構築し、Cloudflare Pagesでホスティング" },
};

const ko: Dictionary = {
  profile: {
    role: "백엔드 엔지니어",
    location: "도쿄",
    greeting: "안녕하세요.",
    greetingName: "Henry Kim입니다.",
    intro:
      "도쿄에서 백엔드 엔지니어로 일하며, 주로 Java와 Spring을 다룹니다. 업무 외에는 작은 서비스를 설계부터 구현, 클라우드 구성, 운영까지 혼자 만들고 있습니다.",
    description:
      "Henry Kim — 도쿄의 백엔드 엔지니어. Java, Spring, 클라우드, 웹으로 기획부터 운영까지 직접 만든 사이드 프로젝트를 소개합니다.",
    dayJob: { title: "백엔드 엔지니어", detail: "결제·금융 · API · DB · 인증 · 클라우드" },
  },
  nav: { home: "홈", projects: "프로젝트", about: "소개", label: "메인", skip: "본문으로 건너뛰기" },
  language: { label: "언어" },
  theme: {
    system: "시스템",
    light: "라이트",
    dark: "다크",
    title: "테마: {theme}",
    action: "테마: {theme}. 눌러서 {next} 모드로 전환",
  },
  home: {
    clockLabel: "도쿄 현재 시각",
    clockEyebrow: "도쿄 · JST",
    dayJob: "본업",
    stack: "주로 쓰는 기술",
    projects: "프로젝트",
    writing: "글",
    blog: "개발 블로그",
    moreAboutMe: "소개 더 보기",
    about: "소개",
  },
  projects: {
    title: "프로젝트",
    description: "기획부터 개발, 운영까지 직접 맡고 있는 사이드 프로젝트입니다.",
    lead: "기획부터 개발, 운영까지 직접 맡고 있는 사이드 프로젝트입니다. 프로젝트별 현재 상태도 함께 적었습니다.",
    all: "전체 프로젝트",
  },
  project: {
    back: "전체 프로젝트",
    backTo: "{name} 페이지로 돌아가기",
    history: "이전 프로젝트",
    historyLead: "{name}는 아래 두 프로젝트를 거쳐 지금의 모습이 되었습니다.",
    about: "소개",
    features: "주요 기능",
    built: "기술 구성",
    screenshots: "스크린샷",
    more: "다른 프로젝트",
    previous: "이전",
    next: "다음",
    liveSite: "사이트",
    source: "소스 코드",
    screenshotsSoon: "스크린샷 준비 중",
  },
  status: { live: "운영 중", testing: "테스트 중", "in-progress": "개발 중", planned: "예정", archived: "보관" },
  about: {
    title: "소개",
    description: "Henry Kim은 도쿄에서 Java, Kotlin, Spring으로 개발하는 백엔드 엔지니어입니다.",
    paragraphs: [
      "도쿄에서 일하는 한국인 백엔드 엔지니어 Henry입니다. 회사에서는 Java, Kotlin, Spring으로 결제·금융 시스템을 개발하며, API와 데이터베이스, 인증, 클라우드 인프라, CI/CD까지 폭넓게 맡고 있습니다.",
      "업무 밖에서는 사이드 프로젝트를 기획부터 운영까지 혼자 만듭니다. 새로운 프레임워크나 다른 클라우드, 서비스 직접 운영처럼 회사에서는 해 보기 어려운 것들을 여기서 해 보고 있습니다.",
    ],
    focus: [
      { label: "언어", value: "Java · Kotlin" },
      { label: "프레임워크", value: "Spring Boot" },
      { label: "분야", value: "결제·금융" },
      { label: "영역", value: "API · DB · 인증 · 클라우드 · CI/CD" },
    ],
    elsewhere: "링크",
    blog: "개발 블로그",
  },
  notFound: {
    title: "없는 페이지입니다.",
    body: "링크가 오래됐거나 프로젝트가 옮겨졌을 수 있습니다.",
    back: "홈으로",
  },
  footer: { blog: "블로그", built: "Nuxt로 만들고 Cloudflare Pages에서 호스팅" },
};

const dictionaries: Record<Locale, Dictionary> = { en, ja, ko };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Fills {name} placeholders. */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}

