import { useEffect, useRef, useState } from "react";
import Portal from "./Portal";
import { MoreVertical } from "lucide-react";

const KebabMenu = ({ actions, user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [useBottomMenu, setUseBottomMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const menuButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const visibleActions = user ? actions : [actions[0]];

  const toggleMenu = (e) => {
    e.stopPropagation();

    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      setUseBottomMenu(true);
      setShowMenu(true);
      return;
    }
    const buttonRect = menuButtonRef.current.getBoundingClientRect();
    const menuWidth = 150;
    const menuHeight = dropdownRef.current?.offsetHeight || 110;
    const padding = 8;

    let left = buttonRect.right - menuWidth;
    let top = buttonRect.bottom + 5;

    if (left < padding) {
      left = padding;
    }

    if (top + menuHeight > window.innerHeight) {
      top = buttonRect.top - menuHeight;
    }

    setMenuPosition({
      top: top + window.scrollY,
      left: left + window.scrollX,
    });

    setShowMenu(true);
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
          <MoreVertical size={20} />
        </button>
      </div>
      {showMenu && (
        <Portal>
          <div
            className={`fixed z-[999] flex items-end ${useBottomMenu ?"inset-0 bg-black/40 p-[0_4px_1px_4px]":"w-[150px]"}`}
            style={
              useBottomMenu
                ? {}
                : { top: menuPosition.top, left: menuPosition.left }
            }
          >
            <div ref={dropdownRef} className={`flex flex-col w-full bg-white dark:bg-slate-800 dark:text-white text-slate-800 overflow-hidden shadow-xl transition-all duration-300 ${useBottomMenu ?"rounded-t-md animate-slide-up":"rounded-md animate-quick-fade-in"}`}>
              {visibleActions.map((action, index) => (
              <button
                key={index}
                className={`flex items-center font-medium p-2 gap-1 transition-all duration-200 hover:bg-slate-300 dark:hover:bg-slate-500 focus:bg-slate-400 ${
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
            
          </div>
        </Portal>
      )}
    </div>
  );
};

export default KebabMenu;
