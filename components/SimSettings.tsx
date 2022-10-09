import { SimulationSettings } from "lib/types";
import TextField from "./controls/TextField";
import Slider from "./controls/Slider";

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
        </div>
    );
};

export default SimSettings;
