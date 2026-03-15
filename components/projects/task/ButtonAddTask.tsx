
interface Props {
    className?: string;
    onClick?: () => void;
}


export default function ButtonAddTask({ className = "", onClick = () => {} }: Props) {
    return  (
        <button className={`${className}`} onClick={onClick}>
            Add Task
        </button>
    )
}