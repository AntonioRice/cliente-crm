const VenezuelaFlag = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 180 120"
      className="size-5"
    >
      <defs>
        <g id="d" transform="translate(0 -36)">
          <g id="c">
            <g id="b">
              <path d="M0-5v5h3z" fill="#fff" transform="rotate(18 0 -5)" id="a" />
              <use xlinkHref="#a" transform="scale(-1 1)" />
            </g>
            <use xlinkHref="#b" transform="rotate(72)" />
          </g>
          <use xlinkHref="#b" transform="rotate(-72)" />
          <use xlinkHref="#c" transform="rotate(144)" />
        </g>
      </defs>
      <path d="M0 0h180v120H0z" fill="#cf142b" />
      <path d="M0 0h180v80H0z" fill="#00247d" />
      <path d="M0 0h180v40H0z" fill="#fc0" />
      <g transform="translate(90 84)">
        <g id="f">
          <g id="e">
            <use xlinkHref="#d" transform="rotate(10)" />
            <use xlinkHref="#d" transform="rotate(30)" />
          </g>
          <use xlinkHref="#e" transform="rotate(40)" />
        </g>
        <use xlinkHref="#f" transform="rotate(-80)" />
      </g>
    </svg>
  );
};

export default VenezuelaFlag;
