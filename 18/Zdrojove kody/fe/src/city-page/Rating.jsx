import RateReviewIcon from "@mui/icons-material/RateReview";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { reportIcons } from "./reports";
import Button from "@mui/material/Button";
import { generateColor } from "../TablkaPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function RatingCircle({ number, size, fontSize = 1 }) {
  return (
    <div
      style={{
        border: "4px solid " + generateColor(number ?? 0),
        width: size + "px",
        aspectRatio: "1/1",
        borderRadius: "50%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: fontSize + "rem",
        fontWeight: "bold",
      }}
    >
      {number || 0}
    </div>
  );
}

function RatingSection({ name, children, fontSize = 1 }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        fontSize: fontSize + "rem",
        minWidth: "120px",
        maxWidth: "120px",
      }}
    >
      <div style={{ display: "flex", alignItems: "end", height: "30px" }}>
        <h2
          style={{
            margin: 0,
            textAlign: "center",
          }}
        >
          {name}
        </h2>
      </div>
      {children}
    </div>
  );
}

function VotingRow({ name, insertedData, setInsertedData }) {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {Object.keys(reportIcons).map((key) => (
        <img
          style={{
            width: "30px",
            aspectRatio: "1/1",
            cursor: "pointer",
            position: "relative",
          }}
          className={
            insertedData[name] === key
              ? "emojiMarkLayerActive"
              : "emojiMarkLayer"
          }
          src={reportIcons[key]}
          alt=""
          key={key}
          onClick={() => {
            setInsertedData((state) => ({
              ...state,
              [name]: key,
            }));
          }}
        />
      ))}
    </div>
  );
}

export default function CityPageRating({ data }) {
  const round = (number) => Math.round(number * 100);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [insertedData, setInsertedData] = useState({});

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton onClick={handleOpen}>
          <RateReviewIcon />
        </IconButton>
      </div>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {/* <RatingSection>
        <RatingCircle
          number={round(data?.score?.total?.value)}
          size={100}
          fontSize={2}
        />
      </RatingSection> */}
        <RatingSection name="Zdravotnictví" fontSize={0.7}>
          <RatingCircle number={round(data?.score?.medical?.value)} size={50} />
        </RatingSection>
        <RatingSection name="Vzdělávání" fontSize={0.7}>
          <RatingCircle
            number={round(data?.score?.education?.value)}
            size={50}
          />
        </RatingSection>
        <RatingSection name="Bydlení" fontSize={0.7}>
          <RatingCircle number={round(data?.score?.housing?.value)} size={50} />
        </RatingSection>
        <RatingSection name="Ekonomika" fontSize={0.7}>
          <RatingCircle number={round(data?.score?.income?.value)} size={50} />
        </RatingSection>
        <RatingSection name="Příroda" fontSize={0.7}>
          <RatingCircle number={round(data?.score?.nature?.value)} size={50} />
        </RatingSection>
        <RatingSection name="Populace" fontSize={0.7}>
          <RatingCircle
            number={round(data?.score?.population?.value)}
            size={50}
          />
        </RatingSection>
        <RatingSection name="Zaměstnání" fontSize={0.7}>
          <RatingCircle number={round(data?.score?.work?.value)} size={50} />
        </RatingSection>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Hodnocení kategorií</h2>
            <h3>Vzdělávání</h3>
            <VotingRow
              name="education"
              insertedData={insertedData}
              setInsertedData={setInsertedData}
            />
            <h3>Bydlení</h3>
            <VotingRow
              name="living"
              insertedData={insertedData}
              setInsertedData={setInsertedData}
            />
            <h3>Ekonomika</h3>
            <VotingRow
              name="economy"
              insertedData={insertedData}
              setInsertedData={setInsertedData}
            />
            <h3>Příroda</h3>
            <VotingRow
              name="nature"
              insertedData={insertedData}
              setInsertedData={setInsertedData}
            />
            <h3>Pupulace</h3>
            <VotingRow
              name="population"
              insertedData={insertedData}
              setInsertedData={setInsertedData}
            />
            <h3>Zaměstnání</h3>
            <VotingRow
              name="jobs"
              insertedData={insertedData}
              setInsertedData={setInsertedData}
            />
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() => handleClose()}
            >
              Odeslat
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
