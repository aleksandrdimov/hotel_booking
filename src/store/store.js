import { createStore } from 'vuex'
import bookings from '../../bookings.json'

export const store = createStore({
  state: () => {
    return {
      bookings: bookings,
      rooms: [],
      weekDate: [
        { name: 'Sun', date: '' },
        { name: 'Mon', date: '' },
        { name: 'Tue', date: '' },
        { name: 'Wed', date: '' },
        { name: 'Thu', date: '' },
        { name: 'Fri', date: '' },
        { name: 'Sat', date: '' }
      ],
      isActive: -1,
      day: new Date()
    }
  },

  mutations: {
    changeDay: (state, payload) => {
      state.day = payload
    },

    getWeekDate: (state) => {
      const initDay = state.day.getDay()
      state.day.getTime().toString().slice(0, 6) === new Date().getTime().toString().slice(0, 6)
        ? (state.weekDate.isActive = state.day.getDay())
        : (state.weekDate.isActive = -1)

      state.weekDate.forEach((el, index) => {
        const result = index > initDay ? index - initDay : initDay - index

        if (index > initDay) {
          state.weekDate[index] = {
            ...state.weekDate[index],
            date: new Date(state.day.getTime() + 86400000 * result)
              .toISOString()
              .replace(/T.*$/, '')
          }
        }

        if (index < initDay) {
          state.weekDate[index] = {
            ...state.weekDate[index],
            date: new Date(state.day.getTime() - 86400000 * result)
              .toISOString()
              .replace(/T.*$/, '')
          }
        }

        if (index === initDay) {
          state.weekDate[index] = {
            ...state.weekDate[index],
            date: new Date(state.day.getTime()).toISOString().replace(/T.*$/, '')
          }
        }
      })
      return state.weekDate
    },

    getCurrentBookings: (state) => {
      let resultArray = []
      state.weekDate.forEach((date) => {
        const result = state.bookings.filter((el) => el.start <= date.date && el.end >= date.date)
        resultArray = [...resultArray, ...result]
      })
      resultArray = Array.from(new Set(resultArray))

      state.rooms.forEach((room) => {
        room.items = resultArray.filter((item) => item.roomDetails.name === room.name)
      })

      state.rooms.forEach((room, i) => {
        room.items.forEach((item, idx) => {
          let start = ''
          let end = 0
          state.weekDate.forEach((date, index) => {
            if (start === '') {
              if (date.date > item.start) {
                if (index === 0) {
                  state.rooms[i].items[idx] = { ...state.rooms[i].items[idx], indexStart: 0 }
                } else {
                  state.rooms[i].items[idx] = {
                    ...state.rooms[i].items[idx],
                    indexStart: index + 1
                  }
                }
                start = index
              } else if (date.date === item.start) {
                start = index
                if (index === 0) {
                  state.rooms[i].items[idx] = {
                    ...state.rooms[i].items[idx],
                    indexStart: index + 1
                  }
                } else {
                  state.rooms[i].items[idx] = {
                    ...state.rooms[i].items[idx],
                    indexStart: index + 1
                  }
                }
              } else {
                start = ''
              }
            }

            if (date.date < item.end) {
              end = index + 1
              if (index == state.weekDate.length - 1) {
                state.rooms[i].items[idx] = { ...state.rooms[i].items[idx], indexEnd: index + 1 }
              } else {
                state.rooms[i].items[idx] = { ...state.rooms[i].items[idx], indexEnd: index }
              }
            } else if (date.date === item.end) {
              if (index !== state.weekDate.length - 1 && start === 0) {
                state.rooms[i].items[idx] = { ...state.rooms[i].items[idx], indexEnd: index }
              } else {
                state.rooms[i].items[idx] = { ...state.rooms[i].items[idx], indexEnd: index }
              }
              end = index
            }
          })
        })
      })
    }
  },
  getters: {
    getAllRooms: (state) => {
      state.bookings.forEach((el) => {
        const newRoom = {
          name: el.roomDetails.name,
          items: []
        }

        const result = state.rooms.find((room) => room.name === el.roomDetails.name)

        result ? '' : (state.rooms = [...state.rooms, { ...newRoom }])
      })

      return state.rooms
    }
  }
})
