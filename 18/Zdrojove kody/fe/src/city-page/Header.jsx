import { generateColor } from "../TablkaPage";

export const CityPageHeader = ({ data }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "250px",
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,1) 100%), url('" +
            (data?.vlajka
              ? data?.vlajka
              : "https://rekos.psp.cz/data/images/34809/200x200/573868.gif") +
            "')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          position: "relative",
          top: "-100px",
          margin: "0 20px",
          gap: "20px",
        }}
      >
        <img
          src={
            data?.znak
              ? data?.znak
              : "https://rekos.psp.cz/data/images/44064/800x500/nachod_znak.jpg"
          }
          alt=""
          style={{ width: "150px", height: "100%" }}
        />
        <h1>{data?.name}</h1>
        <div style={{ flex: 1 }}></div>
        <div
          style={{
            border:
              "4px solid " +
              generateColor(Math.round((data?.score?.total?.value || 0) * 100)),
            width: "100px",
            aspectRatio: "1/1",
            borderRadius: "50%",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          {Math.round((data?.score?.total?.value || 0) * 100)}
        </div>
      </div>
    </>
  );
};
