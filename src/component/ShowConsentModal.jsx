import React, { useEffect, useMemo, useRef, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import consentPdfUrl from "./VIDEO AND INTERVIEW CONSENT AND RELEASE FORM.pdf";
import styles from "./JumpIn.module.css";

const deriveInitials = (name) => {
  const parts = name
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() || "");
  return parts.join("" ).slice(0, 3);
};

const ShowConsentModal = ({ onSubmit, onClose, fullName: propFullName = "", onFullNameChange }) => {
  const [fullName, setFullName] = useState(propFullName);
  const [initials, setInitials] = useState("");
  const [isStamping, setIsStamping] = useState(false);
  const [stampError, setStampError] = useState("");
  const lastDerivedInitialsRef = useRef("");

  const fallbackText = useMemo(
    () => `I, _________ (initials of "Recorded Party"), hereby authorize <b>NRI stories®</b> the right and permission to copyright and/or publish, reproduce or otherwise use my name, voice, and likeness in video, photographs, written materials, and audio-visual recordings. I acknowledge and understand these materials about or of me may be used for both commercial and/or non-commercial purposes.

I understand that my image may be edited, copied, exhibited, published and/or distributed. I also understand this material may be used individually or in conjunction with other media in any medium, including without limitation to print publications, digital publications, and/or public broadcast for any lawful purpose. There is no time limit on the validity of this release nor are there any geographic limitations on where these materials may be distributed.

I hereby acknowledge and grant <b>NRI stories®</b> and its employees, agents, licensees, successors, and third-party organizations all ownership rights and irrevocable right and permission to use, copyright, publish, sell, distribute, and/or promote the recorded video, photo, interview, and/or audio.

I understand that my participation is voluntary and that I may, at any time, discontinue my involvement before signing this document. If I choose to discontinue participation, I will notify the principal parties by providing written notice.

I understand that <b>NRI stories®</b> can see no risk presently, and that I take full responsibility for my involvement in this project and the risks that it may entail (be they legal, physical, or mental) and release <b>NRI stories®</b> from any claims, demands, losses, damages, suits, and liabilities of any kind whatsoever in connection with the foregoing.

I hereby certify that I am over eighteen years of age and am competent to contract in my own name insofar as the above is concerned. If I am under eighteen years of age, my parents or legal guardians have read this document and have given their consent by signing below.

By signing this form, I acknowledge that I have completely read and fully understand the above consent and release and agree to be bound thereby. I hereby release any and all claims against any person or organization utilizing this material for marketing, educational, promotional, and/or any other lawful purpose whatsoever.`,
    []
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setFullName(propFullName || "");
  }, [propFullName]);

  useEffect(() => {
    const derived = fullName.trim() ? deriveInitials(fullName) : "";
    const shouldApply = !initials || initials === lastDerivedInitialsRef.current;
    if (shouldApply) {
      setInitials(derived);
      lastDerivedInitialsRef.current = derived;
    }
  }, [fullName]);

  const bufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const stampAndDownload = async () => {
    const trimmedInitials = initials.trim();
    const trimmedName = fullName.trim();
    if (!trimmedInitials || !trimmedName) return;

    try {
      setIsStamping(true);
      setStampError("");

      const existingPdfBytes = await fetch(consentPdfUrl, { mode: "cors" }).then((r) => r.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Use built-in italic font for a stylized signature without external fetches
      const scriptFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const page = pages[pages.length - 1];

      // Stamp initials on first page where the text reads "I, _________"
      // Adjust topX/topY if the underline shifts in a future template
  const topX = 105;
      const topY = firstPage.getHeight() - 120;
      firstPage.drawText(trimmedInitials, {
        x: topX,
        y: topY,
        size: 12,
        color: rgb(0, 0, 0),
      });

  const x = 80;
  let y = 126;
      const nameLabel = "Participant Full Name:";
      page.drawText(nameLabel, { x, y, size: 12, color: rgb(0, 0, 0) });
      const nameLabelWidth = nameLabel.length * 6.2;
      const nameValueX = x + nameLabelWidth + 6; // small gap after colon
      page.drawText(trimmedName, { x: nameValueX, y, size: 12, color: rgb(0, 0, 0) });
      page.drawLine({
        start: { x: nameValueX, y: y - 2 },
        end: { x: nameValueX + 200, y: y - 2 },
        thickness: 0.7,
        color: rgb(0, 0, 0),
      });
      y -= 22;

      // Stylized signature line
      const sigLabel = "Signature:";
      page.drawText(sigLabel, { x, y, size: 12, color: rgb(0, 0, 0) });
      const sigLabelWidth = sigLabel.length * 6.2;
      const sigX = x + sigLabelWidth + 6;
      page.drawText(trimmedName, {
        x: sigX,
        y: y - 2,
        size: 19,
        color: rgb(0, 0, 0),
        font: scriptFont,
      });
      page.drawLine({
        start: { x: sigX, y: y - 6 },
  end: { x: sigX + 220, y: y - 6 },
        thickness: 0.7,
        color: rgb(0, 0, 0),
      });
      y -= 26;

      const now = new Date();
      const utcStamp = now.toISOString().replace("T", " ").replace("Z", " UTC");
      const localStamp = now.toLocaleString(undefined, { timeZoneName: "short" });

      const initLabel = "Initials:";
      page.drawText(initLabel, { x, y, size: 12, color: rgb(0, 0, 0) });
      const initLabelWidth = initLabel.length * 6.2;
      const initX = x + initLabelWidth + 6;
      page.drawText(trimmedInitials, { x: initX, y, size: 12, color: rgb(0, 0, 0) });
      page.drawLine({
        start: { x: initX, y: y - 2 },
        end: { x: initX + 120, y: y - 2 },
        thickness: 0.7,
        color: rgb(0, 0, 0),
      });
      y -= 20;
  const timeFontSize = 10;
  page.drawText(`Signed at (UTC): ${utcStamp}`, { x, y, size: timeFontSize, color: rgb(0, 0, 0) });
  y -= 14;
  page.drawText(`Signed at (Local): ${localStamp}`, { x, y, size: timeFontSize, color: rgb(0, 0, 0) });

      const signedBytes = await pdfDoc.save();
      const base64 = bufferToBase64(signedBytes);
      return { signedBytes, base64 };
    } catch (err) {
      console.error("Failed to stamp PDF", err);
      setStampError("Unable to generate signed PDF. Please try again.");
      return null;
    } finally {
      setIsStamping(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedInitials = initials.trim();
    const trimmedName = fullName.trim();
    if (!trimmedInitials || !trimmedName) return;
    const stamped = await stampAndDownload();
    if (!stamped) return;
    onSubmit?.({ initials: trimmedInitials, fullName: trimmedName, pdfBase64: stamped.base64 });
  };

  return (
    <div
      className="modal"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundColor: "#b8d4e8",
        borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(10,26,79,0.18)",
        padding: "clamp(16px, 3vw, 20px)",
  maxWidth: "760px",
  width: "min(calc(100vw - 48px), 760px)",
  maxHeight: "calc(100vh - 180px)",
  overflow: "auto",
  margin: "clamp(96px, 16vh, 160px) auto 24px",
        color: "#111",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "10px",
            background: "#f7f9fc",
            padding: "6px",
            maxHeight: "calc(100vh - 230px)",
            minHeight: "320px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "8px",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <a
              href={consentPdfUrl}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a237e" }}
            >
              View PDF
            </a>
          </div>
          <div
            style={{
              fontSize: "0.98rem",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              background: "transparent",
              padding: "4px 6px",
            }}
          >
            {fallbackText
              .split(/\n\s*\n/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((para, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ width: "100%", display: "grid", gap: "12px" }}>
        <label
          style={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span>Full Name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              onFullNameChange?.(e.target.value);
            }}
            required
            style={{
              borderRadius: "6px",
              border: "1px solid #3949ab",
              padding: "10px 12px",
              fontSize: "1rem",
              color: "#111",
              outline: "none",
              background: "#fff",
              maxWidth: "220px",
              minWidth: "160px",
            }}
          />
        </label>

        <label
          style={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span>Electronic Signature (Initials)</span>
          <input
            type="text"
            value={initials}
            maxLength={6}
            onChange={(e) => setInitials(e.target.value.toUpperCase())}
            required
            style={{
              borderRadius: "6px",
              border: "1px solid #3949ab",
              padding: "10px 12px",
              fontSize: "1rem",
              color: "#111",
              outline: "none",
              background: "#fff",
              maxWidth: "140px",
            }}
          />
        </label>

        <button
          type="submit"
          disabled={!initials.trim() || !fullName.trim() || isStamping}
          className={styles["submit-btn"]}
          style={{
            marginTop: "4px",
          }}
        >
          {isStamping ? "Generating…" : "Sign"}
        </button>
        {stampError && (
          <div style={{ color: "#b71c1c", fontWeight: 600, fontSize: "0.9rem" }}>{stampError}</div>
        )}
      </form>
    </div>
  );
};

export default ShowConsentModal;
