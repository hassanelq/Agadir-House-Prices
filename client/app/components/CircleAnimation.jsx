const CircleAnimation = () => {
  const cradleStyles = {
    "--uib-size": "50px",
    "--uib-speed": "1.2s",
    "--uib-color": "#e5e7eb",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "var(--uib-size)",
    height: "var(--uib-size)",
  };

  const dotStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "25%",
    transformOrigin: "center top",
  };

  const dotAfterStyles = {
    content: '""',
    display: "block",
    width: "100%",
    height: "25%",
    borderRadius: "50%",
    backgroundColor: "var(--uib-color)",
  };

  return (
    <div style={cradleStyles}>
      <div
        style={{
          ...dotStyles,
          animation: "swing var(--uib-speed) linear infinite",
        }}
      >
        <div style={dotAfterStyles}></div>
      </div>
      <div style={dotStyles}>
        <div style={dotAfterStyles}></div>
      </div>
      <div style={dotStyles}>
        <div style={dotAfterStyles}></div>
      </div>
      <div
        style={{
          ...dotStyles,
          animation: "swing2 var(--uib-speed) linear infinite",
        }}
      >
        <div style={dotAfterStyles}></div>
      </div>
      <style>
        {`
          @keyframes swing {
            0% {
              transform: rotate(0deg);
              animation-timing-function: ease-out;
            }
            25% {
              transform: rotate(70deg);
              animation-timing-function: ease-in;
            }
            50% {
              transform: rotate(0deg);
              animation-timing-function: linear;
            }
          }

          @keyframes swing2 {
            0% {
              transform: rotate(0deg);
              animation-timing-function: linear;
            }
            50% {
              transform: rotate(0deg);
              animation-timing-function: ease-out;
            }
            75% {
              transform: rotate(-70deg);
              animation-timing-function: ease-in;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CircleAnimation;
