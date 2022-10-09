import { useEffect, useState } from "react";
import Layout from "components/layout/Layout";
import SimSettings from "components/SimSettings";
import { SimulationSettings } from "lib/types";
import useAnimationFrame from "lib/hooks/useAnimationFrame";

const HomePage = (): JSX.Element => {
    const [settings, setSettings] = useState<SimulationSettings>({
        maxIterations: 50000,
        numAttempts: 10,
        successChance: 0.5,
    });

    const [iteration, setIteration] = useState(0);
    const [results, setResults] = useState<number[]>([]);
    useEffect(() => {
        setIteration(0);
        setResults(new Array(settings.numAttempts + 1).fill(0));
    }, [settings]);

    useAnimationFrame(() => {
        if (iteration >= settings.maxIterations) return;
        setIteration(cur => cur + 500);
        setResults(cur => {
            for (let j = 0; j < 500; j++) {
                let successes = 0;
                for (let i = 0; i < settings.numAttempts; i++) {
                    if (Math.random() < settings.successChance) successes++;
                }
                cur[successes]++;
            }
            return cur;
        });
    }, [settings, iteration]);

    return (
        <Layout>
            <h1 className="text-4xl mb-4">Bullshit Calculator</h1>
            <SimSettings value={settings} onChange={setSettings} />
            <div className="border border-white rounded relative h-6 w-full my-4">
                <div
                    className="bg-primary-500 absolute top-0 left-0 h-full grid place-items-center rounded"
                    style={{ width: `${(iteration / settings.maxIterations) * 100}%` }}
                />
                <p className="absolute top-0 left-0 h-full w-full text-center text-sm">
                    {iteration} / {settings.maxIterations}
                </p>
            </div>
            <div className="flex justify-between gap-2 relative items-end pt-8 px-4 h-96 border border-white border-opacity-60">
                {results.map((r, i) => {
                    if (r <= 0) return null;
                    return (
                        <div
                            key={"result-" + i}
                            className="bg-primary-500 flex-grow relative hover:bg-primary-400 rounded-tr rounded-tl"
                            style={{
                                height: `${
                                    100 * (r / results.reduce((a, b) => Math.max(a, b), 0))
                                }%`,
                                bottom: "1px",
                            }}
                        >
                            <p className="w-full text-center absolute -top-6">{`${(
                                100 *
                                (r / results.reduce((a, b) => a + b, 0))
                            ).toFixed(1)}%`}</p>
                            <p className="w-full text-center absolute -bottom-6">{i}</p>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default HomePage;
