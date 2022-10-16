import { SimulationSettings } from "lib/types";
import TextField from "./controls/TextField";
import Slider from "./controls/Slider";
import Toggle from "./controls/Toggle";

const SimSettings = ({
    value,
    onChange,
}: {
    value: SimulationSettings;
    onChange: (newVal: SimulationSettings) => void;
}): JSX.Element => {
    return (
        <div>
            <TextField
                value={value.maxIterations.toString()}
                onChange={newVal => onChange({ ...value, maxIterations: parseInt(newVal) })}
                label="Iteration Count"
            />
            <div className="flex items-center mb-4 gap-4">
                <label className="w-24">Custom Code</label>
                <Toggle
                    value={!!value.customCode}
                    onChange={newVal =>
                        onChange({
                            ...value,
                            customCode: newVal ? "() => Math.random() < 0.5 ? 0 : 1" : "",
                        })
                    }
                />
            </div>
            {!value.customCode ? (
                <>
                    <TextField
                        value={value.numAttempts.toString()}
                        onChange={newVal => onChange({ ...value, numAttempts: parseInt(newVal) })}
                        label="Number of Attempts"
                    />
                    <div className="flex items-center">
                        <label className="w-24">Success Chance</label>
                        <Slider
                            value={value.successChance}
                            min={0}
                            max={1}
                            steps={1000}
                            onChange={newVal => onChange({ ...value, successChance: newVal })}
                            activeColor={"rgb(14, 165, 233)"}
                        />
                        <p className="ml-2">{(100 * value.successChance).toFixed(1)}%</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center">
                        <label className="w-24">Function</label>
                        <textarea
                            value={value.customCode}
                            onChange={e => onChange({ ...value, customCode: e.target.value })}
                            className="font-mono resize-none bg-neutral-700 text-white flex-grow px-2 py-1 h-48"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default SimSettings;
