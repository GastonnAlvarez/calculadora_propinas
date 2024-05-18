import { useMemo } from "react"
import { OrderItems } from "../types"
import FormatCurrency from "../helpers"
import { OrderActions } from "../reducer/order-reducer"

type OrderTotalsProps = {
    order: OrderItems[],
    tip: number,
    dispatch: React.Dispatch<OrderActions>
}

export default function OrderTotal({ order, tip, dispatch }: OrderTotalsProps) {

    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propinas:</h2>
                <p>Subtotal a pagar:
                    <span className="font-bold">{FormatCurrency(subtotalAmount)}</span>
                </p>
                <p>Propina:
                    <span className="font-bold">{FormatCurrency(tipAmount)}</span>
                </p>
                <p>Total a Pagar:
                    <span className="font-bold">{FormatCurrency(totalAmount)}</span>
                </p>
            </div>

            <button
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={totalAmount === 0}
                onClick={() => dispatch({ type: 'place-order' })}
            >Guardar Orden</button>
        </>
    )
}
