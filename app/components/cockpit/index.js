import "./index.css";

export default function Cockpit({
  children,
  status = "SYSTEM ONLINE",
}) {
  return (
    <main className="cockpitPage">
      <div className="cockpitStars" />

      <section className="cockpit">
        <div className="cockpitStatusBar">
          <a href="/">
            <img
              src="/return-icon.png"
              alt="Home icon"
              className="icon"
            />
          </a>
          
          <span className="cockpitStatusText">
            {status}
          </span>

          <a href="/">
            <img
              src="/settings-icon.png"
              alt="Home icon"
              className="icon"
            />
          </a>

          
        </div>

        <div className="cockpitScreen">
          {children}
        </div>

        <div className="cockpitControls">
          <div className="cockpitControlPanel">
            <span>POWER</span>
            <div className="cockpitSwitch" />
          </div>

          <div className="cockpitRadar">
            <div className="cockpitRadarLine" />
            <div className="cockpitRadarDot" />
          </div>

          <div className="cockpitControlPanel">
            <span>TIME DRIVE</span>
            <div className="cockpitSwitch" />
          </div>
        </div>

        <div className="cockpitConsoleLights">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}