import socialBanner from "../assets/social-banner.svg";

export default function SocialBanner({ position = "top-right", size = "md", links }) {
  const widths = {
    sm: "min(24vw, 240px)",
    md: "min(28vw, 320px)",
    lg: "min(36vw, 420px)",
  };
  const width = widths[size] || widths.md;
  const hrefs = {
    facebook: links?.facebook || "https://facebook.com/",
    instagram: links?.instagram || "https://instagram.com/",
    x: links?.x || "https://x.com/",
    youtube: links?.youtube || "https://youtube.com/",
  };

  // Container positioned at top corner; dropdown appears on hover
  const containerStyle = {
    position: "fixed",
    top: "12px",
    left: position === "top-center" ? "50%" : position === "top-left" ? "12px" : "auto",
    right: position === "top-right" ? "12px" : "auto",
    transform: position === "top-center" ? "translateX(-50%)" : "none",
    zIndex: 20,
    width,
    pointerEvents: "auto",
  };

  return (
    <div
      className="social-banner-container"
      style={containerStyle}
      role="navigation"
      aria-label="Social media links"
    >
      <div className="social-toggle">
        <img
          src={socialBanner}
          alt="Social media icons strip"
          className="social-banner"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
      <ul className="social-menu" role="menu" aria-label="Social links menu">
        <li role="none">
          <a role="menuitem" href={hrefs.facebook} target="_blank" rel="noopener noreferrer">
            <span className="sm-icon fb" aria-hidden="true" />
            Facebook
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href={hrefs.instagram} target="_blank" rel="noopener noreferrer">
            <span className="sm-icon ig" aria-hidden="true" />
            Instagram
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href={hrefs.x} target="_blank" rel="noopener noreferrer">
            <span className="sm-icon x" aria-hidden="true" />
            X
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href={hrefs.youtube} target="_blank" rel="noopener noreferrer">
            <span className="sm-icon yt" aria-hidden="true" />
            YouTube
          </a>
        </li>
      </ul>
    </div>
  );
}
