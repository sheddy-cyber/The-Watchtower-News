// frontend/src/components/ui/SmartImage.jsx
import { useState, useRef, useEffect } from "react";

/**
 * <img> that fades in once loaded and swaps to a neutral editorial
 * placeholder if the remote image fails, instead of showing a broken icon.
 */
export default function SmartImage({ src, alt = "", className = "", style, loading = "lazy", ...rest }) {
  const [state, setState] = useState("loading"); // loading | loaded | error
  const ref = useRef(null);

  // Reset when the source changes; catch images that finished loading from
  // cache before React attached the onLoad handler.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
    else setState("loading");
  }, [src]);

  if (!src || state === "error") {
    return (
      <div className={`img-fallback ${className}`} style={style} role="img" aria-label={alt}>
        <span>The Watchtower</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`smart-img${state === "loaded" ? " is-loaded" : ""} ${className}`}
      style={style}
      loading={loading}
      decoding="async"
      onLoad={() => setState("loaded")}
      onError={() => setState("error")}
      {...rest}
    />
  );
}
