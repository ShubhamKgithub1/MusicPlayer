import { useEffect, useRef, useState } from "react";
import Portal from "./Portal";
import { MoreVertical } from "lucide-react";

const KebabMenu = ({ actions, user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const visibleActions = user ? actions : [actions[0]];

  const toggleMenu = (e) => {
    e.stopPropagation();

    const buttonRect = menuButtonRef.current.getBoundingClientRect();
    const menuWidth = 150;
    const padding = 8;

    let left = buttonRect.right - menuWidth;
    let top = buttonRect.bottom + 5;

    if (left + menuWidth > window.innerWidth) {
      left = buttonRect.right - menuWidth;
    }
    if (left < padding) {
      left = padding;
    }

    if (top + 150 > window.innerHeight) {
      top = buttonRect.top - 110;
    }

    setMenuPosition({
      top: top + window.scrollY,
      left: left + window.scrollX,
    });

    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Escape") setShowMenu(false);
    };

    const close = () => setShowMenu(false);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);
    window.addEventListener("scroll", close, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("scroll", close, true);
    };
  }, [showMenu]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-1">
        <button
          className={`p-2 rounded-full hover:bg-white/25 transition-all duration-200`}
          onClick={toggleMenu}
          ref={menuButtonRef}
        >
          <MoreVertical size={22} />
        </button>
      </div>
      {showMenu && (
        <Portal>
          <div
            ref={dropdownRef}
            className={`fixed w-[150px] flex flex-col bg-white dark:bg-slate-950 dark:text-white text-slate-800 rounded-md overflow-hidden shadow-xl transition-all duration-300 animate-qick-fade-in`}
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              zIndex: 9999,
            }}
          >
            {visibleActions.map((action, index) => (
              <button
                key={index}
                className={`flex items-center p-1.5 gap-1 transition-all duration-200 hover:bg-slate-300 dark:hover:bg-slate-500 focus:bg-slate-400 ${
                  action.className || ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                  setShowMenu(false);
                }}
              >
                <action.icon size={18} />
                <span className="text-sm truncate">{action.label}</span>
              </button>
            ))}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default KebabMenu;
