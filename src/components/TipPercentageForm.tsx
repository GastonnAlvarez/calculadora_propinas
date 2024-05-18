import { OrderActions } from "../reducer/order-reducer"

const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    },
]

type TipPercentageFormProps = {
    dispatch: React.Dispatch<OrderActions>,
    tip: number,
}

export default function TipPercentageForm({ dispatch, tip }: TipPercentageFormProps) {

    const handleEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch({ type: 'reset-propina' })
    }

    return (
        <div>
            <h3 className="font-black text-2xl">Propina:</h3>
            <form>
                {tipOptions.map(tipOption => (
                    <div key={tipOption.id} className="flex gap-2">
                        <label htmlFor={tipOption.id}>{tipOption.label}</label>
                        <input
                            id={tipOption.id}
                            type="radio"
                            name='tip'
                            value={tipOption.value}
                            onChange={e => dispatch({ type: 'add-tip', payload: { value: +e.target.value } })}
                            checked={tipOption.value === tip}
                        />
                    </div>
                ))}
                <button onClick={handleEvent} className="bg-indigo-500 font-black text-white rounded-lg py-3 px-5 mt-5">Eliminar Propina</button>
            </form>
        </div>
    )
}
