import { Radio } from "@mui/material";

export const CustomRadioButton = ({ ...props }) => {
  return (
    <Radio
      {...props}
      icon={
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="#131313" strokeWidth="2" />
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
        </svg>
      }
      checkedIcon={
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="#131313" strokeWidth="2" />
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle cx="10" cy="10" r="4" fill="#131313" />
          <circle cx="10" cy="10" r="4" fill="black" fillOpacity="0.2" />
          <circle cx="10" cy="10" r="4" fill="black" fillOpacity="0.2" />
          <circle cx="10" cy="10" r="4" fill="black" fillOpacity="0.2" />
        </svg>
      }
    />
  );
};
