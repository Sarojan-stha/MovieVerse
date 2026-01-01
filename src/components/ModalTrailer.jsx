import useMovieStore from "../zustandStore/useMovieStore";
import { useEffect } from "react";

const ModalTrailer = ({ showModal, close }) => {
  const { videoKey } = useMovieStore();
  const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50
                 flex items-center justify-center animate-fadeIn"
      onClick={close}
    >
      {/* Modal box */}
      <div
        className="relative w-[500px] aspect-video bg-black rounded-xl overflow-hidden animate-fadeIn"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ModalTrailer;
