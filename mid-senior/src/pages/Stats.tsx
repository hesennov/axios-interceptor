// components/Stats.tsx
import CountUp from "react-countup";
import useObserver from "../hooks/useObserver";

const Stats = () => {
  const [isVisible, container] = useObserver({ threshold: 0.3 });

  return (
    <section style={{ marginTop: "120vh" }}>
      <div
        ref={container}
        style={{ padding: "80px", background: "#111", color: "#fff" }}
      >
        <h2>Statistics</h2>

        <p style={{ fontSize: "48px", color: "lime" }}>
          {isVisible && <CountUp end={777} duration={3} />}
        </p>
      </div>
    </section>
  );
};

export default Stats;
