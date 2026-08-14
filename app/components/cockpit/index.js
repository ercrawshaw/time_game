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
          <div className="cockpitStatusLights">
            <span className="cockpitLight red" />
            <span className="cockpitLight yellow" />
            <span className="cockpitLight green" />
          </div>

          <span className="cockpitStatusText">
            {status}
          </span>
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