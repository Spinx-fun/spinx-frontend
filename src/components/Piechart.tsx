import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSocket } from "../context/SocketContext";
import confetti from "canvas-confetti";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { warningAlert } from "./ToastGroup";
import { useWallet } from "@solana/wallet-adapter-react";
import { base58ToGradient } from "../utils/util";

const PieChart = (props: {
    setIsWonWindow: Function;
    setWonValue: Function;
}) => {
    const wallet = useWallet();
    const { winner, gameData, setClearGame, started, setStarted, gameEnded } = useSocket();
    const [confettiThrown, setConfettiThrown] = useState(false);
    const [text, setText] = useState('Waiting for Players')
    const [timeRemaining, setTimeRemaining] = useState(
        calculateTimeRemaining()
    );
    
    const pies = useMemo(() => {
        let piesList: {
            name: string,
            color: string,
            y: number
        }[] = [{ name: 'Empty', y: 0.1, color: '#222' }, { name: 'Empty', y: 0.0001, color: '#222' }];
        if (gameData && gameData?.players) {
            const sumBets = gameData?.players.reduce((sum: number, item: any) => sum + item.amountUsd, 0);
            gameData?.players?.map((item: any) => {
                piesList.push({
                    name: item.player,
                    color: base58ToGradient(item.player).color,
                    y: (item.amountUsd / sumBets) * 100
                })
            })
        }
        return piesList.reverse(); // Reverse the order of the pies
    }, [gameData])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [gameData]);

    useEffect(() => {
        let timeoutId: NodeJS.Timer;
        if (gameData) {
            if (
                Math.floor((gameData?.endTimestamp - new Date().getTime()) / 1000) === 0
            ) {
                if (setStarted) {
                    setStarted(true);
                }
            }
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeRemaining]);

    useEffect(() => {
        if (gameData && setStarted && gameData.players) {
            if (!gameData.players.length || gameData.players.length < 2) {
                setStarted(false);
            }
        }
    }, [gameData]);

    function calculateTimeRemaining() {
        if (
            gameData?.endTimestamp &&
            gameData?.endTimestamp >= new Date().getTime()
        ) {
            return Math.floor((gameData?.endTimestamp - new Date().getTime()) / 1000);
        }
    }

    useEffect(() => {
        // Update chart options when data changes
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            tooltip: {
                // enabled: pies.length > 0,
                enabled: false
            },
            series: [
                {
                    ...(prevOptions.series![0] as Highcharts.SeriesPieOptions),
                    data: pies,
                },
            ],
        }));
    }, [pies]);

    const throwConfetti = useCallback(() => {
        confetti({
            particleCount: 400,
            spread: 70,
            origin: { y: 0.6 },
        });
    }, [confetti]);

    const target = useMemo(() => {
        let res = 0;
        if (
            gameData &&
            gameData.players.length > 1 &&
            winner &&
            winner.winner !== ""
        ) {
            res = winner.resultHeight * 360 + 360 * 3;
        }
        console.log(winner, "Result height: ", res);
        return Math.ceil(res);
    }, [winner, gameData]);

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        chart: {
            animation: false,
            backgroundColor: 'transparent',
            events: {
                load: function () {
                    const chart = this;
                    chart.renderer
                        .path([
                            ['M', chart.chartWidth / 2 - 10, chart.plotTop - 5],
                            ['L', chart.chartWidth / 2 + 10, chart.plotTop - 5],
                            ['L', chart.chartWidth / 2, chart.plotTop + 10],
                            ['Z'],
                        ])
                        .attr({
                            fill: 'white',
                        })
                        .add();
                },
            },
        },
        credits: {
            enabled: false,
        },
        title: {
            text: ''
        },
        tooltip: {
            // enabled: pies.length > 0,
            enabled: false
        },
        series: [
            {
                type: 'pie',
                size: '100%',
                innerSize: '70%',
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                },
                animation: false,
                data: pies as Highcharts.PointOptionsObject[],
                startAngle: 360 * Math.random()
            }
        ]
    });

    useEffect(() => {
        console.log("started~~: ", started, target)
        let t: NodeJS.Timeout;
        if (started) {
            let physics = {
                angle: 0,
                angleVel: 0,
                force: 0,
                strength: 0.003, // Adjust for springiness
                drag: 0.98,
                target,
                isActive: true,
            };

            const animationSpeed = 20;

            setText('Drawing game...');

            t = setInterval(() => {
                if (physics.isActive) {
                    physics.force = (physics.target - physics.angle) * physics.strength;
                    physics.angleVel += physics.force;
                    physics.angleVel *= physics.drag;
                    physics.angle += physics.angleVel;

                    setChartOptions((prevOptions) => ({
                        ...prevOptions,
                        series: [
                            {
                                ...(prevOptions.series![0] as Highcharts.SeriesPieOptions),
                                startAngle: physics.angle,
                            },
                        ],
                    }));

                    if (Math.abs(physics.angleVel) < 0.1 && Math.abs(physics.target - physics.angle) < 1) {
                        physics.isActive = false;
                        clearInterval(t);
                        if (!confettiThrown && winner?.winner !== "" && gameData) {
                            if (wallet.publicKey?.toBase58() === winner?.winner && gameData.players.length !== 0) {
                                console.log("====>>>> confetti start");
                                setTimeout(() => {
                                    throwConfetti();
                                    console.log("====>>>> confetti end");

                                    setConfettiThrown(true);
                                    const sumBets = gameData.players.reduce(
                                        (sum: number, item: any) => sum + item.amountUsd,
                                        0
                                    );
                                    props.setIsWonWindow(true);
                                    props.setWonValue(sumBets / LAMPORTS_PER_SOL);
                                }, 1000);
                            }
                        }
                        setText('Waiting for Players');
                    }
                }
            }, animationSpeed);
        }

        return () => {
            if (t) {
                clearInterval(t);
            }
        };
    }, [target]);

    useEffect(() => {
        if (gameEnded === undefined) return;
        if (setClearGame) setClearGame();
        if (!gameEnded) {
            console.log("====>>>> game start");
            props.setIsWonWindow(false);
            setConfettiThrown(false);
        } else {
            console.log("====>>>> game end");
        }
    }, [gameEnded]);

    useEffect(() => {
        if (!gameEnded || !gameData?.players) return;
        if (gameData.players.length === 1) {
            warningAlert("No another player for 4 mins. Refunding..");
        }
    }, [gameEnded, gameData?.players]);

    return (
        <div className='flex flex-col items-center justify-center relative'>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{ className: 'chartContainer' }} />
            <div className='absolute bottom-4/6 text-center'>
                <div className='text-[#F7B831] text-5xl font-bold'>{timeRemaining}</div>
                <div className='text-[#8B8A8D]'>{text}</div>
            </div>
        </div>
    );
};

export default PieChart;
