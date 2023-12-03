import Tabulka from "./TablkaPage";
import "./App.css";
import prague from "./prague.jpeg";

function App() {
  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "400px",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 80%, rgba(255,255,255,1) 100%), url(" +
            prague +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "top",
          padding: "0 0 0 10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        <span>Index Kvality Života</span>
        <span style={{ fontSize: "2rem" }}>Všech Českých Měst</span>
      </div>
      <div style={{ padding: "20px" }}>
        <Tabulka />
      </div>
    </div>
  );
}

export default App;
