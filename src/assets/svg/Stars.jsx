import { useEffect, useState } from "react";

export default function Stars({
  fill,
  point,
  size,
  max,
  voted,
  setVoted,
  voteSuggestion,
}) {
  const [vote, setVote] = useState(null);
  if (!fill) fill = "#fff";
  const stars = [];
  for (let i = 0; i < max; i++) {
    if (voted) {
      if (i < voted) {
        stars.push(<FilledStar fill={"#fec748"} size={size} />);
      } else stars.push(<EmptyStar fill={"#fec748"} size={size} />);
    } else if (vote !== null) {
      if (i <= vote) {
        stars.push(<FilledStar fill={"#fec748"} size={size} />);
      } else stars.push(<EmptyStar fill={"#fec748"} size={size} />);
    } else if (i + 0.8 < point.toFixed(1)) {
      stars.push(<FilledStar fill={fill} size={size} />);
    } else if (point.toFixed(1) - i > 0.3) {
      stars.push(<HalfStar fill={fill} size={size} />);
    } else stars.push(<EmptyStar fill={fill} size={size} />);
  }
  function handleEnter(index) {
    setVote(index);
  }
  function handleLeave(index) {
    setVote(null);
  }
  return (
    <div className="flex">
      {stars.map((star, index) => (
        <div
          key={index}
          onPointerEnter={() => handleEnter(index)}
          onPointerLeave={() => handleLeave(index)}
          onClick={() => {
            if (vote) voteSuggestion(vote + 1);
          }}
          className="pointer-events-auto"
        >
          {star}
        </div>
      ))}
    </div>
  );
}

export function HalfStar({ fill, size }) {
  return (
    <svg
      fill={fill || "#fff"}
      width={size || "16px"}
      height={size || "16px"}
      viewBox="0 0 36.092 36.092"
    >
      <g>
        <g>
          <path d="M36.043,13.909c-0.123-0.377-0.456-0.646-0.852-0.688l-11.549-1.171L18.96,1.431c-0.159-0.363-0.518-0.596-0.914-0.596 s-0.755,0.234-0.915,0.597l-4.683,10.62L0.9,13.222c-0.395,0.04-0.728,0.309-0.851,0.688c-0.122,0.377-0.011,0.791,0.285,1.055 l8.651,7.734L6.532,34.044c-0.084,0.387,0.07,0.789,0.391,1.021c0.321,0.231,0.747,0.254,1.091,0.055l10.031-5.838l10.029,5.838 c0.156,0.092,0.33,0.137,0.505,0.137c0.207,0,0.411-0.064,0.588-0.191c0.319-0.231,0.474-0.633,0.39-1.021L27.104,22.7l8.651-7.735 C36.054,14.698,36.165,14.286,36.043,13.909z M25.339,21.594c-0.271,0.24-0.39,0.604-0.312,0.957l2.099,9.699l-8.574-4.99 c-0.001,0-0.002,0-0.003-0.002V5.447l3.503,7.943c0.146,0.33,0.456,0.555,0.813,0.592l9.869,1.001L25.339,21.594z" />
        </g>
      </g>
    </svg>
  );
}

export function EmptyStar({ fill, size, ...props }) {
  return (
    <svg
      fill={fill || "#fff"}
      width={size || "16px"}
      height={size || "16px"}
      viewBox="0 0 36.09 36.09"
      strokeWidth={1.5}
      {...props}
    >
      <g>
        <g>
          <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596 s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055 l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191 c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02 l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957 l2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957 l-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592 l9.87,1.002L25.336,21.598z" />
        </g>
      </g>
    </svg>
  );
}

export function FilledStar({ fill, size }) {
  return (
    <svg
      fill={fill || "#fff"}
      width={size || "16px"}
      height={size || "16px"}
      viewBox="0 0 35.088 35.088"
    >
      <g>
        <g>
          <path d="M34.921,14.075l-8.87,7.93l2.517,11.628c0.042,0.193-0.035,0.394-0.195,0.511c-0.087,0.062-0.189,0.097-0.294,0.097 c-0.086,0-0.173-0.022-0.251-0.067l-10.284-5.986L7.26,34.172c-0.172,0.099-0.385,0.088-0.545-0.028 c-0.16-0.115-0.236-0.314-0.194-0.51l2.515-11.628l-8.87-7.93c-0.147-0.134-0.203-0.341-0.142-0.527 c0.061-0.188,0.228-0.322,0.425-0.343l11.837-1.201l4.8-10.887c0.16-0.361,0.755-0.361,0.915,0l4.799,10.887l11.838,1.201 c0.196,0.021,0.363,0.152,0.426,0.343C35.124,13.735,35.068,13.94,34.921,14.075z" />
        </g>
      </g>
    </svg>
  );
}
