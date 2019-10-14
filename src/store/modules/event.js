/* eslint-disable prettier/prettier */
import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    event: {},
    events: [],
    eventsTotal: 0,
    user: { id: 'abc123', name: 'Adam Jahr' }
}

export const mutations = {
    SET_EVENT(state, event) {
      state.event = event
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, total) {
      state.eventsTotal = total
    }
}


export const  actions = {
    fetchEvent({ commit, getters, dispatch }, id) {
        let event = getters.getEventById(id)
        if (event) {
            commit('SET_EVENT', event)
            return event
        } else {
            return EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data)
                    return response.data
                })
                .catch(error => {
                    const notification = {
                        type: 'error',
                        message: 'There was a problem fetching an event: ' + error.message
                    }
                    dispatch('notification/add', notification, { root: true})
                })
        }
    },
    createEvent({ commit, dispatch }, event) {
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event)
            const notification = {
                type: 'success',
                message: `Your event has been created!`
            }
            dispatch('notification/add', notification, { root: true})
        })
        .catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem creating your event ' + error.message
            }
            dispatch('notification/add', notification, { root: true})
            throw error
        })
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
        EventService.getEvents(perPage, page)
        .then(response => {
            commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
            commit('SET_EVENTS', response.data)
        })
        .catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem fetching events: ' + error.message
            }
            dispatch('notification/add', notification, { root: true})
        })
    }
}

export const getters = {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
}