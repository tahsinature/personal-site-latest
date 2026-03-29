import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Focus, Aperture, Gauge, SunDim, Crosshair, MapPin } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "@/components/MotionWrapper";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import ExifMetaDisplay from "@/components/ExifMetaDisplay";
import MarqueeText from "@/components/MarqueeText";
import { useImageExif } from "@/hooks/useImageExif";
import type { Photo, PhotoMeta } from "@/data/photography";

interface PhotoLightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoLightbox({ photos, index, onClose, onNext, onPrev }: PhotoLightboxProps) {
  return (
    <AnimatePresence>
      {index !== null && (
        <LightboxOverlay
          photos={photos}
          index={index}
          onClose={onClose}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </AnimatePresence>
  );
}

/** Helper that resets zoom on photo change and exposes resetTransform via ref */
function ZoomResetOnChange({ index, resetRef }: { index: number; resetRef: React.MutableRefObject<(() => void) | null> }) {
  const { resetTransform } = useControls();
  const prevIndex = useRef(index);

  // Expose reset function to parent
  resetRef.current = () => resetTransform(200);

  useEffect(() => {
    if (prevIndex.current !== index) {
      resetTransform(0); // instant reset
      prevIndex.current = index;
    }
  }, [index, resetTransform]);
  return null;
}

function LightboxOverlay({ photos, index, onClose, onNext, onPrev }: { photos: Photo[]; index: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  const photo = photos[index];
  const { meta, loading: exifLoading } = useImageExif(photo.src, photo.meta);
  const [showCaption, setShowCaption] = useState(true);
  const [showExifDetail, setShowExifDetail] = useState(false);
  const showExifDetailRef = useRef(showExifDetail);
  showExifDetailRef.current = showExifDetail;

  // Track whether the image is currently zoomed in
  const [isZoomed, setIsZoomed] = useState(false);
  const isZoomedRef = useRef(false);
  isZoomedRef.current = isZoomed;
  const zoomResetRef = useRef<(() => void) | null>(null);

  // Stable refs for callbacks
  const onCloseRef = useRef(onClose);
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);
  onCloseRef.current = onClose;
  onNextRef.current = onNext;
  onPrevRef.current = onPrev;

  // Track whether close was triggered by browser back button
  const closedByBackRef = useRef(false);

  // Close handler: if NOT triggered by back button, clean up history entry first
  const handleClose = useCallback(() => {
    if (!closedByBackRef.current && window.history.state?.lightbox) {
      // Remove our history entry before closing
      closedByBackRef.current = true;
      window.history.back();
    }
    onCloseRef.current();
  }, []);

  // Reset zoom state when navigating to a new photo
  useEffect(() => {
    setIsZoomed(false);
  }, [index]);

  // Swipe-to-navigate when not zoomed
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isZoomedRef.current || !touchStartRef.current || e.changedTouches.length !== 1) {
      touchStartRef.current = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    // Only count horizontal swipes (ignore vertical)
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) onNextRef.current();
      else onPrevRef.current();
    }
  }, []);

  // Keyboard + scroll lock + back button — mount only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showExifDetailRef.current) { setShowExifDetail(false); return; }
        if (isZoomedRef.current) { zoomResetRef.current?.(); return; }
        handleClose();
      }
      if (e.key === "ArrowRight") onNextRef.current();
      if (e.key === "ArrowLeft") onPrevRef.current();
    };

    const handlePopState = () => {
      closedByBackRef.current = true;
      onCloseRef.current();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.history.pushState({ lightbox: true }, "");
    window.addEventListener("popstate", handlePopState);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
      onClick={handleClose}
      role="dialog"
      aria-label="Photo lightbox"
    >
      {/* Close button */}
      <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer">
        <X size={24} />
      </button>

      {/* Nav arrows */}
      <button
        disabled={index === 0}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className={`hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 transition-colors z-10 bg-card/50 backdrop-blur-sm p-2 rounded border border-border ${
          index === 0 ? "opacity-30 cursor-not-allowed" : "text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer"
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        disabled={index === photos.length - 1}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className={`hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 transition-colors z-10 bg-card/50 backdrop-blur-sm p-2 rounded border border-border ${
          index === photos.length - 1 ? "opacity-30 cursor-not-allowed" : "text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer"
        }`}
      >
        <ChevronRight size={24} />
      </button>

      {/* Caption — top bar, single line, leaves room for close button */}
      <div className="shrink-0 h-10 flex items-center pl-4 md:pl-8 pr-14" onClick={(e) => e.stopPropagation()}>
        {photo.alt && (
          showCaption ? (
            <div className="flex-1 min-w-0 group cursor-pointer" onClick={() => setShowCaption(false)} title="Click to hide">
              <MarqueeText autoScroll delay={2} className="text-foreground/80 text-sm font-medium">
                <span className="px-1">{photo.alt}</span>
              </MarqueeText>
            </div>
          ) : (
            <button
              className="text-muted-foreground/30 hover:text-muted-foreground text-xs transition-colors cursor-pointer"
              onClick={() => setShowCaption(true)}
              title="Show caption"
            >
              Aa
            </button>
          )
        )}
      </div>

      {/* Image with zoom */}
      <div
        className="flex-1 min-h-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={5}
          centerOnInit
          doubleClick={{ mode: "zoomIn", step: 1.5 }}
          pinch={{ step: 5 }}
          wheel={{ step: 0.15, smoothStep: 0.004 }}
          panning={{ disabled: !isZoomed, velocityDisabled: false }}
          alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
          velocityAnimation={{ sensitivity: 1, animationTime: 200 }}
          onTransformed={(_ref, state) => {
            setIsZoomed(state.scale > 1.05);
          }}
        >
          <ZoomResetOnChange index={index} resetRef={zoomResetRef} />
          <TransformComponent
            wrapperClass="!w-full !h-full"
            contentClass="!w-full !h-full !flex !items-center !justify-center"
          >
            <motion.img
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={photo.src}
              alt={photo.alt}
              className="w-[92vw] md:w-[calc(100vw-120px)] h-full object-contain rounded select-none"
              draggable={false}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Bottom bar — EXIF fills width, counter at end */}
      <div className="shrink-0 h-10 flex items-center gap-4 pl-4 md:pl-8 pr-4 md:pr-8" onClick={(e) => e.stopPropagation()}>
        <div
          className="flex-1 min-w-0 group cursor-pointer"
          onClick={() => meta && setShowExifDetail(true)}
          title={meta ? "Click for details" : undefined}
        >
          <ExifMetaDisplay meta={meta} />
        </div>
        <p className="text-muted-foreground text-xs tabular-nums shrink-0">{index + 1} / {photos.length}</p>
      </div>

      {/* EXIF detail panel */}
      {!exifLoading && meta && (
        <AnimatePresence>
          {showExifDetail && (
            <ExifDetailPanel meta={meta} onClose={() => setShowExifDetail(false)} />
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

/* ── EXIF Detail Panel ── */

const exifFields: { key: keyof PhotoMeta; label: string; icon: typeof Camera; color: string }[] = [
  { key: "camera", label: "Camera", icon: Camera, color: "text-accent" },
  { key: "lens", label: "Lens", icon: Focus, color: "text-primary" },
  { key: "focalLength", label: "Focal Length", icon: Crosshair, color: "text-accent" },
  { key: "aperture", label: "Aperture", icon: Aperture, color: "text-accent" },
  { key: "shutterSpeed", label: "Shutter Speed", icon: Gauge, color: "text-primary" },
  { key: "iso", label: "ISO", icon: SunDim, color: "text-primary" },
  { key: "location", label: "Location", icon: MapPin, color: "text-warm" },
];

function ExifDetailPanel({ meta, onClose }: { meta: PhotoMeta; onClose: () => void }) {
  const present = exifFields.filter((f) => meta[f.key]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-20 flex items-center justify-center"
      onClick={(e) => { e.stopPropagation(); onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-card/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl w-[320px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Camera size={14} className="text-accent" />
            <span className="text-foreground text-xs font-semibold uppercase tracking-wider">Shot Details</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Fields */}
        <div className="px-5 py-3 space-y-0.5">
          {present.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.key} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
                <div className={`${f.color} shrink-0 w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center`}>
                  <Icon size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider leading-none mb-0.5">{f.label}</p>
                  <p className="text-foreground text-sm font-medium truncate">{meta[f.key]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
