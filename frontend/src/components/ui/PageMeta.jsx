// frontend/src/components/ui/PageMeta.jsx
import { Helmet } from "react-helmet-async";

const SITE = "The Watchtower";

/** Sets the browser tab title (and optional description) for a page. */
export default function PageMeta({ title, description }) {
  return (
    <Helmet>
      <title>{title ? `${title} | ${SITE}` : `${SITE} — Truth in Every Edition`}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
