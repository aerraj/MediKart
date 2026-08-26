export const ADD_ITEM = 'ADD'
export const REMOVE_ITEM = 'REMOVE'
export const UPDATE_ITEM = 'UPDATE'
export const DROP_CART = 'DROP'
export const SET_QUANTITY = 'SET_QTY'

function quantity(value) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function unitPrice(action) {
  const addedQuantity = quantity(action.qty)
  const explicitUnitPrice = Number(action.unitPrice)

  if (Number.isFinite(explicitUnitPrice)) return explicitUnitPrice

  const totalPrice = Number(action.price)
  return Number.isFinite(totalPrice) ? totalPrice / addedQuantity : 0
}

function isSameSelection(item, action) {
  return String(item.id) === String(action.id) && item.size === action.size
}

export function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const addedQuantity = quantity(action.qty)
      const addedUnitPrice = unitPrice(action)
      const existingIndex = state.findIndex((item) => isSameSelection(item, action))

      if (existingIndex === -1) {
        return [...state, {
          id: action.id,
          name: action.name,
          image: action.image,
          price: addedUnitPrice * addedQuantity,
          unitPrice: addedUnitPrice,
          qty: addedQuantity,
          size: action.size,
        }]
      }

      return state.map((item, index) => {
        if (index !== existingIndex) return item

        const nextQuantity = item.qty + addedQuantity
        return { ...item, qty: nextQuantity, price: item.unitPrice * nextQuantity }
      })
    }

    case REMOVE_ITEM:
      return state.filter((_, index) => index !== action.index)

    case UPDATE_ITEM:
      return state.map((item) =>
        item.id === action.id
          ? { ...item, qty: item.qty + quantity(action.qty), price: item.price + action.price }
          : item
      )

    case DROP_CART:
      return []

    case SET_QUANTITY:
      return state.map((item, index) => {
        if (index !== action.index) return item
        const nextQuantity = quantity(action.qty)
        return { ...item, qty: nextQuantity, price: item.unitPrice * nextQuantity }
      })

    default:
      return state
  }
}
