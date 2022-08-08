const axios = require('axios');

module.exports = class {
    constructor(API_KEY = "") {
        this.axios = axios.create({
            baseURL: 'https://alpha.luatect.xyz/v2',
            headers: {
                'lsr-api-key': API_KEY
            }
        })
    }

    async redeem(key, discord_id) {
        return (await this.axios.patch(`/services/${key}/redeem`, {
            discord_id
        })).data
    }

    async get_services() {
        return (await this.axios.get(`/services`)).data
    }

    async get_info() {
        return (await this.axios.get(`/services/info`)).data
    }

    async get_key(key) {
        return (await this.axios.get(`/services/lookup?key=${key}`)).data
    }

    async get_key_discordid(discord_id, placeid) {
        return (await this.axios.get(`/services/lookup?discord_id=${discord_id}&placeid=${placeid}`)).data
    }

    async blacklist_key(key, message = "No Message", state) {
        return (await this.axios.patch(`/services/${key}/blacklist`, {
            message,
            state
        })).data
    }

    async remove_key(key) {
        return (await this.axios.delete(`/services/${key}`)).data
    }

    async delete_hwid(key) {
        return (await this.axios.delete(`/services/${key}/hwid`)).data
    }

    async gen_key(amount, placeid) {
        return (await this.axios.put(`/services/key`, {
            amount,
            placeid
        })).data
    }

    async change_mode(mode) {
        return (await this.axios.patch(`/services/mode`, {
            type: mode
        })).data
    }
}