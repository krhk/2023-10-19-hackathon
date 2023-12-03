import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import dobry from "../icons/dobry.png";
import skoroDobry from "../icons/skorodobry.png";
import skoroSpatny from "../icons/skorospatny.png";
import spatny from "../icons/spatny.png";
import stredni from "../icons/stredni.png";

import "./city-page.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useReducer, useRef, useState } from "react";

export const reportIcons = {
  1: dobry,
  2: skoroDobry,
  3: stredni,
  4: skoroSpatny,
  5: spatny,
};

function Report({ mark, text, upVotes }) {
  const [votes, setVotes] = useState(upVotes);

  return (
    <div
      style={{
        backgroundColor: "#00000020",
        maxWidth: "100%",
        borderRadius: "20px",
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={reportIcons[mark]}
            alt=""
            style={{ width: "30px", height: "100%" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#00000040" }}>{votes}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <KeyboardArrowUpIcon
              className="voteArrow"
              onClick={() => setVotes(upVotes + 1)}
            />
            <KeyboardArrowDownIcon
              className="voteArrow"
              onClick={() => setVotes(upVotes - 1)}
            />
          </div>
        </div>
      </div>
      <div>{text}</div>
    </div>
  );
}

function NewReport({ data, setEnabledNew, refreshData }) {
  const [mark, setMark] = useState(null);
  const [text, setText] = useState("");

  const createNewReport = async () => {
    await axios
      .post("http://172.21.16.24:8080/hodnoceni/" + data?.id, {
        idMesta: data?.id,
        hodnota: mark,
        text: text,
        votes: 0,
      })
      .catch(() => {});
    await refreshData();
    setEnabledNew(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#00000020",
        maxWidth: "100%",
        borderRadius: "20px",
        padding: "10px 20px",
      }}
    >
      <div style={{ display: "flex", gap: "5px" }}>
        {Object.keys(reportIcons).map((key) => (
          <img
            style={{
              width: "30px",
              aspectRatio: "1/1",
              cursor: "pointer",
              position: "relative",
            }}
            className={mark === key ? "emojiMarkLayerActive" : "emojiMarkLayer"}
            src={reportIcons[key]}
            alt=""
            key={key}
            onClick={() => setMark(key)}
          />
        ))}
      </div>
      <textarea
        name="text"
        id="text"
        style={{
          width: "calc(100% - 10px)",
          resize: "vertical",
          margin: "10px 0",
          padding: "5px",
        }}
        rows="10"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={createNewReport}>
          Odeslat
        </Button>
      </div>
    </div>
  );
}

export default function CityPageReports({ data }) {
  const [enabledNew, setEnabledNew] = useState(false);
  const [reports, setReports] = useState([]);

  const refreshData = async () => {
    const response = await axios
      .get("http://172.21.16.24:8080/hodnoceni/" + data?.id)
      .catch(() => {});
    if (!response?.data) return;
    setReports(response.data);
  };

  const loaded = useRef();
  useEffect(() => {
    if (loaded.current === data?.id) return;
    loaded.current = data?.id;
    refreshData();
  }, [data?.id]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Reporty</h2>
        <IconButton
          onClick={() => setEnabledNew((state) => !state)}
          style={{
            cursor: "pointer",
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {enabledNew && (
          <NewReport
            data={data}
            setEnabledNew={setEnabledNew}
            refreshData={refreshData}
          />
        )}
        {reports.map((report, index) => (
          <Report
            key={index}
            mark={report?.hodnota}
            text={report?.text}
            upVotes={report?.votes}
          />
        ))}
      </div>
    </div>
  );
}
