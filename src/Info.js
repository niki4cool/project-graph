const Info = ({ countNodes, countLinks }) => {
  return (
    <div
      className="flex items-center justify-center bg-white p-2 bg-white shadow-xl rounded-lg overflow-hidden"
      style={{
        position: "absolute",
        top: "24px",
        right: "32px",
        zIndex: 2
      }}
    >
      <span>Точки: {countNodes}</span>, <span>Связи: {countLinks}</span>
    </div>
  );
};

export default Info;
