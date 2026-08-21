export default function SettingsModal({ children, onClose }) {
  return (
    <div className="settingsModal">
      <div className="settingsModalContent">
        <button
          className="settingsModalCloseButton"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};