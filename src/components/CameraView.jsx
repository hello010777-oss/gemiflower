import { useEffect, useRef, useState } from "react";
import { VideoOff } from "lucide-react";

export function CameraView() {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream = null;
    let cancelled = false;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera: ", err);
        if (!cancelled) {
          setError("Could not access the camera. Please check permissions and try again.");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-4 text-center">
        <VideoOff className="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="font-semibold text-destructive">Camera Error</h3>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full scale-x-[-1] transform object-cover"
      />
    </div>
  );
}
