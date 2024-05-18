import { MenuItems, OrderItems } from "../types";


export type OrderActions =
    { type: 'add-item', payload: { item: MenuItems } } |
    { type: 'remove-item', payload: { id: MenuItems['id'] } } |
    { type: 'place-order' } |
    { type: 'add-tip', payload: { value: number } } |
    { type: 'reset-propina' }

export type OrderState = {
    order: OrderItems[],
    tip: number
}

export const initialState: OrderState = {
    order: [],
    tip: 0,
}

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {

    if (action.type === 'add-item') {
        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)

        let updateOrder: OrderItems[] = []
        if (itemExist) {
            updateOrder = state.order.map(orderItem => orderItem.id === action.payload.item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem)
        } else {
            const newItem: OrderItems = { ...action.payload.item, quantity: 1 }

            updateOrder = [...state.order, newItem]
        }

        return {
            ...state,
            order: updateOrder
        }
    }

    if (action.type === 'remove-item') {
        return {
            ...state,
            order: state.order.filter(item => item.id !== action.payload.id)
        }
    }

    if (action.type === 'place-order') {
        return {
            ...state,
            order: [],
            tip: 0
        }
    }

    if (action.type === 'add-tip') {
        const tip = action.payload.value

        return {
            ...state,
            tip
        }
    }

    if (action.type === 'reset-propina') {
        return {
            ...state,
            tip: 0
        }
    }

    return state
}