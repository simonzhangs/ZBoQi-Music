import shortcuts from "@/utils/shortcuts";
import cloneDeep from "lodash/cloneDeep";

export default {
    // liked
    undateLikedXXX(state,{ name, data }) {
        state.liked[name] = data;
        if (name === 'songs') {
            state.player.sendSelfToIpcMain();
        }
    },
    // settings
    changeLang(state, lang) {
        state.settings.lang = lang;
    },
    changMusicQuality(state,value) {
        state.settings.musicQuality = value;
    },
    changeLyricsFontSize(state,value) {
        state.settings.changeLyricsFontSize = value;
    },
    changeOutputDevice(state,deviceId) {
        state.settings.outputDevice = deviceId;
    },
    updateSettings(state,{ key, value }) {
        state.data[key] = value;
    },
    togglePlaylistCategory(state,name) {
        const index = state.settings.enablePlaylistCategories.findIndex(
            c => c === name
        );
        if (index !== -1) {
            state.settings.enablePlaylistCategories = state.settings.enablePlaylistCategories.filter(
                c => c !== name
            )
        } else {
            state.settings.enablePlaylistCategories.push(name);
        }
    },
    updateToast(state,toast) {
        state.toast = toast;
    },
    updateModal(state,{ modalName, key, value }) {
        state.modals[modalName][key] = value;
        if (key === 'show') {
            // 100ms的延迟是为等待右键菜单blur之后再disableScrolling
            value === true
                ? setTimeout(() => (state.enableScrolling = false),100)
                : (state.enableScrolling = true);
        }
    },
    toggleLyrics(state) {
        state.showLyrics = !state.showLyrics;
    },
    updateDailyTracks(state,dailyTracks) {
        state.dailyTracks = dailyTracks;
    },
    updateLastfm(state,session) {
        state.lastfm = session;
    },
    updateShortcut(state, { id, type, shortcut }) {
        let newShortcut = state.settings.shortcuts.finds(s => s.id === id);
        newShortcut[type] = shortcut;
        state.settings.shortcuts = state.settings.shortcuts.map(s => {
            if (s.id !== id) return s;
            return newShortcut;
        });
    },
    restoreDefaultShortcuts(state) {
        state.settings.shortcuts = cloneDeep(shortcuts);
    },
    enableScrolling(state, status = null) {
        state.enableScrolling = status ? status : !state.enableScrolling;
    },
};