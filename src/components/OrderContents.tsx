import FormatCurrency from "../helpers"
import { OrderActions } from "../reducer/order-reducer"
import { OrderItems } from "../types"

type OrderContentsProps = {
    order: OrderItems[],
    dispatch: React.Dispatch<OrderActions>
}

export default function OrderContents({ order, dispatch }: OrderContentsProps) {


    return (
        <div>
            <h2 className="font-black text-4xl">Consumo</h2>

            <div className="space-y-3 mt-5">
                {
                    order.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-t border-gray-500 p-5 last-of-type:border-b">
                            <div>
                                <p className="text-lg">
                                    {item.name} - {FormatCurrency(item.price)}
                                </p>
                                <p className="font-black">
                                    Cantidad:{item.quantity} - {FormatCurrency(item.price * item.quantity)}
                                </p>
                            </div>
                            <button
                                className="bg-red-600 w-8 h-8 rounded-full text-white font-black"
                                onClick={() => dispatch({ type: 'remove-item', payload: { id: item.id } })}
                            >X</button>
                        </div>
                    ))}
            </div>
        </div>
    )
}
