// ConfigManager.js

class ConfigManager {
    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }

        // Initialize default values or get them from localStorage
        this.llmModel = localStorage.getItem('llmModel') || 'gemma2';
        this.openAiKey = localStorage.getItem('openAiKey') || '<empty>';

        ConfigManager.instance = this;
    }

    // Method to get the current settings
    getSettings() {
        return {
            llmModel: this.llmModel,
            openAiKey: this.openAiKey,
        };
    }

    // Method to update settings
    setSettings(newLlmModel, newOpenAiKey) {
        this.llmModel = newLlmModel;
        this.openAiKey = newOpenAiKey;

        localStorage.setItem('llmModel', newLlmModel);
        localStorage.setItem('openAiKey', newOpenAiKey);
    }
}

const instance = new ConfigManager();
// Object.freeze(instance); // Remove this line to allow property modifications

export default instance;
