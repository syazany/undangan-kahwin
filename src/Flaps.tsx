import React from "react";
export default function Flaps() {
  return (
    <div className="fe-env" aria-hidden="true">
      <div className="fe-flap fe-t">
        <span className="fe-face"></span>
        <span className="fe-sheen">
          <img
            className="fe-play"
            src="/media/nacre-play.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        </span>
        <span className="fe-glow">
          <img
            className="fe-pool-b"
            src="/media/nacre-pool-b.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
          />
          <img
            className="fe-pool-a"
            src="/media/nacre-pool-a.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fe-nedge"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="fe-nrim-a" d="M0 30.1 L50 49.1 L100 30.1" />
          <path className="fe-nrim-b" d="M0 30.35 L50 49.35 L100 30.35" />
        </svg>
      </div>
      <div className="fe-flap fe-b">
        <span className="fe-face"></span>
        <span className="fe-sheen">
          <img
            className="fe-play"
            src="/media/nacre-play.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        </span>
        <span className="fe-glow">
          <img
            className="fe-pool-b"
            src="/media/nacre-pool-b.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
          />
          <img
            className="fe-pool-a"
            src="/media/nacre-pool-a.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fe-nedge"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter
              id="feNcast"
              filterUnits="userSpaceOnUse"
              x="-10"
              y="-10"
              width="120"
              height="120"
            >
              <feGaussianBlur stdDeviation="1.6 .75" />
            </filter>
            <filter
              id="feNcastWide"
              filterUnits="userSpaceOnUse"
              x="-10"
              y="-10"
              width="120"
              height="120"
            >
              <feGaussianBlur stdDeviation="4.2 1.95" />
            </filter>
            <filter
              id="feNcontact"
              filterUnits="userSpaceOnUse"
              x="-10"
              y="-10"
              width="120"
              height="120"
            >
              <feGaussianBlur stdDeviation=".32 .15" />
            </filter>
            <filter
              id="feWaxReliefGold"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="0.55"
                result="bump"
              />
              <feDiffuseLighting
                in="bump"
                surfaceScale="2"
                diffuseConstant="0.68"
                lightingColor="#ffffff"
                result="lit"
              >
                <feDistantLight azimuth="225" elevation="50" />
              </feDiffuseLighting>
              <feSpecularLighting
                in="bump"
                surfaceScale="2"
                specularConstant="0.7"
                specularExponent="22"
                lightingColor="#ffffff"
                result="shine"
              >
                <feDistantLight azimuth="225" elevation="40" />
              </feSpecularLighting>
              <feComposite
                in="lit"
                in2="shine"
                operator="arithmetic"
                k2="1"
                k3="1"
                result="light0"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.7"
                numOctaves="2"
                seed="7"
                result="noise0"
              />
              <feColorMatrix
                in="noise0"
                type="matrix"
                values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1"
                result="noise"
              />
              <feComposite
                in="light0"
                in2="noise"
                operator="arithmetic"
                k1="0.3"
                k2="0.85"
                result="light"
              />
              <feComponentTransfer in="light" result="gold">
                <feFuncR
                  type="table"
                  tableValues=".204 .341 .504 .673 .816 .916 1"
                />
                <feFuncG
                  type="table"
                  tableValues=".141 .248 .375 .516 .668 .825 .976"
                />
                <feFuncB
                  type="table"
                  tableValues=".047 .095 .156 .237 .364 .588 .902"
                />
                <feFuncA type="discrete" tableValues="1" />
              </feComponentTransfer>
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius=".9"
                result="fat"
              />
              <feGaussianBlur in="fat" stdDeviation=".5" result="reach" />
              <feComposite in="gold" in2="reach" operator="in" />
            </filter>
            <filter
              id="feWaxReliefSilver"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="0.55"
                result="bump"
              />
              <feDiffuseLighting
                in="bump"
                surfaceScale="2"
                diffuseConstant="0.68"
                lightingColor="#ffffff"
                result="lit"
              >
                <feDistantLight azimuth="225" elevation="50" />
              </feDiffuseLighting>
              <feSpecularLighting
                in="bump"
                surfaceScale="2"
                specularConstant="0.7"
                specularExponent="22"
                lightingColor="#ffffff"
                result="shine"
              >
                <feDistantLight azimuth="225" elevation="40" />
              </feSpecularLighting>
              <feComposite
                in="lit"
                in2="shine"
                operator="arithmetic"
                k2="1"
                k3="1"
                result="light0"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.7"
                numOctaves="2"
                seed="7"
                result="noise0"
              />
              <feColorMatrix
                in="noise0"
                type="matrix"
                values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1"
                result="noise"
              />
              <feComposite
                in="light0"
                in2="noise"
                operator="arithmetic"
                k1="0.3"
                k2="0.85"
                result="light"
              />
              <feComponentTransfer in="light" result="silver">
                <feFuncR
                  type="table"
                  tableValues=".149 .27 .42 .58 .72 .86 .97"
                />
                <feFuncG
                  type="table"
                  tableValues=".165 .29 .44 .6 .74 .87 .98"
                />
                <feFuncB
                  type="table"
                  tableValues=".196 .33 .49 .65 .79 .91 1"
                />
                <feFuncA type="discrete" tableValues="1" />
              </feComponentTransfer>
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius=".9"
                result="fat"
              />
              <feGaussianBlur in="fat" stdDeviation=".5" result="reach" />
              <feComposite in="silver" in2="reach" operator="in" />
            </filter>
          </defs>
          <path
            className="fe-ncast fe-ncast-wide"
            filter="url(#feNcastWide)"
            d="M-6 -6 L106 -6 L106 30.4 L50 49.4 L-6 30.4 Z"
            transform="translate(.6 1.1)"
          />
          <path
            className="fe-ncast"
            filter="url(#feNcast)"
            d="M-6 -6 L106 -6 L106 30.4 L50 49.4 L-6 30.4 Z"
            transform="translate(.3 .5)"
          />
          <path
            className="fe-ncontact"
            filter="url(#feNcontact)"
            d="M-2 30.45 L50 49.45 L102 30.45"
          />
          <path className="fe-nfold" d="M0 100 L50 50.5 L100 100" />
          <path className="fe-nlip" d="M0 30.1 L50 49.1 L100 30.1" />
        </svg>
      </div>
    </div>
  );
}
