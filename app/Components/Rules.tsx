import Die from "./Die";
import TextLayout from "./TextLayout";

export default function Rules() {

    return (
        <TextLayout>
            <h2 className="text-3xl">Rules</h2>

            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 w-full text-xl items-center">
                <div className="flex gap-1">
                    <Die value={1} size={35} />
                </div>
                <p>100</p>
                <div className="flex gap-1">
                    <Die value={5} size={35} />
                </div>
                <p>50</p>
                <div className="flex gap-1">
                    <Die value={1} size={35} />
                    <Die value={1} size={35} />
                    <Die value={1} size={35} />
                </div>
                <p>300</p>
                <div className="flex gap-1">
                    <Die value={2} size={35} />
                    <Die value={2} size={35} />
                    <Die value={2} size={35} />
                </div>
                <p>200</p>
                <div className="flex gap-1">
                    <Die value={3} size={35} />
                    <Die value={3} size={35} />
                    <Die value={3} size={35} />
                </div>
                <p>300</p>
                <div className="flex gap-1">
                    <Die value={4} size={35} />
                    <Die value={4} size={35} />
                    <Die value={4} size={35} />
                </div>
                <p>400</p>
                <div className="flex gap-1">
                    <Die value={5} size={35} />
                    <Die value={5} size={35} />
                    <Die value={5} size={35} />
                </div>
                <p>500</p>
                <div className="flex gap-1">
                    <Die value={6} size={35} />
                    <Die value={6} size={35} />
                    <Die value={6} size={35} />
                </div>
                <p>600</p>
            </div>
            <p className="text-sm">Four or more of a kind is worth double the points of three of a kind.</p>
        </TextLayout>
    );
}
