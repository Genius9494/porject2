const ButtonSvg = (white: boolean) => (
  <>
    {/* left */}
    {/* <svg className="absolute top-0 lg:left-[0.150rem] left-[0.125rem]" width="16" height="44" viewBox="0 0 21 44">
      <path
        fill={white ? "yellow" : "none"}
        stroke={white ? "yellow" : "#a3e635"}
        strokeWidth="2"
        d="M21,43 Q5,22 21,1"
      />
    </svg> */}

    {/* center */}
    <svg
      className="absolute top-0 left-[1rem] w-[calc(100%-2rem)]"
      height="44"
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
    >
      {white ? (
        <rect width="100" height="50" fill="green" rx="12" />
      ) : (
        <>
          <defs>
            <linearGradient id="modern-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="dark" />
              
            </linearGradient>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f6ff00" floodOpacity="0.2" />
            </filter>
          </defs>
          <rect
            width="100"
            height="38"
            rx="19"
            fill="url(#modern-gradient)"
            // filter="url(#shadow)"
          />
        </>
      )}
    </svg>

    {/* right
    <svg className="absolute top-0 right-[0.150rem]" width="16" height="44" viewBox="0 0 21 44">
      <path
        fill={white ? "yellowgreen" : "none"}
        stroke={white ? "yellow" : "#a3e635"}
        strokeWidth="2"
        d="M0,43 Q16,22 0,1"
      />
    </svg> */}
  </>
);

export default ButtonSvg;

















// const ButtonSvg = (white: boolean) => (
//   <>
//     <svg className="absolute top-0 lg:left-1 left-0" width="21" height="44" viewBox="0 0 21 44">
//       <path
//         fill={white ? "white" : "none"}
//         stroke={white ? "white" : "url(#btn-left)"}
//         strokeWidth="2"
//         d="M21,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1"
//       />
//     </svg>
//     <svg
//       className="absolute top-0 left-[1.3125rem] w-[calc(100%-2.625rem)]"
//       height="44"
//       viewBox="0 0 100 44"
//       preserveAspectRatio="none"
//       fill={white ? "white" : "none"}
//     >
//       {white ? (
//         <polygon fill="white" fillRule="nonzero" points="100 0 100 44 0 44 0 0" />
//       ) : (
//         <>
//           <polygon fill="url(#btn-top)" fillRule="nonzero" points="100 42 100 44 0 44 0 42" />
//           <polygon fill="url(#btn-bottom)" fillRule="nonzero" points="100 0 100 2 0 2 0 0" />
//         </>
//       )}
//     </svg>
//     <svg className="absolute top-0  right-0" width="21" height="44" viewBox="0 0 21 44">
//       <path
//         fill={white ? "white" : "none"}
//         stroke={white ? "white" : "url(#btn-right)"}
//         strokeWidth="2"
//         d="M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1"
//       />
//     </svg>
//   </>
// );

// export default ButtonSvg;
