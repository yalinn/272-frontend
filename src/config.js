const config = {
    PORT: "3000",
    PUBLIC_URL: "https://probee.yalin.app/",
    WEBSITE_VERSION: '0.0.1',
    API_ENDPOINT: "https://api-probee.yalin.app/",
    API_PORT: "8080",
    WS_ENDPOINT: "wss://ws-probee.yalin.app/",
    WS_PORT: '3500',
    COOKIE_NAME: "probee",
    COOKIE_TTL: 60 * 60 * 24 * 365, // 1 year in seconds
    LANGUAGES: {
        locales: ["tr", "en"],
        defaultLocale: "en",
    }
}
export default config;
