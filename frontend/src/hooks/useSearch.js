// frontend/src/hooks/useSearch.js
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = useCallback(() => {
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }, [query, navigate]);

  const onKeyDown = useCallback(
    (e) => { if (e.key === "Enter") submit(); },
    [submit]
  );

  return { query, setQuery, submit, onKeyDown };
}
