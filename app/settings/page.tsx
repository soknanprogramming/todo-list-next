import ThemeToggle from "@/components/main/ThemeToggle";

export default function Setting(){
    return (
        <div className="space-y-2">
            <div className="text-2xl font-semibold">Setting</div>
            <div>
                <ThemeToggle/>
            </div>
        </div>
    )
}