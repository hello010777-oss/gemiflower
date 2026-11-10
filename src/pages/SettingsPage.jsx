import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Pencil, Play, RotateCcw, X } from "lucide-react";
import { Header } from "../components/Header";
import { useMissions } from "../MissionContext";
import { useToast } from "../toast";

function EditDialog({ mission, onClose, onSave }) {
  const { toast } = useToast();
  const [emoji, setEmoji] = useState(mission.emoji);
  const [flowerName, setFlowerName] = useState(mission.flowerName);
  const [pose, setPose] = useState(mission.pose);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!emoji.trim()) nextErrors.emoji = "이모티콘을 꼭 입력해주세요.";
    if (!flowerName.trim()) nextErrors.flowerName = "꽃 이름을 꼭 적어주세요!";
    if (!pose.trim()) nextErrors.pose = "포즈 설명을 꼭 적어주세요!";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const saved = {
      ...mission,
      emoji: emoji.trim(),
      flowerName: flowerName.trim(),
      pose: pose.trim(),
    };
    onSave(saved);
    toast({
      title: "저장 완료! 👍",
      description: `"${saved.flowerName}" 미션이 바뀌었어요!`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-title"
        className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-[425px] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 id="edit-title" className="font-headline text-2xl font-semibold leading-none tracking-tight">
            미션 수정하기 ✏️
          </h2>
          <p className="text-sm text-muted-foreground">포즈를 직접 바꿀 수 있어요!</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="flex items-start gap-4">
            <label className="space-y-2">
              <span className="block text-sm font-bold">이모티콘</span>
              <input
                value={emoji}
                onChange={(event) => setEmoji(event.target.value)}
                placeholder="🌸"
                className="h-10 w-20 rounded-md border border-input bg-background px-3 text-center text-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {errors.emoji && <p className="text-sm font-medium text-destructive">{errors.emoji}</p>}
            </label>
            <label className="flex-1 space-y-2">
              <span className="block text-sm font-bold">꽃 이름</span>
              <input
                value={flowerName}
                onChange={(event) => setFlowerName(event.target.value)}
                placeholder="예: 장미"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
              />
              {errors.flowerName && (
                <p className="text-sm font-medium text-destructive">{errors.flowerName}</p>
              )}
            </label>
          </div>
          <label className="block space-y-2">
            <span className="block text-sm font-bold">포즈 설명</span>
            <textarea
              value={pose}
              onChange={(event) => setPose(event.target.value)}
              placeholder="우리만의 재미있는 포즈를 만들어봐요!"
              rows={4}
              className="min-h-[80px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            {errors.pose && <p className="text-sm font-medium text-destructive">{errors.pose}</p>}
          </label>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground hover:bg-accent/90"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { missions, toggleMissionSelection, updateMission, resetMissions } = useMissions();
  const { toast } = useToast();
  const [editing, setEditing] = useState(null);
  const selectedCount = missions.filter((mission) => mission.selected).length;

  const reset = () => {
    if (!window.confirm("정말로 모든 미션을 처음으로 되돌릴까요? 🧐")) return;
    resetMissions();
    toast({
      title: "미션 초기화 완료! ✨",
      description: "모든 미션이 원래 상태로 돌아왔어요.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-headline text-5xl font-bold text-primary-foreground">설정 ⚙️</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                미션을 선택하고, 포즈를 수정하며 우리만의 게임을 만들어요!
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              전체 초기화
            </button>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <ul className="divide-y divide-border">
              {missions.map((mission) => (
                <li
                  key={mission.id}
                  className="flex items-center p-4 transition-colors hover:bg-secondary/50"
                >
                  <label className="flex flex-1 cursor-pointer items-center">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-primary text-primary-foreground ${
                        mission.selected ? "bg-primary" : "bg-transparent"
                      }`}
                    >
                      {mission.selected && <Check className="h-4 w-4" strokeWidth={3} />}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={mission.selected}
                      aria-label={`Select mission ${mission.flowerName}`}
                      onChange={(event) => toggleMissionSelection(mission.id, event.target.checked)}
                    />
                    <span className="ml-4">
                      <p className="font-headline text-lg font-semibold text-primary-foreground">
                        {mission.emoji} {mission.flowerName}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{mission.pose}</p>
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setEditing(mission)}
                    className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                    aria-label="미션 수정하기"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t bg-background/80 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <p className="text-md font-medium text-muted-foreground">
            <span className="text-lg font-bold text-primary">{selectedCount}</span>
            개의 미션이 우리를 기다려요!
          </p>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 font-bold text-accent-foreground hover:bg-accent/90"
          >
            <Play className="mr-2 h-5 w-5" />
            게임 시작!
          </Link>
        </div>
      </footer>

      {editing && (
        <EditDialog
          mission={editing}
          onClose={() => setEditing(null)}
          onSave={updateMission}
        />
      )}
    </div>
  );
}
