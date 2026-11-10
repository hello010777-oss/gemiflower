import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Flower2, RefreshCw, Settings, Sparkles, Trophy } from "lucide-react";
import { Header } from "../components/Header";
import { CameraView } from "../components/CameraView";
import { useMissions } from "../MissionContext";

function playDing() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  [880, 659].forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + index * 0.22;
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.6);
  });
  window.setTimeout(() => ctx.close(), 1600);
}

function FlowerBurst() {
  const flowers = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => {
        const angle = (index / 20) * 2 * Math.PI;
        const distance = 30 * Math.random() + 20;
        return {
          x: distance * Math.cos(angle),
          y: distance * Math.sin(angle),
          delay: 0.5 * Math.random(),
          color: `hsl(${360 * Math.random()}, 90%, 70%)`,
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
      {flowers.map((flower, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(${flower.x}vw, ${flower.y}vh)`,
          }}
        >
          <Flower2
            strokeWidth={1.5}
            className="h-8 w-8 animate-flower-burst md:h-12 md:w-12"
            style={{ color: flower.color, animationDelay: `${flower.delay}s` }}
          />
        </div>
      ))}
    </div>
  );
}

function SuccessBanner() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
      <div className="animate-in duration-500">
        <div className="rounded-lg border border-accent-foreground/20 bg-accent/90 text-accent-foreground shadow-2xl backdrop-blur-sm">
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-4">
              <Flower2 className="h-12 w-12 animate-pulse text-primary" />
              <h2 className="font-headline text-5xl font-bold">미션 성공!</h2>
              <Sparkles className="h-12 w-12 animate-pulse text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompletionScreen({ onRestart }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <Trophy className="mb-4 h-28 w-28 animate-bounce-slow text-yellow-400" />
      <h1 className="mb-4 font-headline text-6xl font-bold text-primary-foreground">정말 대단해! 🎉</h1>
      <p className="mb-10 text-2xl text-muted-foreground">
        모든 꽃 미션을 완료했어요! 넌 최고의 꽃 탐험가야! 🥳
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-lg font-bold text-accent-foreground hover:bg-accent/90"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          다시 할래요
        </button>
        <Link
          to="/settings"
          className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-8 text-lg font-bold hover:bg-accent hover:text-accent-foreground"
        >
          새로운 미션 선택!
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-4 text-center">
        <span className="mb-4 animate-bounce-slow text-6xl">🌸</span>
        <h1 className="mb-4 font-headline text-5xl font-bold text-primary-foreground">봄 꽃 미션 챌린지!</h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          미션을 선택하고 신나는 꽃 포즈 모험을 시작해 보세요! 🌼
        </p>
        <Link
          to="/settings"
          className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90"
        >
          <Settings className="mr-2 h-5 w-5" />
          설정으로 가기
        </Link>
      </div>
    </div>
  );
}

export function GamePage() {
  const { missions } = useMissions();
  const playlist = missions.filter((mission) => mission.selected);
  const [index, setIndex] = useState(0);
  const [bursting, setBursting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [missions]);

  if (playlist.length === 0) return <EmptyState />;

  const mission = playlist[index];
  if (!mission) {
    return <CompletionScreen onRestart={() => setIndex(0)} />;
  }

  const onSuccess = () => {
    playDing();
    setBursting(true);
    setSucceeded(true);
    window.setTimeout(() => {
      setBursting(false);
      setSucceeded(false);
      setIndex((current) => current + 1);
    }, 1500);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0 h-full w-full">
        <CameraView />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-between">
        <div>
          <Header variant="transparent" />
          <div className="flex justify-center p-4">
            <div className="inline-block rounded-2xl border border-accent-foreground/10 bg-accent/90 px-6 py-4 text-center text-accent-foreground shadow-lg backdrop-blur-sm">
              <div className="mb-2 font-semibold text-accent-foreground/70">
                미션 {index + 1} / {playlist.length}
              </div>
              <h2 className="mb-3 font-headline text-4xl font-bold md:text-5xl">
                {mission.emoji} {mission.flowerName}
              </h2>
              <p className="whitespace-nowrap font-body text-lg md:text-xl">{mission.pose}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4 md:p-8">
          <button
            type="button"
            onClick={onSuccess}
            disabled={succeeded}
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-accent py-5 text-2xl font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90 disabled:pointer-events-none"
          >
            <Sparkles className="mr-3 h-7 w-7" />
            성공!
          </button>
        </div>
      </div>
      {succeeded && <SuccessBanner />}
      {bursting && <FlowerBurst />}
    </div>
  );
}
