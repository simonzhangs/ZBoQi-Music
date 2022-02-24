import { playlistCategories } from "@/utils/staticData";
import shortcuts from "@/utils/shortcuts";

console.debug('[debug][initLocalStorage.js]');
const enabledPlaylistCategories = playlistCategories
    .filter(c => c.enable)
    .map( c => c.name);

let localStorage = {
    player: {},
    settings: {
        lang: null,
        musicLanguage: 'all',
        appearance: 'auto',
        musicQuality: 320000,
        lyricFontSize: 28,
        outputDevice: 'default',
        showPlaylistsByAppleMusic: true,
        enableUnblockNeteaseMusic: true,
        automaticallyCacheSongs: true,
        cacheLimit: 8192,
        enableReversedMode: false,
        nyancatStyle: false,
        showLyricsTranslation: true,
        lyricsBackgorund: true,
        closeAppOption: 'ask',
        enableDiscardRichPresence: false,
        enableGlobalShortcut: true,
        showLibraryDefault: false,
        subTitleDefault: false,
        enabledPlaylistCategories,
        proxyConfig: {
            protocol: 'noProxy',
            server: '',
            prot: null,
        },
        shortcuts: shortcuts,
    },
    data: {
        user: {},
        likedSongPlaylistID: 0,
        lastRefreshCookieData: 0,
        loginMode: null,
    },
}

// 桌面端缓存设置
if(process.env.IS_ELECTRON === true) {
    localStorage.settings.automaticallyCacheSongs = true;
}

export default localStorage;